import React, {useEffect, useState} from "react";
import {fetchProjects} from "../../redux/actions/reportFiltersActions";
import LineChartByWeeks from "./../charts/LineChartByWeeks";
import PieChartByPartners from "./../charts/PieChartByPartners";
import ScatterChartSigma from "./../charts/ScatterChartSigma";
import useWindowDimensions from "../../helper_functions/dimensions";
import {useDispatch} from "react-redux";
import styles from "../../styles/components.module.css";
import cx from "classnames";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCompressAlt, faExpandAlt} from "@fortawesome/free-solid-svg-icons";

function ReportContainer() {
    const [maximized, setMaximized] = useState(false);
    const [index, setIndex] = useState(0);
    const dispatch = useDispatch();
    const size = useWindowDimensions();
    const widgets = [<LineChartByWeeks/>, <PieChartByPartners/>, <ScatterChartSigma/>];

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

    function button(index) {
        return <FontAwesomeIcon
            icon={maximized ? faCompressAlt : faExpandAlt}
            className={cx(styles.iconButtonInverted, styles.floatRight)}
            onClick={() => toggle(index)} size={'1x'}
        />;
    }


    function toggle(index) {
        console.log(index);
        setMaximized(!maximized);
        setIndex(index);
    }
    return (maximized ? <div style={{width: `calc(100% - 1rem)`, position: 'relative'}}>
                {button(null)}
                {widgets[index]}
            </div> :
            <div className={cx(styles.row, styles.wrap, styles.defaultMargin)}>
                {widgets.map((item, index) => <div style={{width: `calc(${percentage}% - 1rem)`, position: 'relative'}}>
                    {/*<div className={styles.floatRight} onClick={() => toggle(0)}>test</div>*/}
                    {button(index)}
                    {item}
                </div>)}
            </div>
    );
}

export default (ReportContainer);
