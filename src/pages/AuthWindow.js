import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { store } from '../store';
import { login } from '../actions/AuthActions';
import { connect } from 'react-redux';
import {Link as RouteLink, Redirect, withRouter, NavLink} from 'react-router-dom'
import { Backdrop, CircularProgress, Select, MenuItem, FormControl, InputLabel } from '@material-ui/core';
import { list } from "./pages";

const useStyles = makeStyles((theme) => ({
  root: {
    alignItems:'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.action,
  },
  form: {
    width: '100%', 
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),   
  },
}));



const mapStateToProps = function(state) {
  return {
    loggedIn: state.auth.loggedIn,
    login: state.auth.login,
  }
}



function AuthWindow(props) {
  const classes = useStyles();
  const [userLogin, setUserLogin] = useState('');
  const [password, setPassword] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const [errorLogin, setErrorLogin] = useState('');
  const [userRole, setUserRole] = useState('');


  function validate() {

    setErrorPassword('');
    setErrorLogin('');

    const postSend = {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          login: userLogin,
          password,
        })
    };

    fetch('/api/auth/login', (postSend)).then((response=>response.json())).then(response=> { 
      switch(response.msg) {
            case 'WRONG_LOGIN':
                userLogin == '' ? setErrorLogin('Заполните логин') : setErrorLogin('Неверный логин');
                break
            case 'WRONG_PASSWORD':
                password == '' ? setErrorPassword('Заполните пароль') : setErrorPassword('Неверный пароль');
                break
            case 'OK':
                if (userRole === response.role) {
                    localStorage.setItem('access_token',response.access_token);
                    //localStorage.setItem('user_login', userLogin);
                    localStorage.setItem('user_id',response.user_id);     
                    localStorage.setItem('user_role',response.role);                     
                    store.dispatch(login(response.login, response.access_token, response.user_id, response.role));
                    
                }
                else alert('Выбранная роль не соответствует существующей учетной записи')
                break
        }
    });

    if (password === '') setErrorPassword('Заполните пароль');
    if (userLogin === '') setErrorLogin('Заполните логин');
  }

  if (props.loggedIn) 
    return (
      <Redirect to={list.homePage.path} />
    )

  return (
    <Grid container style={{flexGrow:1}} component="main" className={classes.root} justify='center' alignItems='center'>
      <CssBaseline />
      <Grid item  component={Paper} elevation={6}>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Авторизация
          </Typography>
          <form className={classes.form}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              error={errorLogin!==''}
              fullWidth
              id="email"
              helperText={errorLogin}
              label="Логин"
              name="email"
              autoComplete="login"
              autoFocus
              onChange={(event) => {setUserLogin(event.target.value)}}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              error={errorPassword!==''}
              name="password"
              helperText={errorPassword}
              label="Пароль" 
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(event) => {setPassword(event.target.value)}}
            />
            <Grid container>
                      <Grid item md={12}>
                          <FormControl className={classes.formControl} fullWidth>
                            <InputLabel id="demo-simple-select-label">Роль</InputLabel> 
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={userRole}
                              onChange={(event)=>setUserRole(event.target.value)}
                            >
                              <MenuItem value="user">Пользователь</MenuItem>
                              <MenuItem value="dispatcher">Диспетчер</MenuItem>
                              <MenuItem value="engineer">Инженер поддержки</MenuItem>
                              <MenuItem value="supervisor">Руководитель РГ</MenuItem>
                            </Select>
                          </FormControl>
                      </Grid>
                  </Grid>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={validate}
              style={{'color': '#FFFFFF'}}
            >
              Войти
            </Button>
          </form>
          <NavLink to={list.register.path}>Нет аккаунта? Зарегистрироваться</NavLink>
        </div>
      </Grid>
    </Grid>
  );
}

export default connect(mapStateToProps)(withRouter(AuthWindow));