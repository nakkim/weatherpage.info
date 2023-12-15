import "leaflet/dist/leaflet.css";
import "leaflet-rotatedmarker";

import L from "leaflet";
import React from "react";
import ReactDOMServer from "react-dom/server";
import { CircleMarker, Marker as LeafletMarker, Popup } from "react-leaflet";

import arrow from "../../assets/arrow.svg";
import { IResultData } from "../../network/timeseries";
import { resolveElement, resolveWawaElement, windowWidth } from "../../utils/helpers";
import CloudCover from "./CloudCover";
import PopupChart from "./PopupChart";

interface IProps {
  data: IResultData[];
  selectedParameter: string;
  obsTime: Date | undefined;
}

const Marker: React.FC<IProps> = ({ data, selectedParameter, obsTime }) => {
  const windParameters = ["ws_10min", "wg_10min"];
  const allowMissingValueParameters = ["ri_10min", "r_1d", "r_1h"];
  const displayArrowIcon = windParameters.includes(selectedParameter);

  const popupWidth = windowWidth().width > 1000 ? 1000 : windowWidth().width - 150;
  const minWidth = popupWidth;
  const maxWidth = popupWidth;

  const arrowDirection =
    // eslint-disable-next-line no-constant-condition
    selectedParameter === "ws_10min" || "wg_10min"
      ? "wd_10min"
      : selectedParameter === "ws_1d"
      ? "ws_max_dir"
      : "wg_max_dir";

  return data.map((station: IResultData) => {
    let paramValue = station[selectedParameter as keyof IResultData];
    if (selectedParameter === "t2mtdew")
      if (station.t2m && station.dewpoint)
        paramValue = station.t2m - station.dewpoint;

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
          <LeafletMarker
            key={`${station.fmisid}-${station.lat}-${station.lon}`}
            position={[station.lat, station.lon]}
            icon={L.divIcon({
              iconAnchor: [0, 0],
              html: element,
              iconSize: [0, 0],
              className: "custom-icon",
            })}
          />
        );
      } else if (paramValue !== null && paramValue !== undefined) {
        // symbol parameters
        if (selectedParameter === "n_man")
          return (
            <React.Fragment key={station?.fmisid}>
              <LeafletMarker
                position={[station.lat, station.lon]}
                icon={L.divIcon({
                  iconAnchor: [10, 10],
                  iconSize: [20, 20],
                  html: ReactDOMServer.renderToString(
                    <CloudCover value={paramValue} />
                  ),
                  className: "leaflet-div-icon-none",
                })}
              />
            </React.Fragment>
          );
        // other parameters
        const element = resolveElement(selectedParameter, paramValue as number);
        return (
          <React.Fragment key={station?.fmisid}>
            <LeafletMarker
              position={[station.lat, station.lon]}
              icon={L.divIcon({
                iconAnchor: displayArrowIcon ? [10, 0] : [0, 0],
                html: element,
                iconSize: displayArrowIcon ? [20, 18] : [0, 0],
                className: displayArrowIcon
                  ? "leaflet-div-icon-wind"
                  : "leaflet-div-icon-none",
              })}
            >
              <Popup
                minWidth={minWidth}
                maxWidth={maxWidth}
                key={station.fmisid}
              >
                <PopupChart
                  stationName={station.name}
                  fmisid={station.fmisid}
                  obsTime={obsTime}
                />
              </Popup>
            </LeafletMarker>
            {selectedParameter === "wawa" && (
              <CircleMarker
                center={[station.lat, station.lon]}
                color="black"
                weight={2}
                radius={6}
                fillColor={fillValue.color}
                fillOpacity={1}
              >
                <Popup
                  minWidth={minWidth}
                  maxWidth={maxWidth}
                  key={station.fmisid}
                >
                  <PopupChart
                    stationName={station.name}
                    fmisid={station.fmisid}
                    obsTime={obsTime}
                  />
                </Popup>
              </CircleMarker>
            )}
            {displayArrowIcon && (
              <>
                <LeafletMarker
                  position={[station.lat, station.lon]}
                  icon={L.divIcon({
                    iconAnchor: [-10, 1],
                    html: element,
                    iconSize: [0, 0],
                    className: "leaflet-div-icon-none",
                  })}
                >
                  <Popup
                    minWidth={minWidth}
                    maxWidth={maxWidth}
                    key={station.fmisid}
                  >
                    <PopupChart
                      stationName={station.name}
                      fmisid={station.fmisid}
                      obsTime={obsTime}
                    />
                  </Popup>
                </LeafletMarker>
                <LeafletMarker
                  position={[station.lat, station.lon]}
                  rotationAngle={station[arrowDirection]}
                  rotationOrigin="center"
                  icon={L.icon({
                    iconUrl: arrow,
                    iconAnchor: [22, 12],
                    popupAnchor: [0, 0],
                    iconSize: [45, 45],
                  })}
                >
                  <Popup
                    minWidth={minWidth}
                    maxWidth={maxWidth}
                    key={station.fmisid}
                  >
                    <PopupChart
                      stationName={station.name}
                      fmisid={station.fmisid}
                      obsTime={obsTime}
                    />
                  </Popup>
                </LeafletMarker>
              </>
            )}
          </React.Fragment>
        );
      }
    }
  });
};

export default Marker;
