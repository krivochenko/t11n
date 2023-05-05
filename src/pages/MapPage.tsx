import { Editor } from '../components/editor/Editor';
import { useParams } from 'react-router-dom';
import React, { useMemo } from 'react';
import { Address } from 'ton-core';
import { Empty } from 'antd';

export const MapPage = () => {
  const params = useParams();

  const ownerAddress = useMemo(() => {
    if (params.address && Address.isFriendly(params.address)) {
      try {
        return Address.parseFriendly(params.address).address;
      } catch (e) {
        return null;
      }
    }
    return null;
  }, [params]);

  if (ownerAddress === null) {
    return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={'Page URL is incorrect'} />;
  }

  return <Editor ownerAddress={ownerAddress}/>;
};