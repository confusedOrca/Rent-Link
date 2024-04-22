import React from "react";
import Map from "react-map-gl/dist/esm/components/map";
import "mapbox-gl/dist/mapbox-gl.css";
import { Marker } from "react-map-gl";
import { useState } from "react";
import { NavigationControl } from "react-map-gl";
import { GeolocateControl } from "react-map-gl";

const LocationPicker = () => {
  const [co, setCo] = useState({ latitude: 23.777176, longitude: 90.399452 });
  return (
    <div className="w-[100%] h-[40rem] text-xl">
      <Map
        mapboxAccessToken="pk.eyJ1Ijoic2lhbTAwOSIsImEiOiJjbGZrbmdsOG4wY3EwM3JwZWZnbWo2dHV5In0.UtyeXSvNhAaPP3DX5dPiUg"
        initialViewState={{
          latitude: co.latitude,
          longitude: co.longitude,
          zoom: 10,
        }}
        mapStyle="mapbox://styles/mapbox/streets-v11"
      >
        <Marker latitude={co.latitude} longitude={co.longitude} draggable onDragEnd={(e) => {}} />
        <NavigationControl position="bottom-right" />
        <GeolocateControl position="top-left" onGeolocate={(e) => {}} />
      </Map>
    </div>
  );
};

export default LocationPicker;
