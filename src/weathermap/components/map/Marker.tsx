import "leaflet/dist/leaflet.css";
import "leaflet-rotatedmarker";

import React from "react";

import { IResultData } from "../../network/timeseries";
import ArrowIcon from "./markerComponents/ArrowIcon";
import ObservedCloudCover from "./markerComponents/ObservedCloudCover";
import ObservedDefaultParameter from "./markerComponents/ObservedDefaultParameter";

interface IProps {
  data: IResultData[];
  selectedParameter: string;
  obsTime: Date | undefined;
}

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
    const paramValue = station[selectedParameter as keyof IResultData];
    if (station.lat && station.lon) {
      // symbol parameters
      if (paramValue !== null && paramValue !== undefined) {
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
