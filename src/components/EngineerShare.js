import React from 'react';
import { Grid, Typography, TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';

export default class EngineerShare extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'user': '',
            'users_list': []
        }
    }

    componentWillMount() {
        fetch('/api/workers_list', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(resp=>resp.json()).then(resp=>this.setState({'users_list': resp}));
    }

    render() {
        return(
            <Grid container alignItems="flex-start" direction='column' spacing={2}>
                <Grid item>
                    <Typography>{this.props.label}</Typography>
                </Grid>
                <Grid item style={{'width': '400px'}}> 
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Сотрудник</InputLabel> 
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={this.state.user}
                            onChange={(event)=>this.setState({'user': event.target.value})}
                        >
                            {this.state.users_list.map(el =>
                                <MenuItem value={el.id}>{el.name}</MenuItem>    
                            )}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item>
                    <Button
                        variant="contained" 
                        color="primary"
                        style={{'color': '#FFFFFF'}}
                        onClick={() => this.props.onClickSave(this.state.user)}
                    >
                        Отправить
                    </Button>
                </Grid>
            </Grid>
        )
    }
}