import React, {Component} from "react";
import DialogTitle from "../../node_modules/@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "../../node_modules/@material-ui/core/DialogContent/DialogContent";
import DialogActions from "../../node_modules/@material-ui/core/DialogActions/DialogActions";
import Button from "../../node_modules/@material-ui/core/Button/Button";
import Dialog from "../../node_modules/@material-ui/core/Dialog/Dialog";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles";
import connect from "react-redux/es/connect/connect";
import {styles} from "../Styles";
import Typography from "@material-ui/core/Typography/Typography";


class ReportFilterDialog extends Component {
    handleClose = () => {
        this.props.handleClose(false, null, null, [])
    };

    render() {
        const {classes} = this.props;
        const noDescriptionHelp = <DialogContent className={classes.dialog}>
            <Typography style={{width: '100vw'}}>
                Unfortunately I'm undefined :(
            </Typography>
        </DialogContent>;

        const timeAccountingHelp = <DialogContent className={classes.dialog}>
            <Typography style={{width: '100vw'}}>
                Трудозатраты выгружаются в соотвествии с расписанием cron-планировщика:
            </Typography>
            <Typography style={{width: '100vw'}}>
                '0 0/10 * * * *'
            </Typography>
            <br/>
            <Typography align={'left'} style={{width: '100vw'}}>
                Если их нет в таблице через 10 минут после внесения, то проверьте их наличие в YT и фильтры
                отчёта.
            </Typography>
            <br/>
            <Typography align={'left'} style={{width: '100vw'}}>
                Вот вам описание, теперь всё должно быть понятно.
            </Typography>
        </DialogContent>;
        const m = new Map();
        m.set(1, timeAccountingHelp);
        console.log(m.get(this.props.appBarState.selectedId));
        return <Dialog
            open={this.props.open}
            scroll={'paper'}
            aria-labelledby="scroll-dialog-title">
            <DialogTitle id="scroll-dialog-title">{this.props.appBarState.title}</DialogTitle>
            {m.get(this.props.appBarState.selectedId) ? m.get(this.props.appBarState.selectedId) : noDescriptionHelp}
            <DialogActions>
                <Button onClick={this.handleClose} color="primary">
                    Закрыть
                </Button>
            </DialogActions>
        </Dialog>
    }
}

ReportFilterDialog.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        appBarState: state.appBarState,
    }
}

export default withStyles(styles, {withTheme: true})(connect(mapStateToProps, null)(ReportFilterDialog));