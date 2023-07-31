import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import React from "react";
import { IResultData } from "../network/timeseries";
import { resolveElementColor } from "../utils/map";

interface IProps {
  data: IResultData[]
  selectedParameter: string
}

const styles = {
  element: {
    fontWeight: "bold",
    opacity: 0.85,
    border: "1px solid black",
    color: "black",
    paddingLeft: "5px",
    paddingRight: "5px",
    fontSize: "15px",
    position: "relative",
    left: "1px",
    width: "20px",
  },
};

const Map: React.FC<IProps> = ({ data, selectedParameter }) => {

  return (
    <MapContainer
      center={[63.7, 26.0]}
      zoom={6}
      scrollWheelZoom={true}
      id="map"
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {data && data.map((station: IResultData) => {
        const paramValue = station[selectedParameter as keyof IResultData];
        if (station.lat && station.lon && paramValue) {
          const element: HTMLElement = document.createElement("span");
          element.innerText +=
            typeof paramValue === "string"
              ? paramValue
              : paramValue?.toFixed(1);
          Object.assign(element.style, {
            ...styles.element,
            backgroundColor: resolveElementColor('t2m', paramValue as number),
          });

          const text = L.divIcon({
            iconAnchor: [0, 0],
            html: element,
          });
          return (
            <Marker
              key={station?.fmisid}
              position={[station.lat, station.lon]}
              icon={text}
            />
          );
        }
      })}
    </MapContainer>
  );
};

export default Map;
