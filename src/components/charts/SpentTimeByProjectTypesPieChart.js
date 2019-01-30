import React, {Component} from "react";
import Typography from "@material-ui/core/es/Typography";
import {Cell, Legend, Pie, PieChart, ResponsiveContainer} from "recharts";
import Grid from "@material-ui/core/Grid";
import * as PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import {styles} from "../../Styles";
import connect from "react-redux/es/connect/connect";
import {MATERIAL_COLORS, RADIAN} from "../../Const";
import * as moment from "moment";
import momentDurationFormatSetup from "moment-duration-format";
import store from "../../redux/store";
import {fetchSpentTimeData} from "../../redux/actions/reportsActions";

momentDurationFormatSetup(moment);

const renderCustomizedTimeLabel = ({cx, cy, midAngle, innerRadius, outerRadius, percent, index, value, name, fill}) => {
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';
    const a = moment.duration(value, "minutes").format("dд. hч. mmм.");
    console.log(a);
    return (
        <g>
            <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none"/>
            <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none"/>
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor}
                  fill={fill}>{`${a}`}</text>
        </g>
    );
};

class SpentTimeByProjectTypesPieChart extends Component {
    handleClick = (data, index) => {
        console.log(data);
        console.log(index);
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        const prevFilters = prevProps.reportFilters;
        if (prevFilters && prevFilters !== this.props.reportFilters) {
            store.dispatch(fetchSpentTimeData());
        }
    }

    render() {
        const aggregatedTimeAccountingByProjectType = this.props.reports.aggregatedTimeAccountingByProjectType;
        return <Grid item md={12} lg={6}>
            <Typography
                align={'center'}
                variant="h5">Трудозатраты в разрезе типов проектов</Typography>
            <ResponsiveContainer width='100%' aspect={4.0 / 2.0}>
                <PieChart margin={{top: 30, right: 0, left: 0, bottom: 30}}>
                    <Pie data={aggregatedTimeAccountingByProjectType}
                         nameKey={'key'}
                         dataKey={'value'}
                         labelLine={true}
                         label={renderCustomizedTimeLabel}
                         fill="#8884d8"
                         startAngle={450}
                         endAngle={90}
                         paddingAngle={1}
                         isAnimationActive={true}
                         onClick={this.handleClick}
                         legendType={'circle'}

                    >
                        {
                            aggregatedTimeAccountingByProjectType.map((entry, index) => <Cell
                                key={`cell-${index}`}
                                fill={MATERIAL_COLORS[index % MATERIAL_COLORS.length]}
                            />)
                        }
                    </Pie>
                    <Legend/>
                </PieChart>
            </ResponsiveContainer>
        </Grid>
    }
}

SpentTimeByProjectTypesPieChart.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        reportFilters: state.reportFilters,
        reports: state.reports,
        appBarState: state.appBarState,
    }
}

export default withStyles(styles, {withTheme: true})(connect(mapStateToProps, null)(SpentTimeByProjectTypesPieChart));
