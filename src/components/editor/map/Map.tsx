import { CHAIN } from '@tonconnect/protocol';
import { Badge, Select, SelectProps, Typography } from 'antd';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useTonConnect } from '../../../hooks/useTonConnect';
import { Color, ColorSchema, CountriesList } from '../../../utils/types';
import './Map.scss';

const getRgb = (color: Color) => `rgb(${color.r},${color.g},${color.b})`;

const Country = (props: {
  readonly: boolean,
  paths: string[],
  id: number;
  onClick: (id: number) => void,
  stroke: Color,
  fill: Color,
}) => {
  const { id, stroke, fill, onClick, paths, readonly } = props;
  const [hovered, setHovered] = useState(false);
  const mouseEnter = useCallback(() => setHovered(true), []);
  const mouseLeave = useCallback(() => setHovered(false), []);
  const click = useCallback(() => !readonly && onClick(id), [readonly, onClick, id]);

  return <g onMouseEnter={mouseEnter} onMouseLeave={mouseLeave} onClick={click} strokeWidth={!readonly && hovered ? 4 : 1} stroke={getRgb(stroke)} strokeOpacity={stroke.a} fill={getRgb(fill)} fillOpacity={fill.a}>
    {paths.map((path, pathIndex) => <path d={path} key={pathIndex}/>)}
  </g>;
};

export const Map = (props: { readonly: boolean, colorSchema: ColorSchema, flags: boolean[], countriesList: CountriesList, onChangeFlags: (flags: boolean[]) => void }) => {
  const { colorSchema, countriesList, onChangeFlags, flags, readonly } = props;
  const { network } = useTonConnect();
  const [search, setSearch] = useState('');

  const selectOptions: SelectProps['options'] = useMemo(() => {
    return Object.keys(countriesList).map((countryName, index) => ({
      label: countryName,
      value: index
    })).sort((a, b) => a.label.localeCompare(b.label)).filter(item => !search || item.label.toLowerCase().indexOf(search.toLowerCase()) !== -1);
  }, [countriesList, search]);

  const [selectedIndexes, setSelectedIndexes] = useState<number[]>(flags.map((value, index) => value ? index : -1).filter(value => value !== -1));

  const switchSelected = useCallback((switchedIndex: number) => {
    setSelectedIndexes(old => old.includes(switchedIndex) ? old.filter(value => value !== switchedIndex) : [...old, switchedIndex]);
  }, []);

  useEffect(() => {
    const newFlags = Object.keys(countriesList).map((_,  index) => selectedIndexes.includes(index));
    onChangeFlags(newFlags);
    setSearch('');
  }, [selectedIndexes, onChangeFlags, countriesList]);

  const { backgroundColor, bordersColor, visitedColor, unvisitedColor } = colorSchema;

  const networkLabel = useMemo(() => network ? (network === CHAIN.MAINNET ? 'mainnet' : 'testnet') : 'N/A', [network]);

  return <div>
    {!readonly ? <Typography.Title level={5}>Tap countries on the map...</Typography.Title> : null}

    <Badge.Ribbon text={networkLabel} color="#46aff5">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2000 2000" className="map">
        <rect x="0" y="0" width="2000" height="2000" fill={getRgb(backgroundColor)} fillOpacity={backgroundColor.a} />
        <g transform="translate(0 570)">
          {
            Object.keys(countriesList).map((name, id) => {
              const fill = !!selectedIndexes.find(item => item === id) ? visitedColor : unvisitedColor;
              return <Country readonly={readonly} onClick={switchSelected} fill={fill} paths={countriesList[name]} stroke={bordersColor} key={id} id={id}/>;
            })
          }
        </g>
      </svg>
      {!readonly && <>
          <Typography.Title level={5}>...or select them from the list</Typography.Title>
          <Select
              mode="multiple"
              allowClear
              className="countries-select"
              placeholder="Tap countries on map or start type it name here"
              value={selectedIndexes}
              filterOption={false}
              onChange={setSelectedIndexes}
              options={selectOptions}
              onSearch={setSearch}
          />
      </>}
    </Badge.Ribbon>
  </div>
}