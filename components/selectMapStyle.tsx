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
      <MapStyleCheckbox {...props} styleKey='Dark' />
      <MapStyleCheckbox {...props} styleKey='Light' />
      <MapStyleCheckbox {...props} styleKey='Streets' />
      <MapStyleCheckbox {...props} styleKey='Outdoors' />
      <MapStyleCheckbox {...props} styleKey='Satellite' />
      <MapStyleCheckbox {...props} styleKey='Navigation Day' />
      <MapStyleCheckbox {...props} styleKey='Navigation Night' />
      <MapStyleCheckbox {...props} styleKey='Satellite Streets' />
    </details>
  )
}

export default SelectMapStyle;