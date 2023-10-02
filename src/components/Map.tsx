/* eslint-disable @typescript-eslint/restrict-template-expressions */
// eslint-disable-next-line simple-import-sort/imports
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet-rotatedmarker";

import { ColorRing } from "react-loader-spinner";

import React from "react";
import * as ReactDOMServer from "react-dom/server";
import { CircleMarker, MapContainer, Marker, TileLayer } from "react-leaflet";

import arrow from "../assets/arrow.svg";
import { IResultData } from "../network/timeseries";
import { resolveElement, resolveWawaElement } from "../utils/helpers";
import CloudCover from "./CloudCover";

interface IProps {
  data: IResultData[];
  selectedParameter: string;
  isLoading: boolean;
}

const Map: React.FC<IProps> = ({ data, selectedParameter, isLoading }) => {
  const windParameters = ["ws_10min", "wg_10min"];
  const allowMissingValueParameters = ["ri_10min", "r_1d", "r_1h"];
  const displayArrowIcon = windParameters.includes(selectedParameter);

  const arrowDirection =
    // eslint-disable-next-line no-constant-condition
    selectedParameter === "ws_10min" || "wg_10min"
      ? "wd_10min"
      : selectedParameter === "ws_1d"
      ? "ws_max_dir"
      : "wg_max_dir";

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
        {data &&
          data.map((station: IResultData) => {
            const paramValue = station[selectedParameter as keyof IResultData];
            const fillValue = resolveWawaElement(paramValue as number);
            if (fillValue.color === "#7e7e7e")
              fillValue.color = "rgba(126, 126, 126, 0.1)";

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
                      className: "custom-icon",
                    })}
                  />
                );
              } else if (paramValue !== null) {
                // symbol parameters
                if (selectedParameter === "n_man")
                  return (
                    <React.Fragment key={`${station?.fmisid}`}>
                      <Marker
                        position={[station.lat, station.lon]}
                        icon={L.divIcon({
                          iconAnchor: [10, 10],
                          iconSize: [0, 0],
                          html: ReactDOMServer.renderToString(
                            <CloudCover value={paramValue} />
                          ),
                          className: "leaflet-div-icon-none",
                        })}
                      />
                    </React.Fragment>
                  );
                // other parameters
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
                    {selectedParameter === "wawa" && (
                      <CircleMarker
                        center={[station.lat, station.lon]}
                        color="black"
                        weight={2}
                        radius={6}
                        fillColor={fillValue.color}
                        fillOpacity={1}
                      />
                    )}
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
                          rotationAngle={station[arrowDirection]}
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
    </>
  );
};

export default Map;
