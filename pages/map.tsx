import 'mapbox-gl/dist/mapbox-gl.css';
import { Marker, Popup } from "react-map-gl";
import { useEffect, useState } from "react";
import { initialViewState, MapStyle } from "../constants";
import SelectMapStyle from "../components/selectMapStyle";
import MyPlacesMenu from "../components/myPlacesMenu";
import MapPageWrapper from '../components/mapPageWrapper';
import FullScreenMap from '../components/FullScreenMap';

// Check out FlowMapBlue
const MapPage = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [mapStyle, setMapStyle] = useState(MapStyle.Dark);
  const [viewState, setViewState] = useState(initialViewState);

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
    <MapPageWrapper>
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
        {/* <Marker {...viewState}>
          <p className='bg-white p-1 rounded'>Home</p>
        </Marker> */}
      </FullScreenMap>
    </MapPageWrapper>
  );
}

export default MapPage;