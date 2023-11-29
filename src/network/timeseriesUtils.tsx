import { floorToNearest10Minutes } from "../utils/helpers";
import { IResultData } from "./timeseries";

export const getTimeValue = async (
  setObsTime: (obsTime: Date) => void
): Promise<any> => {
  const currentDate = new Date().getTime();
  const timeUrl = `https://opendata.fmi.fi/timeseries?endTime=now&format=json&timeformat=xml&keyword=synop_fi&param=stationname+as+name,time,t2m&producer=opendata`;
  await fetch(timeUrl, { cache: "no-store" })
    .then((result) => result?.json() as Promise<IResultData[]>)
    .then((result) => {
      const timeArray = result
        .map((item) => new Date(item.time).getTime())
        .sort((a, b) => {
          return a - b;
        })
        .filter((x) => {
          if (currentDate - x < 1000 * 60 * 10) return x;
        })
      setObsTime(new Date(floorToNearest10Minutes(timeArray[0])));
    });
};