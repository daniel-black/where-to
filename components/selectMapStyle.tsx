import { ChangeEventHandler } from "react";
import { MapStyle, MapStyleKey } from "../constants";
import MapStyleCheckbox from "./mapStyleCheckbox";

export type SelectMapStyleProps = {
  mapStyle: MapStyle,
  handleChange: (style: MapStyle) => void
}

const SelectMapStyle = (props: SelectMapStyleProps) => {


  return (
    <div>
      <MapStyleCheckbox {...props} styleKey='Outdoors' />

      <MapStyleCheckbox {...props} styleKey='Dark' />

      <MapStyleCheckbox {...props} styleKey='Light' />
   
    </div>
  )
}

export default SelectMapStyle;