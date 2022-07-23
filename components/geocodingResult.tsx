import React from 'react'
import { Place } from '../constants';

type GeocodingResultProps = Place;

const GeocodingResult = (props: GeocodingResultProps) => {
  return (
    <div className='bg-slate-50 p-3 rounded-2xl shadow-md max-w-sm z-10'>
      <h3 className='text-sm font-bold'>{props.text}</h3>
      <input type="range" min={0} max={10} value={5} />
      <button>Save Location</button>
    </div>
  )
}

export default GeocodingResult;