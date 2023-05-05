import { useQuery } from '@tanstack/react-query';
import { OpenedContract } from 'ton-core';
import { Authority } from '../../contracts/authority';

export const useAuthorityGetLatestVersion = (authority?: OpenedContract<Authority>) => {
  return useQuery(
    ['authority_get_latest_version'],
    () => authority!.getLatestVersion(),
    { refetchInterval: false, enabled: !!authority },
  );
}