import { useEffect } from "react";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import { useState } from "react";

const geocoder = new MapboxGeocoder({
  accessToken:
    "pk.eyJ1Ijoic2lhbTAwOSIsImEiOiJjbGZrbmdsOG4wY3EwM3JwZWZnbWo2dHV5In0.UtyeXSvNhAaPP3DX5dPiUg",
  proximity: {
    latitude: 23.777176,
    longitude: 90.399452,
  },
});

const AddressPicker = (props) => {
  const [location, setLocation] = useState("");
  const [coordinates, setCoordinates] = useState({ latitude: null, longitude: null });
  const [precise, setIsPrecise] = useState(true);
  useEffect(() => {
    geocoder.addTo("#geocoder-location");
    geocoder.on("result", function (result) {
      console.log(result);
      if (result.result.context.length < 5) {
        setIsPrecise(false);
        return;
      }
      setIsPrecise(true);
      setCoordinates({
        latitude: result.result.geometry.coordinates[0],
        longitude: result.result.geometry.coordinates[1],
      });
      setLocation(result.result.place_name);
      geocoder.setInput("");
    });

    return () => {
      const element = document.getElementById("geocoder-location");

      if (!element) return;

      while (element.firstChild) {
        element.removeChild(element.firstChild);
      }
    };
  }, []);

  const onChangeHandler = (e) => {
    setLocation(e.target.value);
    setCoordinates({
      latitude: null,
      longitude: null,
    });
  };

  useEffect(() => {
    props.getValues(location, coordinates);
  }, [location, coordinates]);

  return (
    <div className="flex flex-col sm:flex-row sm:items-start sm:space-x-2 space-y-4 mb-16 sm:mb-0 w-[100%]">
      <input
        type="text"
        id="address"
        value={location}
        placeholder="Enter a location or choose a location from search"
        className="text-xl h-[4rem] w-[100%] mr-8 mt-4 px-8 rounded-md border-[1px] border-slate-900/20"
        onChange={onChangeHandler}
      />
      <div>
        <div id="geocoder-location" className="h-[5rem]" />
        {!precise && <p className="text-sm text-red">Not a precise location</p>}
      </div>
    </div>
  );
};

export default AddressPicker;
