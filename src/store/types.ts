export type Position = {
  lat: number;
  lng: number;
};

export type WeatherBlob = {
  date: string;
  weather: string;
  temperature: string;
  icon: string;
  city: string;
  country: string;
  error: boolean;
};

export interface RootState {
  position: Position;
  savedPositions: Position[];
}
