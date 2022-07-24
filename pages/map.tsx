import { initialViewport, MapStyle, Place } from "../constants";
import { Map, GeolocateControl } from "react-map-gl";
import React, { useEffect, useState } from "react";

import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css';
import 'mapbox-gl/dist/mapbox-gl.css';

import UserLocationMarker from '../components/userLocationMarker';
import GeocoderControl from '../components/geocoderControl';
import SelectMapStyle from "../components/selectMapStyle";

// Check out FlowMapBlue
const MapPage = ():JSX.Element => {
  const [mapStyle, setMapStyle] = useState(MapStyle.Dark);
  const [viewport, setViewport] = useState(initialViewport);
  const [searchResult, setSearchResult] = useState<Place | null>(null);
  const [places, setPlaces] = useState<Place[]>([]);

  useEffect(() => {
    if (searchResult !== null) {
      setPlaces([...places].concat(searchResult))
    }
  }, [searchResult])

  console.log(searchResult);

  return (
    <div className="flex min-h-full">
      {/* Side menu hides by default when on mobile */}
      <div className='side-menu'>
        <h1 className="text-3xl font-bold text-center">Where to?</h1>
        <details>
          <summary className="list-none">📌 My Places</summary>
          {places.length > 0 ? (places.map((p, index) => <p key={index}>{p.place_name.replace(', United States', '')}</p>)) : 
          <p className="text-center text-xs">- No saved places yet -</p>}
        </details>
        <SelectMapStyle mapStyle={mapStyle} handleChange={(style: MapStyle) => setMapStyle(style)} />
        {/* <GeocoderDiv /> */}
        <div id="gc-root"></div>
      </div>
      
      <Map 
        {...viewport}
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
        style={{width: '100vw', height: '100vh', overflow: 'hidden'}}
        onMove={e => setViewport(e.viewState)}
        attributionControl={false}
        mapStyle={mapStyle}
        scrollZoom={true}
        dragPan={true}
        pitch={10}
      >
        
        <GeocoderControl 
          mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
          position='top-right'
          marker={true}
          onResult={(e) => setSearchResult(e.result)}
          onLoading={(e) => console.log('loading')}
          onError={(e) => console.log('erroring')}
          onResults={(e) => console.log(e)}
        />
        <UserLocationMarker />
        <GeolocateControl onGeolocate={(e) => console.log(`lat: ${e.coords.latitude}, lng: ${e.coords.longitude}`)} position='bottom-right' />
      </Map>
    
    </div>
  );
}

export default MapPage;