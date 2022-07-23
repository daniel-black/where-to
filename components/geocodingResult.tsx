import React from 'react'
import { Place } from '../constants';

type GeocodingResultProps = Place;

const GeocodingResult = (props: GeocodingResultProps) => {
  return (
    <div className='bg-slate-50 p-3 rounded-2xl shadow-md max-w-sm'>
      <h3 className='text-sm font-bold'>{props.text}</h3>
    </div>
  )
}

export default GeocodingResult;