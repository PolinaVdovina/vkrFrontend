import React from 'react';
import { Typography, Paper, Button, Dialog, DialogTitle, DialogContent} from '@material-ui/core';
import { list } from "./pages";
import { Redirect } from 'react-router';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import TablePanel from '../components/TablePanel'
import NewRequest from '../components/NewRequest'

const mapStateToProps = function(state) {
    return {
		loggedIn: state.auth.loggedIn,
		login: state.auth.login,
        role: state.auth.role,
        user_id: state.auth.user_id
    }
}

const settings = {
    'user': [
        {
            'type': 'in_works',
            'label': "В работе"
        }, 
        {
            'type': 'will_estimate',
            'label': "Ожидают оценки"
        }, 
        {
            'type': 'complete',
            'label': "Завершено"
        }
    ],
    'engineer': [
        {
            'type': 'new',
            'label': 'Новые задания'
        }, 
        {
            'type': 'in_work',
            'label': 'В работе'
        }, 
        {
            'type': 'complete',
            'label': 'Завершено'
        }
    ],
    'dispatcher': [
        {
            'type': 'in_process',
            'label': 'В обработке'
        },
        {
            'type': 'appointed',
            'label': 'Распределенные'
        },
        {
            'type': 'refuse',
            'label': 'ОТказанные'
        },
        {
            'type': 'delay',
            'label': 'Отсроченные'
        },
        {
            'type': 'arbitr',
            'label': 'Арбитраж'
        }
    ]
}

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`wrapped-tabpanel-${index}`}
            aria-labelledby={`wrapped-tab-${index}`}
            {...other}
        >
            {value === index && (
            <Box p={3}>
                <Typography>{children}</Typography>
            </Box>
            )}
        </div>
    );
}
  
TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};
  
function a11yProps(index) {
    return {
        id: `wrapped-tab-${index}`,
        'aria-controls': `wrapped-tabpanel-${index}`,
    };
}
  
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
}));
  
function TabsWrappedLabel(props) {
    const classes = useStyles();
    const [value, setValue] = React.useState('1');
  
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
  
    return (
        <div className={classes.root}>
            <AppBar position="static">
            <Tabs value={value} onChange={handleChange} aria-label="wrapped label tabs example" style={{'color': '#FFFFFF'}}>
                <Tab
                    value="1"
                    label={props.types ? props.types[0].label : ''}
                    {...a11yProps('one')}
                />
                <Tab value="2" label={props.types ? props.types[1].label : ''} {...a11yProps('two')} />
                <Tab value="3" label={props.types ? props.types[2].label : ''} {...a11yProps('three')} />
                {props.types[3] &&
                    <Tab value="4" label={props.types ? props.types[3].label : ''} {...a11yProps('four')} />
                }
                {props.types[4] &&
                    <Tab value="5" label={props.types ? props.types[4].label : ''} {...a11yProps('four')} />
                }
            </Tabs>
            </AppBar>
            
            
            <TabPanel value={value} index="1">
                <TablePanel role={props.role} type={props.types ? props.types[0].type : ''} id={props.id}></TablePanel>
            </TabPanel>
            <TabPanel value={value} index="2">
                <TablePanel role={props.role} type={props.types ? props.types[1].type : ''}id={props.id}></TablePanel>
            </TabPanel>
            <TabPanel value={value} index="3">
                <TablePanel role={props.role} type={props.types ? props.types[2].type : ''} id={props.id}></TablePanel>
            </TabPanel>
            {props.types[3] &&
                <TabPanel value={value} index="4">
                    <TablePanel role={props.role} type={props.types ? props.types[3].type : ''} id={props.id}></TablePanel>
                </TabPanel>
            }
            {props.types[4] &&
                <TabPanel value={value} index="5">
                    <TablePanel role={props.role} type={props.types ? props.types[4].type : ''} id={props.id}></TablePanel>
                </TabPanel>
            }
        </div>
    );
}

class IncidentsList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'value': 0,
            'isOpen': false,
            'isTesting': null,
            'rating': null,
            'isDonload': false
        }
    }

    componentWillMount() {
        if (this.props.role == 'engineer') {
            const postSend = {
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  id: this.props.user_id,
                  role: this.props.role,
                })
            };
        fetch('/api/cabinet', (postSend)).then(response=>response.json()).then(response=>
            this.setState(
                {
                    'isTesting':response.is_testing, 
                    'rating': response.rating, 
                    'isDonload': true
                }
            ))
        }
    }

    saveNewRequest = (id = null, description) => {
        let body = {
            'id_user': id ? id : this.props.user_id,
            'id_method': 1,
            'id_status': 1,
            'date_reg': new Date(),
            'description': description
        }
        
        const postSend = {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            }, 
            body: JSON.stringify(body)
        }

        this.setState({'isOpen': false})

        fetch('/api/create_new_inc', (postSend)).then(response=>response.json())
    }

    render() {
        return(<>
            {!this.props.loggedIn  && <Redirect to={list.authError.path}/>}
            {(this.props.role == 'engineer' && (this.state.isTesting != true || this.state.rating <= 2.8) && this.state.isDonload) && <Redirect to={list.rightsError.path}/>}
            {(this.props.loggedIn && this.state.isDonload) &&  <>
                <Dialog open={this.state.isOpen} onClose={() => this.setState({'isOpen': false})}>
                    <DialogTitle>Новая заявка</DialogTitle>
                    <DialogContent>
                        <NewRequest onClickSave={this.saveNewRequest} label='Опишите проблему:' role={this.props.role}></NewRequest>
                    </DialogContent>
                </Dialog>
            {  (this.props.role == 'user' || this.props.role == 'dispatcher') &&
                <Button 
                    variant="contained" 
                    color="primary" 
                    style={{'width': '300px', 'marginBottom': '20px', 'color': '#FFFFFF'}}
                    onClick={() => this.setState({'isOpen': true})}
                >
                    Создать заявку
                </Button> }                                 
                <TabsWrappedLabel role={this.props.role} types={settings[this.props.role]} id={this.props.user_id}></TabsWrappedLabel></>}
        </>)
    }
}

export default connect(mapStateToProps)(IncidentsList)