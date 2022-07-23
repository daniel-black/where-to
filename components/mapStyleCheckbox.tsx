import { MapStyle } from "../constants";
import { SelectMapStyleProps } from "./selectMapStyle";

type MapStyleCheckboxProps = SelectMapStyleProps & { styleKey: 'Dark' | 'Light' | 'Outdoors' }

const MapStyleCheckbox = (props: MapStyleCheckboxProps) => {
  return (
    <div>
      <input 
        type="radio" 
        name='theme' 
        value={MapStyle[props.styleKey]} 
        id='Outdoors-theme' 
        checked={props.mapStyle === MapStyle[props.styleKey]} 
        onChange={(e) => props.handleChange(e.currentTarget.value)} 
      />
      <label htmlFor="outdoors-theme">{props.styleKey}</label>
    </div>
  )
}

export default MapStyleCheckbox;