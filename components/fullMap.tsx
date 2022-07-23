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
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
      {...props.viewState}
      mapStyle={props.mapStyle}
      pitch={10}
      dragPan={true}
      scrollZoom={true}
      onMove={e => props.handleOnMove(e.viewState)}
      style={{width: '100vw', height: '100vh', overflow: 'hidden'}}
      attributionControl={false}
    >
      {props.children}
      <GeolocateControl 
        position='bottom-right' 
        onGeolocate={(e) => console.log(`lat: ${e.coords.latitude}, lng: ${e.coords.longitude}`)} 
      />
    </Map>
  );
}

export default FullMap;