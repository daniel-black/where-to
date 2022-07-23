import { MapStyle, MapStyleKey } from "../constants";
import { SelectMapStyleProps } from "./selectMapStyle";

type MapStyleCheckboxProps = SelectMapStyleProps & { styleKey: MapStyleKey }

const MapStyleCheckbox = (props: MapStyleCheckboxProps) => (
  <div>
    <label 
      className="flex space-x-2"
      htmlFor={`${props.styleKey}-theme`}>
      <input 
        type="radio" 
        name='theme' 
        value={MapStyle[props.styleKey]} 
        id={`${props.styleKey}-theme`} 
        checked={props.mapStyle === MapStyle[props.styleKey]} 
        onChange={() => props.handleChange(MapStyle[props.styleKey])} 
      />
      <span>{props.styleKey}</span>
    </label>
  </div>
);


export default MapStyleCheckbox;