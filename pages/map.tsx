import { initialViewport, MapStyle, Place } from "../constants";
import { Map, Popup, GeolocateControl, Marker, NavigationControl, useControl, LngLat } from "react-map-gl";
import React, { useEffect, useState } from "react";
import {MapboxOverlay, MapboxOverlayProps} from '@deck.gl/mapbox/typed';
import {ArcLayer, ArcLayerProps } from '@deck.gl/layers/typed';

import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css';
import 'mapbox-gl/dist/mapbox-gl.css';

import UserLocationMarker from '../components/userLocationMarker';
import GeocoderControl from '../components/geocoderControl';
import SelectMapStyle from "../components/selectMapStyle";


function DeckGLOverlay(props: MapboxOverlayProps) {
  const overlay = useControl<MapboxOverlay>(() => new MapboxOverlay(props));
  overlay.setProps(props);
  return null;
}


// Check out FlowMapBlue
const MapPage = ():JSX.Element => {
  const [homeLocation, setHomeLocation] = useState<LngLat | null>(null);
  const [mapStyle, setMapStyle] = useState(MapStyle.Dark);
  const [viewport, setViewport] = useState(initialViewport);
  const [searchResult, setSearchResult] = useState<Place | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [places, setPlaces] = useState<Place[]>([]);

  useEffect(() => {
    if (searchResult !== null) {
      setShowPopup(true);
    }
  }, [searchResult])
   
  const saveLocation = (place: Place): void => {
    setPlaces(places => [...places, place]);
    setShowPopup(false);
  }

  const data = homeLocation ? (places.map(p => ({
    from: {
      name: 'Home',
      coordinates: [homeLocation?.lng, homeLocation?.lat]
    },
    to: {
      name: p.text,
      coordinates: p.geometry?.coordinates
    }
  }))) : [];
  
  const arcLayerProps: ArcLayerProps = {
    id: 'arc-layer',
    data,
    widthUnits: 'meters',
    getWidth: 10000,
    getHeight: 0.5,
    getSourcePosition: d => d.from.coordinates,
    getTargetPosition: d => d.to.coordinates,
  };

  console.log(arcLayerProps)

  const arcLayer = new ArcLayer(arcLayerProps);

//   const data = [
//     {
//       inbound: 72633,
//       outbound: 74735,
//       from: {
//         name: '19th St. Oakland (19TH)',
//         coordinates: [-122.269029, 37.80787]
//       },
//       to: {
//         name: '12th St. Oakland City Center (12TH)',
//         coordinates: [-100.271604, 37.803664]
//     }
//   }
// ];

//   const arcLayer = new ArcLayer({
//     id: 'arcs',
//     data,
    // widthUnits: 'meters',
    // getWidth: 10000,
    // getHeight: 1,
    // getSourcePosition: d => d.from.coordinates,
    // getTargetPosition: d => d.to.coordinates,
//   });


  return (
    <div className="flex  min-h-full">
      {/* Side menu hides by default when on mobile */}
      <div className='side-menu '>
        <h1 className="text-3xl font-bold text-center">Where to?</h1>
        <details>
          <summary className="list-none flex justify-between items-center p-2 hover:cursor-pointer rounded-b-xl duration-100 ease-in-out hover:bg-zinc-800">
            <span>📌 My Places</span><span className="flex justify-center items-center font-mono h-6 w-6 rounded-full bg-rose-500 text-zinc-900 hover:bg-rose-400 duration-100">{places.length}</span>
          </summary>
          <div className="ml-7">
            {places.length > 0 ? (places.map((p, index) => (
            <div key={index} className='flex items-center justify-between my-0.5 p-1 rounded hover:bg-zinc-800 group'>
              <span>{index+1}. {p.place_name.replace(', United States', '')}</span>
              <button
                onClick={() => setPlaces(places.filter(p => places.indexOf(p) !== index))} 
                className="mr-0.5 flex items-center justify-center font-extrabold w-5 h-4 rounded bg-zinc-800 group-hover:brightness-125 group-hover:shadow hover:bg-rose-900 duration-100 ease-in-out">
                <span className="h-[2px] w-[12px] rounded-full bg-zinc-900"></span>
              </button>
            </div>
            ))) : 
            <p className="text-xs text-zinc-400 mt-1">No saved places yet! 🙀</p>}
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
        pitch={30}
        antialias={true}
      >
        {places.map((place, index) => (
          <Marker
            key={index}
            longitude={place.geometry?.coordinates[0]} 
            latitude={place.geometry?.coordinates[1]}
            anchor='top'

          ></Marker>
        ))}
        
        <DeckGLOverlay layers={[arcLayer]} />
        
        <GeocoderControl 
          mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
          position='top-right'
          marker={true}
          onResult={(e) => setSearchResult(e.result)}
          // onLoading={(e) => console.dir(e)}
          onError={(e) => console.log('erroring')}
          // onResults={(e) => console.dir(e)}
        />

        {showPopup && searchResult && searchResult.geometry?.coordinates.length === 2 && (
          <Popup 
            longitude={searchResult.geometry?.coordinates[0]}
            latitude={searchResult.geometry?.coordinates[1]}
            anchor='top'
            offset={14}
            onClose={() => setShowPopup(false)}
            closeButton={false}
          >
            <div className="rounded-lg bg-white absolute -top-3 -left-2 p-2 w-60 ring-4 ring-indigo-400 shadow-2xl">
              <h2 className="text-2xl">📍 {searchResult.text}</h2>
              <button 
                className="bg-indigo-500 p-2 text-xl text-center w-full rounded hover:bg-indigo-400"
                onClick={() => saveLocation(searchResult)}  
              >Save Location</button>
            </div>
          </Popup>
        )}
       
        <UserLocationMarker homeLocation={homeLocation} setHomeLocation={(l: LngLat) => setHomeLocation(l)} />
        <NavigationControl position="bottom-right" />
        <GeolocateControl position='bottom-right' />
      </Map>
    
    </div>
  );
}

export default MapPage;
