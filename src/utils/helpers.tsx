/* eslint-disable @typescript-eslint/restrict-template-expressions */

import { getLuminance } from "@mui/material";

export const debug = (string: string) => {
  const date = new Date();
  if (import.meta.env.VITE_API_URL)
    console.info(`${date.toLocaleString()}: ${string}`);
};

export const minutesFromMidnight = (dateString?: string) => {
  const now = dateString ? new Date(dateString) : new Date();
  const midnight = new Date(now);
  midnight.setHours(0, 0, 0, 0); // Set to midnight

  const millisecondsPassed = now.valueOf() - midnight.valueOf();
  const minutesPassed = Math.floor(millisecondsPassed / (1000 * 60));

  return minutesPassed;
};

export const floorToNearest10Minutes = (dateInMilliseconds: number): number => {
  const date = new Date(dateInMilliseconds);
  const minutes = date.getMinutes();

  // Calculate the remaining minutes to the nearest 10 minutes
  const remainingMinutes = minutes % 10;

  // Subtract the remaining minutes, seconds, and milliseconds to floor to the nearest 10 minutes
  date.setMinutes(minutes - remainingMinutes);
  date.setSeconds(0);
  date.setMilliseconds(0);

  return date.getTime();
};

export const generateRequestParameters = (minutes: number) => {
  return [
    "stationname as name",
    "time",
    "lat",
    "lon",
    "distance",
    "region",
    "fmisid",
    "utctime as time",
    "ri_10min",
    "ws_10min",
    "wg_10min",
    "wd_10min",
    "vis",
    "wawa",
    "t2m",
    "n_man",
    "nanmax_t(r_1h/55m/0) as r_1h",
    "snow_aws",
    "pressure",
    "rh",
    "dewpoint",
    `max_t(ws_10min/${minutes}m/0m) as ws_1d`,
    `max_t(wg_10min/${minutes}m/0m) as wg_1d`,
    `max_t(t2m/${minutes}m/0m) as tmax`,
    `min_t(t2m/${minutes}m/0m) as tmin`,
    `sum_t(r_1h/${minutes}m/0m) as r_1d`,
  ].toString();
};

const hexToRgb = (hex: string | undefined) => {
  if (hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    let r: number;
    let g: number;
    let b: number;
    if (result) {
      r = parseInt(result[1], 16);
      g = parseInt(result[2], 16);
      b = parseInt(result[3], 16);
      return `${r},${g},${b}`;
    }
  }
};

export const getFontColor = (
  hexColor: string | undefined,
  param: string,
  value: number
): 'black' | 'white' => {
  const temperatureParams = ["t2m", "tmin", "tmax", "dewpoint"];
  const ignoredParams = ["r_1h", "r_1d", "ri_10min", 't2mtdew', 'snow_aws'];

  if (temperatureParams.includes(param) && value < 0) return "black";
  if (ignoredParams.includes(param)) return "black";

  if (hexColor) {
    const luminance = getLuminance(hexColor);
    const threshold = 0.2; // Adjust this value to make the decision more or less sensitive
    const textColor = luminance > threshold ? "black" : "white";
    return textColor;
  }
  else return "black";
};

export const resolveElementColor = (param: string, value: number): string => {
  switch (param) {
    case "dewpoint":
    case "t2m":
    case "tmin":
    case "tmax":
      if (value < -30) return "#8a79f7";
      if (value >= -30 && value < -28) return "#8a79f7";
      if (value >= -28 && value < -26) return "#6e70e7";
      if (value >= -26 && value < -24) return "#5268d8";
      if (value >= -24 && value < -22) return "#3760c9";
      if (value >= -22 && value < -20) return "#1b58ba";
      if (value >= -20 && value < -18) return "#0050ab";
      if (value >= -18 && value < -16) return "#196bbe";
      if (value >= -16 && value < -14) return "#3286d1";
      if (value >= -14 && value < -12) return "#4ba1e4";
      if (value >= -12 && value < -10) return "#65dbf7";
      if (value >= -10 && value < -8) return "#77c8f8";
      if (value >= -8 && value < -6) return "#8ad3f9";
      if (value >= -6 && value < -4) return "#9cdefb";
      if (value >= -4 && value < -2) return "#afe9fc";
      if (value >= -2 && value < -1) return "#c1f4fd";
      if (value >= -1 && value < 0) return "#d4ffff";
      if (value >= 0 && value < 1) return "#02d495";
      if (value >= 1 && value < 2) return "#02d495";
      if (value >= 2 && value < 4) return "#8aedbb";
      if (value >= 4 && value < 6) return "#ccffd0";
      if (value >= 6 && value < 8) return "#ebfccf";
      if (value >= 8 && value < 10) return "#ebff7a";
      if (value >= 10 && value < 12) return "#ffea80";
      if (value >= 12 && value < 14) return "#f7d423";
      if (value >= 14 && value < 16) return "#f5b400";
      if (value >= 16 && value < 18) return "#f29500";
      if (value >= 18 && value < 20) return "#f07400";
      if (value >= 20 && value < 22) return "#ff5324";
      if (value >= 22 && value < 25) return "#f71707";
      if (value >= 25 && value < 28) return "#db0a07";
      if (value >= 28 && value < 30) return "#bd0404";
      if (value >= 30) return "#eb0052";
      return "#8aedbb";

    case "t2mtdew":
      if (value < -4) return "#053061";
      if (value >= -4 && value < -2) return "#2166ac";
      if (value >= -2 && value < -1) return "#4393c3";
      if (value >= -1 && value < -0.5) return "#92c5de";
      if (value >= -0.5 && value < 0) return "#d1e5f0";
      if (value >= 0 && value < 1) return "#f7f7f7";
      if (value >= 1 && value < 2) return "#fddbc7";
      if (value >= 2 && value < 4) return "#f4a582";
      if (value >= 4 && value < 8) return "#d6604d";
      if (value >= 8) return "#b2182b";
      return "#f7f7f7";

    case "rh":
      if (value >= 0 && value < 50) return "#f7fbff";
      if (value >= 50 && value < 60) return "#deebf7";
      if (value >= 60 && value < 65) return "#c6dbef";
      if (value >= 65 && value < 70) return "#9ecae1";
      if (value >= 70 && value < 75) return "#6baed6";
      if (value >= 75 && value < 80) return "#4292c6";
      if (value >= 80 && value < 85) return "#2171b5";
      if (value >= 85 && value < 90) return "#08519c";
      if (value >= 90) return "#08306b";
      return "#08306b";

    case "ws_10min":
    case "wg_10min":
    case "ws_1d":
    case "wg_1d":
      if (value < 1) return "#ffffff";
      if (value >= 1 && value < 2) return "#e6f7ff";
      if (value >= 2 && value < 7) return "#ccffcc";
      if (value >= 7 && value < 14) return "#ffff99";
      if (value >= 14 && value < 21) return "#ffcc00";
      if (value >= 21 && value < 25) return "#ff3300";
      if (value >= 25 && value < 28) return "#ff0066";
      if (value >= 28 && value < 32) return "#cc0099";
      if (value >= 32) return "#6600cc";
      return "#6600cc";

    case "pressure":
      if (value < 980) return "#9e0142";
      if (value >= 985 && value < 990) return "#d53e4f";
      if (value >= 990 && value < 995) return "#f46d43";
      if (value >= 995 && value < 1000) return "#fdae61";
      if (value >= 1000 && value < 1005) return "#fee08b";
      if (value >= 1005 && value < 1010) return "#ffffbf";
      if (value >= 1010 && value < 1015) return "#e6f598";
      if (value >= 1015 && value < 1020) return "#abdda4";
      if (value >= 1020 && value < 1025) return "#66c2a5";
      if (value >= 1025 && value < 1030) return "#3288bd";
      if (value > 1030) return "#5e4fa2";
      return "#5e4fa2";

    case "vis":
      if (value > 1000 && value <= 2000) return "rgba(1,1,1,0.15)";
      else if (value < 1000) {
        return "rgba(224,7,0,0.4)";
      } else return "rgba(1,1,1,0.15)";

    case "ri_10min":
    case "r_1d":
    case "r_1h":
      if (value >= 0 && value <= 0.1) return "#fff7fb";
      if (value > 0.1 && value <= 0.2) return "#ece7f2";
      if (value > 0.2 && value <= 0.3) return "#d0d1e6";
      if (value > 0.3 && value <= 0.4) return "#a6bddb";
      if (value > 0.4 && value <= 0.5) return "#74a9cf";
      if (value > 0.5 && value <= 1.0) return "#3690c0";
      if (value > 1.0 && value <= 1.5) return "#0570b0";
      if (value > 1.5 && value <= 2.0) return "#045a8d";
      if (value > 2.0 && value <= 3.0) return "#4575b4";
      if (value > 3.0 && value <= 4.0) return "#91bfdb";
      if (value > 4.0 && value <= 5.0) return "#e0f3f8";
      if (value > 5.0 && value <= 10.0) return "#ffffbf";
      if (value > 10.0 && value <= 20.0) return "#fee090";
      if (value > 20.0 && value <= 30.0) return "#fc8d59";
      if (value > 30.0) return "#d73027";
      return "#d73027";

    case "snow_aws":
      if (value > 0 && value <= 10) return "#bfe6ff";
      if (value > 10 && value <= 20) return "#8dcdff";
      if (value > 20 && value <= 40) return "#3c9dde";
      if (value > 40 && value <= 60) return "#3972bf";
      if (value > 60 && value <= 80) return "#6185c0";
      if (value > 80 && value <= 100) return "#8898c2";
      if (value > 100 && value <= 125) return "#8e6bb0";
      if (value > 125 && value <= 150) return "#863e97";
      if (value > 150 && value <= 175) return "#7e117e";
      if (value > 175 && value <= 200) return "#5b106f";
      if (value > 200) return "#ebdaf0";
      return "#bfe6ff";

    default:
      return "#ffffff";
  }
};

export const resolveWawaElement = (
  value: number
): { short: string; backgroundColor: string; color: string } => {
  if (value === 0)
    return {
      short: "FairWeather",
      backgroundColor: "#ffffff",
      color: "#7e7e7e",
    };
  if (value === 10)
    return {
      short: "Haze",
      backgroundColor: "#000000",
      color: "#ffffff",
    };
  if (value === 20)
    return {
      short: "Fog",
      backgroundColor: "#000000",
      color: "#ffffff",
    };
  if (value === 21)
    return {
      short: "Rain",
      backgroundColor: "#000000",
      color: "#00b430",
    };
  if (value === 22)
    return {
      short: "Drizzle",
      backgroundColor: "#000000",
      color: "#ffffb3",
    };
  if (value === 23)
    return {
      short: "Rain",
      backgroundColor: "#000000",
      color: "#00b430",
    };
  if (value === 24)
    return {
      short: "Snow",
      backgroundColor: "#000000",
      color: "#9cc3fc",
    };
  if (value === 25)
    return {
      short: "FreezingRain",
      backgroundColor: "#000000",
      color: "#ff80df",
    };
  if (value >= 30 && value <= 33)
    return {
      short: "Fog",
      backgroundColor: "#000000",
      color: "#ffffff",
    };
  if (value >= 40 && value <= 42)
    return {
      short: "Rain",
      backgroundColor: "#000000",
      color: "#00b430",
    };

  if (value >= 50 && value <= 53)
    return {
      short: "Drizzle",
      backgroundColor: "#000000",
      color: "#ffffb3",
    };
  if (value >= 54 && value <= 56)
    return {
      short: "FreezingDrizzle",
      backgroundColor: "#000000",
      color: "#ff80df",
    };
  if (value >= 60 && value <= 63)
    return {
      short: "Rain",
      backgroundColor: "#000000",
      color: "#00b430",
    };
  if (value >= 64 && value <= 67)
    return {
      short: "FreezingRain",
      backgroundColor: "#000000",
      color: "#ff80df",
    };
  if (value === 68)
    return {
      short: "Sleet",
      backgroundColor: "#000000",
      color: "#ffbf80",
    };
  if (value >= 70 && value <= 78)
    return {
      short: "Snow",
      backgroundColor: "#000000",
      color: "#9cc3fc",
    };
  if (value >= 80 && value <= 84)
    return {
      short: "RainShovers",
      backgroundColor: "#000000",
      color: "#6dff94",
    };
  if (value >= 85 && value <= 87)
    return {
      short: "SnowShovers",
      backgroundColor: "#000000",
      color: "#3d8bff",
    };
  if (value === 89)
    return {
      short: "Hail",
      backgroundColor: "#ffffb3",
      color: "#ffffb3",
    };
  return {
    short: "FairWeather",
    backgroundColor: "#ffffff",
    color: "#7e7e7e",
  };
};

export const resolveElement = (param: string, value: number | string) => {
  const styles = {
    element: {
      fontWeight: "bold",
      border: "1px solid black",
      color: "black",
      paddingLeft: "5px",
      paddingRight: "5px",
      fontSize: "15px",
      position: "relative",
      left: "1px",
      width: "20px",
    },
  };

  const element: HTMLElement = document.createElement("span");

  // expetions
  if (param === "snow_aws" && value === -1) return element;

  // resolve element background color
  if (typeof value === "number") {
    const elementStyle = resolveElementColor(param, value);
    const WawaStyle = resolveWawaElement(value);
    if (param === "wawa")
      Object.assign(element.style, {
        ...styles.element,
        color: WawaStyle?.color,
        left: "7px",
        bottom: "25px",
        fontSize: "11px",
        backgroundColor:
          WawaStyle?.backgroundColor === "#ffffff"
            ? `rgba(${hexToRgb(WawaStyle?.backgroundColor)},0.2)`
            : `rgba(${hexToRgb(WawaStyle?.backgroundColor)},0.7)`,
      });
    else if (param === "vis")
      Object.assign(element.style, {
        ...styles.element,
        color:
          value >= 2000
            ? "grey"
            : value <= 2000 && value > 1000
            ? "black"
            : "rgb(130, 1, 1)",
        left: "7px",
        bottom: "25px",
        fontSize: "15px",
        backgroundColor:
          WawaStyle?.backgroundColor === "#ffffff"
            ? `rgba(${hexToRgb(WawaStyle?.backgroundColor)},0.2)`
            : `rgba(${hexToRgb(WawaStyle?.backgroundColor)},0.7)`,
      });
    else
      Object.assign(element.style, {
        ...styles.element,
        color: getFontColor(resolveElementColor(param, value), param, value),
        backgroundColor: `rgba(${hexToRgb(elementStyle)},0.7)`,
      });
  }

  if (param === "wawa") {
    const val = resolveWawaElement(value as number);
    if (typeof val === "object") element.innerText = val.short;
  } else
    element.innerText = typeof value === "string" ? value : value.toFixed(1);

  return element;
};
