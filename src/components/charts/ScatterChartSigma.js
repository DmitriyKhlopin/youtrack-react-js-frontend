import Typography from '@material-ui/core/Typography';
import {Legend, ReferenceArea, ResponsiveContainer, Scatter, ScatterChart, Tooltip, XAxis, YAxis} from "recharts";
import {MATERIAL_SIGMA_COLORS} from "../../Const";
import Grid from "@material-ui/core/Grid";
import React, {Component} from "react";
import * as PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import {styles} from "../../Styles";
import connect from "react-redux/es/connect/connect";
import store from "../../redux/store";
import {fetchSigmaData} from "../../redux/actions/reportsActions";

class ScatterChartSigma extends Component {
    handleClick = (data, index) => {
        console.log(data);
        console.log(index);
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        const prevFilters = prevProps.reportFilters;
        if (prevFilters && prevFilters !== this.props.reportFilters) {
            store.dispatch(fetchSigmaData());
        }
    }

    render() {
        const sigma2 = this.props.reports.sigmaData;
        return <div >
            <Typography
                align={'center'}
                variant="h5">Продолжительность работ по запросам</Typography>
            <ResponsiveContainer width='100%' aspect={4.0 / 2.0}>
                <ScatterChart margin={{top: 30, right: 0, left: 0, bottom: 30}}
                              onClick={this.handleClick}>
                    <ReferenceArea x1={0} x2={sigma2.sigma} y1={0} y2={sigma2.sigmaMaxY}
                                   fill={MATERIAL_SIGMA_COLORS[1]} fillOpacity={1.0}/>
                    <ReferenceArea x1={sigma2.sigma}
                                   x2={(sigma2.sigma * 2 > sigma2.sigmaMaxX) ? sigma2.sigmaMaxX : sigma2.sigma * 2}
                                   y1={0}
                                   y2={sigma2.sigmaMaxY}
                                   fill={MATERIAL_SIGMA_COLORS[2]} fillOpacity={1.0}/>
                    <ReferenceArea x1={sigma2.sigma * 2} x2={sigma2.sigmaMaxX} y1={0} y2={sigma2.sigmaMaxY}
                                   fill={MATERIAL_SIGMA_COLORS[3]} fillOpacity={1.0}/>
                    <XAxis dataKey={'day'} type="number" name='Дни' unit='' domain={[0, sigma2.sigmaMaxX]}/>
                    <YAxis axisLine={false} dataKey={'count'} type="number" name='Количетство запросов' unit=''
                           domain={[0, sigma2.sigmaMaxY]}/>
                    <Scatter name='Активные запросы' data={sigma2.sigmaItems} fill={MATERIAL_SIGMA_COLORS[0]}/>
                    <Tooltip cursor={{strokeDasharray: '4 6'}}/>
                    <Legend
                        payload={[
                            {
                                value: 'Область допустимых значений',
                                type: 'circle',
                                id: 'ID01',
                                color: MATERIAL_SIGMA_COLORS[1]
                            },
                            {
                                value: 'Область наблюдения',
                                type: 'circle',
                                id: 'ID01',
                                color: MATERIAL_SIGMA_COLORS[2]
                            },
                            {
                                value: 'Область контроля',
                                type: 'circle',
                                id: 'ID01',
                                color: MATERIAL_SIGMA_COLORS[3]
                            }
                        ]}/>
                </ScatterChart>
            </ResponsiveContainer>
        </div>
    }
}

ScatterChartSigma.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        reportFilters: state.reportFilters,
        reports: state.reports,
        appBarState: state.appBarState,
    }
}

export default withStyles(styles, {withTheme: true})(connect(mapStateToProps, null)(ScatterChartSigma));
