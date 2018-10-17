import React, {Component} from "react";
import {
    CartesianGrid,
    Legend,
    Line,
    LineChart,
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
import {fetchProjects} from "../redux/actions/filtersActions";
import {fetchReportData} from "../redux/actions/resportsActions";

const styles = theme => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        padding: theme.spacing.unit / 2,
    },
    fab: {
        position: 'absolute',
        top: theme.spacing.unit * 2 + 64,
        right: theme.spacing.unit * 2,
    },
    fabLoad: {
        position: 'absolute',
        top: theme.spacing.unit * 2 + 64,
        right: theme.spacing.unit * 2 + 64,
    },
});

class ReportContainer extends Component {
    constructor(props) {
        super(props);
        this.handleClose = this.handleClose.bind(this);
        this.state = {
            open: false,
            scroll: 'paper',
        }
    }

    componentWillMount() {
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
        return (
            <Grid container spacing={24}>
                <Grid item md={12} lg={6}>
                    <ResponsiveContainer width='100%' aspect={4.0 / 1.5}>
                        <LineChart data={dynamics}
                                   margin={{top: 30, right: 60, left: 0, bottom: 30}}>
                            <XAxis dataKey="week"/>
                            <YAxis axisLine={false}/>
                            <CartesianGrid strokeDasharray="3 3"/>
                            <Tooltip/>
                            <Legend/>
                            <Line type="monotone" dataKey="active" stroke="#1E88E5" name="В работе"/>
                            <Line type="monotone" dataKey="created" stroke="#FDD835" name="Создано"/>
                            <Line type="monotone" dataKey="resolved" stroke="#43A047" name="Решено"/>
                        </LineChart>
                    </ResponsiveContainer>
                </Grid>
                <Grid item md={12} lg={6}>
                    <ResponsiveContainer width='100%' aspect={4.0 / 1.5}>
                        <ScatterChart margin={{top: 30, right: 60, left: 0, bottom: 30}}>
                            <ReferenceArea x1={0} x2={sigma2.sigma} y1={0} y2={sigma2.sigmaMaxY}
                                           fill="#A5D6A7" fillOpacity={1.0}/>
                            <ReferenceArea x1={sigma2.sigma}
                                           x2={(sigma2.sigma * 2 > sigma2.sigmaMaxX) ? sigma2.sigmaMaxX : sigma2.sigma * 2}
                                           y1={0}
                                           y2={sigma2.sigmaMaxY}
                                           fill="#E6EE9C" fillOpacity={1.0}/>
                            <ReferenceArea x1={sigma2.sigma * 2} x2={sigma2.sigmaMaxX} y1={0} y2={sigma2.sigmaMaxY}
                                           fill="#FFAB91" fillOpacity={1.0}/>
                            <XAxis dataKey={'day'} type="number" name='Дни' unit='' domain={[0, sigma2.sigmaMaxX]}
                                   tickSize={4}/>
                            <YAxis axisLine={false} dataKey={'count'} type="number" name='Количетство запросов' unit=''
                                   domain={[0, sigma2.sigmaMaxY]}/>
                            <Scatter name='A school' data={sigma2.sigmaItems} fill='#8884d8'/>
                            <Tooltip cursor={{strokeDasharray: '4 6'}}/>
                        </ScatterChart>
                    </ResponsiveContainer>
                </Grid>
                <Button variant="fab" className={classes.fabLoad} color={'secondary'}
                        onClick={() => store.dispatch(fetchReportData())}>
                    <RefreshIcon/>
                </Button>
                <Button variant="fab" className={classes.fab} color={'primary'} onClick={this.handleClickOpen('paper')}>
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
        filters: state.filters,
        reports: state.reports
    }
}

export default withStyles(styles, {withTheme: true})(connect(mapStateToProps, null)(ReportContainer));