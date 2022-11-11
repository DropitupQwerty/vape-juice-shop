import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      light: '#1B2B3A',
      main: '#1B2B3A',
      dark: 'rgba(64, 83, 67, 1)',
      contrastText: '#fff',
    },
    secondary: {
      light: '#1B2B3A',
      main: 'rgba(228, 233, 190, 1)',
      dark: 'rgba(173, 178, 136, 1)',
      contrastText: '#fff',
    },
    message: {
      light: 'fdf1f3',
      main: '#E94057',
      dark: 'rgba(64, 83, 67, 1)',
      contrastText: '#fff',
    },
    success: {
      main: '#7CFC00',
    },
    unlisted: {
      main: '#FFE500',
    },
    listed: {
      main: '#adff00',
    },
  },
});

export default theme;
