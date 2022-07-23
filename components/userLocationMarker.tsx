import React, { useEffect, useState } from 'react'
import { Marker } from 'react-map-gl'

const UserLocationMarker = () => {
  const [userLocation, setUserLocation] = useState({
    latitude: -1, 
    longitude: -1
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      const { latitude, longitude } = pos.coords;
      if (typeof latitude === 'number' && typeof longitude === 'number') 
        setUserLocation({ longitude, latitude });
    })
  }, []);

  return (
    <>
      {userLocation.latitude === -1 && userLocation.longitude === -1 ? 
        null : 
        (
          <Marker {...userLocation}>
            <span className='text-3xl bg-transparent drop-shadow-xl'>🏠</span>
          </Marker>
        )
      }
    </>
  );
}

export default UserLocationMarker;