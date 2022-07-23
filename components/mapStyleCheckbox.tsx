import { MapStyle, MapStyleKey } from "../constants";
import { SelectMapStyleProps } from "./selectMapStyle";

type MapStyleCheckboxProps = SelectMapStyleProps & { styleKey: MapStyleKey }

const MapStyleCheckbox = (props: MapStyleCheckboxProps) => (
  <div>
    <input 
      type="radio" 
      name='theme' 
      value={MapStyle[props.styleKey]} 
      id='Outdoors-theme' 
      checked={props.mapStyle === MapStyle[props.styleKey]} 
      onChange={() => props.handleChange(MapStyle[props.styleKey])} 
    />
    <label htmlFor="outdoors-theme">{props.styleKey}</label>
  </div>
);


export default MapStyleCheckbox;