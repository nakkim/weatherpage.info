import "leaflet/dist/leaflet.css";

import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { ColorRing } from "react-loader-spinner";

import { IResultData } from "../network/timeseries";
import Marker from "./Marker";

interface IProps {
  data: IResultData[];
  selectedParameter: string;
  isLoading: boolean;
  obsTime?: Date;
}

const Map: React.FC<IProps> = ({
  data,
  selectedParameter,
  isLoading,
  obsTime,
}) => {
  return (
    <>
      {isLoading && (
        <ColorRing
          visible={true}
          height="200"
          width="200"
          ariaLabel="blocks-loading"
          wrapperStyle={{
            position: "fixed",
            top: "calc(50% - 100px)",
            left: "calc(50% - 100px)",
            zIndex: "30000",
            pointerEvents: "none",
            userSelect: "none",
          }}
          colors={[
            "rgba(25,118,210,1)",
            "rgba(25,118,210,0.75)",
            "rgba(25,118,210,0.5)",
            "rgba(25,118,210,0.25)",
            "rgba(25,118,210,0.05)",
          ]}
        />
      )}
      <MapContainer
        center={[63.7, 26.0]}
        zoom={6}
        scrollWheelZoom={true}
        id="map"
        preferCanvas={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />
        {data && (
          <Marker data={data} selectedParameter={selectedParameter} obsTime={obsTime} />
        )}
      </MapContainer>
    </>
  );
};

export default Map;
