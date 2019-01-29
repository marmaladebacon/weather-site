export type Position = {
  lat: number;
  lng: number;
};

export type WeatherBlob = {
  date: string;
  weather: string;
  icon: string;
};

export interface RootState {
  position: Position;
};
