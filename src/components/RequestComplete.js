import React from 'react';
import { Grid, Typography, TextField, Button } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';

export default class RequestComplete extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'solution': '',
            'rating': ''
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
                        onChange={(event) => this.setState({'solution': event.target.value})}
                    />
                </Grid>
                <Grid item>
                    <Typography>Пожалуйста, оцените взаимодействие с пользователем:</Typography>
                </Grid>
                <Grid item>
                    <Rating
                        value={this.state.rating}
                        onChange={(event) => this.setState({'rating': event.target.value})}            
                    />
                </Grid>
                <Grid item>
                    <Button
                        variant="contained" 
                        color="primary"
                        style={{'color': '#FFFFFF'}}
                        onClick={() => this.props.onClickSave(this.state.solution, this.state.rating)}
                    >
                        Отправить
                    </Button>
                </Grid>               
            </Grid>
        )
    }
}