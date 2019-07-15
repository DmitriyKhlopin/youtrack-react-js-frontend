import React, {Component} from "react";
import DialogTitle from "../../../node_modules/@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "../../../node_modules/@material-ui/core/DialogContent/DialogContent";
import DialogActions from "../../../node_modules/@material-ui/core/DialogActions/DialogActions";
import Button from "../../../node_modules/@material-ui/core/Button/Button";
import Dialog from "../../../node_modules/@material-ui/core/Dialog/Dialog";
import {withStyles} from "@material-ui/core/styles";
import ChipsArray from "../ChipArray";
import connect from "react-redux/es/connect/connect";
import store from "../../redux/store";
import {selectProjectsByMode} from "../../redux/actions/reportFiltersActions";
import {styles} from "../../Styles";
import DatePicker from "react-datepicker";
import {format, parseISO} from "date-fns";
import {setTimeAccountingDateFrom, setTimeAccountingDateTo} from "../../redux/actions/timeAccountingFiltersActions";

class ReportFilterDialog extends Component {
    handleClose = () => {
        this.props.handleClose(false, null, null, [])
    };

    render() {
        const {classes} = this.props;
        return <Dialog
            open={this.props.open}
            scroll={'paper'}
            aria-labelledby="scroll-dialog-title">
            <DialogTitle id="scroll-dialog-title">Параметры отчёта</DialogTitle>
            <DialogContent className={classes.dialog}>
                <ChipsArray/>
                <Button variant="outlined" color="primary" className={classes.button}
                        onClick={() => store.dispatch(selectProjectsByMode('PP'))}>
                    Внешние проекты
                </Button>
                <Button variant="outlined" color="primary" className={classes.button}
                        onClick={() => store.dispatch(selectProjectsByMode('notPP'))}>
                    Внутренние проекты
                </Button>
                <Button variant="outlined" color="primary" className={classes.button}
                        onClick={() => store.dispatch(selectProjectsByMode('LIC'))}>
                    Лицензирование
                </Button>
                <Button variant="outlined" color="primary" className={classes.button}
                        onClick={() => store.dispatch(selectProjectsByMode('ALL'))}>
                    Все проекты
                </Button>
                <Button variant="outlined" color="primary" className={classes.button}
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
                            selected={parseISO(this.props.filters.dateFrom)}
                            selectsStart
                            startDate={parseISO(this.props.filters.dateFrom)}
                            endDate={parseISO(this.props.filters.dateTo)}
                            maxDate={parseISO(this.props.filters.dateTo)}
                            onChange={date => store.dispatch(setTimeAccountingDateFrom(format(date, 'yyyy-MM-dd')))}
                        />
                    </div>
                    <div style={{padding: 4}}>
                        <div style={{textAlign: 'center'}}>Конец периода</div>
                        <DatePicker
                            inline
                            selected={parseISO(this.props.filters.dateTo)}
                            selectsEnd
                            startDate={parseISO(this.props.filters.dateFrom)}
                            endDate={parseISO(this.props.filters.dateTo)}
                            onChange={date => store.dispatch(setTimeAccountingDateTo(format(date, 'yyyy-MM-dd')))}
                            minDate={parseISO(this.props.filters.dateFrom)}
                        />
                    </div>
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={this.handleClose} color="primary">
                    Закрыть
                </Button>
            </DialogActions>
        </Dialog>
    }
}

function mapStateToProps(state) {
    return {
        filters: state.reportFilters
    }
}

export default withStyles(styles, {withTheme: true})(connect(mapStateToProps, null)(ReportFilterDialog));
