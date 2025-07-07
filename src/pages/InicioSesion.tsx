import React, { FunctionComponent, useEffect, useState } from "react";
import { login } from '../api/auth';
import { toast } from 'react-toastify';
import { setCredentials, setToken } from '../slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Container, TextField, Button, CssBaseline, Typography } from '@mui/material';
import { useLoginMutation } from "../slices/usersApiSlice";

const InicioSesion: FunctionComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginMutation, { isLoading }] = useLoginMutation();
  const userInfo = useSelector((state: any) => state);
  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await loginMutation({ email, password }).unwrap();
      dispatch(setCredentials({
        userInfo: {
          _id: res._id,
          name: res.name,
          email: res.email,
          token: res.token
        },
        token: res.token
      }));
      console.log("inicio - userInfo.token:");
      console.log(userInfo);
      console.log("inicio - res.token:", res.token); // Agregar un console.log aquÃ­
      navigate('/home');
    } catch (err) {
      console.error(err);
      toast.error('Hubo un error al iniciar sesiÃ³n');
    }
  };
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setIsVisible(true);
    }, 10);
  }, []);
  
  return (
    <Container component="main" maxWidth="xs" className={`fade-in-vertical ${isVisible ? 'active' : ''} common-styles`}>
      <CssBaseline />
      <div>
        <Typography variant="h5" align="center" gutterBottom>
          Log In
        </Typography>
        <form onSubmit={submitHandler} className={"form"}>
          <TextField
            color="primary"
            variant="outlined"
            type="text"
            name="email"
            id="email"
            label="Email"
            placeholder="Insert Email"
            size="medium"
            margin="normal"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoFocus
            autoComplete="email"
          />
          <TextField
            color="primary"
            variant="outlined"
            type="password"
            name="password"
            id="password"
            label="Password"
            placeholder="Insert Password"
            size="medium"
            margin="normal"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
          <Button
            variant="contained"
            name="iniciar"
            id="idIniciar"
            color="primary"
            type="submit"
            fullWidth
            sx={{ marginTop: 2 }}
          >
            Log In
          </Button>
          <div className={"noTienesCuentaContainer"}>
            <span>You don't have an account? </span>
            <Link to="/registro" className={"registrate"}>
              <b className={"registrate"}>Sign Up</b>
            </Link>
          </div>
        </form>
      </div>
    </Container>
  );
};
export default InicioSesion;
