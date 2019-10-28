import React, {useEffect} from "react";
import Typography from '@material-ui/core/Typography';
import {CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import withStyles from "@material-ui/core/styles/withStyles";
import {styles} from "../../Styles";
import connect from "react-redux/es/connect/connect";
import {MATERIAL_LINE_CHART_COLORS} from "../../Const";
import {openDrillDown} from "../../redux/actions/drillDownActions";
import {store} from "../../redux/store";
import {fetchDynamicsData} from "../../redux/actions/reportsActions";


function LineChartByWeeks({reports, reportFilters}) {
    const handleClick = (data, index) => {
        console.log(data);
        console.log(index);
        const filters = {
            week: data.activeLabel,
        };
        store.dispatch(openDrillDown('aaaa'));
    };

    useEffect(() => {
        store.dispatch(fetchDynamicsData());
    }, [reportFilters]);

    const dynamics = reports.dynamicsData;
    return <div>
        <Typography align={'center'} variant="h5">
            Количество поступивших и закрытых запросов
        </Typography>
        <ResponsiveContainer width='100%' aspect={4.0 / 2.0}>
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

export default withStyles(styles, {withTheme: true})(connect(mapStateToProps, null)(LineChartByWeeks));
