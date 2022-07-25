import React, { useEffect } from 'react'
import { LngLat, Marker } from 'react-map-gl'

interface Props {
  homeLocation: LngLat | null;
  setHomeLocation: (location: LngLat) => void;
};

const UserLocationMarker = ({homeLocation, setHomeLocation}: Props) => {

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      const { latitude, longitude } = pos.coords;
      if (typeof latitude === 'number' && typeof longitude === 'number') 
        setHomeLocation({ lng: longitude, lat: latitude } as LngLat);
    })
  }, []);

  return (
    <>
      {homeLocation && (
        <Marker latitude={homeLocation.lat} longitude={homeLocation.lng}>
          <span className='text-3xl bg-transparent drop-shadow-xl'>🏠</span>
        </Marker>
      )}
    </>
  );
}

export default UserLocationMarker;