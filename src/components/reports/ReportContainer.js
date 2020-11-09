import React, {useEffect, useState} from "react";

import LineChartByWeeks from "./../charts/LineChartByWeeks";
import PieChartByPartners from "./../charts/PieChartByPartners";
import ScatterChartSigma from "./../charts/ScatterChartSigma";
import useWindowDimensions from "../../helper_functions/dimensions";
import {useDispatch, useSelector} from "react-redux";
import styles from "../../styles/components.module.css";
import cx from "classnames";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCompressAlt, faExpandAlt} from "@fortawesome/free-solid-svg-icons";
import {fetchProjects, selectProjects} from "../../redux/combined/dictionaries";
import {selectSigmaIssuesCount} from "../../redux/combined/sigmaReport";
import VelocityChartByWeeks from "../charts/VelocityChartByWeeks";
import {selectAverageVelocity} from "../../redux/combined/velocityReport";


function ReportContainer() {
    const [maximized, setMaximized] = useState(false);
    const [index, setIndex] = useState(0);
    const size = useWindowDimensions();
    const count = useSelector(selectSigmaIssuesCount);
    const avgVelocity = useSelector(selectAverageVelocity);

    const widgets = [
        {title: 'Количество поступивших и закрытых запросов', element: <LineChartByWeeks/>},
        {title: `Velocity (средний показатель - ${avgVelocity} шт.)`, element: <VelocityChartByWeeks/>},
        {title: 'Количество новых запросов от партнёров за текущую неделю', element: <PieChartByPartners/>},
        {title: `Продолжительность работ по запросам (${count} шт.)`, element: <ScatterChartSigma/>}
    ];

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

    return (maximized ? <div style={{width: `100%`, position: 'relative'}}>
                <div className={cx(styles.centeredText, styles.mediumMargin)}>{widgets[index].title}{button(null)}</div>
                {widgets[index].element}
            </div> :
            <div className={cx(styles.row, styles.wrap)}>
                {widgets.map((item, index) => <div key={`report-${index}`} style={{width: `calc(${percentage}%)`, position: 'relative'}}>
                    <div className={cx(styles.centeredText, styles.defaultMargin)}>{item.title}{button(index)}</div>
                    {item.element}
                </div>)}
            </div>
    );
}

export default (ReportContainer);
