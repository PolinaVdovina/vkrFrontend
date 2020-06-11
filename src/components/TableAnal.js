import React from 'react';
import { Typography, TableContainer, Table, TableHead, TableRow, TableBody, TableCell, Paper} from '@material-ui/core';

const settings = {
    'name': null, 
    'amount': null, 
    'time_sr': null,     
    'amount_delay': null, 
    'amount_refuse': null
}


export default class TableAnal extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        //if (this.state.workers[0]) alert(JSON.stringify(this.state.workers[0].name))
        return(
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Исполнитель</TableCell>
                            <TableCell>Количество выполненных заданий</TableCell>
                            <TableCell>Среднее время выполнения</TableCell>
                            <TableCell>Нарушенных крайних сроков</TableCell>
                            <TableCell>Отказов от выполнения</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>                                                
                            {this.props.elements.map(el => {
                                if (el) return(
                                    <TableRow key={el.name}>                                                                                          
                                        {
                                            Object.keys(settings).map(key => 
                                                <TableCell key={key}>
                                                    {el[key]}
                                                </TableCell> 
                                            )
                                        }                                                                                                                                          
                                    </TableRow>
                                )
                            })} 
                            <TableRow>                                                                                          
                                {
                                    Object.keys(settings).map(key => 
                                        <TableCell key={key} style={{'fontWeight': 'bold'}}>
                                            {this.props.total[key]}
                                        </TableCell> 
                                    )
                                }                                                                                                                                          
                            </TableRow>                                                                                                                                                                  
                    </TableBody>                   
                </Table>
            </TableContainer> 
        )
    }
}