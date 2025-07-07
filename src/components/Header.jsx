import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Box,
  Grid,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';
import { AccountCircle, ExitToApp } from '@mui/icons-material';
import HomeIcon from '@mui/icons-material/Home';
import FormatListNumberedRtlIcon from '@mui/icons-material/FormatListNumberedRtl';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import SettingsIcon from '@mui/icons-material/Settings';

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(false);
  const [logoutApi, { isLoading: isLoggingOut }] = useLogoutMutation();
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(!anchorEl);
  };
  const handleLogout = async () => {
    try {
      await logoutApi();
      dispatch(logout());
      navigate('/login');
    } catch (err) {
      console.error(err);
      console.error('Error al cerrar sesiÃ³n:', err);
    }
  };
  
  return (
    <header>
      <AppBar position="static" color="primary">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h6" component="div">
            <Link to="/home" style={{ textDecoration: 'none', color: 'inherit' }}>
              RegBills
            </Link>
          </Typography>
          {userInfo ? (
            <Box sx={{ display: 'flex', alignItems: 'center', height: userInfo ? '64px' : '64px' }}>
              <Grid container spacing={1} alignItems="center">
                <Grid item xs={3} sm={3}>
                  { }
                  { }
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <IconButton
                      size="large"
                      aria-label="Home"
                      color="inherit"
                      component={Link}
                      to="/home"
                      sx={{
                        width: '64px', // Ancho cuadrado
                        height: '100%', // Alto del header
                        borderRadius: '0', // Sin bordes redondos
                        display: 'flex', // Para alinear el contenido verticalmente
                        flexDirection: 'column', // Alinear contenido verticalmente
                        alignItems: 'center', // Alinear contenido verticalmente
                      }}
                    >
                      <div>
                        <HomeIcon />
                        <Typography variant="body2" align="center" color="inherit" sx={{ fontSize: '0.75rem' }}>
                          Home
                        </Typography>
                      </div>
                    </IconButton>
                  </div>
                </Grid>
                <Grid item xs={3} sm={3}>
                  { }
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <IconButton
                      size="large"
                      aria-label="Home"
                      color="inherit"
                      component={Link}
                      to="/datareg"
                      sx={{
                        width: '64px', // Ancho cuadrado
                        height: '100%', // Alto del header
                        borderRadius: '0', // Sin bordes redondos
                        display: 'flex', // Para alinear el contenido verticalmente
                        flexDirection: 'column', // Alinear contenido verticalmente
                        alignItems: 'center', // Alinear contenido verticalmente
                      }}
                    >
                      <div>
                        <FormatListNumberedRtlIcon />
                        <Typography variant="body2" align="center" color="inherit" sx={{ fontSize: '0.75rem' }}>
                          Data
                        </Typography>
                      </div>
                    </IconButton>
                  </div>
                </Grid>
                <Grid item xs={3} sm={3}>
                  { }
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <IconButton
                      size="large"
                      aria-label="Home"
                      color="inherit"
                      component={Link}
                      to="/addregister"
                      sx={{
                        width: '64px', // Ancho cuadrado
                        height: '100%', // Alto del header
                        borderRadius: '0', // Sin bordes redondos
                        display: 'flex', // Para alinear el contenido verticalmente
                        flexDirection: 'column', // Alinear contenido verticalmente
                        alignItems: 'center', // Alinear contenido verticalmente
                      }}
                    >
                      <div>
                        <PlaylistAddIcon />
                        <Typography variant="body2" align="center" color="inherit" sx={{ fontSize: '0.75rem' }}>
                          Add
                        </Typography>
                      </div>
                    </IconButton>
                  </div>
                </Grid>
                <Grid item xs={3} sm={3}>
                  { }
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <IconButton
                      size="large"
                      aria-label="Home"
                      color="inherit"
                      component={Link}
                      to="/config"
                      sx={{
                        width: '64px', // Ancho cuadrado
                        height: '100%', // Alto del header
                        borderRadius: '0', // Sin bordes redondos
                        display: 'flex', // Para alinear el contenido verticalmente
                        flexDirection: 'column', // Alinear contenido verticalmente
                        alignItems: 'center', // Alinear contenido verticalmente
                      }}
                    >
                      <div>
                        <SettingsIcon />
                        <Typography variant="body2" align="center" color="inherit" sx={{ fontSize: '0.75rem' }}>
                          Settings
                        </Typography>
                      </div>
                    </IconButton>
                  </div>
                </Grid>
              </Grid>
            </Box>
          ) : null}
          {userInfo ? (
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <div>
                <AccountCircle />
                <Typography variant="body2" align="center" color="inherit">
                  {userInfo.name}
                </Typography>
              </div>
            </IconButton>
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center', height: userInfo ? '64px' : '64px' }}>
              <Button
                color="inherit"
                component={Link}
                to="/registro"
                sx={{ marginRight: '10px' }}
              >
                Register
              </Button>
              <Button color="inherit" component={Link} to="/iniciosesion">
                Log In
              </Button>
            </Box>
          )}
          <Menu
            id="menu-appbar"
            anchorEl={!anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>
              <Link to="/profile" style={{ textDecoration: 'none', color: 'inherit' }}>
                Profile
              </Link>
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </header >
  );
};
export default Header;
