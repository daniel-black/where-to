import { Map, Marker } from "react-map-gl";
import 'mapbox-gl/dist/mapbox-gl.css';
import { useState } from "react";

const MapPage = () => {
  const [viewState, setViewState] = useState({
      longitude: -98.6,
      latitude: 39.8,
      zoom: 4
  });

  return (
    <Map 
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
      {...viewState}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      style={{width: '100vw', height: '100vh', overflow: 'hidden'}}
    >
      <Marker longitude={-122.4} latitude={37.8} color='green' />

    </Map>
    
  );
}

export default MapPage;