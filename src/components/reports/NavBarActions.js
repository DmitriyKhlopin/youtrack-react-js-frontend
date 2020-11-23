import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import styles from "../../styles/components.module.css";
import cx from "classnames";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCalendarAlt, faFileExcel, faSync} from "@fortawesome/free-solid-svg-icons";
import {fetchSigmaData} from "../../redux/combined/sigmaReport";
import {ProjectsFilter} from "../filters/ProjectsFilter";
import {StatesFilter} from "../filters/StatesFilter";
import {TypesFilter} from "../filters/TypesFilter";
import {openDialog} from "../../redux/combined/mainDialog";
import DateRangeFilterDialog from "../dialogs/DateRangeFilterDialog";
import {PrioritiesFilter} from "../filters/PrioritiesFilter";
import {Workbook} from "../../helper_functions/export_to_excel";
import * as XLSX from "xlsx";
import {selectPrioritiesReportData} from "../../redux/combined/prioritiesReport";
import {selectSlaViolationsReportData} from "../../redux/combined/SLAViolationsReport";
import {selectAverageLifetimeReportData} from "../../redux/combined/averageLifetimeReport";
import {selectTypesReportData} from "../../redux/combined/typesReport";
import {selectCommercialSlaViolationsReportData} from "../../redux/combined/commercialSLAViolationsReport";
import {selectAverageLifetimeUnresolvedReportData} from "../../redux/combined/averageLifetimeUnresolvedReport";


function NavBarActions() {
    const dispatch = useDispatch();
    const prioritiesData = useSelector(selectPrioritiesReportData);
    const typesData = useSelector(selectTypesReportData);
    const slaData = useSelector(selectSlaViolationsReportData);
    const commercialSlaData = useSelector(selectCommercialSlaViolationsReportData);
    const averageLifetimeData = useSelector(selectAverageLifetimeReportData);
    const averageLifetimeUnresolvedData = useSelector(selectAverageLifetimeUnresolvedReportData);
    const exportData = () => {
        const wb = new Workbook();
        /*Притритеты*/
        let ws = XLSX.utils.json_to_sheet(prioritiesData.map(e => e.toPriorityObject()));
        XLSX.utils.book_append_sheet(wb, ws, "Приоритеты");
        /*Типы*/
        ws = XLSX.utils.json_to_sheet(typesData.map(e => e.toTypeObject()));
        XLSX.utils.book_append_sheet(wb, ws, "Типы");
        /**/
        ws = XLSX.utils.json_to_sheet(averageLifetimeData.map(e => e.averageLifetimeObject()));
        XLSX.utils.book_append_sheet(wb, ws, "Время жизни задач");
        /**/
        ws = XLSX.utils.json_to_sheet(averageLifetimeUnresolvedData.map(e => e.averageLifetimeObject()));
        XLSX.utils.book_append_sheet(wb, ws, "Время жизни незавершенных");
        /**/
        ws = XLSX.utils.json_to_sheet(slaData.map(e => e.toSLAObject()));
        XLSX.utils.book_append_sheet(wb, ws, "Выполнение SLA");
        /**/
        ws = XLSX.utils.json_to_sheet(commercialSlaData.map(e => e.toSLAObject()));
        XLSX.utils.book_append_sheet(wb, ws, "Выполнение коммерческого SLA");
        /**/
        XLSX.writeFile(wb, `Статус запросов.xlsx`);
    }


    const refresh = <FontAwesomeIcon
        icon={faSync}
        className={cx(styles.iconButton, styles.defaultPadding)}
        onClick={() => dispatch(fetchSigmaData())} size={'1x'}
    />;

    const filters = <FontAwesomeIcon
        icon={faCalendarAlt}
        className={cx(styles.iconButton, styles.defaultPadding)}
        onClick={() => dispatch(openDialog(<DateRangeFilterDialog/>))} size={'2x'}
    />;

    const exportFile = <FontAwesomeIcon
        icon={faFileExcel}
        className={cx(styles.iconButton, styles.defaultPadding)}
        onClick={exportData} size={'2x'}
    />;

    return (
        <div className={cx(styles.row, styles.centered)}>
            <ProjectsFilter/>
            <TypesFilter/>
            <StatesFilter/>
            <PrioritiesFilter/>
            {filters}
            {exportFile}
            {refresh}
        </div>
    )

}

export default NavBarActions;

Object.defineProperty(
    Object.prototype, "toPriorityObject", {
        value: function toPriorityObject() {
            return new Object({
                'Приоритет': this.key,
                'Количество': this.value
            })
        },
        writable: true,
        configurable: true
    }
)

Object.defineProperty(
    Object.prototype, "toTypeObject", {
        value: function toTypeObject() {
            return new Object({
                'Тип': this.key,
                'Количество': this.value
            })
        },
        writable: true,
        configurable: true
    }
)

Object.defineProperty(
    Object.prototype, "averageLifetimeObject", {
        value: function averageLifetimeObject() {
            return new Object({
                'Приоритет': this.key,
                'Среднее время жизни (дни)': this.value
            })
        },
        writable: true,
        configurable: true
    }
)

Object.defineProperty(
    Object.prototype, "toSLAObject", {
        value: function toSLAObject() {
            return new Object({
                'Приоритет': this.key,
                'Всего': this.good + this.violated,
                'Нарушено': this.violated,
                '% выполнения': this.good / (this.good + this.violated)
            })
        },
        writable: true,
        configurable: true
    }
)
