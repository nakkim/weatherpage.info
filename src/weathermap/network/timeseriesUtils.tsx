import { floorToNearest10Minutes } from "../utils/helpers";
import { IResultData } from "./timeseries";

export const getTimeValue = async (
  setObsTime: (obsTime: Date) => void
): Promise<any> => {
  
  const currentDate = new Date().getTime();
  const timezoneOffset = new Date().getTimezoneOffset() * 60 * 1000
  const timeUrl = `https://opendata.fmi.fi/timeseries?endTime=now&format=json&timeformat=xml&keyword=synop_fi&param=stationname+as+name,utctime,t2m&producer=opendata`;
  
  await fetch(timeUrl, { cache: "no-store" })
    .then((result) => result?.json() as Promise<IResultData[]>)
    .then((result) => {
      const timeArray = result
        .map((item) => new Date(`${item.utctime}Z`).getTime())
        .sort((a, b) => {
          return a - b;
        })
        .filter((x) => {
          if (currentDate - x < 1000 * 60 * 10) return x;
        });
      setObsTime(new Date(floorToNearest10Minutes(timeArray[0])));
    });
};

export const formatDataToEcharts = (
  data: IResultData[]
): (string | number | null)[][] => {
  const result: (number | string | null)[][] = [];
  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    result.push([
      `${item.time}Z`,
      item.ws_10min ?? null,
      item.wg_10min ?? null,
      item.wd_10min ?? null,
      item.ws_1d ?? null,
      item.wg_1d ?? null,
      item.wawa ?? null,
      item.vis ?? null,
      item.t2m ?? null,
      item.tmin ?? null,
      item.tmax ?? null,
      item.ri_10min ?? null,
      item.r_1h ?? null,
      item.r_1d ?? null,
      item.rh ?? null,
      item.pressure ?? null,
      item.dewpoint ?? null,
      item.n_man ?? null,
    ]);
  }
  return result;
};

export const subtractHours = (date: Date, hours: number): Date => {
  date.setHours(date.getHours() - hours);
  return date;
};
