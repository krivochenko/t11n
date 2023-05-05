import { useAuthority } from './useAuthority';
import { useQuery } from '@tanstack/react-query';
import { Address } from 'ton-core';

export const useAuthorityGetItemAddressByOwnerAddress = (ownerAddress?: Address) => {
  const authorityContract = useAuthority();
  return useQuery(
    ['authority_get_item_address_by_owner_address'],
    () => ownerAddress ? authorityContract!.getItemAddressByOwnerAddress(ownerAddress) : undefined,
    { refetchInterval: false, enabled: !!authorityContract && !!ownerAddress },
  );
}