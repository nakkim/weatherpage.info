import "./App.css";

import { useEffect,useState  } from "react";

import Header from "./components/Header";
import Map from "./components/Map";
import Parameter from "./components/Parameter";
import Version from "./components/Version";
import { getTimeseriesData,IResultData } from "./network/timeseries";

function App() {
  const [data, setData] = useState<IResultData[]>([]);
  const [obsTime, setObsTime] = useState<Date | undefined>(undefined);
  const [timeValue, setTimeValue] = useState<string | undefined>("now");
  const [selectedParameter, setSelectedParameter] = useState<string>("ws_10min");

  const getData = () => {
    if (timeValue === "now")
      void getTimeseriesData(setData);
    else
      void getTimeseriesData(
        setData,
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
      <Version />
    </>
  );
}

export default App;
