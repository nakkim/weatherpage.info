import { getTimeseriesData } from "../network/timeseries";
import { IResultData } from "../network/types/types";
import { TimeProp } from "./useDataRequests";

export const fetchObservationData = (
  timeValue: TimeProp | undefined,
  obsTime: Date | undefined,
  setData: (data: IResultData[]) => void,
  setIsLoading: (isLoading: boolean) => void
) => {
  if (timeValue?.time === "now") {
    setData([]);
    void getTimeseriesData(obsTime, setData, setIsLoading);
  } else {
    setData([]);
    void getTimeseriesData(obsTime, setData, setIsLoading, timeValue?.time);
  }
};
