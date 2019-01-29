export type Position = {
  lat: number;
  lng: number;
};

export interface RootState {
  position: Position;
}
