import { GoogleMap, Marker } from "@react-google-maps/api";
import { useSelector } from "react-redux";

export default function MapView() {
  const device = useSelector((state) => state.devices.devices.RO_BARATA_1);

  return (
    <GoogleMap
      zoom={16}
      center={{
        lat: device.latitude,
        lng: device.longitude,
      }}
      mapContainerStyle={{
        width: "100%",
        height: "100vh",
      }}
    >
      <Marker
        position={{
          lat: device.latitude,
          lng: device.longitude,
        }}
      />
    </GoogleMap>
  );
}
