import React, {Component} from "react";
import Button from "../../node_modules/@material-ui/core/Button/Button";
import * as PropTypes from "prop-types";
import withStyles from "../../node_modules/@material-ui/core/styles/withStyles";
import FilterIcon from '@material-ui/icons/Settings';
import RefreshIcon from '@material-ui/icons/Refresh';
import ReportFilterDialog from "./dialogs/ReportFilterDialog";
import Grid from "../../node_modules/@material-ui/core/Grid/Grid";
import {connect} from "react-redux";
import store from "../redux/store";
import {fetchProjects} from "../redux/actions/reportFiltersActions";
import {fetchReportData} from "../redux/actions/reportsActions";
import {setSelectedNavItem} from "../redux/actions/appBarActions";
import {styles} from "../Styles";

import PieChartByProjectTypes from "./charts/PieChartByProjectTypes";
import LineChartByWeeks from "./charts/LineChartByWeeks";
import PieChartByPartners from "./charts/PieChartByPartners";
import ScatterChartSigma from "./charts/ScatterChartSigma";
import DrillDownDialog from "./dialogs/DrillDownDialog";

/**http://materialuicolors.co/?utm_source=launchers*/


class ReportContainer extends Component {
    constructor(props) {
        super(props);
        this.handleClose = this.handleClose.bind(this);
        this.state = {
            filtersOpen: false,
            drillDownOpen: false,
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
        this.setState({filtersOpen: true, scroll});
    };

    handleClose = () => {
        this.setState({filtersOpen: false, /*drillDownOpen: false*/});
    };

    handleClick = (data, index) => {
        console.log(data);
        console.log(index);
    };

    render() {
        const {classes} = this.props;
        return (
            <Grid container spacing={24} className={classes.componentRoot}>
                <LineChartByWeeks/>
                <PieChartByPartners/>
                <ScatterChartSigma/>
                <PieChartByProjectTypes/>
                <Button variant="fab" mini className={classes.fabLoad} color={'secondary'}
                        onClick={() => store.dispatch(fetchReportData())}>
                    <RefreshIcon/>
                </Button>
                <Button variant="fab" mini className={classes.fab} color={'primary'}
                        onClick={this.handleClickOpen('paper')}>
                    <FilterIcon/>
                </Button>
                <ReportFilterDialog open={this.state.filtersOpen}
                                    handleClose={this.handleClose}
                                    aria-labelledby="scroll-dialog-title"/>
                <DrillDownDialog open={this.props.drillDown.drillDownOpen}
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
        drillDown: state.drillDown,
    }
}

export default withStyles(styles, {withTheme: true})(connect(mapStateToProps, null)(ReportContainer));