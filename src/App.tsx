import Map from "./components/Map";
import "./App.css";
import Header from "./components/Header";
import { useState } from "react";
import { useEffect } from "react";
import { IResultData, getTimeseriesData } from "./network/timeseries";

function App() {
  const [data, setData] = useState<IResultData[]>([]);
  const [obsTime, setObsTime] = useState<Date | undefined>(undefined);
  const [timeValue, setTimeValue] = useState<string | undefined>(undefined)

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

    if (timeValue === 'now')
    void getTimeseriesData(urlParameters, setData, "10");
    else 
    void getTimeseriesData(urlParameters, setData, "10", timeValue, timeValue);
  }

  useEffect(() => {
    getData()
  }, [timeValue])

  useEffect(() => {
    getData()
    setInterval(() => {
      if(timeValue === 'now')
      getData()
    }, 6*60000);
  }, []);

  useEffect(() => {
    if (data[0]) setObsTime(new Date(data[0]?.time));
  }, [data]);

  return (
    <>
      <Header obsTime={obsTime} setTimeValue={setTimeValue}/>
      <Map data={data} selectedParameter={"t2m"} />
    </>
  );
}

export default App;
