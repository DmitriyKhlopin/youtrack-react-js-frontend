import React, {useState} from "react";
import {PieChart, Pie, Sector, Cell,} from 'recharts';
import {groupBy} from "../../HelperFunctions";
import {MATERIAL_COLORS} from "../../Const";

export default function Report({w, itemsInRow, data, indicator}) {
    const [activeIndex, setActiveIndex] = useState(0);

    const renderActiveShape = (props) => {
        const RADIAN = Math.PI / 180;
        const {
            cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle,
            fill, payload, percent, value,
        } = props;
        const sin = Math.sin(-RADIAN * midAngle);
        const cos = Math.cos(-RADIAN * midAngle);
        const sx = cx + (outerRadius + 10) * cos;
        const sy = cy + (outerRadius + 10) * sin;
        const mx = cx + (outerRadius + 30) * cos;
        const my = cy + (outerRadius + 30) * sin;
        const ex = mx + (cos >= 0 ? 1 : -1) * 22;
        const ey = my;
        const textAnchor = cos >= 0 ? 'start' : 'end';

        return (
            <g>
                <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>{payload.name}</text>
                <Sector
                    cx={cx}
                    cy={cy}
                    innerRadius={innerRadius}
                    outerRadius={outerRadius}
                    startAngle={startAngle}
                    endAngle={endAngle}
                    fill={fill}
                />
                <Sector
                    cx={cx}
                    cy={cy}
                    startAngle={startAngle}
                    endAngle={endAngle}
                    innerRadius={outerRadius + 6}
                    outerRadius={outerRadius + 10}
                    fill={fill}
                />
                <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none"/>
                <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none"/>
                <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`${value}`}</text>
                <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
                    {`(${(percent * 100).toFixed(2)}%)`}
                </text>
            </g>
        );
    };

    const onPieEnter = (data, index) => setActiveIndex(index);

    let data1 = [];
    if (data && indicator && data.data[indicator]) {
        const d = groupBy(data.data[indicator], indicator);
        data1 = Object.values(d).map((item) => {
            return {name: item[0][indicator], value: item.length}
        });
    }

    /*const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];*/
    const COLORS = MATERIAL_COLORS;

    return (<div><PieChart width={w / itemsInRow} height={w / 5}>
        <Pie
            onClick={(a, b, c) => console.log([a, b, c])}
            data={data1}
            innerRadius={w / 24}
            outerRadius={w / 16}
            fill="#8884d8"
            paddingAngle={0.5}
            dataKey="value"
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
            onMouseEnter={onPieEnter}
        >
            {data1.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>)}
        </Pie>

    </PieChart></div>)
}