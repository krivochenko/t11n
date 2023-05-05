import React from 'react';
import { ColorSchemaEditor } from './color-schema-editor/ColorSchemaEditor';
import { Map } from './map/Map';
import { Address } from 'ton-core';
import { Button, Col, Empty, Row, Spin } from 'antd';
import { useItemData } from '../../hooks/useItemData';
import { useTonWallet } from '@tonconnect/ui-react';

export const Editor = (props: { ownerAddress: Address }) => {
  const {
    countriesList,
    colorSchema,
    flags,
    readonly,
    loadingMessage,
    setColorSchema,
    setFlags,
    save,
  } = useItemData(props.ownerAddress);

  const wallet = useTonWallet();

  if (!wallet) {
    return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={'Connect your wallet first'} />
  }

  if (loadingMessage || !countriesList || !colorSchema || !flags || readonly === undefined) {
    return <Spin tip={loadingMessage} size="large">
      <div className="content"/>
    </Spin>;
  }

  return <Row gutter={[0, 10]}>
    {
      !readonly
        ? <Col span={24}>
            <ColorSchemaEditor colorSchema={colorSchema} onChangeColorSchema={setColorSchema}/>
          </Col>
        : null
    }
    <Col span={24}>
      <Map readonly={readonly} flags={flags} countriesList={countriesList} colorSchema={colorSchema} onChangeFlags={setFlags}/>
    </Col>
    <Col span={24}>
      {readonly || !wallet ? null : <Button type={'primary'} block onClick={save}>Save</Button>}
    </Col>
  </Row>;
};