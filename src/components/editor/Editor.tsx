import React from 'react';
import { ColorSchemaEditor } from './color-schema-editor/ColorSchemaEditor';
import { Map } from './map/Map';
import { Address } from 'ton-core';
import { Button, Col, Row, Spin } from 'antd';
import { useItemData } from '../../hooks/useItemData';

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

  if (loadingMessage) {
    return <Spin tip={loadingMessage} size="large">
      <div className="content"/>
    </Spin>;
  }

  if (!countriesList || !colorSchema || !flags || readonly === undefined) {
    return null;
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
      <Button type={'primary'} block onClick={save}>Save</Button>
    </Col>
  </Row>;
};