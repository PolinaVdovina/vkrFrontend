import React from 'react';
import { Typography, Grid, Button, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { list } from "./pages";
import { Redirect } from 'react-router';
import { connect } from "react-redux";
import TableAnal from '../components/TableAnal'
import Chart from '../components/Chart'


const mapStateToProps = function(state) {
    return {
		loggedIn: state.auth.loggedIn,
		user_id: state.auth.user_id,
		role: state.auth.role,
    }
}

class Analytics extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'elements': [],
            'total': {},
            'period': 'month'
        }
    }

    componentWillMount() {       
        const postSend = {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              id: this.props.user_id
            })
        };

        let url = ''
        if (this.props.role == 'supervisor') url = '/api/workers_list_anal'
        else if (this.props.role == 'dispatcher') url = '/api/work_groups_list_anal'
    
        fetch(url, (postSend)).then(response=>response.json()).then(response=>this.setState({'elements': response})).then(resp=> {
            let sum_amount = 0;
            let sum_delay = 0;
            let sum_refuse = 0;
            let sum_time = 0;
            for (let i = 0; i < this.state.elements.length; i++) {
                sum_amount += this.state.elements[i].amount;
                sum_delay += this.state.elements[i].amount_delay;
                sum_refuse += this.state.elements[i].amount_refuse;
                sum_time += this.state.elements[i].time_sr;
            }
            const temp = {
                'name': 'Всего',
                'amount': sum_amount, 
                'time_sr': sum_time,     
                'amount_delay': sum_delay, 
                'amount_refuse': sum_refuse
            }
            this.setState({'total': temp})
        })
    }

    dataStructs(props) {
        let data = []
        for (let i = 0; i < props.length; i++) {
            let temp = {
                name: props[i].name,
                завершенные: props[i].amount,
                отсроченные: props[i].amount_delay,
                отказанные: props[i].amount_refuse,
            }
            data.push(temp)
        }
        return (data)
    }

    render() {
        return( <>
            {!this.props.loggedIn  && <Redirect to={list.authError.path}/>}  
            {this.props.loggedIn && 
                <Grid container direction='column'>
                    <Grid container direction='row' style={{'margin': '15px'}}>
                        <Grid item>
                            <Typography variant='h6'>Период:</Typography>
                        </Grid>
                        <Grid item>
                            <FormControl fullWidth style={{'marginLeft': '20px'}} displayEmpty>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={this.state.period}
                                    onChange={(event)=>this.setState({'period': event.target.value})}
                                >
                                    <MenuItem value="month">Месяц</MenuItem>
                                    <MenuItem value="quarter">Квартал</MenuItem>
                                    <MenuItem value="year">Год</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <TableAnal id={this.props.user_id} elements={this.state.elements} total={this.state.total}></TableAnal> 
                    </Grid>
                    { this.props.role == 'dispatcher' &&
                        <Grid item>
                            <Button                        
                                variant="contained" 
                                color="primary"
                                style={{'width': '300px', 'margin': '32px', 'color': '#FFFFFF'}}
                            >
                                Сформировать отчет
                            </Button>
                        </Grid>
                    } 
                    <Grid item>
                        <Chart elements={this.dataStructs(this.state.elements)}></Chart>  
                    </Grid>                                                                           
                </Grid>  
            }                                           
        </>)
    }
}

export default connect(mapStateToProps)(Analytics)