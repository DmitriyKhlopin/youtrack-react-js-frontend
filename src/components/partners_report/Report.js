import React, {useState} from "react";
import {Cell, Pie, PieChart, Sector,} from 'recharts';
import {groupBy} from "../../HelperFunctions";
import {MATERIAL_COLORS} from "../../Const";

export default function Report({w, rowSize, itemsInRow, indexInRow, data, indicator}) {
    const applyMargin = itemsInRow < rowSize && itemsInRow !== 1;
    const [activeIndex, setActiveIndex] = useState(0);
    const marginLeft = applyMargin && indexInRow === 1 ? w/6 : 0;
    const marginRight = applyMargin && indexInRow === itemsInRow ? w/6 : 0;

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

    const COLORS = MATERIAL_COLORS;

    const pieWidth = w / itemsInRow;
    const pieHeight = w / (itemsInRow * 1.5 > 5 ? itemsInRow : 5);
    const innerRadius = w / 21;
    const outerRadius = w / 15;

    const onClick = (a, b, c) => {
        console.log([a, b, c]);
        var win = window.open("http://localhost:3000/partners?indicator=1&value=2", '_blank');
        win.focus();
    };


    return (
        <div style={{marginLeft: marginLeft, marginRight: marginRight}}><PieChart
            width={pieWidth - marginLeft - marginRight} height={pieHeight}>
            <Pie
                onClick={onClick}
                data={data1}
                innerRadius={innerRadius}
                outerRadius={outerRadius}
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