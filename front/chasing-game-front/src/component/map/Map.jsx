import React, { useEffect, useRef } from "react";
import { Map, View } from "ol";
import FullScreen from "ol/control/FullScreen";
import olms from "ol-mapbox-style";
import { transform } from "ol/proj";
import "./Map.css";

import {
  GeoapifyGeocoderAutocomplete,
  GeoapifyContext,
} from "@geoapify/react-geocoder-autocomplete";
import "@geoapify/geocoder-autocomplete/styles/minimal.css";

function onPlaceSelect(value) {
  console.log("place select", value);
}

function onSuggectionChange(value) {
  console.log("suggection", value);
}

const MyMap = ({
  mapIsReadyCallback /* To be triggered when a map object is created */,
}) => {
  const mapContainer = useRef(null);

  useEffect(() => {
    if (mapContainer.current) {
      const initialState = {
        lng: 4.8,
        lat: 45.7,
        zoom: 16,
      };

      // This API key is for use only in stackblitz.com
      // Get your Geoapify API key on https://www.geoapify.com/get-started-with-maps-api
      // The Geoapify service is free for small projects and the development phase.
      const myAPIKey = "e395b017382445dda7372e11415b78fc";
      const mapStyle =
        "https://maps.geoapify.com/v1/styles/positron/style.json";

      olms(mapContainer.current, `${mapStyle}?apiKey=${myAPIKey}`).then(
        (map) => {
          map
            .getView()
            .setCenter(
              transform(
                [initialState.lng, initialState.lat],
                "EPSG:4326",
                "EPSG:3857"
              )
            );
          map.getView().setZoom(initialState.zoom);
          // map.getView().setMinZoom(initialState.zoom);
          // map.getView().setMaxZoom(initialState.zoom);

          mapIsReadyCallback(map);
        },
        (mapContainer.current.lng = initialState.lng),
        (mapContainer.current.lat = initialState.lat)
      );
    }
  }, [mapContainer.current]);

  const onChangeCoord = (lat, lng) => {
    mapContainer.current.lat = lat;
    mapContainer.current.lng = lng;
  };

  return (
    <div className="w-full overflow-hidden">
      <GeoapifyContext apiKey="e395b017382445dda7372e11415b78fc">
        <GeoapifyGeocoderAutocomplete
          placeSelect={onPlaceSelect}
          suggestionsChange={onSuggectionChange}
        />
      </GeoapifyContext>
      <div className="map-container" ref={mapContainer}></div>
    </div>
  );
};

export default MyMap;
