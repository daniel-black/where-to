import { MapStyle, MapStyleKey } from "../constants";
import { SelectMapStyleProps } from "./selectMapStyle";

type MapStyleCheckboxProps = SelectMapStyleProps & { 
  styleKey: MapStyleKey,
  emoji: string,  
}

const MapStyleCheckbox = (props: MapStyleCheckboxProps): JSX.Element => (
  <div 
    className={`${props.mapStyle === MapStyle[props.styleKey] ? 'bg-zinc-800' : ''} 
              flex items-center justify-between my-0.5 p-1 rounded hover:bg-zinc-800 
              cursor-pointer pr-6 sm:pr-7`}
    >
    <label 
      className="flex space-x-2 w-full cursor-pointer"
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