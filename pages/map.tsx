import { Map, Marker, GeolocateControl } from "react-map-gl";
import 'mapbox-gl/dist/mapbox-gl.css';
import { useState } from "react";
import { MapStyle } from "../constants";
import SelectMapStyle from "../components/selectMapStyle";

const MapPage = () => {
  const [mapStyle, setMapStyle] = useState(MapStyle.Dark);
  const [viewState, setViewState] = useState({
      longitude: -98.6,
      latitude: 39.8,
      zoom: 4
  });


  return (
    <div className="relative">
      <div className="z-10 absolute left-0 top-0 p-3 bg-slate-700 opacity-90 h-full w-64">
        <h1 className="text-3xl font-bold">Where2</h1>
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
      >
        
        <Marker longitude={-122.4} latitude={37.8} color='green' />
        <GeolocateControl position='bottom-right' />
      </Map>
    </div>
  );
}

export default MapPage;