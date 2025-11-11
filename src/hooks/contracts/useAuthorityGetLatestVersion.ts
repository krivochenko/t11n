import { useQuery } from '@tanstack/react-query';
import { OpenedContract } from '@ton/core';
import { Authority } from '../../contracts/authority';

export const useAuthorityGetLatestVersion = (authority?: OpenedContract<Authority>) => {
  return useQuery({
    queryKey: ['authority_get_latest_version'],
    queryFn: () => authority!.getLatestVersion(),
    refetchInterval: false,
    enabled: !!authority,
  });
}