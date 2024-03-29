import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import Login from '../page/login';
import LoginOrSignUp from '../page/LoginOrSignup';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';

const drawerWidth = 240;

function DrawerAppBar({ children }) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [auth, setAuth] = React.useState();
  const [navItems, setNavitems] = React.useState([]);
  const navigate = useNavigate();
  let token = JSON.parse(sessionStorage.getItem('USER'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleOpen_LoginDialog = () => {
    setOpen(true);
  };
  const handleClose_LoginDialog = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    sessionStorage.clear();
    signOut(auth);
    console.log('clicekd');
  };

  const navItemsLogout = [
    { label: 'Home', link: '/shop' },
    // { label: 'Cart', icon: <ShoppingCartOutlinedIcon />, link: '/cart' },
    { label: 'Login/Sign Up', func: handleOpen_LoginDialog },
  ];

  const navItemsLogin = [
    { label: 'Home', link: '/shop' },
    { label: 'Cart', icon: <ShoppingCartOutlinedIcon />, link: '/cart' },
    { label: 'Log Out', func: handleLogout },
  ];

  React.useEffect(() => {
    if (!!token) {
      setAuth(true);
      setNavitems(navItemsLogin);
    } else {
      setAuth(false);
      setNavitems(navItemsLogout);
    }
  }, []);

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Vape Ph and Manufacturing
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.label} disablePadding onClick={item.func}>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText
                primary={
                  <Typography sx={{ fontSize: '20px' }}>
                    {item.label}
                  </Typography>
                }
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <LoginOrSignUp open={open} cancel={handleClose_LoginDialog} />
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              fontWeight: 'bold',
              fontFamily: 'monospace',
              display: { xs: 'none', sm: 'block' },
            }}
          >
            Vape Ph and Manufacturing
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {token?.role === 'admin' ? (
              <Button
                sx={{
                  color: '#fff',
                  margin: '20px',
                }}
                component={Link}
                to={'/admin/sales'}
              >
                <Typography marginRight={0.5}>Go to Admin Dashboard</Typography>
              </Button>
            ) : null}
            {navItems.map((item) => (
              <Button
                key={item.label}
                sx={{
                  color: '#fff',
                  margin: '20px',
                }}
                onClick={item.func}
                component={Link}
                to={item?.link}
              >
                <Typography marginRight={0.5}>{item.label}</Typography>
                <Typography marginTop="5px">{item?.icon}</Typography>
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Toolbar />
      <Toolbar />
      <Box sx={{ marginTop: '85px' }}>{children}</Box>
    </Box>
  );
}

export default DrawerAppBar;
