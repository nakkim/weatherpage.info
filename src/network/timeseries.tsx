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
  r_1d?: number;
  snow_aws?: number;
  pressure?: number;
  rh?: number;
  dewpoint?: number;
  t2mtdew?: number;
}

export const getTimeseriesData = async (
  setState: React.Dispatch<React.SetStateAction<any>>,
  time?: string,
): Promise<any> => {

  // const requestUrl = `https://opendata.fmi.fi/timeseries?${new URLSearchParams(
  //   urlParams as unknown as string,
  // )}`;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const apiUrl = import.meta.env.PROD ? import.meta.env.VITE_API_URL : 'http://localhost:3000'

  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  const requestUrl = time ? `${apiUrl}/observation?time=${time}` : `${apiUrl}/observation/now`;

  await fetch(requestUrl)
    .then((result) => result?.json() as Promise<IResultData[]>)
    .then((result) => {
      setState(result || []);
    })
    .catch(() => {
      setState([]);
    });
};

