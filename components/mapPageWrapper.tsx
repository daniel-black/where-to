import React, { useEffect } from 'react';
// import useWindowSize from '../hooks/useWindowSize';

interface Props { 
  handleChange?: (width: number) => void;
  children: React.ReactNode;
};

const MapPageWrapper = (props: Props): JSX.Element => {
  // const windowSize = useWindowSize();

  // useEffect(() => {
  //   props?.handleChange(windowSize.width);
  // }, [windowSize]);

  return (
    <div className="flex min-h-full">
      {props.children}
    </div>
  )
}

export default MapPageWrapper;