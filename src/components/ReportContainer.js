import React, {useEffect} from "react";
import store from "../redux/store";
import {fetchProjects} from "../redux/actions/reportFiltersActions";
import {setSelectedNavItem} from "../redux/actions/appBarActions";
import LineChartByWeeks from "./charts/LineChartByWeeks";
import {PAGES} from "../Const";
import PieChartByPartners from "./charts/PieChartByPartners";
import ScatterChartSigma from "./charts/ScatterChartSigma";
import useWindowDimensions from "../helper_functions/dimensions";

function ReportContainer({location}) {
    const size = useWindowDimensions();
    let percentage;
    switch (true) {
        case (size.width >= 1600):
            percentage = 33;
            break;
        case (size.width >= 900):
            percentage = 50;
            break;
        default:
            percentage = 100;
            break;
    }
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
            <div style={{width: `calc(${percentage}% - 32px)`}}><LineChartByWeeks/></div>
            <div style={{width: `calc(${percentage}% - 32px)`}}><PieChartByPartners/></div>
            <div style={{width: `calc(${percentage}% - 32px)`}}><ScatterChartSigma/></div>
        </div>
    );

}


export default ReportContainer;
