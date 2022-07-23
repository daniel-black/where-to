import React from 'react'

type MapPageWrapperProps = { children: React.ReactNode };

const MapPageWrapper = (props: MapPageWrapperProps) => {
  return (
    <div className='relative'>
      {props.children}
    </div>
  )
}

export default MapPageWrapper;