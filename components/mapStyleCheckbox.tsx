import { MapStyle, MapStyleKey } from "../constants";
import { SelectMapStyleProps } from "./selectMapStyle";

type MapStyleCheckboxProps = SelectMapStyleProps & { 
  styleKey: MapStyleKey,
  emoji: string,  
}

const MapStyleCheckbox = (props: MapStyleCheckboxProps): JSX.Element => (
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
        className='opacity-0 h-0 w-0'
      />
      <span>{props.emoji} {props.styleKey}</span>
    </label>
  </div>
);

export default MapStyleCheckbox;