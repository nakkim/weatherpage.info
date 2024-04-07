import "./App.css";

import { useState } from "react";

import Map from "./components/map/Map";
import Header from "./components/ui/Header";
import Parameter from "./components/ui/Parameter";
import Version from "./components/ui/Version";
import { useDataRequests } from "./hooks/useDataRequests";


function App() {
  const dataRequests = useDataRequests()
  const [selectedParameter, setSelectedParameter] =
    useState<string>("ws_10min");

  return (
    <>
      <Header obsTime={dataRequests.obsTime} setTimeValue={dataRequests.setTimeValue} setObsTime={dataRequests.setObsTime} />
      <Parameter
        selectedParameter={selectedParameter} 
        setSelectedParameter={setSelectedParameter}
      />
      <Map
        key={1}
        data={dataRequests.data}
        selectedParameter={selectedParameter}
        isLoading={dataRequests.isLoading}
        obsTime={dataRequests.obsTime}
      />
      <Version />
    </>
  );
}

export default App;
