import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { ThemeProvider } from '@mui/material/styles';
import theme from '../src/utils/theme';

import UserHomepage from './page/user-home';
import Login from './page/login';
import SignUp from './page/SignUp';
import UserConfrimAge from './page/UserConfrimAge';
import Cart from './page/Cart';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<UserConfrimAge />} />
          <Route path="/shop" element={<UserHomepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
