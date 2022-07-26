import React, { useEffect } from 'react'

import useWindowSize from '../hooks/useWindowSize';

type Props = { setWidth: (width: number) => void };

const WidthHack = ({setWidth}: Props) => {
  const size = useWindowSize();

  useEffect(() => {
    setWidth(size.width);
  }, [size]);

  return (
    <span className='hidden'></span>
  )
}

export default WidthHack