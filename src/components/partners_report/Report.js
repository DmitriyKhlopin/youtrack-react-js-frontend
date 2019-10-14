import React from "react";
import {PieChart, Pie, Sector, Cell,} from 'recharts';

export default function Report({w}) {
    const data1 = [
        {name: 'Group A', value: 400},
        {name: 'Group B', value: 300},
        {name: 'Group C', value: 300},
        {name: 'Group D', value: 200},
    ];

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    return (<div><PieChart width={w/2} height={w/6}>
        <Pie
            onClick={(a, b, c) => console.log([a, b, c])}
            data={data1}
            /*cx={w/4}
            cy={w/16}*/
            innerRadius={80}
            outerRadius={120}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
            label
        >
            {data1.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>)}
        </Pie>

    </PieChart></div>)
}