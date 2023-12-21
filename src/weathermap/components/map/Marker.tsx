import "leaflet/dist/leaflet.css";
import "leaflet-rotatedmarker";

import React from "react";

import { IResultData } from "../../network/timeseries";
import { windowWidth } from "../../utils/helpers";
import ArrowIcon from "./markerComponents/ArrowIcon";
import ObservedCloudCover from "./markerComponents/ObservedCloudCover";
import ObservedDefaultParameter from "./markerComponents/ObservedDefaultParameter";
import ObservedWeatherDot from "./markerComponents/ObservedWeatherDot";

interface IProps {
  data: IResultData[];
  selectedParameter: string;
  obsTime: Date | undefined;
}

const popupWidth =
  windowWidth().width > 1000 ? 1000 : windowWidth().width - 150;
export const minWidth = popupWidth;
export const maxWidth = popupWidth;

const Marker: React.FC<IProps> = ({ data, selectedParameter, obsTime }) => {
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

  return data.map((station: IResultData) => {
    let paramValue = station[selectedParameter as keyof IResultData];
    if (selectedParameter === "t2mtdew")
      if (station.t2m && station.dewpoint)
        paramValue = station.t2m - station.dewpoint;

    if (station.lat && station.lon) {
      <ObservedDefaultParameter
        station={station}
        selectedParameter={selectedParameter}
        obsTime={obsTime}
        displayArrowIcon={displayArrowIcon}
        isMissingValid={allowMissingValueParameters.includes(selectedParameter)}
      />;
      if (paramValue !== null && paramValue !== undefined) {
        // symbol parameters
        if (selectedParameter === "n_man")
          return <ObservedCloudCover value={paramValue} />;

        // other parameters
        return (
          <React.Fragment key={station?.fmisid}>
            <ObservedDefaultParameter
              station={station}
              selectedParameter={selectedParameter}
              obsTime={obsTime}
              displayArrowIcon={displayArrowIcon}
              isMissingValid={allowMissingValueParameters.includes(
                selectedParameter
              )}
            />
            {selectedParameter === "wawa" && (
              <ObservedWeatherDot
                station={station}
                selectedParameter={selectedParameter}
                obsTime={obsTime}
              />
            )}
            {displayArrowIcon && (
              <ArrowIcon
                arrowDirection={arrowDirection}
                station={station}
                selectedParameter={selectedParameter}
                obsTime={obsTime}
              />
            )}
          </React.Fragment>
        );
      }
    }
  });
};

export default Marker;
