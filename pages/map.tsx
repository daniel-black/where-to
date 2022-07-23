import 'mapbox-gl/dist/mapbox-gl.css';
import { Popup } from "react-map-gl";
import { useEffect, useState } from "react";
import { initialViewState, MapStyle } from "../constants";
import SelectMapStyle from "../components/selectMapStyle";
import MyPlacesMenu from "../components/myPlacesMenu";
import ShowSideMenuToggle from '../components/showSideMenuToggle';
import dynamic from 'next/dynamic';
import FullScreenMap from '../components/fullScreenMap';

const MapPageWrapper = dynamic(
  () => import('../components/mapPageWrapper'), 
  { ssr: false }
);

// Check out FlowMapBlue
const MapPage = () => {
  const [showSideMenu, setShowSideMenu] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [mapStyle, setMapStyle] = useState(MapStyle.Dark);
  const [viewState, setViewState] = useState(initialViewState);
  const [isMobile, setIsMobile] = useState(false);

  const handleWindowSizeChange = (width: number) => {
    setIsMobile(width < 640);
  } 

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setViewState({
        ...viewState,
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
        zoom: 3.5
      })
    })
    console.log(viewState)
  }, []);

  return (
    <MapPageWrapper handleChange={handleWindowSizeChange}>
      {/* Side menu hides by default when on mobile */}
      <div className={`side-menu ${isMobile && !showSideMenu ? '-left-40 opacity-0 ' : ''}`}>
        <h1 className="text-3xl font-bold text-center">Where2</h1>
        <MyPlacesMenu handleClick={(showPopup: boolean) => setShowPopup(showPopup)} />
        <SelectMapStyle mapStyle={mapStyle} handleChange={(style: MapStyle) => setMapStyle(style)} />
      </div>
      <ShowSideMenuToggle showToggle={isMobile} showSideMenu={showSideMenu} handleToggle={setShowSideMenu} />
      <FullScreenMap viewState={viewState} mapStyle={mapStyle} handleOnMove={setViewState}>
        {showPopup && (
          <Popup maxWidth="1000px" className="opacity-80 rounded-sm" longitude={-100} latitude={40} anchor='center' onClose={() => setShowPopup(false)}>
            <div className="space-y-2 p-6 text-4xl">
              <p>Enter a place</p>
              <input className="block bg-slate-300 rounded p-1 w-full" type="text" />
              <button className="w-full bg-indigo-400 rounded p-1">Go</button>
            </div>
          </Popup>
        )}
      </FullScreenMap>
      
    </MapPageWrapper>
  );
}

export default MapPage;