import React from 'react';
import { VictoryChart, VictoryLine, VictoryTheme, VictoryAxis, VictoryScatter} from "victory";
import FiberManualRecord from '@material-ui/icons/FiberManualRecord';
import { Grid, Typography, Avatar } from '@material-ui/core';


function massToObjects(mass) {
    let result = [];
    for (let i = 0; i < mass.length; i++) {
        result.push({x: mass[i], y: i+1});
    }
    return result;
}


export default class Chart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            maxDomain: null,
            minDomain: null
        }
    }

    componentWillMount() {
        let temp = this.props.data; 
        let maxX = 0; let minX = 100;
        let maxY = 0;
        for (let i = 0; i < temp.length; i++) {           
            if (Math.max.apply(Math, temp[i].depth_values) > maxX) maxX = Math.max.apply(Math, temp[i].depth_values);
            if (Math.min.apply(Math, temp[i].depth_values) < minX) minX = Math.min.apply(Math, temp[i].depth_values);
            if (temp[i].depth_values.length > maxY) maxY = temp[i].depth_values.length;
            temp[i].depth_values = massToObjects(temp[i].depth_values);
            let strColor = '#' + (Math.random().toString(16) + '000000').substring(2,8).toUpperCase();
            temp[i].color = strColor; 
        }    
        this.setState({data: temp, maxDomain: {x: maxX + 1, y: maxY + 1}, minDomain: {x: minX - 1, y: 0}})
    }

    render() {
        return(
        <Grid container direction="row" alignItems="center">
            <Grid item style={{flexGrow: 1}}>
                <VictoryChart 
                    theme={VictoryTheme.material}
                    minDomain={this.state.minDomain}
                    maxDomain={this.state.maxDomain}
                    width={600}
                >                
                    {this.state.data.map(el =>   
                        <VictoryLine
                            interpolation="catmullRom"
                            sortKey={0}
                            style={{
                                data: { stroke: el.color },
                                parent: { border: "1px solid #ccc"}
                            }}
                            data={el.depth_values}
                        />
                    )}

                    {this.state.data.map(el =>   
                        <VictoryScatter
                            style={{ data: { fill: el.color } }}
                            size={4}
                            sortKey={0}
                            data={el.depth_values}
                        />
                    )}                              
                    <VictoryAxis orientation="top"/> 
                    <VictoryAxis dependentAxis invertAxis/>
                </VictoryChart>
            </Grid>
            <Grid item>
                <Grid container direction="column" style={{padding: '30px'}}>                   
                    {this.state.data.map((el) => 
                    <Grid container direction="row">
                        <Grid item>
                            <Avatar style={{backgroundColor: el.color}}>
                                <FiberManualRecord></FiberManualRecord>
                            </Avatar>                    
                        </Grid>
                        <Grid item>
                            <Typography variant='h4'>{el.date}</Typography>
                        </Grid>
                    </Grid>
                    )}
                </Grid>            
            </Grid>
        </Grid>
        )
    }
}