import React from "react";
import ChipsArray from "../ChipArray";
import connect from "react-redux/es/connect/connect";
import {selectProjectsByMode, setDateFrom, setDateTo} from "../../redux/actions/reportFiltersActions";
import DatePicker from "react-datepicker";
import {format, parseISO} from "date-fns";
import styles from "../../styles/components.module.css";
import {useDispatch} from "react-redux";

function ReportFilterDialog({filters, handleCloseAndUpdate, handleClose}) {
    const dispatch = useDispatch();
    const hcu = () => {
        handleCloseAndUpdate(false, null, null, [])
    };

    const hc = () => {
        handleClose(false, null, null, [])
    };


    return (<div className={styles.column}>
        <div>Параметры отчёта</div>
        <div>
            <ChipsArray/>
            <button className={styles.button}
                    onClick={() => dispatch(selectProjectsByMode('PP'))}>
                Внешние проекты
            </button>
            <button className={styles.button}
                    onClick={() => dispatch(selectProjectsByMode('notPP'))}>
                Внутренние проекты
            </button>
            <button className={styles.button}
                    onClick={() => dispatch(selectProjectsByMode('LIC'))}>
                Лицензирование
            </button>
            <button className={styles.button}
                    onClick={() => dispatch(selectProjectsByMode('ALL'))}>
                Все проекты
            </button>
            <button className={styles.button}
                    onClick={() => dispatch(selectProjectsByMode('NONE'))}>
                Снять отметку
            </button>
            <div style={{
                width: '100%',
                minWidth: '160px',
                height: '100%',
                minHeight: '300px',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                backgroundColor: 'transparent',
            }}>
                <div style={{padding: 4}}>
                    <div style={{textAlign: 'center'}}>Начало периода</div>
                    <DatePicker
                        inline
                        selected={parseISO(filters.dateFrom)}
                        selectsStart
                        startDate={parseISO(filters.dateFrom)}
                        endDate={parseISO(filters.dateTo)}
                        maxDate={parseISO(filters.dateTo)}
                        onChange={date => dispatch(setDateFrom(format(date, 'yyyy-MM-dd')))}
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
                        onChange={date => dispatch(setDateTo(format(date, 'yyyy-MM-dd')))}
                        minDate={parseISO(filters.dateFrom)}
                    />
                </div>
            </div>
        </div>
        <div className={styles.row}>
            <button className={styles.button} onClick={hcu}>Закрыть и вычислить</button>
            <button className={styles.button} onClick={hc}>Закрыть</button>
        </div>
    </div>)
}

function mapStateToProps(state) {
    return {
        filters: state.reportFilters
    }
}

export default connect(mapStateToProps, null)(ReportFilterDialog);
