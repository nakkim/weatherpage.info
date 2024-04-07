
import { useEffect, useState } from "react";

import { updateInterval } from "../../../app.config";
import { getTimeValue } from "../network/timeseries";
import { IResultData } from "../network/types/types";
import { fetchObservationData } from "./dataRequestUtils";

export interface TimeProp {
  time: string;
}

export const useDataRequests = () => {
  const [data, setData] = useState<IResultData[]>([]);
  const [obsTime, setObsTime] = useState<Date | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [timeValue, setTimeValue] = useState<TimeProp | undefined>({
    time: "now",
  });

  useEffect(() => {
    getTimeValue(setObsTime).catch(console.error);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (timeValue && timeValue?.time !== "now")
        setObsTime(new Date(timeValue.time));
      else getTimeValue(setObsTime).catch(console.error);
    }, updateInterval);
    return () => clearInterval(interval);
  }, [timeValue]);

  useEffect(() => {
    if (obsTime) fetchObservationData(timeValue, obsTime, setData, setIsLoading);
    else getTimeValue(setObsTime).catch(console.error);
  }, [obsTime, timeValue]);

  return {
    data,
    timeValue,
    setTimeValue,
    isLoading,
    obsTime,
    setObsTime
  };
}