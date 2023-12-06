import { regions } from "../../app.config";
import {
  generateRequestParameters,
  minutesFromMidnight,
} from "../utils/helpers";
import { subtractHours } from "./timeseriesUtils";

export interface IResultData {
  tmax?: number;
  tmin?: number;
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
  fmisid?: number;
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

export const getTimeseriesData = async (
  obsTime: Date | undefined,
  setState: (data: IResultData[]) => void,
  setIsLoading: (isLoading: boolean) => void,
  endTime?: string,
  fmisid?: number
): Promise<any> => {
  const minutes = endTime
    ? minutesFromMidnight(endTime)
    : minutesFromMidnight();

  const urlParamsArray: IRequestParameters[] = [];
  const startTime =
    fmisid && endTime
      ? subtractHours(new Date(endTime), 18).toISOString()
      : endTime;
  const timeValues = endTime
    ? { endTime: endTime, startTime: startTime }
    : { endTime: obsTime?.toISOString(), startTime: obsTime?.toISOString() };

  if (fmisid)
    urlParamsArray.push({
      ...timeValues,
      format: "json",
      missingvalue: "-",
      fmisid: fmisid,
      param: generateRequestParameters(minutes),
      precision: "double",
      producer: "opendata",
      timeformat: "xml",
      tz: "UTC",
      groupareas: 0,
      timestep: 10,
    });
  else
    for (let i = 0; i < regions.length; i++) {
      urlParamsArray.push({
        ...timeValues,
        format: "json",
        missingvalue: "-",
        areas: regions[i],
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
