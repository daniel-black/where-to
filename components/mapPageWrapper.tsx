import React, { useEffect } from 'react';
import useWindowSize from '../hooks/useWindowSize';

type MapPageWrapperProps = { 
  children: React.ReactNode,
  handleChange: (width: number) => void
};

const MapPageWrapper = (props: MapPageWrapperProps) => {
  const windowSize = useWindowSize();

  useEffect(() => {
    props.handleChange(windowSize.width);
  }, [windowSize]);

  return (
    <div className='relative'>
      {props.children}
    </div>
  )
}

export default MapPageWrapper;