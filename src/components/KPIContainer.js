import React, {Component} from 'react';

import * as PropTypes from 'prop-types';

import FilterIcon from '@material-ui/icons/Settings';
import RefreshIcon from '@material-ui/icons/Refresh';
import connect from 'react-redux/es/connect/connect';
import store from '../redux/store';
import {fetchKpiReportData} from '../redux/actions/kpiActions';
import {setSelectedNavItem} from '../redux/actions/appBarActions';
import {styles} from '../Styles';
import {PAGES} from '../Const';
import KPIFilterDialog from './dialogs/KPIFilterDialog';
import Grid from '@material-ui/core/Grid';
import {Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core';
import CircularProgress from "@material-ui/core/es/CircularProgress/CircularProgress";


class KPIContainer extends Component {
    constructor(props) {
        super(props);
        this.handleClose = this.handleClose.bind(this);
        this.state = {
            filtersOpen: false,
            scroll: 'paper',
        }
    }

    componentDidMount() {
        /*store.dispatch(setSelectedNavItem({title: PAGES.kpi.name, selectedId: PAGES.kpi.id}));*/
        /*store.dispatch(fetchProjects());*/
        store.dispatch(setSelectedNavItem(PAGES.filter((page) => page.path === this.props.location.pathname)[0]));
        store.dispatch(fetchKpiReportData())
    }

    handleClickOpen = scroll => () => {
        this.setState({filtersOpen: true, scroll});
    };

    handleClose = () => {
        this.setState({filtersOpen: false});
    };

    handleClick = (data, index) => {
        console.log(data);
        console.log(index);
    };

    render() {
        console.log(this.props.kpi.kpiData);
        const {classes} = this.props;
        return (this.props.kpi.kpiData.length===0)?<CircularProgress/> : (<Grid container spacing={24} className={classes.componentRoot}>
            <Grid item md={12} lg={12}>
                <ResponsiveContainer width='100%' aspect={4.0 / 1.0}>
                    <BarChart data={this.props.kpi.kpiData}
                              margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                        <CartesianGrid strokeDasharray='3 3'/>
                        <XAxis dataKey='user'/>
                        <YAxis/>
                        <Tooltip itemSorter={() => 1}/>
                        <Legend/>
                        <Bar name='Рейтинг' dataKey='result' fill='#e74c3c' legendType={'circle'}/>
                        <Bar name='Всего запросов' dataKey='total' fill='#34495e' legendType={'circle'}/>
                        <Bar name='Предложено решений' dataKey='suggestedSolutions' fill='#2ecc71'
                             legendType={'circle'}/>
                        <Bar name='Запрошено уточнений' dataKey='requestedClarifications' fill='#3498db'
                             legendType={'circle'}/>
                        <Bar name='Переносено сроков решения' dataKey='postponements' fill='#9b59b6'
                             legendType={'circle'}/>
                        <Bar name='Оценки' dataKey='positiveAssessment' fill='#e67e22' legendType={'circle'}/>
                        <Bar name='Нарушено SLA' dataKey='violations' fill='#e74c3c' legendType={'circle'}/>
                    </BarChart>
                </ResponsiveContainer>
            </Grid>
            {this.props.kpi.kpiData.map((user, index) => {
                console.log([user]);
                return <Grid key={index} item md={12} lg={6}>
                    <ResponsiveContainer width='100%' aspect={4.0 / 1.0}>
                        <BarChart data={[user]}
                                  margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                            <CartesianGrid strokeDasharray='3 3'/>
                            <XAxis dataKey='user'/>
                            <YAxis/>
                            <Tooltip itemSorter={() => 1}/>
                            <Bar name='Всего запросов' dataKey='total' fill='#34495e' legendType={'circle'}/>
                            <Bar name='Предложено решений' dataKey='suggestedSolutions' fill='#2ecc71'
                                 legendType={'circle'}/>
                            <Bar name='Запрошено уточнений' dataKey='requestedClarifications' fill='#3498db'
                                 legendType={'circle'}/>
                            <Bar name='Переносено сроков решения' dataKey='postponements' fill='#9b59b6'
                                 legendType={'circle'}/>
                            <Bar name='Нарушено SLA' dataKey='violations' fill='#e74c3c' legendType={'circle'}/>
                        </BarChart>
                    </ResponsiveContainer>
                </Grid>
            })}
            <Button variant='fab' mini className={classes.fabLoad} color={'secondary'}
                    onClick={() => store.dispatch(fetchKpiReportData())}>
                <RefreshIcon/>
            </Button>
            <Button variant='fab' mini className={classes.fab} color={'primary'}
                    onClick={this.handleClickOpen('paper')}>
                <FilterIcon/>
            </Button>
            <KPIFilterDialog open={this.state.filtersOpen}
                             handleClose={this.handleClose}
                             aria-labelledby='scroll-dialog-title'/>
        </Grid>);
    }
}

KPIContainer.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        kpiFilters: state.kpiFilters,
        kpi: state.kpi,
        appBarState: state.appBarState,
    }
}

export default withStyles(styles, {withTheme: true})(connect(mapStateToProps, null)(KPIContainer));
/*

<BarChart data={[user]}
          margin={{top: 5, right: 30, left: 20, bottom: 5}}>
    <CartesianGrid strokeDasharray='3 3'/>
    <XAxis dataKey='user'/>
    <YAxis/>
    <Tooltip/>
    <Legend/>
    <Bar dataKey='total' fill='#8884d8'/>
    <Bar dataKey='suggestedSolutions' fill='#8884d8'/>
    <Bar dataKey='requestedClarifications' fill='#8884d8'/>
    <Bar dataKey='postponements' fill='#8884d8'/>
    <Bar dataKey='violations' fill='#8884d8'/>
</BarChart>;*/
