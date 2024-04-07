import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { Box } from "@mui/material";
import ReactECharts from "echarts-for-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Slider from "react-slick";

import { getTimeseriesData } from "../../network/timeseries";
import { formatDataToEcharts } from "../../network/timeseriesUtils";
import { IResultData } from "../../network/types/types";
import {
  ceilAndMakeEven,
  floorAndMakeEven,
  formatTemperatureTooltip,
  formatWindTooltip,
  renderArrow,
} from "./mapUtils";

interface IProps {
  stationName: string | undefined;
  fmisid: number | undefined;
  obsTime?: Date;
}

const PopupChart: React.FC<IProps> = ({ stationName, fmisid, obsTime }) => {
  const [data, setData] = useState<IResultData[]>([]);
  const [chartData, setChartData] = useState<(number | string | null)[][]>([]);
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  //const [isLoading, setIsLoading] = useState<boolean>(false);

  const { t } = useTranslation();

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
      text: t("graph.windTitle"),
      x: "center",
      textStyle: {
        fontWeight: "normal",
        fontSize: 14,
      },
    },
    tooltip: {
      trigger: "axis",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      formatter: function (params: any) {
        return formatWindTooltip(params, timeFormatOptions, dims, {
          parameters: [t("graph.legendWind"), t("graph.legendWindDirection")],
          units: ["m/s", "°"],
        });
      },
    },
    grid: {
      top: 50,
      left: 25,
      right: 25,
      bottom: 60,
    },
    xAxis: {
      offset: 30,
      axisLine: {
        onZero: false,
      },
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

  const temperatureGraphOptions = {
    title: {
      text: t("graph.tempTitle"),
      x: "center",
      textStyle: {
        fontWeight: "normal",
        fontSize: 14,
      },
    },
    tooltip: {
      trigger: "axis",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      formatter: function (params: any) {
        return formatTemperatureTooltip(params, timeFormatOptions, {
          parameters: [t("graph.legendTemp")],
          units: ["°C"],
        });
      },
    },
    grid: {
      top: 50,
      left: 25,
      right: 25,
      bottom: 60,
    },
    xAxis: {
      offset: 30,
      axisLine: {
        onZero: false,
      },
      type: "time",
      splitLine: {
        show: true,
        lineStyle: {
          color: "#ddd",
        },
      },
      minorSplitLine: {
        show: true,
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
        minorSplitLine: {
          show: true,
        },
        interval: 2,
        name: "°C",
        boundaryGap: [0.2, 0.2],
        max: ceilAndMakeEven(chartData),
        min: floorAndMakeEven(chartData),
      },
      {
        type: "value",
        axisLabel: { show: false },
        splitLine: {
          show: false,
        },
      },
    ],
    visualMap: {
      show: false,
      dimension: 1,
      pieces: [
        {
          gt: -100,
          lte: -0.05,
          color: "#0088FF",
        },
        {
          gt: -0.05,
          lte: 0.05,
          color: "#989898",
        },
        {
          gt: 0.05,
          lte: 100,
          color: "#FF0000",
        },
      ],
    },
    series: [
      {
        name: "zeroline",
        type: "line",
        showSymbol: false,
        itemStyle: {
          color: "#989898",
          borderColor: "#989898",
        },
        data: chartData.map((item) => [item[dims.time], 0]),
      },
      {
        name: "Temperature",
        type: "line",
        showSymbol: false,
        itemStyle: {
          color: "#FF0000",
          borderColor: "#FF0000",
        },
        data: chartData.map((item) => [item[dims.time], item[dims.t2m]]),
      },
    ],
  };

  useEffect(() => {
    if (obsTime)
      void getTimeseriesData(
        obsTime,
        setData,
        () => {
          true;
        },
        obsTime?.toISOString(),
        fmisid
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [obsTime]);

  useEffect(() => {
    setChartData(formatDataToEcharts(data));
  }, [data]);

  const carouselSettings = {
    dots: true,
    beforeChange: (_prev: number, next: number) => {
      setCurrentSlide(next);
    },
    customPaging: (index: number) => {
      return (
        <a>
          <span
            style={{
              width: "10px",
              height: "10px",
              margin: "5px 7px",
              background: index === currentSlide ? "#869791" : "#D6D6D6",
              display: "block",
              WebkitBackfaceVisibility: "visible",
              transition: "opacity .2s ease",
              borderRadius: "30px",
            }}
          ></span>
        </a>
      );
    },
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    dotsClass: "slick-dots slick-active",
  };

  return (
    <Box style={{ textAlign: "center", padding: "0 30px 30px 30px" }}>
      <Box>
        <b>Havaintoasema:</b> {stationName}
      </Box>
      <Box>
        <b>Viimeisin havainto:</b>{" "}
        {obsTime?.toLocaleDateString("fi-FI", timeFormatOptions)}
      </Box>
      <Slider {...carouselSettings}>
        <ReactECharts option={windGraphOptions} />
        <ReactECharts option={temperatureGraphOptions} />
      </Slider>
    </Box>
  );
};

export default PopupChart;
