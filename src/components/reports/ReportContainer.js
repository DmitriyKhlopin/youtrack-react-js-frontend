import React, {useState} from "react";

import LineChartByWeeks from "./../charts/LineChartByWeeks";
import PieChartByPartners from "./../charts/PieChartByPartners";
import ScatterChartSigma from "./../charts/ScatterChartSigma";
import useWindowDimensions from "../../helper_functions/dimensions";
import {useDispatch, useSelector} from "react-redux";
import styles from "../../styles/components.module.css";
import cx from "classnames";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCompressAlt, faExpandAlt, faQuestionCircle} from "@fortawesome/free-solid-svg-icons";
import {selectSigmaIssuesCount} from "../../redux/combined/sigmaReport";
import VelocityChartByWeeks from "../charts/VelocityChartByWeeks";
import {selectAverageVelocity} from "../../redux/combined/velocityReport";
import PieChartByPriorities from "../charts/PieChartByPriorities";
import BarChartByAverageLifetimeUnresolved from "../charts/BarChartByAverageLifetimeUnresolved";
import BarChartBySLAViolations from "../charts/BarChartBySLAViolations";
import PieChartByTypes from "../charts/PieChartByTypes";
import BarChartByCommercialSLAViolations from "../charts/BarChartByCommercialSLAViolations";
import BarChartByStabilityIndicator0 from "../charts/StabilizationIndicator0";
import BarChartByStabilityIndicator1 from "../charts/StabilizationIndicator1";
import {openDialog} from "../../redux/combined/mainDialog";


function ReportContainer() {
    const [maximized, setMaximized] = useState(false);
    const [index, setIndex] = useState(0);
    const size = useWindowDimensions();
    const count = useSelector(selectSigmaIssuesCount);
    const avgVelocity = useSelector(selectAverageVelocity);
    const dispatch = useDispatch();

    function infoButton(contents) {
        return (<FontAwesomeIcon
            icon={faQuestionCircle}
            className={styles.iconButton}
            onClick={() => dispatch(openDialog(contents))} size={'1x'}
        />);
    }

    const widgets = [
        {
            title: 'Общее количество обращений высокого приоритета от партнёров за месяц',
            element: <BarChartByStabilityIndicator0/>,
            hint: 'Вычисляется количество тикетов, добавленных в течение месяца и соответствующих условию:\n(priority = \'Major\' or  priority = \'Критичный\') AND (type = \'Консультация\' OR type = \'Bug\')'
        },
        {title: 'Процент обращений от заказчиков с кричитным и высоким приоритетом, закрытых за две недели', element: <BarChartByStabilityIndicator1/>},
        {title: 'Количество поступивших и закрытых запросов', element: <LineChartByWeeks/>},
        {title: `Velocity (средний показатель - ${avgVelocity} шт.)`, element: <VelocityChartByWeeks/>},
        {title: `Продолжительность работ по запросам (${count} шт.)`, element: <ScatterChartSigma/>},
        {title: 'Количество новых запросов от партнёров', element: <PieChartByPartners/>},
        {title: `Приоритеты`, element: <PieChartByPriorities/>},
        {title: `Типы`, element: <PieChartByTypes/>},
        {title: `Средняя продолжительность жизни всех заявок (дни)`, element: <BarChartByAverageLifetimeUnresolved/>},
        {title: `Соблюдение SLA`, element: <BarChartBySLAViolations/>},
        {title: `Соблюдение коммерческих SLA`, element: <BarChartByCommercialSLAViolations/>},
    ];

    let percentage;
    switch (true) {
        case (size.width >= 2400):
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
            className={cx(styles.iconButton, styles.floatRight)}
            onClick={() => toggle(index)} size={'1x'}
        />;
    }


    function toggle(index) {
        console.log(index);
        setMaximized(!maximized);
        setIndex(index);
    }

    return (maximized ? <div style={{width: `100%`, position: 'relative'}}>
                <div className={cx(styles.title, styles.centeredText, styles.mediumMargin)}>{widgets[index].title}{button(null)}</div>
                {widgets[index].element}
            </div> :
            <div className={cx(styles.row, styles.wrap)}>
                {widgets.map((item, index) => <div key={`report-${index}`} style={{width: `calc(${percentage}%)`, position: 'relative'}}>
                    <div className={cx(styles.title, styles.centeredText, styles.defaultMargin)}>{item.title}{item.hint ? infoButton(item.hint) : null}{button(index)}</div>
                    {item.element}
                </div>)}
            </div>
    );
}

export default (ReportContainer);
