export type Position = {
  lat: number;
  lng: number;
};

export type WeatherBlob = {
  date: string;
  weather: string;
  icon: string;
  city: string;
  country: string;
};

export interface RootState {
  position: Position;
  savedPositions: Position[];
}
