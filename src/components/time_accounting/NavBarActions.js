import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
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
import {selectTimeAccountingData} from "../../redux/reducers/timeAccountingReducers";

function NavBarActions() {
    const dispatch = useDispatch();
    const data = useSelector(selectTimeAccountingData);
    const exportToExcel = () => {
        const issues = data.map((item) => {
            return {
                id: item.id,
                agent: item.agent,
                created: format(item.crDate, "dd.MM.yyyy hh:mm"),
                changed: format(item.changedDate, "dd.MM.yyyy hh:mm"),
                iterationPath: item.iterationPath,
                priority: item.priority,
                projects: item.projects,
                title: item.title,
                units: item.units
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
        onClick={() => dispatch(openDialog(<TimeAccountingFilterDialog/>))} size={'1x'}
    />;

    const refresh = <FontAwesomeIcon
        icon={faSync}
        className={cx(styles.iconButton, styles.defaultPadding)}
        onClick={() => dispatch(fetchTimeAccountingData())} size={'1x'}
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
            {exp}
        </div>
    )

}

export default NavBarActions;
