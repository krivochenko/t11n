import { Address, Cell, OpenedContract } from '@ton/core';
import { Item } from '../../contracts/item';
import { useQuery } from '@tanstack/react-query';
import { UseQueryResult } from '@tanstack/react-query/src/types';

export const useItemGetNftData = (item?: OpenedContract<Item>): UseQueryResult<[boolean, bigint, Address, Address, Cell]> => {
  return useQuery({
    queryKey: ['item_get_nft_data'],
    queryFn: () => item!.getNftData(),
    refetchInterval: false,
    enabled: !!item,
  });
}
