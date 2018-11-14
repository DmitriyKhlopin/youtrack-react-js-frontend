import React, {Component} from "react";
import DialogTitle from "../../node_modules/@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "../../node_modules/@material-ui/core/DialogContent/DialogContent";
import DialogActions from "../../node_modules/@material-ui/core/DialogActions/DialogActions";
import Button from "../../node_modules/@material-ui/core/Button/Button";
import Dialog from "../../node_modules/@material-ui/core/Dialog/Dialog";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles";
import TextField from "../../node_modules/@material-ui/core/TextField/TextField";
import connect from "react-redux/es/connect/connect";
import store from "../redux/store";
import {setDateFrom, setDateTo} from "../redux/actions/reportFiltersActions";
import {styles} from "../Styles";

class TimeAccountingFilterDialog extends Component {
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
                <TextField
                    variant="outlined"
                    id="date"
                    label="Date from"
                    type="date"
                    defaultValue={this.props.reportFilters.dateFrom}
                    onChange={field => store.dispatch(setDateFrom(field.target.value)) /*this.setState({dateFrom: field.target.value})*/}
                    className={classes.textField}
                    InputLabelProps={{shrink: true,}}
                />
                <TextField
                    variant="outlined"
                    id="date"
                    label="Date to"
                    type="date"
                    defaultValue={this.props.reportFilters.dateTo}
                    onChange={field => store.dispatch(setDateTo(field.target.value)) /*this.setState({dateTo: field.target.value})*/}
                    className={classes.textField}
                    InputLabelProps={{shrink: true,}}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={this.handleClose} color="primary">
                    Применить
                </Button>
                <Button onClick={this.handleClose} color="primary">
                    Закрыть
                </Button>
            </DialogActions>
        </Dialog>
    }
}

TimeAccountingFilterDialog.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        reportFilters: state.reportFilters
    }
}

export default withStyles(styles, {withTheme: true})(connect(mapStateToProps, null)(TimeAccountingFilterDialog));