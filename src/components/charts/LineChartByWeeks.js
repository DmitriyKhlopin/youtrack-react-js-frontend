import React, {useEffect} from "react";
import {CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import connect from "react-redux/es/connect/connect";
import {MATERIAL_LINE_CHART_COLORS} from "../../Const";
import {fetchDynamicsData} from "../../redux/actions/reportsActions";
import {useDispatch} from "react-redux";


function LineChartByWeeks({reports, reportFilters}) {
    const dispatch = useDispatch();

    const handleClick = (data, index) => {
        console.log(data);
        /*const filters = {
            week: data.activeLabel,
        };
        dispatch(openDrillDown('aaaa'));*/
    };

    useEffect(() => {
        dispatch(fetchDynamicsData());
    }, [reportFilters]);

    const dynamics = reports.dynamicsData;
    return <div>
        <div>Количество поступивших и закрытых запросов</div>
        <ResponsiveContainer aspect={4.0 / 2.0}>
            <LineChart
                data={dynamics}
                margin={{top: 30, right: 10, left: 0, bottom: 30}}
                onClick={handleClick}
            >
                <XAxis dataKey="week"/>
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
    </div>

}

function mapStateToProps(state) {
    return {
        reportFilters: state.reportFilters,
        reports: state.reports,
        appBarState: state.appBarState,
        drillDown: state.drillDown,
    }
}

export default connect(mapStateToProps, null)(LineChartByWeeks);
