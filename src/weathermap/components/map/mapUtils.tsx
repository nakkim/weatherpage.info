/* eslint-disable @typescript-eslint/no-unsafe-member-access */
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

export const floorAndMakeEven = (
  data: (number | string | null)[][]
): number => {
  let result = Math.floor(
    Math.min(...(data.map((item) => [item[dims.t2m]]).flat() as number[]))
  );
  if (result % 2 !== 0) {
    result -= 1;
  }
  return result;
};

export const ceilAndMakeEven = (data: (number | string | null)[][]): number => {
  let result = Math.ceil(
    Math.max(...(data.map((item) => [item[dims.t2m]]).flat() as number[]))
  );
  if (result % 2 !== 0) {
    result += 1;
  }
  return result;
};

export const degreesToCardinalDirection = (degrees: number): string => {
  const directions = [
    "N",
    "NNE",
    "NE",
    "ENE",
    "E",
    "ESE",
    "SE",
    "SSE",
    "S",
    "SSW",
    "SW",
    "WSW",
    "W",
    "WNW",
    "NW",
    "NNW",
  ];

  if (degrees < 0) degrees += 360;
  const index = Math.round((degrees % 360) / 22.5);
  return directions[index % 16];
};

export const renderArrow: echarts.CustomSeriesOption["renderItem"] = function (
  _param: echarts.CustomSeriesRenderItemParams,
  api: echarts.CustomSeriesRenderItemAPI
) {
  const dims = {
    time: 0,
    windspeed: 1,
    windgust: 2,
    R: 3,
  };
  const directionMap: Record<string, number> = {};
  const dir = [
    "W",
    "WNW",
    "NW",
    "NNW",
    "N",
    "NNE",
    "NE",
    "ENE",
    "E",
    "ESE",
    "SE",
    "SSE",
    "S",
    "SSW",
    "SW",
    "WSW",
  ];
  dir.forEach(function (name, index) {
    directionMap[name] = (Math.PI / 8) * index;
  });
  if (api.value(dims.windgust) === 0) return;
  const point = api.coord([api.value(dims.time), 0]);
  point[1] = point[1] + 15;
  const arrowSize = 12;
  return {
    type: "group",
    children: [
      {
        type: "path",
        shape: {
          pathData: `M9280 5934 c-106 -21 -223 -80 -293 -150 -99 -97 -148 -196 -168
          -336 -10 -72 -9 -97 5 -164 22 -108 75 -212 144 -282 33 -33 391 -297 851
          -627 l794 -570 -5084 -5 c-4763 -5 -5087 -6 -5132 -22 -146 -52 -265 -152
          -330 -275 -114 -217 -77 -472 93 -644 70 -71 126 -108 217 -142 l58 -22 5078
          -5 5078 -5 -752 -615 c-414 -338 -776 -638 -804 -667 -29 -29 -68 -84 -89
          -125 -112 -224 -73 -470 105 -649 104 -105 233 -159 382 -159 99 0 186 22 270
          68 70 39 2847 2303 2942 2399 160 162 199 422 93 633 -46 94 -119 163 -324
          311 -1086 782 -2701 1940 -2747 1970 -83 54 -166 80 -272 84 -49 2 -101 1
          -115 -1z`,
          x: -arrowSize / 2,
          y: -arrowSize / 2,
          width: arrowSize,
          height: arrowSize,
        },
        rotation:
          -directionMap[
            degreesToCardinalDirection(api.value(dims.R) as number)
          ],
        position: point,
        style: {
          lineWidth: 1,
          fill: "grey",
        },
      },
    ],
  };
};

export const formatWindTooltip = (
  params: any,
  timeFormatOptions: Intl.DateTimeFormatOptions,
  dims: any,
  phrases: { parameters: string[]; units: string[] }
) => {
  const timeString = new Date(
    params[0].value[dims.time] as string
  ).toLocaleDateString("fi-FI", {
    ...timeFormatOptions,
    timeZoneName: undefined,
  });
  const valueStringWind = `${phrases.parameters[0]}: <b>${
    params[0].value[dims.ws_10min] as string
  } - ${params[0].value[dims.wg_10min] as string} ${phrases.units[0]}</b>`;
  const valueStringWindDirection = `${phrases.parameters[1]}: <b>${
    params[1].value[dims.wd_10min] as number as unknown as string
  } °</b>`;
  return `<div style="text-align:left">
    ${timeString} <br/> 
    ${valueStringWind} <br/>
    ${valueStringWindDirection} <br/>
    </div>`;
};

export const formatTemperatureTooltip = (
  params: any,
  timeFormatOptions: Intl.DateTimeFormatOptions,
  phrases: { parameters: string[]; units: string[] }
) => {
  const timeString = new Date(
    params[1].value[0] as string
  ).toLocaleDateString("fi-FI", {
    ...timeFormatOptions,
    timeZoneName: undefined,
  });
  const valueStringWind = `${phrases.parameters[0]}: <b>${
    params[1].value[1] as string
  } ${phrases.units[0]}</b>`;
  return `<div style="text-align:left">
    ${timeString} <br/> 
    ${valueStringWind} <br/>
    </div>`;
};
