import { CircleMarker, Popup } from "react-leaflet";

import { IResultData } from "../../../network/types/types";
import { maxWidth, minWidth, resolveWawaElement } from "../../../utils/helpers";
import PopupChart from "../PopupChart";

interface IProps {
  station: IResultData;
  selectedParameter: string;
  obsTime: Date | undefined;
}

const ObservedWeatherDot: React.FC<IProps> = ({ station, selectedParameter, obsTime }) => {

  const paramValue = station[selectedParameter as keyof IResultData];
  const fillValue = resolveWawaElement(paramValue as number);

  if(station.lat && station.lon)
  return (
    <CircleMarker
      center={[station.lat, station.lon]}
      color="black"
      weight={2}
      radius={6}
      fillColor={fillValue.color}
      fillOpacity={Number(paramValue) === 0 ? 0 : 1}
    >
      <Popup minWidth={minWidth} maxWidth={maxWidth} key={station.fmisid}>
        <PopupChart
          stationName={station.name}
          fmisid={station.fmisid}
          obsTime={obsTime}
        />
      </Popup>
    </CircleMarker>
  );
};

export default ObservedWeatherDot;
