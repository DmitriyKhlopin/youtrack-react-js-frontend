import React, {Component} from "react";
import DialogTitle from "../../node_modules/@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "../../node_modules/@material-ui/core/DialogContent/DialogContent";
import DialogActions from "../../node_modules/@material-ui/core/DialogActions/DialogActions";
import Button from "../../node_modules/@material-ui/core/Button/Button";
import Dialog from "../../node_modules/@material-ui/core/Dialog/Dialog";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles";
import ChipsArray from "./ChipArray";
import TextField from "../../node_modules/@material-ui/core/TextField/TextField";
import moment from "moment";
import connect from "react-redux/es/connect/connect";
import store from "../redux/store";
import {selectProjectsByMode, setDateFrom, setDateTo} from "../redux/actions/filtersActions";

const styles = theme => ({
    root: {
        display: 'flex',
        /*minHeight: 400,*/
        justifyContent: 'center',
        flexWrap: 'wrap',
        paddingLeft: theme.spacing.unit * 3,
        paddingRight: theme.spacing.unit * 3,
    },
    chip: {
        margin: theme.spacing.unit / 2,
    },
    button: {
        margin: theme.spacing.unit,
    },
    textField: {
        margin: theme.spacing.unit,
    },
});

class ReportFilterDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            scroll: 'paper',
            projects: [],
            selectedProjects: [],
            previouslySelectedProjects: [],
            currentMode: "PP",
            dateFrom: moment().subtract(9, 'weeks').format('YYYY-MM-DD'),
            dateTo: moment().format('YYYY-MM-DD'),
        };
        this.onProjectsChanged = this.onProjectsChanged.bind(this);
    }

    componentDidUpdate(prevProps, a, b) {
        if (this.props.open !== prevProps.open) {
            this.setState({open: this.props.open})
        }
        if (this.props.projects !== prevProps.projects) {
            this.setState({projects: this.props.projects})
        }
        if (prevProps.selectedProjects !== this.props.selectedProjects) {
            this.setState({selectedProjects: this.props.selectedProjects})
        }
    }

    componentDidMount() {
        this.setState({open: this.props.open});
        this.setState({projects: this.props.projects})
    }

    onProjectsChanged(projects) {
        this.setState({selectedProjects: projects.map(item => item.shortName), currentMode: "UNDEFINED"})
    };

    handleClose() {
        this.props.handleClose(false, null, null, [])
        /*if (b === true) {
            console.log(b);
            this.setState({previouslySelectedProjects: this.state.selectedProjects});
            this.props.handleClose(false, this.state.dateFrom, this.state.dateTo, this.state.selectedProjects)
        } else {
            const prev = this.state.previouslySelectedProjects;
            if (prev) this.setState({selectedProjects: prev});
            this.props.handleClose(false, null, null, [])
        }*/
    };

    render() {
        const {classes} = this.props;
        return <Dialog
            maxWidth={false}
            open={this.state.open}
            scroll={this.state.scroll}
            aria-labelledby="scroll-dialog-title">
            <DialogTitle id="scroll-dialog-title">Параметры отчёта</DialogTitle>
            <DialogContent className={classes.root}>
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
                <TextField
                    variant="outlined"
                    id="date"
                    label="Date from"
                    type="date"
                    defaultValue={this.props.filters.dateFrom}
                    onChange={field => store.dispatch(setDateFrom(field.target.value)) /*this.setState({dateFrom: field.target.value})*/}
                    className={classes.textField}
                    InputLabelProps={{shrink: true,}}
                />
                <TextField
                    variant="outlined"
                    id="date"
                    label="Date to"
                    type="date"
                    defaultValue={this.props.filters.dateTo}
                    onChange={field => store.dispatch(setDateTo(field.target.value)) /*this.setState({dateTo: field.target.value})*/}
                    className={classes.textField}
                    InputLabelProps={{shrink: true,}}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => this.handleClose()} color="primary">
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
        filters: state.filters
    }
}

export default withStyles(styles, {withTheme: true})(connect(mapStateToProps, null)(ReportFilterDialog));