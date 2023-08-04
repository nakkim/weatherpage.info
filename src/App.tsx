import Map from "./components/Map";
import "./App.css";
import Header from "./components/Header";
import { useState } from "react";
import { useEffect } from "react";
import { IResultData, getTimeseriesData } from "./network/timeseries";
import Parameter from "./components/Parameter";

function App() {
  const [data, setData] = useState<IResultData[]>([]);
  const [obsTime, setObsTime] = useState<Date | undefined>(undefined);
  const [timeValue, setTimeValue] = useState<string | undefined>("now");
  const [selectedParameter, setSelectedParameter] = useState<string>("ws_10min");

  const getData = () => {
    const urlParameters = [
      "stationname as name",
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
      "r_1h",
      "snow_aws",
      "pressure",
      "rh",
      "dewpoint",
    ];

    if (timeValue === "now")
      void getTimeseriesData(urlParameters, setData, "10");
    else
      void getTimeseriesData(
        urlParameters,
        setData,
        "10",
        timeValue,
        timeValue
      );
  };

  useEffect(() => {
    getData();

    const interval = setInterval(() => {
      if (timeValue === "now") {
        getData();
      }
    }, 5 * 60000);
    return () => clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeValue]);

  useEffect(() => {
    if (data[0]) setObsTime(new Date(`${data[0]?.time}Z`));
  }, [data]);

  return (
    <>
      <Header obsTime={obsTime} setTimeValue={setTimeValue} />
      <Parameter
        selectedParameter={selectedParameter}
        setSelectedParameter={setSelectedParameter}
      />
      <Map key={1} data={data} selectedParameter={selectedParameter} />
    </>
  );
}

export default App;
