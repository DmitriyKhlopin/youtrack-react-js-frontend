import React, {Component} from "react";

import {Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import Grid from "@material-ui/core/Grid";
import * as PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import {styles} from "../../Styles";
import connect from "react-redux/es/connect/connect";
import {openDrillDown} from "../../redux/actions/drillDownActions";
import store from "../../redux/store";
import {MATERIAL_LINE_CHART_COLORS} from "../../Const";
import Typography from '@material-ui/core/Typography';


class ChartTemplate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [{name: 'a', value: 1}, {name: 'b', value: 2}]
        };
    }

    handleClick = (data, index) => {
        console.log(data);
        console.log(index);
        const filters = {
            week: data.activeLabel,
        };
        store.dispatch(openDrillDown('aaaa'));
    };

    /*componentDidUpdate(prevProps, prevState, snapshot) {
        const prevFilters = prevProps.reportFilters;
        if (prevFilters && prevFilters !== this.props.reportFilters) {
            store.dispatch(fetchDynamicsData());
        }
    }*/

    render() {
        return <div style={{width: 'calc(50% - 32px)'}}>
            <Typography align={'center'} variant="h5">
                {this.props.templateName}
            </Typography>
            <ResponsiveContainer width='100%' aspect={4.0 / 2.0}>
                <LineChart
                    data={this.state.data}
                    margin={{top: 30, right: 0, left: 0, bottom: 30}}
                    onClick={this.handleClick}
                >
                    <XAxis dataKey="name"/>
                    <YAxis axisLine={false}/>
                    {/*<CartesianGrid strokeDasharray="1 1"/>*/}
                    <Tooltip/>
                    <Legend/>
                    <Line type="monotone" dataKey="value" stroke={MATERIAL_LINE_CHART_COLORS[0]}
                          name="В работе"/>
                </LineChart>
            </ResponsiveContainer>
        </div>
    }
}

ChartTemplate.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        reportFilters: state.reportFilters,
        reports: state.reports,
        appBarState: state.appBarState,
        drillDown: state.drillDown,
    }
}

export default withStyles(styles, {withTheme: true})(connect(mapStateToProps, null)(ChartTemplate));
