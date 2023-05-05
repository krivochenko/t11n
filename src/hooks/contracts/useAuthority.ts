import { useTonClient } from '../useTonClient';
import { useTonConnect } from '../useTonConnect';
import { Address } from 'ton-core';
import { CHAIN } from '@tonconnect/protocol';
import { Authority } from '../../contracts/authority';
import { useMemo } from 'react';
import { AUTHORITY_ADDRESS_MAINNET, AUTHORITY_ADDRESS_TESTNET } from '../../utils/constants';

export const useAuthority = () => {
  const client = useTonClient();
  const { network } = useTonConnect();

  return useMemo(() => {
    if (!client || !network) {
      return;
    }
    const address = network === CHAIN.MAINNET ? AUTHORITY_ADDRESS_MAINNET : AUTHORITY_ADDRESS_TESTNET;
    const contract = new Authority(Address.parse(address));
    return client.open(contract);
  }, [client, network]);
}
