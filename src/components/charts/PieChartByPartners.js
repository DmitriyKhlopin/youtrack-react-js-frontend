import React, {useEffect} from "react";
import {Cell, Legend, Pie, PieChart, ResponsiveContainer} from "recharts";
import {CHART_DEFAULT_MARGINS, MATERIAL_COLORS, RADIAN} from "../../Const";
import {useDispatch, useSelector} from "react-redux";
import {selectProjects} from "../../redux/combined/dictionaries";
import {selectSelectedProjects, selectSelectedStates, selectSelectedTypes} from "../../redux/combined/reportFilters";
import {fetchCreatedOnWeekByPartnersData, selectCreatedOnWeekByPartnersData} from "../../redux/combined/createdOnWeekByPartners";

export const renderCustomizedLabel = ({cx, cy, midAngle, innerRadius, outerRadius, percent, index, value, name, fill}) => {
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
            <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none"/>
            <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none"/>
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor}
                  fill={fill}>{`${name} - ${value}`}</text>

        </g>
    );
};

const PieChartByPartners = () => {
    const dispatch = useDispatch();
    const projects = useSelector(selectProjects);
    const selectedTypes = useSelector(selectSelectedTypes);
    const selectedProjects = useSelector(selectSelectedProjects);
    const selectedStates = useSelector(selectSelectedStates);
    const data = useSelector(selectCreatedOnWeekByPartnersData);
    useEffect(() => {
        dispatch(fetchCreatedOnWeekByPartnersData());
    }, [projects, selectedProjects, selectedTypes, selectedStates]);
    const handleClick = (data, index) => {
        console.log(data);
        console.log(index);
    };

    return <ResponsiveContainer width='100%' aspect={4.0 / 2.0}>
        <PieChart margin={CHART_DEFAULT_MARGINS}>
            <Pie data={data}
                 nameKey={'key'}
                 dataKey={'value'}
                 labelLine={true}
                 label={renderCustomizedLabel}
                 fill="#8884d8"
                 startAngle={450}
                 endAngle={90}
                 paddingAngle={1}
                 onClick={handleClick}
                 isAnimationActive={false}
                 legendType={'none'}
            >
                {data.map((entry, index) => <Cell key={`cell-${index}`} fill={MATERIAL_COLORS[index % MATERIAL_COLORS.length]}/>)}
            </Pie>
            <Legend/>
        </PieChart>
    </ResponsiveContainer>

}


export default PieChartByPartners;
