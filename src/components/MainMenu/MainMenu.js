import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import PieChartIcon from '@material-ui/icons/PieChart';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ViewListIcon from '@material-ui/icons/ViewList';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import { NavLink } from 'react-router-dom';
import { list } from '../../pages/pages';
import { store } from '../../store';
import { logout } from '../../actions/AuthActions';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
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
}));

const mapStateToProps = function(state) {
    return {
		loggedIn: state.auth.loggedIn,
		login: state.auth.login,
		role: state.auth.role,
    }
}

function MainMenu(props) {
	const classes = useStyles();

	function exit() {
		localStorage.removeItem('access_token');
		localStorage.removeItem('user_login');
		localStorage.removeItem('user_id');
		localStorage.removeItem('user_role');
		store.dispatch(logout())
	}

    return(
        <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <List>
            { !props.loggedIn && 
				<ListItem button component="a" href={list.auth.path}>
					<ListItemIcon><InboxIcon/></ListItemIcon>
					<ListItemText primary='Войти/зарегистрироваться'/>
				</ListItem>
            }
            { props.loggedIn && <>
				{ 
				<ListItem button component="a" href={list.cabinet.path}>
						<ListItemIcon><AccountBoxIcon/></ListItemIcon>
						<ListItemText primary='Личный кабинет'/>
				</ListItem>
				}
				{ props.role != 'supervisor' &&
				<ListItem button component="a" href={list.incidents.path}>
						<ListItemIcon><ViewListIcon/></ListItemIcon>
						<ListItemText primary='Список инцидентов'/>
				</ListItem>
				}
				{ (props.role == 'supervisor' || props.role == 'dispatcher') &&
				<ListItem button component="a" href={list.analytics.path}>
						<ListItemIcon><PieChartIcon/></ListItemIcon>
						<ListItemText primary='Аналитика'/>
				</ListItem>
				}
				{ props.role == 'supervisor' &&
				<ListItem button component="a" href={list.workersList.path}>
						<ListItemIcon><SupervisorAccountIcon/></ListItemIcon>
						<ListItemText primary='Список работников'/>
				</ListItem>
				}
					<ListItem button onClick={exit}>
						<ListItemIcon><ExitToAppIcon/></ListItemIcon>
						<ListItemText primary='Выход'/>
					</ListItem>
			</>}
        </List>
        </div>
      </Drawer>
    )
}

export default connect(mapStateToProps)(MainMenu)