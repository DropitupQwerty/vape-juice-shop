import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { ThemeProvider } from '@mui/material/styles';
import theme from '../src/utils/theme';

import UserHomepage from './page/user-home';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<UserHomepage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
