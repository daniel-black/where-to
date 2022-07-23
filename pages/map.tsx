import { Map, Marker, GeolocateControl, Popup } from "react-map-gl";
import 'mapbox-gl/dist/mapbox-gl.css';
import { useState } from "react";
import { MapStyle } from "../constants";
import SelectMapStyle from "../components/selectMapStyle";
import MyPlacesMenu from "../components/myPlacesMenu";

const MapPage = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [mapStyle, setMapStyle] = useState(MapStyle.Dark);
  const [viewState, setViewState] = useState({
      longitude: -102,
      latitude: 38.3,
      zoom: 4
  });


  return (
    <div className="relative">
      <div className="side-menu">
        <h1 className="text-3xl font-bold text-center">Where2</h1>
        <MyPlacesMenu handleClick={(showPopup: boolean) => setShowPopup(showPopup)} />
        <SelectMapStyle mapStyle={mapStyle} handleChange={(style: MapStyle) => setMapStyle(style)} />
      </div>
      <Map 
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
        {...viewState}
        mapStyle={mapStyle}
        pitch={10}
        dragPan={true}
        scrollZoom={true}
        onMove={e => setViewState(e.viewState)}
        style={{width: '100vw', height: '100vh', overflow: 'hidden'}}
        attributionControl={false}
      >
        {showPopup && (
          <Popup maxWidth="1000px" className="opacity-80 rounded-sm" longitude={-100} latitude={40} anchor='center' onClose={() => setShowPopup(false)}>
            <div className="space-y-2 p-6 text-4xl">
              <p>Enter a place</p>
              <input className="block bg-slate-300 rounded p-1 w-full" type="text" />
              <button className="w-full bg-indigo-400 rounded p-1">Go</button>
            </div>
          </Popup>
        )}
        <Marker longitude={-122.4} latitude={37.8} color='green' />
        <GeolocateControl position='bottom-right' />
      </Map>
    </div>
  );
}

export default MapPage;