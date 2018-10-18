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

/*const styles = theme => ({
    root: {
        display: 'flex',
        /!*minHeight: 400,*!/
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
});*/

class ETLDisplay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: null,
            isLoading: false,
            etlState: null
        }
    }

    componentWillUnmount() {
        this.isCancelled = true;
    }

    componentDidMount() {

    }

    getCurrentState() {
        console.log("bbb");
        const myHeaders = new Headers();
        myHeaders.append('Accept', 'application/json');
        const url = "http://10.0.172.42:8081/etl/state";
        fetch(url, {
            method: "GET",
            headers: myHeaders
        }).then(res => res.json()).then(res => this.setState({etlState: res}))
    }

    render() {
        const {classes} = this.props;
        const items = this.state.items;
        const isLoading = this.state.isLoading;
        const selectors = <FormGroup row>
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
            <Button variant="contained" disabled={isLoading} onClick={() => store.dispatch(fetchETL())}>
                Load data
            </Button>
            <Button variant="contained" onClick={() => this.getCurrentState()}>
                Get current state
            </Button>
        </FormGroup>;
        if (items === null && !isLoading) return <div>{selectors}
            <div>No data</div>
        </div>;
        if (items === null && isLoading) return <div>{selectors}
            <div>Loading data</div>
        </div>;
        if (items !== null && !isLoading) return <div>{selectors}
            <div>{items.issues} - {items.timeUnit}</div>
        </div>;
        if (items !== null && isLoading) return <div>{selectors}
            <div>{items.issues} - {items.timeUnit}
                <div> Loading more data</div>
            </div>
        </div>;
        return <div>{selectors}
            <div>Unhandled state</div>
        </div>

    }
}

ETLDisplay.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        /*filters: state.filters,
        reports: state.reports,*/
        etlFilters: state.etlFilters,
    }
}

export default withStyles(styles, {withTheme: true})(connect(mapStateToProps, null)(ETLDisplay));