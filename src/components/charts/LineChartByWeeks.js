import React, {useEffect} from "react";
import {CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {CHART_DEFAULT_MARGINS, MATERIAL_LINE_CHART_COLORS} from "../../Const";
import {useDispatch, useSelector} from "react-redux";
import {selectProjects} from "../../redux/combined/dictionaries";
import {selectSelectedProjects, selectSelectedStates, selectSelectedTypes} from "../../redux/combined/reportFilters";
import {fetchDynamicsData, selectDynamicsData} from "../../redux/combined/dynamicsReport";
import {format} from "date-fns";


function LineChartByWeeks() {
    const dispatch = useDispatch();
    const projects = useSelector(selectProjects);
    const selectedTypes = useSelector(selectSelectedTypes);
    const selectedProjects = useSelector(selectSelectedProjects);
    const selectedStates = useSelector(selectSelectedStates);
    const data = useSelector(selectDynamicsData);
    useEffect(() => {
        dispatch(fetchDynamicsData());
    }, [projects, selectedProjects, selectedTypes, selectedStates]);

    const handleClick = (d, index) => {
        console.log(d);
        /*const filters = {
            week: data.activeLabel,
        };
        dispatch(openDrillDown('aaaa'));*/
    };



    return <ResponsiveContainer aspect={4.0 / 2.0}>
        <LineChart
            data={data}
            margin={CHART_DEFAULT_MARGINS}
            onClick={handleClick}
        >
            <XAxis type="date" dataKey="week" tickFormatter={formatXAxis} minTickGap={1}/>
            <YAxis axisLine={false}/>
            <CartesianGrid strokeDasharray="3 3"/>
            <Tooltip/>
            <Legend/>
            <Line type="monotone" dataKey="active" stroke={MATERIAL_LINE_CHART_COLORS[0]}
                  name="В работе"/>
            <Line type="monotone" dataKey="created" stroke={MATERIAL_LINE_CHART_COLORS[1]}
                  name="Создано"/>
            <Line type="monotone" dataKey="resolved" stroke={MATERIAL_LINE_CHART_COLORS[2]}
                  name="Решено"/>
        </LineChart>
    </ResponsiveContainer>
}


export default LineChartByWeeks;

function formatXAxis(tickItem) {
// If using moment.js
    return format(tickItem, 'yyyy-MM-dd');
}
