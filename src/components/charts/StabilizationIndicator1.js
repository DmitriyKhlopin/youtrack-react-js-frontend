import React, {useEffect} from "react";
import {Bar, BarChart, Cell, ReferenceLine, ResponsiveContainer, XAxis, YAxis} from "recharts";
import {CHART_DEFAULT_MARGINS, MATERIAL_COLORS} from "../../Const";
import {useDispatch, useSelector} from "react-redux";
import {selectProjects} from "../../redux/combined/dictionaries";
import {selectDateFrom, selectDateTo, selectSelectedProjects, selectSelectedStates, selectSelectedTypes} from "../../redux/combined/reportFilters";
import {fetchStabilityIndicator1Data, selectStabilityIndicator1ReportData} from "../../redux/combined/stabilityIndicator1Report";

const CustomBarLabel = ({width, payload, x, y, value}) => {
    return (
        <text x={x + width / 2} y={y} fill="#777" dy={-6} textAnchor="middle">
            {value}
        </text>
    );
}

const CustomizedLabel = ({width, payload, x, y, value}) => {
    return (
        <text x={x + width / 2} y={y} fill="#777" dy={-6} textAnchor="middle">
            {value}
        </text>
    );
}

const BarChartByStabilityIndicator1 = () => {
    const dispatch = useDispatch();
    const projects = useSelector(selectProjects);
    const selectedTypes = useSelector(selectSelectedTypes);
    const selectedProjects = useSelector(selectSelectedProjects);
    const selectedStates = useSelector(selectSelectedStates);
    const dateFrom = useSelector(selectDateFrom);
    const dateTo = useSelector(selectDateTo);
    const data = useSelector(selectStabilityIndicator1ReportData);
    useEffect(() => {
        dispatch(fetchStabilityIndicator1Data());
    }, [projects, selectedProjects, selectedTypes, selectedStates, dateFrom, dateTo]);
    return data.length > 0 ? <ResponsiveContainer width='100%' aspect={4.0 / 2.0}>
        <BarChart margin={CHART_DEFAULT_MARGINS} data={data}>
            <XAxis dataKey="key" axisLine={false}/>
            <YAxis type="number" tick={false} axisLine={false} domain={[0, 110]}/>
            <ReferenceLine y={90} label={{position: 'top', value: 'Целевой показатель (90%)', fill: 'red', fontSize: 14}} stroke="red" strokeDasharray="3 3" isFront={true}/>
            <Bar dataKey="value" fill={MATERIAL_COLORS[0]} isAnimationActive={false} label={CustomBarLabel}>
                {

                    data.map((entry, index) => {
                        let i;
                        if (data[index] && data[index].value < 90) {
                            i = 13;
                        } else {
                            i = 7;
                        }
                        return (<Cell fill={MATERIAL_COLORS[i]}/>)
                    })
                }
            </Bar>
        </BarChart>
    </ResponsiveContainer> : <div>Нет данных</div>;
}


export default BarChartByStabilityIndicator1;
