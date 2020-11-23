import React, {useEffect} from "react";
import {Bar, BarChart, Cell, ResponsiveContainer, XAxis, YAxis} from "recharts";
import {CHART_DEFAULT_MARGINS, MATERIAL_COLORS} from "../../Const";
import {useDispatch, useSelector} from "react-redux";
import {selectProjects} from "../../redux/combined/dictionaries";
import {selectDateFrom, selectDateTo, selectSelectedProjects, selectSelectedStates, selectSelectedTypes} from "../../redux/combined/reportFilters";
import {fetchAverageLifetimeData, selectAverageLifetimeReportData, selectAverageLifetimeReportMaxValue} from "../../redux/combined/averageLifetimeReport";

const CustomBarLabel = ({width, payload, x, y, value}) => {
    return (
        <text x={x + width / 2} y={y} fill="#777" dy={-6} textAnchor="middle">
            {value}
        </text>
    );
}

const BarChartByAverageLifetime = () => {
    const dispatch = useDispatch();
    const projects = useSelector(selectProjects);
    const selectedTypes = useSelector(selectSelectedTypes);
    const selectedProjects = useSelector(selectSelectedProjects);
    const selectedStates = useSelector(selectSelectedStates);
    const dateFrom = useSelector(selectDateFrom);
    const dateTo = useSelector(selectDateTo);
    const data = useSelector(selectAverageLifetimeReportData);
    useEffect(() => {
        dispatch(fetchAverageLifetimeData());
    }, [projects, selectedProjects, selectedTypes, selectedStates, dateFrom, dateTo]);
    return data.length > 0 ? <ResponsiveContainer width='100%' aspect={4.0 / 2.0}>
        <BarChart margin={CHART_DEFAULT_MARGINS} data={data}>
            <XAxis dataKey="key" axisLine={false}/>
            <YAxis type="number" tick={false} axisLine={false} domain={[0, dataMax => (dataMax > 30 ? dataMax * 1.2 : dataMax + 4)]}/>
            <Bar dataKey="value" fill={MATERIAL_COLORS[0]} isAnimationActive={false} label={CustomBarLabel}>
                {data.map((entry, index) => (
                    <Cell fill={MATERIAL_COLORS[index]}/>
                ))}
            </Bar>
        </BarChart>
    </ResponsiveContainer> : <div>Нет данных</div>;
}


export default BarChartByAverageLifetime;
