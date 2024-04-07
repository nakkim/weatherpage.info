import { regions } from "../../../app.config";
import {
  floorToNearest10Minutes,
  generateRequestParameters,
  minutesFromMidnight,
} from "../utils/helpers";
import { subtractHours } from "./timeseriesUtils";
import { IRequestParameters, IResultData } from "./types/types";

export const getTimeseriesData = async (
  obsTime: Date | undefined,
  setState: (data: IResultData[]) => void,
  setIsLoading: (isLoading: boolean) => void,
  endTime?: string,
  fmisid?: number
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

  const requestOptions = {
    ...timeValues,
    format: "json",
    missingvalue: "-",
    param: generateRequestParameters(minutes),
    precision: "double",
    producer: "opendata",
    timeformat: "xml",
    tz: "UTC",
    groupareas: 0,
    timestep: 10,
  };

  if (fmisid)
    urlParamsArray.push({
      ...requestOptions,
      fmisid: fmisid,
    });
  else
    for (let i = 0; i < regions.length; i++) {
      urlParamsArray.push({
        ...requestOptions,
        areas: regions[i],
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

export const getTimeValue = async (
  setObsTime: (obsTime: Date) => void
// eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any> => {
  const currentDate = new Date().getTime();
  const timeUrl = `https://opendata.fmi.fi/timeseries?endTime=now&format=json&timeformat=xml&keyword=synop_fi&param=stationname+as+name,utctime,t2m&producer=opendata`;

  await fetch(timeUrl, { cache: "no-store" })
    .then((result) => result?.json() as Promise<IResultData[]>)
    .then((result) => {
      const timeArray = result
        .map((item) =>
          new Date(item.utctime ? `${item.utctime}Z` : 0).getTime()
        )
        .sort((a, b) => {
          return a - b;
        })
        .filter((x) => {
          if (currentDate - x < 1000 * 60 * 10) return x;
        });
      setObsTime(new Date(floorToNearest10Minutes(timeArray[0])));
    });
};
