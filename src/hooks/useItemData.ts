import { Address } from '@ton/core';
import { useTonWallet } from '@tonconnect/ui-react';
import { useAuthority } from './contracts/useAuthority';
import { useAuthorityGetLatestVersion } from './contracts/useAuthorityGetLatestVersion';
import { useCollection } from './contracts/useCollection';
import { useCollectionGetMap } from './contracts/useCollectionGetMap';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { parseCountries, parseItemContent } from '../utils/helpers';
import { useAuthorityGetItemAddressByOwnerAddress } from './contracts/useAuthorityGetItemAddressByOwnerAddress';
import { useItem } from './contracts/useItem';
import { useContractIsDeployed } from './useContractIsDeployed';
import { useItemGetNftData } from './contracts/useItemGetNftData';
import { useTonClient } from './useTonClient';
import { useTonConnect } from './useTonConnect';
import { DEFAULT_COLOR_SCHEMA } from '../utils/constants';
import { ColorSchema, CountriesList, ItemContent } from '../utils/types';

export const useItemData = (ownerAddress: Address): {
  countriesList: CountriesList | undefined,
  colorSchema: ColorSchema | undefined,
  flags: boolean[] | undefined,
  readonly: boolean | undefined,
  loadingMessage: string | undefined,
  setColorSchema: (colorSchema: ColorSchema) => void,
  setFlags: (flags: boolean[]) => void,
  isDirty: boolean,
  save: () => Promise<void>,
} => {
  const client = useTonClient();
  const wallet = useTonWallet();
  const { sender } = useTonConnect();

  const authority = useAuthority();
  const { data: latestVersion, isFetching: latestVersionIsFetching } = useAuthorityGetLatestVersion(authority);

  const collection = useCollection(latestVersion?.address);
  const { data: map, isFetching: mapIsFetching } = useCollectionGetMap(collection);
  const countriesList = useMemo(() => map ? parseCountries(map) : undefined, [map]);

  const { data: itemAddress, isFetching: itemAddressIsFetching } = useAuthorityGetItemAddressByOwnerAddress(ownerAddress);
  const item = useItem(itemAddress);

  const isItemDeployed = useContractIsDeployed(itemAddress);
  const isMyItem = useMemo(() => {
    const currentAddress = wallet?.account.address ? Address.parseRaw(wallet.account.address) : undefined;
    return currentAddress && currentAddress.equals(ownerAddress);
  }, [wallet, ownerAddress]);

  const [initialContent, setInitialContent] = useState<ItemContent>();

  const [colorSchema, setColorSchema] = useState<ColorSchema>();
  const [flags, setFlags] = useState<boolean[]>();

  const { data: itemNftData, isFetching: itemNftDataIsFetching } = useItemGetNftData(isItemDeployed ? item : undefined);

  const isDirty = useMemo(() => JSON.stringify(initialContent) !== JSON.stringify({ colorSchema, flags }), [initialContent, flags, colorSchema]);

  const loadingMessage = useMemo(() => {
    if (latestVersionIsFetching) {
      return 'Load collection info...';
    } else if (mapIsFetching) {
      return 'Load countries list...';
    } else if (itemAddressIsFetching) {
      return 'Load NFT address...';
    } else if (isItemDeployed === undefined) {
      return 'Check if NFT is deployed...';
    } else if (itemNftDataIsFetching) {
      return 'Load NFT data...';
    }
    return undefined;
  }, [isItemDeployed, itemAddressIsFetching, itemNftDataIsFetching, latestVersionIsFetching, mapIsFetching]);

  useEffect(() => {
    if (isItemDeployed === false && latestVersion) {
      setColorSchema(DEFAULT_COLOR_SCHEMA);
      setFlags(Array(latestVersion.countriesCount).fill(false));
    } else if (itemNftData) {
      const [, , , , contentCell] = itemNftData;
      const content = parseItemContent(contentCell);
      const { flags, colorSchema } = content;
      setInitialContent(content);
      setColorSchema(colorSchema);
      setFlags(flags);
    }
  }, [isItemDeployed, itemNftData, latestVersion]);

  const readonly = useMemo(() => {
    if (isItemDeployed === undefined && isMyItem === undefined) {
      return undefined;
    }
    return isItemDeployed === true && isMyItem === false;
  }, [isItemDeployed, isMyItem]);

  const save = useCallback(async () => {
    if (readonly || !authority || !item || !client || !colorSchema || !flags || !isDirty) {
      return;
    }
    const newContent = { colorSchema, flags };
    if (isItemDeployed) {
      await item.sendEditContent(sender, newContent);
    } else {
      await authority.sendDeployItem(sender, ownerAddress, newContent);
    }
    setInitialContent(newContent);
  }, [readonly, authority, client, colorSchema, flags, isItemDeployed, item, ownerAddress, sender, isDirty]);

  return useMemo(() => ({
    countriesList,
    colorSchema,
    flags,
    readonly,
    loadingMessage,
    setColorSchema,
    setFlags,
    isDirty,
    save,
  }), [
    countriesList,
    colorSchema,
    flags,
    readonly,
    loadingMessage,
    setColorSchema,
    setFlags,
    isDirty,
    save,
  ]);
}