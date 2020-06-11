import React from 'react';
import { Typography } from '@material-ui/core';
import { list } from "./pages";
import { Redirect } from 'react-router';
import { connect } from "react-redux";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const mapStateToProps = function(state) {
    return {
		loggedIn: state.auth.loggedIn,
		login: state.auth.login,
        role: state.auth.role,
        user_id: state.auth.user_id
    }
}


  

class WorkersList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'rows': []
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
              id: this.props.user_id,
            })
        };
    
        fetch('/api/workers_list', (postSend)).then(response=>response.json()).then(response=>{
            let rows = [];             
            response.map(worker => {
                let color = '';
                if (worker.rating.toFixed(1) <= 2.5) {
                    color = '#FF0000'
                }
                else if (worker.rating.toFixed(1) <= 4 && worker.rating.toFixed(1) > 2.5) {
                    color = '#F9D71C'
                }
                else if (worker.rating.toFixed(1) > 4) {
                    color = '#00FF00'
                }
                rows.push({
                    'name': worker.name,
                    'rating': worker.rating.toFixed(1),
                    'color': color
                }); 
            this.setState({'rows': rows});              
            })
        })
    }

    render() {
        return(<>
            {!this.props.loggedIn  && <Redirect to={list.authError.path}/>}
            {this.props.loggedIn &&
                <TableContainer component={Paper} style={{'width': '500px'}}>
                    <Table aria-label="simple table">
                        <TableHead>
                        <TableRow style={{'width': '300px'}}>
                            <TableCell>Сотрудник</TableCell>
                            <TableCell>Рейтинг</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {this.state.rows.map((row) => (
                            <TableRow key={row.name}>
                                <TableCell>{row.name}</TableCell>                   
                                <TableCell style={{'color': row.color, 'fontWeight': 'bold'}}>{row.rating} </TableCell>                   
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            }
        </>)
    }
}

export default connect(mapStateToProps)(WorkersList)