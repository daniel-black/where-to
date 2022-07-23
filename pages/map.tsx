import 'mapbox-gl/dist/mapbox-gl.css';
import { Popup } from "react-map-gl";
import { useState } from "react";
import { MapStyle } from "../constants";
import SelectMapStyle from "../components/selectMapStyle";
import MyPlacesMenu from "../components/myPlacesMenu";
import FullScreenMap from "../components/FullScreenMap";

// Check out FlowMapBlue
const MapPage = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [mapStyle, setMapStyle] = useState(MapStyle.Dark);
  const [viewState, setViewState] = useState({
    longitude: -102,
    latitude: 38.3,
    zoom: 4,
    bearing: 0,
    pitch: 10,
    padding: { top: 0, bottom: 0, left: 0, right: 0 }
  });


  return (
    <div className="relative">
      <div className="side-menu">
        <h1 className="text-3xl font-bold text-center">Where2</h1>
        <MyPlacesMenu handleClick={(showPopup: boolean) => setShowPopup(showPopup)} />
        <SelectMapStyle mapStyle={mapStyle} handleChange={(style: MapStyle) => setMapStyle(style)} />
      </div>

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
    </div>
  );
}

export default MapPage;