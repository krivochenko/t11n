import { useTonClient } from '../useTonClient';
import { Address } from 'ton-core';
import { useMemo } from 'react';
import { Item } from '../../contracts/item';

export const useItem = (address?: Address) => {
  const client = useTonClient();
  return useMemo(() => client && address ? client.open(new Item(address)) : undefined, [client, address]);
}
