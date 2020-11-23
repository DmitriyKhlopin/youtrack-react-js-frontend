import React from "react";
import connect from "react-redux/es/connect/connect";
import {setTimeAccountingDateFrom, setTimeAccountingDateTo} from "../../redux/actions/timeAccountingFiltersActions";
import DatePicker from "react-datepicker";
import {format, parseISO} from 'date-fns'
import "react-datepicker/dist/react-datepicker.css";
import styles from "../../styles/components.module.css";
import {useDispatch, useSelector} from "react-redux";
import {closeDialog} from "../../redux/combined/mainDialog";
import {selectDateFrom, selectDateTo, setFilterDateFrom, setFilterDateTo} from "../../redux/combined/reportFilters";
import cx from "classnames";


function DateRangeFilterDialog() {
    const dispatch = useDispatch();
    const dateFrom = useSelector(selectDateFrom);
    const dateTo = useSelector(selectDateTo);
    return (<div className={cx(styles.column, styles.centered)}>
        <div className={cx(styles.row)}>
            <div style={{padding: 4}}>
                <div style={{textAlign: 'center'}}>Начало периода</div>
                <DatePicker
                    inline
                    selected={dateFrom}
                    selectsStart
                    startDate={dateFrom}
                    endDate={dateTo}
                    maxDate={dateTo}
                    onChange={date => dispatch(setFilterDateFrom(date))}
                />
            </div>
            <div style={{padding: 4}}>
                <div style={{textAlign: 'center'}}>Конец периода</div>
                <DatePicker
                    inline
                    selected={dateTo}
                    selectsEnd
                    startDate={dateFrom}
                    endDate={dateTo}
                    onChange={date => dispatch(setFilterDateTo(date))}
                    minDate={dateFrom}
                />
            </div>
        </div>
        <div className={styles.row}>
            <button onClick={() => dispatch(closeDialog())}>Закрыть</button>
        </div>
    </div>)

}

export default DateRangeFilterDialog;
