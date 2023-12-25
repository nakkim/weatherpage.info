import L from "leaflet";
import { Marker as LeafletMarker, Popup } from "react-leaflet";

import { IResultData } from "../../../network/timeseries";
import { resolveElement } from "../../../utils/helpers";
import { maxWidth, minWidth } from "../Marker";
import PopupChart from "../PopupChart";

interface IProps {
  station: IResultData;
  selectedParameter: string;
  obsTime: Date | undefined;
  displayArrowIcon: boolean;
  isMissingValid: boolean;
}

const ObservedDefaultParameter: React.FC<IProps> = ({
  station,
  selectedParameter,
  obsTime,
  displayArrowIcon,
  isMissingValid,
}) => {
  const paramValue = station[selectedParameter as keyof IResultData];
  const element =
    !paramValue && isMissingValid
      ? resolveElement(selectedParameter, "-")
      : resolveElement(selectedParameter, paramValue as number);

  if (station.lat && station.lon)
    if (isMissingValid)
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
        >
          <Popup minWidth={minWidth} maxWidth={maxWidth} key={station.fmisid}>
            <PopupChart
              stationName={station.name}
              fmisid={station.fmisid}
              obsTime={obsTime}
            />
          </Popup>
        </LeafletMarker>
      );
    else
      return (
        <LeafletMarker
          position={[station.lat, station.lon]}
          icon={L.divIcon({
            iconAnchor: displayArrowIcon ? [10, 0] : [0, 0],
            html: element,
            iconSize: displayArrowIcon ? [20, 18] : [0, 0],
            className: "leaflet-div-icon-none",
          })}
        >
          <Popup minWidth={minWidth} maxWidth={maxWidth} key={station.fmisid}>
            <PopupChart
              stationName={station.name}
              fmisid={station.fmisid}
              obsTime={obsTime}
            />
          </Popup>
        </LeafletMarker>
      );
};

export default ObservedDefaultParameter;
