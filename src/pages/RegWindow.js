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
import PermIdentity from '@material-ui/icons/PermIdentity';
import Typography from '@material-ui/core/Typography';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { connect } from "react-redux";
import { list } from "./pages";
import { Redirect } from "react-router";
import { Backdrop, CircularProgress, Select, MenuItem, FormControl, InputLabel } from '@material-ui/core';
import SelectInput from '@material-ui/core/Select/SelectInput';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow:1,
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


function RegWindow(props) {
  const classes = useStyles();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const [errorLogin, setErrorLogin] = useState('');
  const [userRole, setUserRole] = useState('');
  const [donload, setDonload] = useState(false);


  /*React.useEffect(()=>{
    try{
      let roles = localStorage.getItem('user_roles');
      if (roles.includes('SuperUser') || roles.includes('ChangeUser')) setAdmin(true);
    }
    catch{}
    setDonload(false);
  })*/

  function validate() {

    setErrorPassword('');
    setErrorLogin('');

    /*let roles = [];
    if (userRolesChangeUsers) roles.push('ChangeUser');
    if (userRolesChangeRecords) roles.push('ChangeRecord');*/

    const postSend = {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('access_token'), 
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          login,
          password,
          role: userRole,
        })
    };


    fetch('/api/auth/register', (postSend)).then((response=>response.json())).then(response=> {
                switch(response.msg) {
                    case 'NOT_ORIGINAL_LOGIN':
                        alert("логин занят")
                        setErrorLogin('Данный логин занят');
                        break;
                    case 'NO_LOGIN':
                        alert("пустой логин")
                        setErrorLogin('Заполните логин');
                        break;
                    case 'WRONG_ROLES':
                        alert('Ошибка в заполнении ролей пользователя');
                        break;
                    case 'OK':
                        alert('Пользователь добавлен успешно!');
                        break
                }
            })   

    if (password == '') setErrorPassword('Заполните пароль');
  }

      if(donload) return (
        <Backdrop open={true} style={{zIndex: 1}}>
          <CircularProgress/>
        </Backdrop>) 

      return(
        <>
          {/* (props.loggedIn && isAdmin) &&*/
          <Grid container component="main" className={classes.root} justify='center' alignItems='center'>
          <CssBaseline />
          <Grid item  component={Paper} elevation={6} square>
              <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                  <PermIdentity />
              </Avatar>
              <Typography component="h1" variant="h5">
                  Регистрация
              </Typography>
              <form className={classes.form}>
                  <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  error={errorLogin!=''}
                  fullWidth
                  id="email"
                  helperText={errorLogin}
                  label="Логин"
                  name="email"
                  autoComplete="login"
                  autoFocus
                  onChange={(event) => {setLogin(event.target.value)}}
                  />
                  <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  error={errorPassword!=''}
                  name="password"
                  helperText={errorPassword}
                  label="Пароль" 
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={(event) => {setPassword(event.target.value)}}
                  />
                  <Typography variant="h6">Выберите роль в программе:</Typography>
                  
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
                  Сохранить
                  </Button>
                  
              </form>
              </div>
          </Grid>
          </Grid>
        }
        {/*!props.loggedIn && <Redirect to={list.authError.path}/>*/}
        {/*(props.loggedIn && !isAdmin) && <Redirect to={list.rolesError.path}/>*/}
        </>
        )
    }



    export default connect(mapStateToProps)(RegWindow)
