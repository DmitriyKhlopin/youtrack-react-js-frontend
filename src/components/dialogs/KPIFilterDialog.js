import React, {useState} from "react";
import ChipsArray from "../ChipArray";
import connect from "react-redux/es/connect/connect";
import {store} from "../../redux/store";
import {selectProjectsByMode} from "../../redux/actions/reportFiltersActions";
import DatePicker from "react-datepicker";
import {format, parseISO} from "date-fns";
import {setTimeAccountingDateFrom} from "../../redux/actions/timeAccountingFiltersActions";
import styles from "../../styles/components.module.css";

function KPIFilterDialog({filters, open, handleClose, dispatchDateFrom, dispatchDateTo}) {

    const [dateFrom, setDateFrom] = useState(filters.dateFrom);
    const [dateTo, setDateTo] = useState(filters.dateTo);

    const close = () => {
        handleClose(false, null, null, [])
    };

    const apply = () => {
        dispatchDateFrom(dateFrom);
        dispatchDateTo(dateTo);
        handleClose(false, null, null, [])
    };

    return (<div className={styles.column}>
        <div id="scroll-dialog-title">Параметры отчёта</div>
        <ChipsArray/>
        <div className={styles.row}>
            <button className={styles.button} onClick={() => store.dispatch(selectProjectsByMode('PP'))}>
                Внешние проекты
            </button>
            <button className={styles.button} onClick={() => store.dispatch(selectProjectsByMode('notPP'))}>
                Внутренние проекты
            </button>
            <button className={styles.button} onClick={() => store.dispatch(selectProjectsByMode('LIC'))}>
                Лицензирование
            </button>
            <button className={styles.button} onClick={() => store.dispatch(selectProjectsByMode('ALL'))}>
                Все проекты
            </button>
            <button className={styles.button} onClick={() => store.dispatch(selectProjectsByMode('NONE'))}>
                Снять отметку
            </button>
        </div>
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
                    selected={parseISO(dateFrom)}
                    selectsStart
                    startDate={parseISO(dateFrom)}
                    endDate={parseISO(dateTo)}
                    maxDate={parseISO(dateTo)}
                    onChange={date => setDateFrom(format(date, 'yyyy-MM-dd'))}
                />
            </div>
            <div style={{padding: 4}}>
                <div style={{textAlign: 'center'}}>Конец периода</div>
                <DatePicker
                    inline
                    selected={parseISO(dateTo)}
                    selectsEnd
                    startDate={parseISO(dateFrom)}
                    endDate={parseISO(dateTo)}
                    minDate={parseISO(dateFrom)}
                    onChange={date => setDateTo(format(date, 'yyyy-MM-dd'))}
                />
            </div>
        </div>
        <div className={styles.row}>
            <button onClick={apply} color="primary">Применить</button>
            <button onClick={close} color="primary">Закрыть</button>
        </div>
    </div>)

}

function mapStateToProps(state) {
    return {
        filters: state.reportFilters,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        dispatchDateFrom: (dateFrom) => dispatch(setTimeAccountingDateFrom(dateFrom)),
        dispatchDateTo: (dateFrom) => dispatch(setTimeAccountingDateFrom(dateFrom))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(KPIFilterDialog);
