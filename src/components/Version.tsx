import { Typography } from '@mui/material'

const styles = {
  root: {
    position: 'relative',
    bottom: 30,
    left: 10,
    height: '0px',
    width: '100%',
    zIndex: 1000,
  }
}

const Version: React.FC = () => {
  return <Typography sx={styles.root}>v. {import.meta.env.VITE_REACT_APP_VERSION}</Typography>
}

export default Version