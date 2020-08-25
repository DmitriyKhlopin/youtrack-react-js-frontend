import React, {useState} from "react";
import DatePicker from "react-datepicker";
import styles from "../../styles/components.module.css";
import cx from "classnames";
import {useDispatch, useSelector} from "react-redux";
import {fetchKpiData, selectKpiDateFrom, selectKpiDateTo, setKpiDateFrom, setKpiDateTo} from "../../redux/combined/kpi";
import {closeDialog} from "../../redux/combined/mainDialog";

function KPIFilterDialog() {
    const [dateFrom, setDateFrom] = useState(useSelector(selectKpiDateFrom));
    const [dateTo, setDateTo] = useState(useSelector(selectKpiDateTo));

    const dispatch = useDispatch();
    const handleClick = () => {
        dispatch(setKpiDateFrom(dateFrom));
        dispatch(setKpiDateTo(dateTo));
        dispatch(closeDialog());
        dispatch(fetchKpiData());
    }

    return (<div className={styles.column}>
        <div className={styles.row}>
            <div className={cx(styles.column, styles.defaultMargin)}>
                <div style={{textAlign: 'center'}}>Начало периода</div>
                <DatePicker
                    inline
                    selected={dateFrom}
                    selectsStart
                    startDate={dateFrom}
                    endDate={dateTo}
                    maxDate={dateTo}
                    onChange={date => setDateFrom(date)}
                />
            </div>
            <div className={cx(styles.column, styles.defaultMargin)}>
                <div style={{textAlign: 'center'}}>Конец периода</div>
                <DatePicker
                    inline
                    selected={dateTo}
                    selectsEnd
                    startDate={dateFrom}
                    endDate={dateTo}
                    minDate={dateFrom}
                    onChange={date => setDateTo(date)}
                />
            </div>
        </div>
        <div className={styles.row}>
            <button className={styles.textButton} onClick={handleClick}>Применить</button>
        </div>
    </div>)
}

export default KPIFilterDialog;