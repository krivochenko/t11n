import { Button, Col, Popover, Row, Typography } from 'antd';
import React, { useCallback, useMemo } from 'react';
import { ColorResult, SketchPicker } from 'react-color';
import './ColorSchemaEditor.scss';
import { Color, ColorSchema } from '../../../utils/types';

const ColorSelector = (props: { label: string, value: Color, onChange: (value: Color) => void }) => {
  const { value, onChange, label } = props;

  const setValue = useCallback((newValue: ColorResult) => {
    onChange({ ...newValue.rgb, a: newValue.rgb.a || 1 });
  }, [onChange]);

  const style = useMemo(() => ({ backgroundColor: `rgba(${value.r},${value.g},${value.b},${value.a })`, color: '#ffffff' }), [value]);

  return <Popover trigger={'click'} content={<SketchPicker onChange={setValue} color={value}/>} title={label}>
    <Typography.Text type={'secondary'}>{label}</Typography.Text>
    <Button style={style} type="dashed" size={'small'} block/>
  </Popover>;
};

export const ColorSchemaEditor = (props: { colorSchema: ColorSchema, onChangeColorSchema: (schema: ColorSchema) => void }) => {
  const { colorSchema, onChangeColorSchema } = props;
  const setBackgroundColor = useCallback((backgroundColor: Color) => onChangeColorSchema({ ...colorSchema, backgroundColor }), [colorSchema, onChangeColorSchema])
  const setBordersColor = useCallback((bordersColor: Color) => onChangeColorSchema({ ...colorSchema, bordersColor }), [colorSchema, onChangeColorSchema])
  const setVisitedColor = useCallback((visitedColor: Color) => onChangeColorSchema({ ...colorSchema, visitedColor }), [colorSchema, onChangeColorSchema])
  const setUnvisitedColor = useCallback((unvisitedColor: Color) => onChangeColorSchema({ ...colorSchema, unvisitedColor }), [colorSchema, onChangeColorSchema])

  return <div className="color-schema-editor">
    <Typography.Title level={5}>Set color schema: </Typography.Title>
    <Row className="color-schema-editor-buttons" gutter={10}>
      <Col span={6}>
        <ColorSelector label={'Background'} value={colorSchema.backgroundColor} onChange={setBackgroundColor}/>
      </Col>
      <Col span={6}>
        <ColorSelector label={'Borders'} value={colorSchema.bordersColor} onChange={setBordersColor}/>
      </Col>
      <Col span={6}>
        <ColorSelector label={'Visited'} value={colorSchema.visitedColor} onChange={setVisitedColor}/>
      </Col>
      <Col span={6}>
        <ColorSelector label={'Unvisited'} value={colorSchema.unvisitedColor} onChange={setUnvisitedColor}/>
      </Col>
    </Row>
  </div>
};