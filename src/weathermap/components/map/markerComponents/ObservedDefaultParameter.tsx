import L from "leaflet";
import ReactDOMServer from "react-dom/server";
import { Marker as LeafletMarker, Popup } from "react-leaflet";

import { IResultData } from "../../../network/types/types";
import { maxWidth, minWidth, resolveElement } from "../../../utils/helpers";
import PopupChart from "../PopupChart";
import ObservedCloudCover from "./ObservedCloudCover";

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
  let paramValue = station[selectedParameter as keyof IResultData];
  if (selectedParameter === "t2mtdew")
    if (station.t2m && station.dewpoint)
      paramValue = station.t2m - station.dewpoint;

  const element =
    !paramValue && isMissingValid
      ? resolveElement(selectedParameter, "-")
      : resolveElement(selectedParameter, paramValue as number);

  if (paramValue !== undefined && paramValue !== null)
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
      else if (selectedParameter === "n_man") {
        return (
          <LeafletMarker
            key={`${station.fmisid}-${station.lat}-${station.lon}`}
            position={[station.lat, station.lon]}
            icon={L.divIcon({
              className: "custom-icon",
              html: ReactDOMServer.renderToString(
                <ObservedCloudCover value={paramValue} />
              ),
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
      } else {
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
      }
};

export default ObservedDefaultParameter;
