import { GeolocateControl, Map } from "react-map-gl";
import { MapStyle, Viewport } from "../constants";

type FullMapProps = {
  mapStyle: MapStyle,
  viewState: Viewport,
  children?: React.ReactNode,
  handleOnMove: (newViewport: Viewport) => void,
}

const FullMap = (props: FullMapProps) => {
  return (
    <Map 
      {...props.viewState}
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
      style={{width: '100vw', height: '100vh', overflow: 'hidden'}}
      onMove={e => props.handleOnMove(e.viewState)}
      attributionControl={false}
      mapStyle={props.mapStyle}
      scrollZoom={true}
      dragPan={true}
      pitch={10}
    >
      {props.children}
      
      <GeolocateControl 
        onGeolocate={(e) => console.log(`lat: ${e.coords.latitude}, lng: ${e.coords.longitude}`)}
        position='bottom-right' 
      />
    </Map>
  );
}

export default FullMap;