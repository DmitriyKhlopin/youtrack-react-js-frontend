import React, {useEffect} from "react";
import {Legend, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {CHART_DEFAULT_MARGINS} from "../../Const";
import {useDispatch, useSelector} from "react-redux";
import {selectProjects} from "../../redux/combined/dictionaries";
import {selectSelectedProjects, selectSelectedTypes} from "../../redux/combined/reportFilters";
import {format} from "date-fns";
import {fetchVelocityData, selectVelocityData} from "../../redux/combined/velocityReport";
import {formatXAxis, line} from "../../HelperFunctions";

function VelocityChartByWeeks() {
    const dispatch = useDispatch();
    const projects = useSelector(selectProjects);
    const selectedTypes = useSelector(selectSelectedTypes);
    const selectedProjects = useSelector(selectSelectedProjects);
    const data = useSelector(selectVelocityData);
    useEffect(() => {
        dispatch(fetchVelocityData());
    }, [projects, selectedProjects, selectedTypes]);

    const handleClick = (d, index) => {
        console.log(d);
    };

    return <ResponsiveContainer aspect={4.0 / 2.0}>
        <LineChart
            data={data}
            margin={CHART_DEFAULT_MARGINS}
            onClick={handleClick}
        >
            <XAxis type="category" dataKey="week" tickFormatter={formatXAxis} interval={"preserveEnd"} padding={{left: 0, right: 30}}/>
            <YAxis axisLine={false} strokeWidth={0} padding={{top: 30}}/>
            <Tooltip labelFormatter={t => format(t, 'yyyy.MM.dd')}/>
            <Legend/>
            {line(0, 'Всего', 'all')}
            {selectedTypes && (selectedTypes.length === 0 || selectedTypes.map(e => e.value).includes("Bug")) ? line(1, 'Ошибки', 'bugs') : null}
            {selectedTypes && (selectedTypes.length === 0 || selectedTypes.map(e => e.value).includes("Feature")) ? line(2, 'Фичи', 'features') : null}
            {selectedTypes && (selectedTypes.length === 0 || selectedTypes.map(e => e.value).includes("Консультация")) ? line(3, 'Консультации', 'consultations') : null}
        </LineChart>
    </ResponsiveContainer>
}


export default VelocityChartByWeeks;
