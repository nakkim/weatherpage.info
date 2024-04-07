export interface IResultData {
  tmax?: number;
  tmin?: number;
  distance?: number;
  name?: string;
  lat?: number;
  lon?: number;
  time: string;
  utctime?: string;
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