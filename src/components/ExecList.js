import React from 'react';
import { FormControl, Select, MenuItem } from '@material-ui/core';

export default class ExecList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'id': null,
            'exec_list': []
        }
    }

    componentWillMount() {
        if (this.props.role == 'supervisor') {
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

            fetch('/api/workers_list', (postSend)).then(response=>response.json()).then(response=>this.setState({'exec_list': response}))
        }
        
        else if (this.props.role == 'dispatcher') {
            const postSend = {
                method: 'GET',
                headers: {
                  'Accept': 'application/json'
                }
            };

            fetch('/api/workgroups', (postSend)).then(response=>response.json()).then(response=>this.setState({'exec_list': response}))
        }  
    }

    onChangeClick(data) {
        this.setState({'id': data})
        
        let body = {}
        if (this.props.role == 'supervisor') {
            body = {
                'id': this.props.id,
                'id_executor': data
            }
        }
        else if (this.props.role == 'dispatcher') {
            body = {
                'id': this.props.id,
                'id_work_group': data
            }
        }

        const postSend = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }, 
            body: JSON.stringify(body)
        }

        fetch('/api/update_work_task', (postSend)).then(response=>response.json())
    }

    render() {
        return(
            <FormControl style={{'width': '250px'}}>
                <Select
                    value={this.state.id}
                    onChange={(event) => this.onChangeClick(event.target.value)}
                >
                    {this.state.exec_list.map(el => 
                        <MenuItem value={el.id}>{el.name ? el.name : el.value}</MenuItem>
                    )}
                </Select>
            </FormControl>
        )
    }
}