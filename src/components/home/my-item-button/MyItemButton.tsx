import { Address } from '@ton/core';
import React from 'react';
import { useContractIsDeployed } from '../../../hooks/useContractIsDeployed';
import { Button } from 'antd';
import {
  useAuthorityGetItemAddressByOwnerAddress
} from '../../../hooks/contracts/useAuthorityGetItemAddressByOwnerAddress';

export const MyItemButton = (props: { myAddress: Address, click: () => void }) => {
  const { data: itemAddress, isFetching: itemAddressIsFetching } = useAuthorityGetItemAddressByOwnerAddress(props.myAddress);

  const isDeployed = useContractIsDeployed(itemAddress);

  return isDeployed === undefined || itemAddressIsFetching
    ? <Button disabled block loading />
    : <Button block type={'primary'} onClick={props.click}>{isDeployed ? 'Edit my NFT' : 'Mint my NFT'}</Button>;
};