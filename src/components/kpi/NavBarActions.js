import React from 'react';
import {connect, useDispatch} from 'react-redux';
import {fetchTimeAccountingData} from "../../redux/actions/timeAccountingActions";
import * as XLSX from "xlsx";
import TimeAccountingFilterDialog from "../dialogs/TimeAccountingFilterDialog";
import {Workbook} from "../../helper_functions/export_to_excel";
import styles from "../../styles/components.module.css";
import cx from "classnames";
import {openDialog} from "../../redux/combined/mainDialog";
import {format} from "date-fns";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFileExcel, faFilter, faSync} from "@fortawesome/free-solid-svg-icons";
import KPIFilterDialog from "../dialogs/KPIFilterDialog";
import {fetchKpiData} from "../../redux/combined/kpi";

function NavBarActions({timeAccountingData}) {
    const dispatch = useDispatch();
    const exportToExcel = () => {
        const issues = timeAccountingData.timeData.map((item) => {
            return {
                id: item.id,
                agent: item.agent,
                created: format(item.crDate, "dd.MM.yyyy hh:mm"),
                changed: format(item.changedDate, "dd.MM.yyyy hh:mm"),
                discipline: item.discipline,
                iterationPath: item.iterationPath,
                person: item.person,
                priority: item.priority,
                projects: item.projects,
                role: item.role,
                server: item.server,
                teamProject: item.teamProject,
                title: item.title,
                units: item.units,
                wit: item.wit,
            }
        });

        const wb = new Workbook();
        let ws = XLSX.utils.json_to_sheet(issues);
        XLSX.utils.book_append_sheet(wb, ws, "issues");
        XLSX.writeFile(wb, "export.xlsx");
    };

    const filters = <FontAwesomeIcon
        icon={faFilter}
        className={cx(styles.iconButton, styles.defaultPadding)}
        onClick={() => dispatch(openDialog(<KPIFilterDialog/>))} size={'1x'}
    />;

    const refresh = <FontAwesomeIcon
        icon={faSync}
        className={cx(styles.iconButton, styles.defaultPadding)}
        onClick={() => dispatch(fetchKpiData())} size={'1x'}
    />;

    const exp = <FontAwesomeIcon
        icon={faFileExcel}
        className={cx(styles.iconButton, styles.defaultPadding)}
        onClick={exportToExcel} size={'1x'}
    />;


    return (
        <div className={cx(styles.row, styles.centered)}>
            {filters}
            {refresh}
        </div>
    )

}

function mapStateToProps(state) {
    return {
        timeAccountingData: state.timeAccountingData,
    }
}

export default connect(mapStateToProps, null)(NavBarActions);
