import { Address } from '@ton/core';
import { useTonClient } from './useTonClient';
import { useEffect, useState } from 'react';

export const useContractIsDeployed = (address?: Address): boolean | undefined => {
  const client = useTonClient();
  const [isDeployed, setIsDeployed] = useState<boolean>();

  useEffect(() => {
    if (client && address) {
      client.isContractDeployed(address).then(result => setIsDeployed(result));
    }
  }, [client, address]);

  return isDeployed;
};
