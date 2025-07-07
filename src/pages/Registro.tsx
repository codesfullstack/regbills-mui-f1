import React, { FunctionComponent, useEffect, useState } from "react";
import { TextField, Button, Container, CssBaseline, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { setCredentials } from "../slices/authSlice";
import { useDispatch } from 'react-redux';
import { register } from '../api/auth';
const isValidEmail = (email: string) =>
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
const Registro: FunctionComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleEmailValidation = (email: string) => {
    console.log("ValidateEmail was called with", email);
    const isValid = isValidEmail(email);
    return isValid;
  };
  
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      toast.error('Por favor, completa todos los campos.');
      return;
    }
    if (!handleEmailValidation(email)) {
      toast.error('Por favor, ingresa un email vÃ¡lido.');
      return;
    }
    try {
      const userData = await register({ name, email, password });
      console.log('Usuario registrado:', userData);
      navigate('/iniciosesion');
      toast.info('Usuario registrado exitosamente');
    } catch (err) {
      console.error('Error de registro:', err);
      const errorMessage = err as Error;
      toast.error(errorMessage.message || 'Error de registro');
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
          Sign Up
        </Typography>
        <form onSubmit={handleRegister} className={"form"}>
          { }
          <TextField
            color="primary"
            variant="outlined"
            defaultValue=""
            type="text"
            name="name"
            id="idName"
            label="Name"
            placeholder="Insert Name"
            size="medium"
            margin="normal"
            value={name}
            fullWidth
            autoFocus
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            color="primary"
            variant="outlined"
            type="text"
            name="email"
            id="idEmail"
            label="Email"
            placeholder="Insert Email"
            size="medium"
            margin="normal"
            value={email}
            fullWidth
            autoFocus
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            color="primary"
            variant="outlined"
            type="password"
            name="password"
            id="idPassword"
            label="Password"
            placeholder="Insert Password"
            size="medium"
            margin="normal"
            value={password}
            fullWidth
            autoFocus
            onChange={(e) => setPassword(e.target.value)}
          />
          { }
          <Button
            variant="contained"
            name="crearCuenta"
            id="idCrearCuenta"
            color="primary"
            type="submit"
            fullWidth
            sx={{ marginTop: 2 }}
          >
            Sign Up
          </Button>
          <div className={"yaTienesCuentaContainer"}>
            <span>You already have an account? </span>
            <Link to="/iniciosesion" className={"registrate"}>
              <b className={"registrate"}>Log In</b>
            </Link>
          </div>
        </form>
      </div>
    </Container>
  );
};
export default Registro;
