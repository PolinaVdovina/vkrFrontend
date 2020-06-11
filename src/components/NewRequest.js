import React from 'react';
import { Grid, Typography, TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';

export default class NewRequest extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'data': '',
            'users_list': [],
            'id': null
        }
    }

    componentWillMount() {
        if (this.props.role == 'dispatcher') {
            fetch('/api/users_list', {
                method: 'GET',
                headers: {
                'Accept': 'application/json'
                }
            }).then(resp=>resp.json()).then(resp=>this.setState({'users_list': resp}));
        }
    }

    render() {
        return(
            <Grid container alignItems="flex-start" direction='column' spacing={2}>
                <Grid item>
                    <Typography>{this.props.label}</Typography>
                </Grid>
                <Grid item>
                    <TextField 
                        multiline 
                        rows={4}
                        variant="outlined"
                        value={this.state.description}
                        style={{'width': '400px'}}
                        onChange={(event) => this.setState({'data': event.target.value})}
                    />
                </Grid>
                { this.props.role == 'dispatcher' &&
                    <Grid item style={{'width': '400px'}}> 
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Сотрудник</InputLabel> 
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={this.state.id}
                                onChange={(event)=>this.setState({'id': event.target.value})}
                            >
                                {this.state.users_list.map(el =>
                                    <MenuItem value={el.id}>{el.name}</MenuItem>    
                                )}
                            </Select>
                        </FormControl>
                    </Grid>
                }
                <Grid item>
                    <Button
                        variant="contained" 
                        color="primary"
                        style={{'color': '#FFFFFF'}}
                        onClick={() => {
                            if (this.state.id)                            
                                this.props.onClickSave(this.state.id, this.state.data)
                            else
                                this.props.onClickSave(this.state.data)
                        }}
                    >
                        Отправить
                    </Button>
                </Grid>
            </Grid>
        )
    }
}