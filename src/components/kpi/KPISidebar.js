import React, {useState} from "react";
import connect from "react-redux/es/connect/connect";
import DatePicker from "react-datepicker";
import {format, parseISO} from "date-fns";
import {setDateFrom, setDateTo} from "../../redux/actions/kpiFiltersActions";
import {fetchKpiReportData} from "../../redux/actions/kpiActions";
import styles from "../../styles/components.module.css";

function KPISidebar({df, dt, close, loadData, dispatchAll}) {
    const {sidebarContentBase, spacedRowWithButtons, dateRangeSelectorContainer} = styles;
    const [dateFrom, setDateFrom] = useState(df);
    const [dateTo, setDateTo] = useState(dt);
    const defaultPeriods = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    const [period, setPeriod] = useState(4);
    const periodLengths = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    const [periodLength, setPeriodLength] = useState(3);
    const inputLabel1 = React.useRef(null);
    const [labelWidth1, setLabelWidth1] = useState(0);

    /*useEffect(() => {
        setLabelWidth1(inputLabel1.current.offsetWidth);
    }, []);*/

    /*const handleChange = (value) => {
    };*/

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
            {/*<FormControl variant="outlined" className={styles.multiSelect} component='div'>
                <InputLabel ref={inputLabel1} htmlFor="outlined-projects-simple">
                    Проекты
                </InputLabel>
                <Select value={period} onChange={handleChange} multiple={false}
                        input={
                            <OutlinedInput labelWidth={labelWidth1} name="Projects" id="outlined-projects-simple"/>
                        }>
                    {<MenuItem value="SelectAll"> <em>Выбрать все</em> </MenuItem>}
                    {defaultPeriods.map((item, index) => (
                        <MenuItem key={`projects-list-item-${index}`} value={item}>
                            <Checkbox checked={item===period}/>
                            {item}
                        </MenuItem>
                    ))}

                </Select>
            </FormControl>*/}
        </div>
        <div style={spacedRowWithButtons}>
            <button className={styles.button} onClick={loadData}>Обновить</button>
            <button className={styles.button} onClick={() => dispatchAll(dateFrom, dateTo)}>Применить</button>
            <button className={styles.button} onClick={close}>Закрыть</button>
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