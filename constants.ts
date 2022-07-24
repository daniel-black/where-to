export enum MapStyle {
  Outdoors = 'mapbox://styles/mapbox/outdoors-v11',
  Light = 'mapbox://styles/mapbox/light-v10',
  Dark = 'mapbox://styles/mapbox/dark-v10',
  Streets = 'mapbox://styles/mapbox/streets-v11',
  Satellite = 'mapbox://styles/mapbox/satellite-v9',
  'Satellite Streets' = 'mapbox://styles/mapbox/satellite-streets-v11',
  'Navigation Day' = 'mapbox://styles/mapbox/navigation-day-v1',
  'Navigation Night' = 'mapbox://styles/mapbox/navigation-night-v1',
}

export type MapStyleKey = 'Outdoors' | 'Dark' | 'Light' | 'Streets' | 'Satellite' | 'Satellite Streets' | 'Navigation Day' | 'Navigation Night';

export interface Viewport {
  longitude: number,
  latitude: number,
  zoom: number
};

export const initialViewport: Viewport = {
  longitude: -98.57,
  latitude: 39.828,
  zoom: 3.75,
};

export interface Place {
  id: string,
  place_name: string,
  'place_name_en-US': string,
  text: string,
  'text_en-US': string,
  center: number[],
  bbox: number[],
  geometry?: {
    coordinates: number[],
    type: string
  },
  place_type: string[],
  type?: string,
  context?: Context[],
  properties?: Object
}

export interface Context {
  id: string,
  language: string,
  'language_en-US': string,
  text: string,
  'text_en-US': string,
  wikidata: string
}