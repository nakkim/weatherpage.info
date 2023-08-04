/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import React from "react";
import { IResultData } from "../network/timeseries";
import { resolveElement, resolveNNValue } from "../utils/map";
import "leaflet-rotatedmarker";
import arrow from "../assets/arrow.svg";

interface IProps {
  data: IResultData[];
  selectedParameter: string;
}

const Map: React.FC<IProps> = ({ data, selectedParameter }) => {
  const windParameters = ["ws_10min", "wg_10min"];
  const allowMissingValueParameters = ["ri_10min"];
  const displayArrowIcon = windParameters.includes(selectedParameter);

  return (
    <MapContainer
      center={[63.7, 26.0]}
      zoom={6}
      scrollWheelZoom={true}
      id="map"
      preferCanvas={true}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {data &&
        data.map((station: IResultData) => {
          const paramValue = station[selectedParameter as keyof IResultData];
          if (station.lat && station.lon) {
            if (
              allowMissingValueParameters.includes(selectedParameter) &&
              !paramValue
            ) {
              const element = resolveElement(selectedParameter, "-");
              return (
                <Marker
                  position={[station.lat, station.lon]}
                  icon={L.divIcon({
                    iconAnchor: [0, 0],
                    html: element,
                    iconSize: [0, 0],
                    className: "leaflet-div-icon-none",
                  })}
                />
              );
            } else if (paramValue) {
              // symbol parameters
              if (selectedParameter === "n_man")
                return (
                  <Marker
                    position={[station.lat, station.lon]}
                    icon={L.icon({
                      iconUrl: resolveNNValue(paramValue), // TODO: Fix this
                      iconAnchor: [22, 12],
                      popupAnchor: [0, 0],
                      iconSize: [22, 22],
                    })}
                  />
                );
              // other nremal parameters
              const element = resolveElement(
                selectedParameter,
                paramValue as number
              );
              return (
                <React.Fragment key={`${station?.fmisid}`}>
                  <Marker
                    position={[station.lat, station.lon]}
                    icon={L.divIcon({
                      iconAnchor: displayArrowIcon ? [10, 0] : [0, 0],
                      html: element,
                      iconSize: displayArrowIcon ? [20, 18] : [0, 0],
                      className: displayArrowIcon
                        ? "leaflet-div-icon-wind"
                        : "leaflet-div-icon-none",
                    })}
                  />
                  {displayArrowIcon && (
                    <>
                      <Marker
                        position={[station.lat, station.lon]}
                        icon={L.divIcon({
                          iconAnchor: [-10, 1],
                          html: element,
                          iconSize: [0, 0],
                          className: "leaflet-div-icon-none",
                        })}
                      />
                      <Marker
                        position={[station.lat, station.lon]}
                        rotationAngle={station["wd_10min"]}
                        rotationOrigin="center"
                        icon={L.icon({
                          iconUrl: arrow,
                          iconAnchor: [22, 12],
                          popupAnchor: [0, 0],
                          iconSize: [45, 45],
                        })}
                      />
                    </>
                  )}
                </React.Fragment>
              );
            }
          }
        })}
    </MapContainer>
  );
};

export default Map;
