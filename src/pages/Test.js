import React from 'react';
import { Typography, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Grid, Button } from '@material-ui/core';
import { connect } from "react-redux";

const mapStateToProps = function(state) {

    return {
		loggedIn: state.auth.loggedIn,
		user_id: state.auth.user_id,
		role: state.auth.role,
    }
}

const data = [
    {
        name: 'вопрос 1',
        answers: [
            {
                text: 'ответ 1',
                right: true
            },
            {
                text: 'ответ 2',
                right: false
            },
            {
                text: 'ответ 3',
                right: false
            }
        ]
    },
    {
        name: 'вопрос 2',
        answers: [
            {
                text: 'ответ 1',
                right: true
            },
            {
                text: 'ответ 2',
                right: false
            },
            {
                text: 'ответ 3',
                right: false
            }
        ]
    },
    {
        name: 'вопрос 3',
        answers: [
            {
                text: 'ответ 1',
                right: true
            },
            {
                text: 'ответ 2',
                right: false
            },
            {
                text: 'ответ 3',
                right: false
            },
            {
                text: 'ответ 4',
                right: false
            }
        ]
    }
]

class Test extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return(
            <Grid container direction='column'>
                <Typography variant='h4'>Пожалуйста, ответьте на вопросы</Typography>
            {
                data.map(quest => 
                    <Grid item style={{'marginLeft': '50px'}}>
                        <FormControl component="fieldset">
                            <FormLabel component="legend" style={{'fontSize': '32px', 'padding': '20px'}}>{quest.name}</FormLabel>
                            <RadioGroup /*value={value} onChange={handleChange}*/>
                                {
                                    quest.answers.map(ans => 
                                        <FormControlLabel 
                                            value={ans.text} 
                                            control={<Radio />} 
                                            label={ans.text} 
                                            style={{'marginLeft': '32px'}}
                                        />
                                    )
                                }
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                )
            }
            <Grid item>
                <Button 
                    variant="contained" 
                    color="primary" 
                    style={{'marginLeft': '60px', 'marginTop': '20px', 'color': '#FFFFFF'}}
                >
                    Завершить тест
                </Button> 
            </Grid>
            </Grid>            
        )
    }
}

export default connect(mapStateToProps)(Test)