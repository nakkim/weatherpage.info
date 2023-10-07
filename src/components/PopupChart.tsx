import { Box } from "@mui/material";

interface IProps {
  fmisid: number | undefined;
  obsTime?: Date;
}

const PopupChart: React.FC<IProps> = ({ fmisid, obsTime }) => {
  return (
    <Box style={{textAlign: 'center'}}>
      <Box><b>havaintoasema:</b> {fmisid}</Box>
      <Box><b>Viimeisin havainto:</b> {obsTime?.toISOString()}</Box>
    </Box>
  );
};

export default PopupChart;
