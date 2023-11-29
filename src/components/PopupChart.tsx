import { Box } from "@mui/material";

interface IProps {
  stationName: string | undefined;
  fmisid: number | undefined;
  obsTime?: Date;
}

const PopupChart: React.FC<IProps> = ({ stationName, fmisid, obsTime }) => {
  return (
    <Box style={{textAlign: 'center'}}>
      <Box><b>Havaintoasema:</b> {stationName}</Box>
      <Box><b>Viimeisin havainto:</b> {obsTime?.toISOString()}</Box>
    </Box>
  );
};

export default PopupChart;
