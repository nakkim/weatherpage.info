import { regions } from "../../app.config";
import {
  floorToNearest10Minutes,
  generateRequestParameters,
  minutesFromMidnight,
} from "../utils/helpers";

export interface IResultData {
  distance?: number;
  name?: string;
  lat?: number;
  lon?: number;
  time: string;
  producer?: string;
  region?: string;
  fmisid: number;
  ri_10min?: number;
  ws_10min?: number;
  wg_10min?: number;
  wd_10min?: number;
  ws_1d?: number;
  wg_1d?: number;
  ws_max_dir?: number;
  wg_max_dir?: number;
  vis?: number;
  wawa?: number;
  t2m?: number;
  n_man?: number;
  r_1h?: number;
  r_1d?: number;
  snow_aws?: number;
  pressure?: number;
  rh?: number;
  dewpoint?: number;
}

export interface IRequestParameters {
  areas?: string;
  endtime?: string;
  format: string;
  geoid?: number;
  keyword?: string;
  maxdistance?: string;
  missingvalue: string;
  param: string;
  precision: string;
  producer: string;
  timeformat: string;
  timestep: number;
  tz: string;
  groupareas: number;
}

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

export const getTimeseriesData = async (
  obsTime: Date | undefined,
  setState: (data: IResultData[]) => void,
  setIsLoading: (isLoading: boolean) => void,
  endTime?: string,
  geoid?: number
): Promise<any> => {
  const minutes = endTime
    ? minutesFromMidnight(endTime)
    : minutesFromMidnight();
  const urlParamsArray: IRequestParameters[] = [];
  for (let i = 0; i < regions.length; i++) {
    urlParamsArray.push({
      ...(endTime
        ? { endTime: endTime, startTime: endTime }
        : {
            endTime: obsTime?.toISOString(),
            startTime: obsTime?.toISOString(),
          }),
      format: "json",
      missingvalue: "-",
      ...(geoid ? { geoid: geoid } : { areas: regions[i] }),
      param: generateRequestParameters(minutes),
      precision: "double",
      producer: "opendata",
      timeformat: "xml",
      tz: "UTC",
      groupareas: 0,
      timestep: 10,
    });
  }

  const requests = [];
  for (let i = 0; i < urlParamsArray.length; i++) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    const requestUrl = `https://opendata.fmi.fi/timeseries?${new URLSearchParams(
      urlParamsArray[i] as unknown as string
    )}`;
    requests.push(requestUrl);
  }

  try {
    setIsLoading(true);
    await Promise.all(
      requests.map((request) =>
        fetch(request).then(
          (result) => result?.json() as Promise<IResultData[]>
        )
      )
    ).then((result) => {
      setState([...new Set(result.flat())] || []);
      setIsLoading(false);
    });
  } catch (err) {
    setState([]);
    setIsLoading(false);
  }
};
