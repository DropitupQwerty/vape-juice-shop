import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { ThemeProvider } from '@mui/material/styles';
import theme from '../src/utils/theme';

import UserHomepage from './page/user-home';
import Login from './page/login';
import SignUp from './page/SignUp';
import UserConfrimAge from './page/UserConfrimAge';
import Cart from './page/Cart';
import Sales from './page/admin/Sales';
import Orders from './page/admin/Orders';
import AdminDrawer from './components/AdminDrawer';
import AdminSignIn from './page/admin/AdminSignIn';
import Checkout from './page/Checkout';

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
          <Route path="/checkout" element={<Checkout />} />

          <Route element={<AdminDrawer />}>
            <Route path="/admin" element={<AdminSignIn />} />
            <Route path="/admin/sales" element={<Sales />} />
            <Route path="/admin/orders" element={<Orders />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
