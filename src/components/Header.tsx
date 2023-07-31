import * as React from "react";
import { Dispatch, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { Box, Button } from "@mui/material";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";

import "react-datepicker/dist/react-datepicker.css";

interface IProps {
  obsTime?: Date | undefined;
  setTimeValue?: Dispatch<React.SetStateAction<any>>;
}

const styles = {
  root: {
    backgroundColor: "rgba(255,255,255,0.95)",
    height: "40px",
    width: "100%",
    position: "absolute",
    zIndex: 1005,
    borderBottom: "1px solid #ccc",
  },
  datePicker: {
    zIndex: 1010,
    marginTop: "5px",
    justifyContent: "center",
    display: "flex",
  },
  button: {
    textTransform: "unset !important",
    height: "21.5px",
    margin: "0 4px",
  },
};

const Header: React.FC<IProps> = ({ obsTime, setTimeValue }) => {
  const [time, setTime] = useState<string>("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [isCurrent, setIsCurrent] = useState<boolean>(true);

  useEffect(() => {
    if (obsTime) {
      setStartDate(obsTime);
      setTime(obsTime?.toISOString());
    }
  }, [obsTime]);

  const checkIfToday = (date: Date | null) => {
    const today = new Date();
    // Compare year, month, and day of the Date object and the current date
    if (date)
      return (
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
      );
    else return false;
  };

  return (
    <Box sx={styles.root}>
      <Box sx={styles.datePicker}>
        <Box sx={{ marginTop: "4px" }}>
          <AccessTimeRoundedIcon fontSize="small" sx={{ color: "#aeaeae" }} />
        </Box>
        <Box>
          <DatePicker
            customInput={
              <input data-testid="observation-time-value" type="text" />
            }
            placeholderText=""
            className="datepickerInput"
            selected={startDate}
            showTimeSelect
            title="jeejee"
            onChange={(date) => {
              if (date) setTime(date?.toISOString());
              setStartDate(date);
            }}
            maxDate={new Date()}
            dateFormat="dd.MM.yyyy HH:mm"
            timeFormat="HH:mm"
            timeIntervals={10}
            minTime={new Date(new Date().setHours(0, 0))}
            maxTime={
              checkIfToday(startDate)
                ? new Date(
                    new Date().setHours(
                      startDate ? startDate?.getHours() : 0,
                      startDate ? startDate?.getMinutes() : 0
                    )
                  )
                : new Date(new Date().setHours(23, 50))
            }
          />
        </Box>
        <Box>
          <Button
            sx={styles.button}
            data-testid="get-historical-observations-button"
            variant={isCurrent ? "outlined" : "contained"}
            onClick={() => {
              setIsCurrent(false);
              if (setTimeValue) setTimeValue(time);
            }}
          >
            Hae
          </Button>
          <Button
            sx={styles.button}
            data-testid="get-current-observations-button"
            variant={isCurrent ? "contained" : "outlined"}
            onClick={() => {
              setIsCurrent(true);
              if (setTimeValue) setTimeValue("now");
            }}
          >
            Nyt
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
