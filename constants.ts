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

export type MapStyleKey = 'Outdoor' | 'Dark' | 'Light' | 'Streets' | 'Satellite' | 'Satellite Streets' | 'Navigation Day' | 'Navigation Night';