import React from 'react';
import { Typography, Grid, TextField, Paper, Button, FormControl, InputLabel, Select, MenuItem} from '@material-ui/core';
import { list } from "./pages";
import { Redirect } from 'react-router';
import { connect } from "react-redux";
import { NavLink } from 'react-router-dom';

const mapStateToProps = function(state) {

    return {
		loggedIn: state.auth.loggedIn,
		user_id: state.auth.user_id,
		role: state.auth.role,
    }
}



function TextFieldInfo(props) {
    return(
        <Grid container direction="row" spacing={2} alignItems="center" justify="flex-end">
            <Grid item>
                <Typography>{props.header}</Typography>
            </Grid>
            <Grid item md={8} xs={12}>
                <TextField
                    required
                    fullWidth
                    value={props.value}
                    onChange={(event) => props.onChange(event)}
                />
            </Grid>
        </Grid> 
    )
}

function List(props) {
    return(
        <Grid container direction="row" spacing={2} alignItems="center" justify="flex-end">
            <Grid item>
                <Typography>{props.header}</Typography>
            </Grid>
            <Grid item md={8} xs={12}>
                <FormControl fullWidth>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={props.value}
                        onChange={(event) => props.onChange(event)}
                    >
                        {props.list.map(el => 
                            <MenuItem value={el.id}>{el.value}</MenuItem>
                        )}
                    </Select>
                </FormControl>
            </Grid>
        </Grid>
    )
}



const settings = {
    'user': {
        'name': {
            'label': 'ФИО',
            'type': 'text'
        },
        'phone': {
            'label': 'Телефон',
            'type': 'text'
        },
        'e_mail': {
            'label': 'Электронная почта',
            'type': 'text'
        },
        'position_id': {
            'label': 'Должность',
            'type': 'list',
            'list': 'positions'
        },
        'building': {
            'label': 'Здание',
            'type': 'text'
        },
        'cabinet': {
            'label': 'Кабинет',
            'type': 'text'
        },
        'programs': {
            'label': 'Установленное ПО',
            'type': 'text'
        },
        'id_organization': {
            'label': 'Организация',
            'type': 'list',
            'list': 'organizations'
        },
        'id_enterprise': {
            'label': 'Предприятие',
            'type': 'list',
            'list': 'enterprises'
        }
    },
    'engineer': {
        'name': {
            'label': 'ФИО',
            'type': 'text'
        },
        'phone': {
            'label': 'Телефон',
            'type': 'text'
        },
        'e_mail': {
            'label': 'Электронная почта',
            'type': 'text'
        },
        'position_id': {
            'label': 'Должность',
            'type': 'list',
            'list': 'positions'
        },
        'id_work_group': {
            'label': 'Рабочая группа',
            'type': 'list',
            'list': 'work_groups'
        }
    }
}




class Cabinet extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'user': {},
            'positions': [],
            'organizations': [],
            'enterprises': [],
            'work_groups': [],
            'wrongRole': false,
            'settings': null
        }
    }

    componentWillMount() {
        if (this.props.role == 'user') 
            this.setState({'settings': settings.user});
        else if (this.props.role == 'engineer' || this.props.role == 'supervisor' || this.props.role == 'dispatcher')
            this.setState({'settings': settings.engineer});
        else 
            this.setState({'wrongRole': true});

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
    
        fetch('/api/cabinet', (postSend)).then(response=>response.json()).then(response=>this.setState({'user':response}))
        
        fetch('/api/positions_list', {
                method: 'GET',
                headers: {
                'Accept': 'application/json'
                }
            }).then(resp=>resp.json()).then(resp=>this.setState({'positions': resp}));
        
            if (this.props.role == 'user') {
            
            fetch('/api/organizations_list', {
                method: 'GET',
                headers: {
                'Accept': 'application/json'
                }
            }).then(resp=>resp.json()).then(resp=>this.setState({'organizations': resp}));
            fetch('/api/enterprises_list', {
                method: 'GET',
                headers: {
                'Accept': 'application/json'
                }
            }).then(resp=>resp.json()).then(resp=>this.setState({'enterprises': resp}))
        }

        if (this.props.role == 'engineer' || this.props.role == 'supervisor' || this.props.role == 'dispatcher') {
            fetch('/api/workgroups', {
                method: 'GET',
                headers: {
                'Accept': 'application/json'
                }
            }).then(resp=>resp.json()).then(resp=>this.setState({'work_groups': resp}))
        }
        
        
    }

    saveHandler() {
        let postSend = {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            }           
        }
        if (this.props.role == 'supervisor') {
            let user = {};
            Object.keys(this.state.user).map(k => user[k] = this.state.user[k]);
            delete user.id_work_group;
            let body = {
                'user': user,
                'id_work_group': this.state.user.id_work_group
            }
            postSend.body = JSON.stringify(body);
        }
        else {
            postSend.body = JSON.stringify(this.state.user)
        }
        fetch('/api/update_user', (postSend)).then(response=>response.json()).then(resp=>alert(resp.msg))
    }

    render() {
        const list_fields = 
            Object.keys(this.state.user).map(key => {
                if (this.state.settings[key]) 
                    if (this.state.settings[key].type == 'text')
                        return( 
                            <Grid item style={{'margin': '10px'}}>
                                <TextFieldInfo 
                                    header={this.state.settings[key].label}
                                    value={this.state.user[key] ? this.state.user[key] : ''} 
                                    key={this.state.settings[key].label}
                                    onChange={(event) => this.setState({'user': {...this.state.user, [key]: event.target.value}})}
                                />
                            </Grid>                       
                        )
                    else
                        return(
                            <Grid item style={{'margin': '10px'}}>
                            <List
                                    header={this.state.settings[key].label}
                                    key={this.state.settings[key].label}
                                    list={this.state[this.state.settings[key].list]}
                                    value={this.state.user[key]}
                                    onChange={(event) => this.setState({'user': {...this.state.user, [key]: event.target.value}})}
                                /> 
                            </Grid>
                        )
            })

        return(<>
            {!this.props.loggedIn  && <Redirect to={list.auth.path}/>}
            {this.props.loggedIn &&
                <Grid container  justify="left" alignItems="center">
                    <Grid item component={Paper} elevation={3} square style={{padding:'32px'}} md={6} xs={12}>
                        { (this.props.role != 'supervisor' && this.props.role != 'dispatcher') &&
                        <>
                            <Typography variant="h4">                       
                                Рейтинг: {this.state.user.rating ? this.state.user.rating.toFixed(1) : ''}                                               
                            </Typography>                                       
                            <hr></hr>
                        </>
                        }
                        {list_fields} 
                        <Grid item>
                            <Grid container justify="center">
                                <Grid item style={{'margin': '12px'}}>
                                    <Button variant="contained" color="primary" onClick={()=> this.saveHandler()}>Сохранить</Button> 
                                    {
                                        (this.props.role == 'engineer') &&
                                        <Button 
                                            variant="contained" 
                                            color="primary" 
                                            style={{'marginLeft': '10px'}}
                                            component={NavLink}
                                            to={list.test.path}
                                        >
                                            Пройти квалификационное тестирование
                                        </Button> 
                                    }
                                </Grid> 
                            </Grid>                       
                        </Grid>                                  
                    </Grid>
                </Grid> 
            }
        </>)
    }
}

export default connect(mapStateToProps)(Cabinet)