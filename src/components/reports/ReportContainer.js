import React, {useEffect} from "react";
import {fetchProjects} from "../../redux/actions/reportFiltersActions";
import LineChartByWeeks from "./../charts/LineChartByWeeks";
import PieChartByPartners from "./../charts/PieChartByPartners";
import ScatterChartSigma from "./../charts/ScatterChartSigma";
import useWindowDimensions from "../../helper_functions/dimensions";
import {useDispatch} from "react-redux";
import styles from "../../styles/components.module.css";
import cx from "classnames";

function ReportContainer() {
    const dispatch = useDispatch();
    const size = useWindowDimensions();
    let percentage;
    switch (true) {
        case (size.width >= 1920):
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
        dispatch(fetchProjects());
    }, []);
    /*percentage = 100;*/
    return (
        <div className={cx(styles.row, styles.wrap, styles.defaultMargin)}>
            <div style={{width: `calc(${percentage}% - 1rem)`}}><LineChartByWeeks/></div>
            <div style={{width: `calc(${percentage}% - 1rem)`}}><PieChartByPartners/></div>
            <div style={{width: `calc(${percentage}% - 1rem)`}}><ScatterChartSigma/></div>
        </div>
    );

}


export default (ReportContainer);
