import { Editor } from '../components/editor/Editor';
import { useParams } from 'react-router-dom';
import React, { useMemo } from 'react';
import { Address } from 'ton-core';

export const MapPage = () => {
  const params = useParams();

  const ownerAddress = useMemo(() => {
    if (params.address && Address.isFriendly(params.address)) {
      return Address.parseFriendly(params.address).address;
    }
    return null;
  }, [params]);

  if (ownerAddress === null) {
    return <div>URL incorrect</div>;
  }

  return <Editor ownerAddress={ownerAddress}/>;
};