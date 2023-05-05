export type Color = {
  r: number,
  g: number,
  b: number,
  a: number,
};

export type ColorSchema = {
  backgroundColor: Color,
  bordersColor: Color,
  visitedColor: Color,
  unvisitedColor: Color,
};

export type ItemContent = {
  flags: boolean[],
  colorSchema: ColorSchema,
};

export type CountriesList = { [countryName: string]: string[] };