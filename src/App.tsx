import "./App.css";

import { useEffect, useState } from "react";

import Header from "./components/Header";
import Map from "./components/Map";
import Parameter from "./components/Parameter";
import Version from "./components/Version";
import {
  getTimeseriesData,
  getTimeValue,
  IResultData,
} from "./network/timeseries";

interface TimeProp {
  time: string;
}

function App() {
  const [data, setData] = useState<IResultData[]>([]);
  const [obsTime, setObsTime] = useState<Date | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [timeValue, setTimeValue] = useState<TimeProp | undefined>({
    time: "now",
  });
  const [selectedParameter, setSelectedParameter] =
    useState<string>("ws_10min");

  const getData = () => {
    if (timeValue?.time === "now") {
      setData([]);
      void getTimeseriesData(obsTime, setData, setIsLoading);
    } else {
      setData([]);
      void getTimeseriesData(obsTime, setData, setIsLoading, timeValue?.time);
    }
  };

  useEffect(() => {
    getTimeValue(setObsTime).catch(console.error);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (timeValue && timeValue?.time !== "now")
        setObsTime(new Date(timeValue.time));
      else getTimeValue(setObsTime).catch(console.error);
    }, 5 * 60000);
    return () => clearInterval(interval);
  }, [timeValue]);

  useEffect(() => {
    if (obsTime) getData();
    else getTimeValue(setObsTime).catch(console.error);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [obsTime, timeValue]);

  return (
    <>
      <Header obsTime={obsTime} setTimeValue={setTimeValue} setObsTime={setObsTime} />
      <Parameter
        selectedParameter={selectedParameter}
        setSelectedParameter={setSelectedParameter}
      />
      <Map
        key={1}
        data={data}
        selectedParameter={selectedParameter}
        isLoading={isLoading}
      />
      <Version />
    </>
  );
}

export default App;
