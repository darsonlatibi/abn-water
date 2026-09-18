import { useEffect, useState } from "react";

export default function GetLocation() {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (err) => {
        console.error(err);
      },
    );
  }, []);

  return (
    <div>
      {location && (
        <>
          <div>Latitude: {location.latitude}</div>
          <div>Longitude: {location.longitude}</div>
        </>
      )}
    </div>
  );
}
