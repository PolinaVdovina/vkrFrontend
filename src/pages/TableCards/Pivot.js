import React from 'react';
import { Kompot } from '../../components/ViewTable/Kompot';
import { samplesSettings, pivotSettings } from '../../components/ViewTable/tableSettings'
import HouseCard from '../../components/HouseCard';
import { withRouter } from 'react-router';
import { list } from '../pages';
import { TableHead, TableCell, Table, TableRow, TableBody } from '@material-ui/core';

class Pivot extends React.Component {
    constructor(props) {
        super(props);
        let headers = {...pivotSettings.headers};
        this.state = {
            settings: pivotSettings,
            init: false,
        };
        
    }

    async componentDidMount() {
        
    }

    getDataHandler = (data) => {
        this.setState({
            data: data,
            init: true,
        });
        
    }

    drawHeader = () => {
        const {
            depths,
            entities
        } = this.state.data;
        if(!depths)
            return;
        return depths.map((value) => 
        <TableCell>
        {value}
        </TableCell>
    )
    }

    drawBody = (id) => {
        const {
            depths,
            entities
        } = this.state.data;
        
        if(!depths)
            return;

        if(!entities)
            return;
        //alert(JSON.stringify(entities))
        return depths.map((value, index) => 
            <TableCell>
            {entities[id].depth_values[index]}
            </TableCell>
        )
    }

    drawDepths = () => {
        const {
            depths,
            entities
        } = this.state.data;
        if(!depths)
            return;
        if(!entities)
            return;
        return (
            <Table>
                <TableHead>
                    <TableRow>
                    {
                        depths.map((value) => 
                            <TableCell>
                            {value}
                            </TableCell>
                        )
                    }
                    </TableRow>
                </TableHead>
                <TableBody>
                {
                    entities.map((entities) => 
                        <TableRow>
                        {
                            depths.map((value, index) => 
                                <TableCell>
                                {entities.depth_values[index]}
                                </TableCell>
                            )
                        }
                        </TableRow>
                    )
                }
                </TableBody>
            </Table>
        );
    }

    render() {
        const {
            init=false
        } = this.state;

        const id = this.props.match.params.id;
        return(
            <>
                <Kompot
                drawHeader={init ? this.drawHeader : null}
                drawBody={init ? this.drawBody : null}
                settings={pivotSettings}
                onGetData={this.getDataHandler}
                staticFilters={{ tubeId:[{type:'equal',value:id}] }}
                />

            </>
        )
    }
} 

export default withRouter(Pivot)