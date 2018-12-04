import React, {Component} from "react";
import Typography from "@material-ui/core/es/Typography";
import {CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import Grid from "@material-ui/core/Grid";
import * as PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import {styles} from "../../Styles";
import connect from "react-redux/es/connect/connect";
import {MATERIAL_LINE_CHART_COLORS} from "../../Const";

class LineChartByWeeks extends Component {
    handleClick = (data, index) => {
        console.log(data);
        console.log(index);
    };

    render() {
        const dynamics = this.props.reports.dynamicsData;
        return <Grid item md={12} lg={6}>
            <Typography
                align={'center'}
                variant="h5">Количество поступивших и закрытых запросов</Typography>
            <ResponsiveContainer width='100%' aspect={4.0 / 2.0}>
                <LineChart
                    data={dynamics}
                    margin={{top: 30, right: 0, left: 0, bottom: 30}}
                    onClick={this.handleClick}
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
        </Grid>
    }
}

LineChartByWeeks.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        reportFilters: state.reportFilters,
        reports: state.reports,
        appBarState: state.appBarState,
    }
}

export default withStyles(styles, {withTheme: true})(connect(mapStateToProps, null)(LineChartByWeeks));