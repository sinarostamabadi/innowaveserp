import React, { useState } from "react";
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, useMapEvent } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;

export function MapSelector({
  label,
  customFeedbackLabel,
  withFeedbackLabel = true,
  onMoveEnded,
  positionObj,
  ...props
}) {
  const [position, setPosition] = useState(positionObj.length? positionObj: [35.696733, 51.2097357]);
  
  function MyComponent() {
    const map = useMapEvent('moveend', (event) => {
      let latlng = event.target.getCenter();
      setPosition([latlng.lat, latlng.lng]);
      onMoveEnded(event.target.getCenter());
    })
    return null
  }

  return (
      <MapContainer
        center={position}
        zoom={13}
        onMoveEnd={(event) => onMoveEnded(event.target.getCenter())}
        style={{width: "100%", height: "400px"}}
        >
          <MyComponent/>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
        <Marker position={position}>

        </Marker>
      </MapContainer>

  );
}
