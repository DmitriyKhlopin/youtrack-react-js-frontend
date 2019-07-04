import React, {Component} from "react";
import DialogContent from "../../node_modules/@material-ui/core/DialogContent/DialogContent";
import DialogActions from "../../node_modules/@material-ui/core/DialogActions/DialogActions";
import Button from "../../node_modules/@material-ui/core/Button/Button";
import Dialog from "../../node_modules/@material-ui/core/Dialog/Dialog";

import {withStyles} from "@material-ui/core/styles";
import connect from "react-redux/es/connect/connect";
import store from "../redux/store";
import {styles} from "../Styles";
import {setTimeAccountingDateFrom, setTimeAccountingDateTo} from "../redux/actions/timeAccountingFiltersActions";
import DatePicker from "react-datepicker";
import {format, parseISO} from 'date-fns'
import "react-datepicker/dist/react-datepicker.css";


class TimeAccountingFilterDialog extends Component {
    state = {df: this.props.filters.dateFrom, dt: this.props.filters.dateTo};
    handleClose = update => () => {
        /*if (update === true) {
            store.dispatch(setTimeAccountingDateFrom(this.state.df));
            store.dispatch(setTimeAccountingDateTo(this.state.dt));
        }*/
        this.props.handleClose(false, null, null, [])
    };

    render() {
        const {classes} = this.props;
        console.log(this.props.filters.dateFrom);
        return <Dialog
            open={this.props.open}
            scroll={'paper'}
            fullWidth={true}
            aria-labelledby="scroll-dialog-title">
            {/*<DialogTitle id="scroll-dialog-title">Параметры отчёта</DialogTitle>*/}
            <DialogContent className={classes.dialog}>
                <div style={{
                    width: '100%',
                    minWidth: '160px',
                    height: '100%',
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
                <Button onClick={this.handleClose(true)} color="primary">
                    Применить
                </Button>
                <Button onClick={this.handleClose(false)} color="primary">
                    Закрыть
                </Button>
            </DialogActions>
        </Dialog>
    }
}

function mapStateToProps(state) {
    return {
        filters: state.timeAccountingFilters
    }
}

export default withStyles(styles, {withTheme: true})(connect(mapStateToProps, null)(TimeAccountingFilterDialog));
