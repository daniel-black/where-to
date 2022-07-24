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
      setPlaces(places => [...places, searchResult])
    }
  }, [searchResult])

  console.log(places);

   

  return (
    <div className="flex min-h-full">
      {/* Side menu hides by default when on mobile */}
      <div className='side-menu'>
        <h1 className="text-3xl font-bold text-center">Where to?</h1>
        <details>
          <summary className="list-none flex justify-between items-center p-2 hover:cursor-pointer rounded-b-xl duration-100 ease-in-out hover:bg-zinc-800">
            <span>📌 My Places</span><span className="flex justify-center items-center font-mono h-6 w-6 rounded-full bg-rose-500 text-zinc-900 hover:bg-rose-400 duration-100">{places.length}</span>
          </summary>
          <div className="ml-7">
            {places.length > 0 ? (places.map((p, index) => (
            <div key={index} className='flex items-center justify-between my-1 p-1 rounded hover:bg-zinc-800 group'>
              <span>{index+1}. {p.place_name.replace(', United States', '')}</span>
              <button
                onClick={() => setPlaces(places.filter(p => places.indexOf(p) !== index))} 
                className="mr-0.5 flex items-center justify-center font-extrabold w-5 h-4 rounded bg-zinc-800 group-hover:brightness-125 group-hover:shadow hover:bg-rose-900 duration-100 ease-in-out">
                <span className="h-[2px] w-[12px] rounded-full bg-zinc-900"></span>
              </button>
            </div>
            ))) : 
            <p className="text-xs text-zinc-400">No saved places yet! 🙀</p>}
          </div>
        </details>
        <SelectMapStyle mapStyle={mapStyle} handleChange={(style: MapStyle) => setMapStyle(style)} />
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
          // onLoading={(e) => console.dir(e)}
          onError={(e) => console.log('erroring')}
          // onResults={(e) => console.dir(e)}
        />
        <UserLocationMarker />
        <GeolocateControl onGeolocate={(e) => console.log(`lat: ${e.coords.latitude}, lng: ${e.coords.longitude}`)} position='bottom-right' />
      </Map>
    
    </div>
  );
}

export default MapPage;