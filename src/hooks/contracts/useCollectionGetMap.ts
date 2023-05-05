import { useQuery } from '@tanstack/react-query';
import { Cell, OpenedContract } from 'ton-core';
import { Collection } from '../../contracts/collection';
import { UseQueryResult } from '@tanstack/react-query/src/types';

export const useCollectionGetMap = (collection?: OpenedContract<Collection>): UseQueryResult<Cell> => {
  return useQuery(
    ['collection_get_map'],
    () => collection!.getMap(),
    { refetchInterval: false, enabled: !!collection },
  );
}