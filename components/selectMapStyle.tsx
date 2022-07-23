import { MapStyle } from "../constants";
import MapStyleCheckbox from "./mapStyleCheckbox";

export type SelectMapStyleProps = {
  mapStyle: MapStyle,
  handleChange: (style: MapStyle) => void
}

const SelectMapStyle = (props: SelectMapStyleProps) => {


  return (
    <details>
      <summary>Map Theme</summary>
      
      <MapStyleCheckbox {...props} styleKey='Outdoors' />
      <MapStyleCheckbox {...props} styleKey='Dark' />
      <MapStyleCheckbox {...props} styleKey='Light' />
   
    </details>
  )
}

export default SelectMapStyle;