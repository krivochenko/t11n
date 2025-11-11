import { getHttpEndpoint } from '@orbs-network/ton-access';
import { TonClient } from '@ton/ton';
import { useTonConnect } from './useTonConnect';
import { CHAIN } from '@tonconnect/protocol';
import { useEffect, useState } from 'react';

export const useTonClient = () => {
  const { network } = useTonConnect();
  const [client, setClient] = useState<TonClient>();

  useEffect(() => {
    getHttpEndpoint({
      network: network === CHAIN.MAINNET ? 'mainnet' : 'testnet',
    }).then(endpoint => setClient(new TonClient({ endpoint })));
  }, [network]);

  return client;
};
