export interface Forecast {
  dt: number;
  weather: { id: number; main: any }[];
  temp: {
    min: number;
    max: number;
  };
}
