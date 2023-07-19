export interface IResultData {
  distance?: number;
  name?: string;
  lat?: number,
  lon?: number,
  time: string,
  producer?: string;
  region?: string;
  fmisid?: number;
  ri_10min?: number;
  ws_10min?: number;
  wg_10min?: number;
  wd_10min?: number;
  vis?: number;
  wawa?: number;
  t2m?: number;
  n_man?: number;
  r_1h?: number;
  snow_aws?: number;
  pressure?: number;
  rh?: number;
  dewpoint?: number;
}

export interface IRequestParameters {
  endtime?: string;
  format: string;
  geoid?: number;
  keyword?: string;
  maxdistance?: string;
  missingvalue: string;
  param: string;
  precision: string;
  producer: string;
  starttime?: string;
  timeformat: string;
  timestep?: string;
  tz: string;
}

export const getTimeseriesData = async (
  requestParameters: string[],
  setState: React.Dispatch<React.SetStateAction<any>>,
  timestep: string,
  startTime?: string,
  endTime?: string,
  geoid?: number,
): Promise<any> => {

  const urlParams: IRequestParameters = {
    endtime: endTime ? endTime : 'now',
    format: 'json',
    missingvalue: '-',
    keyword: 'synop_fi',
    param: requestParameters.toString(),
    precision: 'double',
    producer: 'opendata',
    ...(startTime && {
      starttime: startTime,
      timestep: timestep,
    }),
    timeformat: 'xml',
    tz: 'UTC',
  };

  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  const requestUrl = `https://opendata.fmi.fi/timeseries?${new URLSearchParams(
    urlParams as unknown as string,
  )}`;

  await fetch(requestUrl)
    .then((result) => result?.json() as Promise<IResultData[]>)
    .then((result) => {
      setState(result || []);
    })
    .catch(() => {
      setState([]);
    });
};

