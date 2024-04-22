import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken =
  "pk.eyJ1Ijoic2lhbTAwOSIsImEiOiJjbGZrbmdsOG4wY3EwM3JwZWZnbWo2dHV5In0.UtyeXSvNhAaPP3DX5dPiUg"; // Replace with your Mapbox access token

const Heatmap = ({ data }) => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/light-v10",
      center: [0, 0],
      zoom: 1,
    });

    mapRef.current.on("load", () => {
      const coordinates = data.map(({ lat, lon }) => [lon, lat]);
      const bounds = coordinates.reduce(
        (bounds, coord) => bounds.extend(coord),
        new mapboxgl.LngLatBounds(coordinates[0], coordinates[0])
      );

      mapRef.current.fitBounds(bounds, {
        padding: 50,
        maxZoom: 15,
      });

      mapRef.current.addSource("heatmap-data", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: data.map(({ lat, lon }) => ({
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [lon, lat],
            },
          })),
        },
      });

      mapRef.current.addLayer({
        id: "heatmap-layer",
        type: "heatmap",
        source: "heatmap-data",
        paint: {
          "heatmap-radius": 20,
          "heatmap-opacity": 0.8,
          "heatmap-color": [
            "interpolate",
            ["linear"],
            ["heatmap-density"],
            0,
            "rgba(33,102,172,0)",
            0.2,
            "rgb(103,169,207)",
            0.4,
            "rgb(209,229,240)",
            0.6,
            "rgb(253,219,199)",
            0.8,
            "rgb(239,138,98)",
            1,
            "rgb(178,24,43)",
          ],
        },
      });
    });

    return () => mapRef.current.remove();
  }, [data]);

  return <div className="map-container" ref={mapContainerRef} />;
};

export default Heatmap;
