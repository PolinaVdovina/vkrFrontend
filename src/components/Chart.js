import React, { useState,  PureComponent} from 'react';
import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';



export default class Chart extends PureComponent {
    static jsfiddleUrl = 'https://jsfiddle.net/alidingling/30763kr7/';

    constructor(props) {
        super(props)
    }
  
	render() {
	    return (
			<BarChart
                layout="vertical"
				width={900}
				height={300}
				data={this.props.elements}
				margin={{
					top: 30, right: 30, left: 100, bottom: 5,
			}}
			>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis type="number" />
                <YAxis dataKey="name" type="category" />
				<Tooltip />
				<Legend />
				<Bar dataKey="отсроченные" fill="#F9D71C" />
				<Bar dataKey="завершенные" fill="#00FF55" />
				<Bar dataKey="отказанные" fill="#FF0023" />               
			</BarChart>
	  );
	}
}