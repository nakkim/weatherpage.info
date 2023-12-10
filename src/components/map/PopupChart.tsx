import { Box } from "@mui/material";
import ReactECharts from "echarts-for-react";
import { useEffect, useState } from "react";

import { getTimeseriesData, IResultData } from "../../network/timeseries";
import { formatDataToEcharts } from "../../network/timeseriesUtils";
import { formatTooltip, renderArrow } from "../../utils/helpers";

interface IProps {
  stationName: string | undefined;
  fmisid: number | undefined;
  obsTime?: Date;
}

const PopupChart: React.FC<IProps> = ({ stationName, fmisid, obsTime }) => {
  const [data, setData] = useState<IResultData[]>([]);
  const [chartData, setChartData] = useState<(number | string | null)[][]>([]);
  //const [isLoading, setIsLoading] = useState<boolean>(false);

  const timeFormatOptions: Intl.DateTimeFormatOptions = {
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    month: "numeric",
    year: "numeric",
    timeZoneName: "short",
  };

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

  const windGraphOptions = {
    title: {
      text: "Keskituulen ja maksimipuuskan vaihteluväli [m/s]",
      x: "center",
      textStyle: {
        fontWeight: "normal",
        fontSize: 14,
      },
    },
    tooltip: {
      trigger: "axis",
      formatter: function (params: any) {
        return formatTooltip(params, timeFormatOptions, dims);
      }
    },
    grid: {
      top: 60,
      left: 20,
      right: 30,
      bottom: 70,
    },
    xAxis: {
      type: "time",
      splitLine: {
        show: true,
        lineStyle: {
          color: "#ddd",
        },
      },
      axisTick: {
        show: true,
      },
      minorTick: {
        show: false,
      },
      axisLabel: {
        formatter: (item: number) => {
          const date = new Date(item);
          return date.toLocaleTimeString("fi-FI", {
            hour: "2-digit",
            minute: "2-digit",
          });
        },
      },
    },
    yAxis: [
      {
        type: "value",
        scale: true,
        splitLine: {
          lineStyle: {
            color: "#ddd",
          },
        },
        min: 0,
        max:
          // Get max value and floor to nearest even number
          Math.max(
            6,
            Math.ceil(
              Math.max(
                ...(chartData
                  .map((item) => [item[dims.wg_10min]])
                  .flat() as number[])
              ) / 2
            ) * 2
          ),
        interval: 2,
        name: "m/s",
        boundaryGap: [0.2, 0.2],
      },
      {
        type: "value",
        axisLabel: { show: false },
        splitLine: {
          show: false,
        },
      },
    ],
    series: [
      {
        name: "WindSpeed",
        type: "candlestick",
        barCategoryGap: "90%",
        showSymbol: false,
        itemStyle: {
          color: "#88B3E7",
          borderColor: "#88B3E7",
        },
        data: chartData.map((item) => [
          item[dims.time],
          item[dims.ws_10min],
          item[dims.wg_10min],
          item[dims.ws_10min],
          item[dims.wg_10min],
        ]),
      },
      {
        name: "wind_arrows",
        type: "custom",
        renderItem: renderArrow,
        yAxisIndex: 1,
        itemStyle: {
          color: "#ffffff",
          borderColor: "#ffffff",
        },
        data: chartData.map((item) => [
          item[dims.time],
          item[dims.ws_10min],
          item[dims.wg_10min],
          item[dims.wd_10min],
        ]),
      },
    ],
  };

  useEffect(() => {
    if (obsTime)
      void getTimeseriesData(
        obsTime,
        setData,
        () => {(true)},
        obsTime?.toISOString(),
        fmisid
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [obsTime]);

  useEffect(() => {
    setChartData(formatDataToEcharts(data));
  }, [data]);

  return (
    <Box style={{ textAlign: "center" }}>
      <Box>
        <b>Havaintoasema:</b> {stationName}
      </Box>
      <Box>
        <b>Viimeisin havainto:</b>{" "}
        {obsTime?.toLocaleDateString("fi-FI", timeFormatOptions)}
      </Box>
      <ReactECharts option={windGraphOptions} style={{ height: 400 }} />
    </Box>
  );
};

export default PopupChart;
