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

interface UserPlace extends Place {
  interestLevel: number;
  notes?: string
};


// Check out FlowMapBlue
const MapPage = ():JSX.Element => {
  const [homeLocation, setHomeLocation] = useState<LngLat | null>(null);
  const [mapStyle, setMapStyle] = useState(MapStyle.Dark);
  const [viewport, setViewport] = useState(initialViewport);
  const [searchResult, setSearchResult] = useState<Place | null>(null);
  const [interestLevel, setInterestLevel] = useState(5);
  const [showPopup, setShowPopup] = useState(false);
  const [userPlaces, setUserPlaces] = useState<UserPlace[]>([]);
  const [currentNote, setCurrentNote] = useState<[UserPlace | null, string]>([null, '']);
  

  useEffect(() => {
    setInterestLevel(5)
    if (searchResult !== null) {
      setShowPopup(true);
    }
  }, [searchResult])
   
  const saveLocation = (place: Place): void => {
    setUserPlaces(userPlaces => [...userPlaces, {...place, interestLevel}]);
    setShowPopup(false);
  }


  const getVal = (n: number): number => ((n / 10) * 255); 

  const arcData = homeLocation ? (userPlaces.map(up => ({
    interestLevel,
    from: {
      name: 'Home',
      coordinates: [homeLocation?.lng, homeLocation?.lat]
    },
    to: {
      name: up.text,
      coordinates: up.geometry?.coordinates
    }
  }))) : [];
  
  const arcLayerProps: ArcLayerProps = {
    id: 'arc-layer',
    data: arcData,
    widthUnits: 'pixels',
    getWidth: 4,
    getHeight: 0.8,
    getTilt: -10,
    getSourcePosition: d => d.from.coordinates,
    getTargetPosition: d => d.to.coordinates,
    getSourceColor: d => [255, 70, 0, 125],
    getTargetColor: d => [0, getVal(d.interestLevel)* 0.5, getVal(d.interestLevel)],
  };

  const arcLayer = new ArcLayer(arcLayerProps);

  const colorScale = [
    'bg-zinc-700',
    'bg-sky-900',
    'bg-sky-800',
    'bg-sky-700',
    'bg-sky-600',
    'bg-sky-500',
    'bg-sky-400',
    'bg-sky-300',
    'bg-sky-200',
    'bg-sky-100',
    'bg-sky-50',
  ];

  return (
    <div className="flex  min-h-full">
      {/* Side menu hides by default when on mobile */}
      <div className='side-menu '>
        <h1 className="text-3xl font-bold text-center">Where to?</h1>
        <details>
          <summary className="list-none flex justify-between items-center p-2 hover:cursor-pointer rounded-b-xl duration-100 ease-in-out hover:bg-zinc-800">
            <span>📌 My Places</span><span className="flex justify-center items-center font-mono h-6 w-6 rounded-full bg-rose-500 text-zinc-900 hover:bg-rose-400 duration-100">{userPlaces.length}</span>
          </summary>
          <div className="ml-7">
            {userPlaces.length > 0 ? (userPlaces.sort((a, b) => b.interestLevel - a.interestLevel).map((up, index) => (
              <details key={index}>
                <summary className="list-none">
                  <div className='flex items-center justify-between my-0.5 p-1 rounded hover:bg-zinc-800 group'>
                    <div className="flex space-x-2 items-center">
                      <span className={`font-mono flex items-center justify-center h-6 w-6 ${colorScale[up.interestLevel]} text-zinc-900 rounded-full`}>{up.interestLevel}</span> 
                      <span>{up.place_name.split(',')[0]}</span>
                      <button 
                        className="hidden group-hover:block text-rose-300 ml-4" 
                        onClick={() => setViewport({longitude: up.geometry!.coordinates[0], latitude: up.geometry!.coordinates[1], zoom: 6})}
                      >Snap To</button>
                    </div>
                    <button
                      onClick={() => setUserPlaces(userPlaces.filter(up => userPlaces.indexOf(up) !== index))} 
                      className="mr-0.5 flex items-center justify-center font-extrabold w-5 h-4 rounded bg-zinc-800 group-hover:brightness-125 group-hover:shadow hover:bg-rose-900 duration-100 ease-in-out">
                      <span className="h-[2px] w-[12px] rounded-full bg-zinc-900"></span>
                    </button>
                  </div>
                </summary>
                {/* content of a location */}
                <div className="space-y-0.5">
                  <textarea 
                    spellCheck={false}
                    onChange={(e) => setCurrentNote([up, e.currentTarget.value])}
                    placeholder={`Jot down some notes about ${up.place_name.split(',')[0]}! 📝`}
                    className="hover:resize-y focus:resize-y resize-none leading-[1.1rem] text-rose-200 w-full h-[3rem] rounded py-1 px-2 bg-zinc-700 hover:bg-zinc-600 focus:bg-zinc-600 shadow-inner duration-100 ease-in-out outline-none"
                  ></textarea>
                  <button 
                    className="w-full bg-violet-500 hover:bg-violet-400 text-violet-900 rounded font-bold py-1 duration-100 ease-in-out"
                    onClick={() => {
                      if (currentNote[0] === up) {
                        const updatedUserPlaces = userPlaces.filter(p => p !== up).concat({...up, notes: currentNote[1]});
                        // console.log(updatedUserPlaces);
                        setUserPlaces(updatedUserPlaces);
                      }
                      //setUserPlaces(userPlaces => [...userPlaces, {...up, note: currentNote[0] currentNote[1]}])
                    }
                  }
                  >✓ Save Notes</button>
                </div>
              </details>
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
        pitch={40}
        antialias={true}
      >
        {userPlaces.map((up, index) => (
          <Marker
            key={index}
            longitude={up.geometry?.coordinates[0]} 
            latitude={up.geometry?.coordinates[1]}
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
            <div className="rounded-lg bg-white absolute -top-3 -left-2 p-2 w-72 ring-4 ring-indigo-400 shadow-2xl space-y-3">
              <h2 className="text-2xl">📍 {searchResult.text}</h2>
              <div className="h-1 w-full bg-indigo-400 rounded-full" />
              <div className="flex items-center text-lg space-x-2">
                <span>Rate your interest in {searchResult.text}:</span> 
                <span className="flex justify-center items-center bg-indigo-200 h-7 w-7 rounded-lg text-indigo-500">{interestLevel}</span>
              </div>
              
              <div className="w-full flex justify-between space-x-1">
                <span className="font-mono">0</span>
                <input 
                  type="range" 
                  min={0} max={10} value={interestLevel} 
                  onChange={(e) => setInterestLevel(+e.currentTarget.value)} 
                  className="w-full outline-none"
                />
                <span className="font-mono">10</span>
              </div>
              <button 
                className="bg-indigo-500 p-2 text-xl text-center w-full rounded hover:bg-indigo-400 outline-none"
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
