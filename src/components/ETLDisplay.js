import React, {Component} from "react";
import Checkbox from "../../node_modules/@material-ui/core/Checkbox/Checkbox";
import FormControlLabel from "../../node_modules/@material-ui/core/FormControlLabel/FormControlLabel";
import FormGroup from "../../node_modules/@material-ui/core/FormGroup/FormGroup";
import Button from "@material-ui/core/Button";
import TextField from "../../node_modules/@material-ui/core/TextField/TextField";
import store from "../redux/store";
import withStyles from "../../node_modules/@material-ui/core/styles/withStyles";
import connect from "react-redux/es/connect/connect";
import * as PropTypes from "prop-types";
import {styles} from "../Styles";
import {fetchETL, setEtlFilterDateFrom, setEtlFilterDateTo} from "../redux/actions/etlFilterActions";
import {setSelectedNavItem} from "../redux/actions/appBarActions";
import {PAGES} from "../Const";

class ETLDisplay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: null,
            isLoading: false,
            etlState: null
        }
    }

    componentWillMount() {
        store.dispatch(setSelectedNavItem(PAGES.filter((page) => page.path === this.props.location.pathname)[0]));
    }

    render() {
        const {classes} = this.props;
        const isLoading = this.state.isLoading;
        return <FormGroup row>
            <TextField
                variant="outlined"
                id="date"
                label="Date from"
                type="date"
                defaultValue={this.props.etlFilters.dateFrom}
                onChange={field => store.dispatch(setEtlFilterDateFrom(field.target.value)) /*this.setState({dateFrom: field.target.value})*/}
                className={classes.textField}
                InputLabelProps={{shrink: true,}}
            />
            <TextField
                variant="outlined"
                id="date"
                label="Date to"
                type="date"
                defaultValue={this.props.etlFilters.dateTo}
                onChange={field => store.dispatch(setEtlFilterDateTo(field.target.value)) /*this.setState({dateTo: field.target.value})*/}
                className={classes.textField}
                InputLabelProps={{shrink: true,}}
            />
            <FormControlLabel
                control={<Checkbox value="a" key={1} onChange={() => (console.log("aaa"))} checked={true}/>}
                label="Запросы"
            />
            <FormControlLabel
                control={<Checkbox value="a" key={2} onChange={() => (console.log("aaa"))} checked={true}/>}
                label="Проекты"
            />
            <Button className={classes.button} variant="contained" disabled={isLoading}
                    onClick={() => store.dispatch(fetchETL())}>
                Загрузить данные
            </Button>
        </FormGroup>;
    }
}

ETLDisplay.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        etlFilters: state.etlFilters,
    }
}

export default withStyles(styles, {withTheme: true})(connect(mapStateToProps, null)(ETLDisplay));
