import React, {useState} from "react";
import DialogTitle from "../../../node_modules/@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "../../../node_modules/@material-ui/core/DialogContent/DialogContent";
import DialogActions from "../../../node_modules/@material-ui/core/DialogActions/DialogActions";
import Button from "../../../node_modules/@material-ui/core/Button/Button";
import Dialog from "../../../node_modules/@material-ui/core/Dialog/Dialog";
import {makeStyles} from "@material-ui/core/styles";
import ChipsArray from "../ChipArray";
import connect from "react-redux/es/connect/connect";
import {store} from "../../redux/store";
import {selectProjectsByMode} from "../../redux/actions/reportFiltersActions";
import DatePicker from "react-datepicker";
import {format, parseISO} from "date-fns";
import {setTimeAccountingDateFrom} from "../../redux/actions/timeAccountingFiltersActions";

const useStyles = makeStyles(theme => ({
    dialog: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        flexDirection: 'row',
    },
    button: {
        margin: theme.spacing,
        padding: theme.spacing,
    },
}));


function KPIFilterDialog({filters, open, handleClose, dispatchDateFrom, dispatchDateTo}) {
    const styles = useStyles();
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

    return (<Dialog
        open={open}
        scroll={'paper'}
        syle={{minWidth: '900px'}}
        aria-labelledby="scroll-dialog-title">
        <DialogTitle id="scroll-dialog-title">Параметры отчёта</DialogTitle>
        <DialogContent className={styles.dialog}>
            <ChipsArray/>
            <Button variant="outlined" color="primary" className={styles.button}
                    onClick={() => store.dispatch(selectProjectsByMode('PP'))}>
                Внешние проекты
            </Button>
            <Button variant="outlined" color="primary" className={styles.button}
                    onClick={() => store.dispatch(selectProjectsByMode('notPP'))}>
                Внутренние проекты
            </Button>
            <Button variant="outlined" color="primary" className={styles.button}
                    onClick={() => store.dispatch(selectProjectsByMode('LIC'))}>
                Лицензирование
            </Button>
            <Button variant="outlined" color="primary" className={styles.button}
                    onClick={() => store.dispatch(selectProjectsByMode('ALL'))}>
                Все проекты
            </Button>
            <Button variant="outlined" color="primary" className={styles.button}
                    onClick={() => store.dispatch(selectProjectsByMode('NONE'))}>
                Снять отметку
            </Button>
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
        </DialogContent>
        <DialogActions>
            <Button onClick={apply} color="primary"> Применить </Button>
            <Button onClick={close} color="primary"> Закрыть </Button>
        </DialogActions>
    </Dialog>)

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
