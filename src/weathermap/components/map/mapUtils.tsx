const dims = {
  time: 0,
  ws_10min: 1,
  wg_10min: 2,
  wd_10min: 3,
  ws_1d: 4,
  wg_1d: 5,
  wawa: 6,
  vis: 7,
  t2m: 8,
  tmin: 9,
  tmax: 10,
  ri_10min: 11,
  r_1h: 12,
  r_1d: 13,
  rh: 14,
  pressure: 15,
  dewpoint: 16,
  n_man: 17,
};

export const floorAndMakeEven = (data: (number | string | null)[][]): number => {
  let result = Math.floor(
    Math.min(
      ...(data.map((item) => [item[dims.t2m]]).flat() as number[])
    )
  )
  if (result % 2 !== 0) {
    result -= 1;
  }
  return result;
}

export const ceilAndMakeEven = (data: (number | string | null)[][]): number => {
  let result = Math.ceil(
    Math.max(
      ...(data.map((item) => [item[dims.t2m]]).flat() as number[])
    )
  )
  if (result % 2 !== 0) {
    result += 1;
  }
  return result;
}