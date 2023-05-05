import { beginCell, Cell, Dictionary, Slice } from 'ton-core';
import { CountriesList, ItemContent } from './types';

const parseSnake = (slice: Slice, encoding: BufferEncoding): string => {
  const currentBuffer = slice.loadBuffer(Math.floor(slice.remainingBits / 8));
  if (slice.remainingRefs) {
    return currentBuffer.toString(encoding) + parseSnake(slice.loadRef().beginParse(), encoding);
  }
  return currentBuffer.toString(encoding);
};

export const parseCountries = (map: Cell) => {
  const mapDict = map.beginParse().loadDictDirect(
    Dictionary.Keys.Uint(10),
    Dictionary.Values.Dictionary(Dictionary.Keys.Uint(10), Dictionary.Values.Cell()),
  );

  return mapDict.values().reduce<CountriesList>((result, countryDict) => {
    const countryName = countryDict.get(0)?.beginParse().loadStringTail();
    const paths = countryDict.values().slice(1).map(pathCell => parseSnake(pathCell.beginParse(), 'utf-8'));
    return countryName ? { ...result, [countryName]: paths } : result;
  }, {});
};

export const generateItemContent = (content: ItemContent) => {
  const { colorSchema, flags } = content;
  const { backgroundColor, bordersColor, visitedColor, unvisitedColor } = colorSchema;
  const builder = beginCell()
    .storeUint(backgroundColor.r, 8).storeUint(backgroundColor.g, 8).storeUint(backgroundColor.b, 8).storeUint(backgroundColor.a * 100, 7)
    .storeUint(bordersColor.r, 8).storeUint(bordersColor.g, 8).storeUint(bordersColor.b, 8).storeUint(bordersColor.a * 100, 7)
    .storeUint(visitedColor.r, 8).storeUint(visitedColor.g, 8).storeUint(visitedColor.b, 8).storeUint(visitedColor.a * 100, 7)
    .storeUint(unvisitedColor.r, 8).storeUint(unvisitedColor.g, 8).storeUint(unvisitedColor.b, 8).storeUint(unvisitedColor.a * 100, 7);
  for (const flag of flags) {
    builder.storeBit(flag);
  }
  return builder.endCell();
};

export const parseItemContent = (contentCell: Cell): ItemContent => {
  const contentSlice = contentCell.beginParse();
  return {
    colorSchema: {
      backgroundColor: { r: contentSlice.loadUint(8), g: contentSlice.loadUint(8), b: contentSlice.loadUint(8), a: contentSlice.loadUint(7) / 100 },
      bordersColor: { r: contentSlice.loadUint(8), g: contentSlice.loadUint(8), b: contentSlice.loadUint(8), a: contentSlice.loadUint(7) / 100 },
      visitedColor: { r: contentSlice.loadUint(8), g: contentSlice.loadUint(8), b: contentSlice.loadUint(8), a: contentSlice.loadUint(7) / 100 },
      unvisitedColor: { r: contentSlice.loadUint(8), g: contentSlice.loadUint(8), b: contentSlice.loadUint(8), a: contentSlice.loadUint(7) / 100 },
    },
    flags: Array(contentSlice.remainingBits).fill(null).map(() => contentSlice.loadBoolean()),
  };
};