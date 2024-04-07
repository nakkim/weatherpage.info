import { IResultData } from "./types/types";

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
