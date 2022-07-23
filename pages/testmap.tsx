import 'mapbox-gl/dist/mapbox-gl.css';
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css'
import { MapRef, Popup, Map, GeolocateControl } from "react-map-gl";
import { Ref, useCallback, useRef, useState } from "react";
import { initialViewport, Viewport, MapStyle } from "../constants";
import SelectMapStyle from "../components/selectMapStyle";
import MyPlacesMenu from "../components/myPlacesMenu";
import ShowSideMenuToggle from '../components/showSideMenuToggle';
import dynamic from 'next/dynamic';
import UserLocationMarker from '../components/userLocationMarker';
import GeocoderControl from '../components/geocoderControl';

// import { GeoJsonLayer } from 'deck.gl';

const MapPageWrapper = dynamic(
  () => import('../components/mapPageWrapper'), 
  { ssr: false }
);

// Check out FlowMapBlue
const MapPage = () => {
  const [showSideMenu, setShowSideMenu] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [mapStyle, setMapStyle] = useState(MapStyle.Dark);
  const [viewport, setViewport] = useState(initialViewport);
  const [isMobile, setIsMobile] = useState(false);

  const handleWindowSizeChange = (width: number) => setIsMobile(width < 640); 
  
  const mapRef = useRef() as Ref<MapRef> | undefined;
  const handleViewportChange = useCallback((newViewport: Viewport) => setViewport(newViewport), []);

  

  return (
    <MapPageWrapper handleChange={handleWindowSizeChange}>
      {/* Side menu hides by default when on mobile */}
      <div className={`side-menu ${isMobile && !showSideMenu ? '-left-40 opacity-0 ' : ''}`}>
        <h1 className="text-3xl font-bold text-center">Where2</h1>
        <MyPlacesMenu handleClick={(showPopup: boolean) => setShowPopup(showPopup)} />
        <SelectMapStyle mapStyle={mapStyle} handleChange={(style: MapStyle) => setMapStyle(style)} />
      </div>
      <ShowSideMenuToggle showToggle={isMobile} showSideMenu={showSideMenu} handleToggle={setShowSideMenu} />

      <Map 
        {...viewport}
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
        style={{width: '100vw', height: '100vh', overflow: 'hidden'}}
        onMove={(e) => setViewport({...e.viewState})}
        attributionControl={false}
        mapStyle={mapStyle}
        scrollZoom={true}
        dragPan={true}
        ref={mapRef}
        pitch={10}
      >
        <GeocoderControl 
          mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
          position='top-right'
        />
        <GeolocateControl 
          position='bottom-right' 
          onGeolocate={(e) => console.log(`lat: ${e.coords.latitude}, lng: ${e.coords.longitude}`)} 
        />
        <UserLocationMarker />
      </Map>
      
      {/* <FullMap viewState={viewport} mapStyle={mapStyle} handleOnMove={handleViewportChange} ref={mapRef}>
        {showPopup && (
          <Popup maxWidth="1000px" className="opacity-80 rounded-sm" longitude={-100} latitude={40} anchor='center' onClose={() => setShowPopup(false)}>
            <div className="space-y-2 p-6 text-4xl">
              <p>Enter a place</p>
              <input className="block bg-slate-300 rounded p-1 w-full" type="text" />
              <button className="w-full bg-indigo-400 rounded p-1">Go</button>
            </div>
          </Popup>
        )}
        
        <UserLocationMarker />
      </FullMap> */}
    
    </MapPageWrapper>
  );
}

export default MapPage;