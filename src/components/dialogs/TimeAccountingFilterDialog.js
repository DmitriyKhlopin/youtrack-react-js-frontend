import React from "react";
import connect from "react-redux/es/connect/connect";
import {setTimeAccountingDateFrom, setTimeAccountingDateTo} from "../../redux/actions/timeAccountingFiltersActions";
import DatePicker from "react-datepicker";
import {format, parseISO} from 'date-fns'
import "react-datepicker/dist/react-datepicker.css";
import styles from "../../styles/components.module.css";
import {useDispatch} from "react-redux";
import {closeDialog} from "../../redux/combined/mainDialog";


function TimeAccountingFilterDialog({filters}) {
    const dispatch = useDispatch();
    return (<div className={styles.column}>
        <div className={styles.row}>
            <div style={{padding: 4}}>
                <div style={{textAlign: 'center'}}>Начало периода</div>
                <DatePicker
                    inline
                    selected={parseISO(filters.dateFrom)}
                    selectsStart
                    startDate={parseISO(filters.dateFrom)}
                    endDate={parseISO(filters.dateTo)}
                    maxDate={parseISO(filters.dateTo)}
                    onChange={date => dispatch(setTimeAccountingDateFrom(format(date, 'yyyy-MM-dd')))}
                />
            </div>
            <div style={{padding: 4}}>
                <div style={{textAlign: 'center'}}>Конец периода</div>
                <DatePicker
                    inline
                    selected={parseISO(filters.dateTo)}
                    selectsEnd
                    startDate={parseISO(filters.dateFrom)}
                    endDate={parseISO(filters.dateTo)}
                    onChange={date => dispatch(setTimeAccountingDateTo(format(date, 'yyyy-MM-dd')))}
                    minDate={parseISO(filters.dateFrom)}
                />
            </div>
        </div>
        <div className={styles.row}>
            <button onClick={() => dispatch(closeDialog())}>Закрыть</button>
        </div>
    </div>)

}

function mapStateToProps(state) {
    return {
        filters: state.timeAccountingFilters
    }
}

export default connect(mapStateToProps, null)(TimeAccountingFilterDialog);
