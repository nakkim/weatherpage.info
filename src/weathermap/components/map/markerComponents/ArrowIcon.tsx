import L from "leaflet";
import React from "react";
import { Marker as LeafletMarker, Popup } from "react-leaflet";

import arrow from "../../../assets/arrow.svg";
import { IResultData } from "../../../network/timeseries";
import { maxWidth, minWidth } from "../../../utils/helpers";
import PopupChart from "../PopupChart";

interface IProps {
  arrowDirection: string;
  station: IResultData;
  selectedParameter: string;
  obsTime: Date | undefined;
}

const ArrowIcon: React.FC<IProps> = ({
  arrowDirection,
  station,
  obsTime,
}) => {

  if (station.lat && station.lon)
    return (
      <React.Fragment>
        <LeafletMarker
          position={[station.lat, station.lon]}
          icon={L.divIcon({
            iconAnchor: [30, -1],
            iconSize: [20, 18],
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
        <LeafletMarker
          position={[station.lat, station.lon]}
          rotationAngle={station[arrowDirection as keyof IResultData] as number}
          rotationOrigin="center"
          icon={L.icon({
            iconUrl: arrow,
            iconAnchor: [42, 11],
            popupAnchor: [0, 0],
            iconSize: [45, 45],
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
      </React.Fragment>
    );
};

export default ArrowIcon;
