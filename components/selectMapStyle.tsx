import { MapStyle } from "../constants";
import MapStyleCheckbox from "./mapStyleCheckbox";

export interface SelectMapStyleProps  {
  mapStyle: MapStyle;
  handleChange: (style: MapStyle) => void;
}

export const SelectMapStyle = (props: SelectMapStyleProps): JSX.Element => (
  <details>
    <summary className="list-none p-2 hover:cursor-pointer rounded-b-xl duration-100 ease-in-out hover:bg-zinc-800">🗺️ Map Theme</summary>
    <div className="ml-7">
      <MapStyleCheckbox {...props} styleKey='Outdoors' emoji="🌳"/>
      <MapStyleCheckbox {...props} styleKey='Satellite' emoji="🌎" />
      <MapStyleCheckbox {...props} styleKey='Streets' emoji="🛣️" />
      <MapStyleCheckbox {...props} styleKey='Light' emoji="☀️" />
      <MapStyleCheckbox {...props} styleKey='Dark' emoji="🌙" />
      
      {/* <MapStyleCheckbox {...props} styleKey='Navigation Day' />
      <MapStyleCheckbox {...props} styleKey='Navigation Night' />
      <MapStyleCheckbox {...props} styleKey='Satellite Streets' /> */}
    </div>
  </details>
);

export default SelectMapStyle;