import React, {useState} from "react";
import Button from "@material-ui/core/Button";
import connect from "react-redux/es/connect/connect";
import DatePicker from "react-datepicker";
import {format, parseISO} from "date-fns";
import {styles} from "../../Styles";
import {setDateFrom, setDateTo} from "../../redux/actions/kpiFiltersActions";
import {fetchKpiReportData} from "../../redux/actions/kpiActions";

function KPISidebar({df, dt, close, loadData, dispatchAll}) {
    const {sidebarContentBase, spacedRowWithButtons, dateRangeSelectorContainer} = styles;
    const [dateFrom, setDateFrom] = useState(df);
    const [dateTo, setDateTo] = useState(dt);
    return (<div style={sidebarContentBase}>
        <div style={dateRangeSelectorContainer}>
            <div style={{padding: 4}}>
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
            <div style={{padding: 4}}>
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
        <div style={spacedRowWithButtons}>
            <Button onClick={loadData} variant="contained" color="primary">Обновить</Button>
            <Button onClick={() => dispatchAll(dateFrom, dateTo)} variant="contained" color="primary">Применить</Button>
            <Button onClick={close} variant="contained" color="secondary">Закрыть</Button>
        </div>
    </div>)
}

function mapStateToProps(state) {
    return {
        filters: state.reportFilters,
        df: parseISO(state.kpiFilters.dateFrom),
        dt: parseISO(state.kpiFilters.dateTo),
    }
}

function mapDispatchToProps(dispatch) {
    return {
        dispatchAll: (dateFrom, dateTo) => {
            dispatch(setDateFrom(format(dateFrom, 'yyyy-MM-dd')));
            dispatch(setDateTo(format(dateTo, 'yyyy-MM-dd')));
        },
        loadData: () => dispatch(fetchKpiReportData())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(KPISidebar);
