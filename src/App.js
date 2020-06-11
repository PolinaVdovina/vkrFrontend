import React from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import {store} from './store'
import {Pages} from './pages/'
import { login } from './actions/AuthActions';
import { Kompot } from './components/ViewTable/Kompot';
import MainMenu from './components/MainMenu/MainMenu';
import { Backdrop, CircularProgress, MuiThemeProvider, Grid, makeStyles, Container } from '@material-ui/core';
import theme from './theme';


import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';

import Typography from '@material-ui/core/Typography';
import Rating from '@material-ui/lab/Rating';



const drawerWidth = 240;

const useStyles =  makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  /*root: {
    flexDirection:'column',
    display: 'flex',
    minHeight: '100vh',
    justifyContent:'center',
    background: 'linear-gradient(to right bottom, #ffffff, #58b0fc)'
    ,
  },
  drawer: {
    width: drawerWidth,

    zIndex: 100,
    whiteSpace: 'nowrap',

  },

  content: {
    display: 'flex',
    flexDirection: 'column',
    padding: '55px',

    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '70%',
    },
  },

  paper: {
    padding: '15px'
  }*/
}));



function App() {
	const [loading, setLoading] = React.useState(true);
	const classes = useStyles();
	
	React.useEffect(() => {
		if(localStorage.getItem('access_token')) {
		store.dispatch(login(localStorage.getItem('user_login'), localStorage.getItem('access_token'), localStorage.getItem('user_id'), localStorage.getItem('user_role') ? localStorage.getItem('user_role').split(',') : null));
		
		}
		setLoading(false);
	})

	return (
		<MuiThemeProvider theme={theme}>
			<Provider store={store}>    
				<div className={classes.root}>
					<CssBaseline />
					<AppBar position="fixed" className={classes.appBar}>
						<Toolbar>
						<Typography variant="h6" noWrap style={{'color':'#FFFFFF'}}>
							Управление инцидентами
						</Typography>
						</Toolbar>
					</AppBar>
					<MainMenu/>
					<main className={classes.content}>
						<Toolbar />
						<Grid container direction='row' style={{justifyContent:'center'}}>
							<Grid xs={12} xl={10} container direction='column' style={{minHeight:'100vh'}}>
								<Grid item />
								{loading && <Backdrop open={true}><CircularProgress/></Backdrop>}
								{!loading && Pages.getAllRoutesFromPages()}
							</Grid>
						</Grid>
					</main>
				</div>
			</Provider>
		</MuiThemeProvider>
  	);
}

export default App;
