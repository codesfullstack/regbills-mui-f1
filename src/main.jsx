﻿import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import store from './store';
import { Provider } from 'react-redux';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen.jsx';
import RegisterScreen from './screens/RegisterScreen.jsx';
import ProfileScreen from './screens/ProfileScreen.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import InicioSesion from './pages/InicioSesion.js';
import Registro from './pages/Registro.js';
import Profile from './pages/Profile.js';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/iniciosesion' element={<App />}>
      <Route index={true} path='/' element={<HomeScreen />} />
      <Route path='/iniciosesion' element={<InicioSesion />} />
      { }
      <Route path='' element={<PrivateRoute />}>
        <Route path='/registro' element={<Registro />} />
        <Route path='/profile' element={<Profile />} />
      </Route>
    </Route>
  )
);
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);
