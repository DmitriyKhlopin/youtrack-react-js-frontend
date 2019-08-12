import React, {useEffect} from "react";
import withStyles from "../../node_modules/@material-ui/core/styles/withStyles";
import store from "../redux/store";
import {fetchProjects} from "../redux/actions/reportFiltersActions";
import {setSelectedNavItem} from "../redux/actions/appBarActions";
import {styles} from "../Styles";
import LineChartByWeeks from "./charts/LineChartByWeeks";
import {PAGES} from "../Const";
import PieChartByPartners from "./charts/PieChartByPartners";
import ScatterChartSigma from "./charts/ScatterChartSigma";
import ChartTemplate from "./charts/ChartTemplate";

function ReportContainer({location}) {
    useEffect(() => {
        store.dispatch(setSelectedNavItem(PAGES.filter((page) => page.path === location.pathname)[0]));
        store.dispatch(fetchProjects());
    }, []);

    return (
        <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            flexDirection: 'row',
            justifyContent: 'flexStart',
            alignItems: 'stretch',
            width: '100%'
        }}>
            <LineChartByWeeks/>
            <PieChartByPartners/>
            <ScatterChartSigma/>
            <PieChartByPartners/>
            <ChartTemplate templateName='Запросы от партнёров за год'/>
        </div>
    );

}


export default withStyles(styles)(ReportContainer);
