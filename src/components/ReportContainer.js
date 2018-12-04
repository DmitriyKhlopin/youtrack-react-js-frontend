import React, {Component} from "react";
import {
    CartesianGrid,
    Cell,
    Legend,
    Line,
    LineChart,
    Pie,
    PieChart,
    ReferenceArea,
    ResponsiveContainer,
    Scatter,
    ScatterChart,
    Tooltip,
    XAxis,
    YAxis
} from 'recharts'
import Button from "../../node_modules/@material-ui/core/Button/Button";
import * as PropTypes from "prop-types";
import withStyles from "../../node_modules/@material-ui/core/styles/withStyles";
import FilterIcon from '@material-ui/icons/Settings';
import RefreshIcon from '@material-ui/icons/Refresh';
import ReportFilterDialog from "./ReportFilterDialog";
import Grid from "../../node_modules/@material-ui/core/Grid/Grid";
import {connect} from "react-redux";
import store from "../redux/store";
import {fetchProjects} from "../redux/actions/reportFiltersActions";
import {fetchReportData} from "../redux/actions/reportsActions";
import {setSelectedNavItem} from "../redux/actions/appBarActions";
import {styles} from "../Styles";
import Typography from "@material-ui/core/es/Typography/Typography";

/**http://materialuicolors.co/?utm_source=launchers*/

const MATERIAL_COLORS = ['#F44336', '#E91E63', '#9C27B0', '#673AB7', '#673AB7', '#3F51B5', '#2196F3', '#03A9F4', '#00BCD4', '#009688', '#4CAF50', '#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107', '#FF9800', '#FF5722', '#795548', '#9E9E9E', '#607D8B'];
const MATERIAL_LINE_CHART_COLORS = ['#2196F3', '#FFC107', '#4CAF50'];
const MATERIAL_SIGMA_COLORS = ['#34495e', '#4CAF50', '#FFEB3B', '#FF9800'];

/**https://flatuicolors.com/palette/defo*/
/*const LINE_CHART_COLORS = ['#3498db', '#f1c40f', '#2ecc71'];
const COLORS = ['#1abc9c', '#2ecc71', '#3498db', '#9b59b6', '#34495e', '#f1c40f', '#e67e22', '#e74c3c', '#ecf0f1', '#95a5a6'];
const IGMA_COLORS = ['#34495e', '#2ecc71', '#f1c40f', '#e67e22'];*/
const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({cx, cy, midAngle, innerRadius, outerRadius, percent, index, value, name, fill}) => {
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';
    return (
        <g>
            <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none"/>
            <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none"/>
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor}
                  fill={fill}>{`${name} - ${value}`}</text>

        </g>
    );
};

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
    return (
        <g>
            <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none"/>
            <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none"/>
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor}
                  fill={fill}>{`${name}`}</text>

        </g>
    );
};

class ReportContainer extends Component {
    constructor(props) {
        super(props);
        this.handleClose = this.handleClose.bind(this);
        this.state = {
            open: false,
            scroll: 'paper',
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.reportFilters.proj && prevProps.reportFilters.proj.length === 0 && this.props.reportFilters.proj !== prevProps.reportFilters.proj) {
            store.dispatch(fetchReportData());
        }
    }

    componentWillMount() {
        store.dispatch(setSelectedNavItem({title: 'Отчёты', selectedId: 0}));
        store.dispatch(fetchProjects());
    }

    handleClickOpen = scroll => () => {
        this.setState({open: true, scroll});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    render() {
        const {classes} = this.props;
        const sigma2 = this.props.reports.sigmaData;
        const dynamics = this.props.reports.dynamicsData;
        const aggregatedIssuesByPartner = this.props.reports.aggregatedIssuesByPartner;
        const aggregatedTimeAccountingByProjectType = this.props.reports.aggregatedTimeAccountingByProjectType;
        return (
            <Grid container spacing={24} className={classes.componentRoot}>
                <Grid item md={12} lg={6}>
                    <Typography
                        align={'center'}
                        variant="h5">Количество поступивших и закрытых запросов</Typography>
                    <ResponsiveContainer width='100%' aspect={4.0 / 2.0}>
                        <LineChart data={dynamics}
                                   margin={{top: 30, right: 0, left: 0, bottom: 30}}>
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
                <Grid item md={12} lg={6}>
                    <Typography
                        align={'center'}
                        variant="h5">Количество запросов от партнёров</Typography>
                    <ResponsiveContainer width='100%' aspect={4.0 / 2.0}>
                        <PieChart margin={{top: 30, right: 0, left: 0, bottom: 30}}>
                            <Pie data={aggregatedIssuesByPartner}
                                 nameKey={'name'}
                                 dataKey={'value'}
                                 labelLine={true}
                                 label={renderCustomizedLabel}
                                 fill="#8884d8"
                                 startAngle={450}
                                 endAngle={90}
                                 paddingAngle={1}
                            >
                                {
                                    aggregatedIssuesByPartner.map((entry, index) => <Cell key={`cell-${index}`}
                                                                                          fill={MATERIAL_COLORS[index % MATERIAL_COLORS.length]}/>)
                                }
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </Grid>
                <Grid item md={12} lg={6}>
                    <Typography
                        align={'center'}
                        variant="h5">Продолжительность работ по запросам</Typography>
                    <ResponsiveContainer width='100%' aspect={4.0 / 2.0}>
                        <ScatterChart margin={{top: 30, right: 0, left: 0, bottom: 30}}>
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
                                    /*{value: 'Активные запросы', type: 'scatter', id: 'ID01', color: MATERIAL_SIGMA_COLORS[0]},*/
                                    {
                                        value: 'Область допустимых значений',
                                        type: 'square',
                                        id: 'ID01',
                                        color: MATERIAL_SIGMA_COLORS[1]
                                    },
                                    {
                                        value: 'Область наблюдения',
                                        type: 'square',
                                        id: 'ID01',
                                        color: MATERIAL_SIGMA_COLORS[2]
                                    },
                                    {
                                        value: 'Область контроля',
                                        type: 'square',
                                        id: 'ID01',
                                        color: MATERIAL_SIGMA_COLORS[3]
                                    }
                                ]}/>
                        </ScatterChart>
                    </ResponsiveContainer>
                </Grid>
                <Grid item md={12} lg={6}>
                    <Typography
                        align={'center'}
                        variant="h5">Трудозатраты в разрезе типов проектов</Typography>
                    <ResponsiveContainer width='100%' aspect={4.0 / 2.0}>
                        <PieChart margin={{top: 30, right: 0, left: 0, bottom: 30}}>
                            <Pie data={aggregatedTimeAccountingByProjectType}
                                 nameKey={'presentation'}
                                 dataKey={'value'}
                                 labelLine={true}
                                 label={renderCustomizedTimeLabel}
                                 fill="#8884d8"
                                 startAngle={450}
                                 endAngle={90}
                                 paddingAngle={1}
                            >
                                {
                                    aggregatedTimeAccountingByProjectType.map((entry, index) => <Cell
                                        key={`cell-${index}`}
                                        fill={MATERIAL_COLORS[index % MATERIAL_COLORS.length]}/>)
                                }
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </Grid>
                <Button variant="fab" mini className={classes.fabLoad} color={'secondary'}
                        onClick={() => store.dispatch(fetchReportData())}>
                    <RefreshIcon/>
                </Button>
                <Button variant="fab" mini className={classes.fab} color={'primary'}
                        onClick={this.handleClickOpen('paper')}>
                    <FilterIcon/>
                </Button>
                <ReportFilterDialog open={this.state.open}
                                    handleClose={this.handleClose}
                                    aria-labelledby="scroll-dialog-title"/>
            </Grid>
        );
    }
}

ReportContainer.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        reportFilters: state.reportFilters,
        reports: state.reports,
        appBarState: state.appBarState,
    }
}

export default withStyles(styles, {withTheme: true})(connect(mapStateToProps, null)(ReportContainer));