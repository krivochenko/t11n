import { useTonClient } from '../useTonClient';
import { Address } from '@ton/core';
import { Collection } from '../../contracts/collection';
import { useMemo } from 'react';

export const useCollection = (address?: Address) => {
  const client = useTonClient();
  return useMemo(() => client && address ? client.open(new Collection(address)) : undefined, [client, address]);
}
