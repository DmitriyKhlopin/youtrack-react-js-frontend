import React, {Component} from "react";
import store from "../redux/store";
import {setSelectedNavItem} from "../redux/actions/appBarActions";
import * as PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import {styles} from "../Styles";
import connect from "react-redux/es/connect/connect";
import Button from "@material-ui/core/Button/Button";
import {fetchTimeAccountingData} from "../redux/actions/timeAccountingActions";
import {PAGE_IDS} from "../Const";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import MenuItem from "@material-ui/core/MenuItem";
import * as ReactDOM from "react-dom";
import InputLabel from "@material-ui/core/InputLabel";
import {fetchProjects} from "../redux/actions/reportFiltersActions";
import {getWorkDuration} from "../redux/actions/workDurationActions";

import * as X from 'xlsx';

function Workbook() {
    if (!(this instanceof Workbook))
        return new Workbook();

    this.SheetNames = [];

    this.Sheets = {}
}

//TODO style={classes.content} causes crashes in firefox

class DurationDisplay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            scroll: 'paper',
            projects: []
        }
    }

    requestData = () => {
        store.dispatch(fetchTimeAccountingData());
    };

    componentDidMount() {
        if (this.props.reportFilters.proj.length === 0) {
            store.dispatch(fetchProjects());
        }
        store.dispatch(setSelectedNavItem({title: PAGE_IDS.duration.name, selectedId: PAGE_IDS.duration.id}));
        this.setState({
            labelWidth2: ReactDOM.findDOMNode(this.InputLabelRef2).offsetWidth,
        });
    }

    handleChange = event => {
        this.setState({[event.target.name.toLowerCase()]: event.target.value});
    };


    download = (url, name) => {
        let a = document.createElement('a');
        a.href = url;
        a.download = name;
        a.click();

        window.URL.revokeObjectURL(url)
    };


    s2ab(s) {
        const buf = new ArrayBuffer(s.length);

        const view = new Uint8Array(buf);

        for (let i = 0; i !== s.length; ++i)
            view[i] = s.charCodeAt(i) & 0xFF;

        return buf
    }

    exportToExcel() {
        const data = [
            {key: "timeouts.DeviceOfflineTimeout", value: "00:10:00"},
            {key: "timeouts.CommissioningValidityInterval", value: "01:00:00"}
        ];
        const wb = new Workbook();
        const ws = X.utils.json_to_sheet(this.props.workDurationData.durationItems);

        wb.SheetNames.push('');
        wb.Sheets[''] = ws;

        const wbout = X.write(wb, {bookType: 'xlsx', bookSST: true, type: 'binary'});
        let url = window.URL.createObjectURL(new Blob([this.s2ab(wbout)], {type: 'application/octet-stream'}));

        this.download(url, 'import.xlsx');
    }

    render() {
        const {classes} = this.props;
        console.log(this.props.workDurationData);
        console.log(this.props.workDurationData.durationItems.length);
        return <div style={{minWidth: '100%'}}>
            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
            }}>
                <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel
                        ref={ref => {
                            this.InputLabelRef2 = ref;
                        }}
                        htmlFor="outlined-projects-simple"
                    >
                        Projects
                    </InputLabel>
                    <Select
                        value={this.state.projects}
                        onChange={this.handleChange}
                        multiple={true}
                        input={
                            <OutlinedInput
                                labelWidth={this.state.labelWidth2}
                                name="Projects"
                                id="outlined-projects-simple"
                            />
                        }
                    >
                        {<MenuItem value="">
                            <em>Select iteration</em>
                        </MenuItem>}
                        {this.props.reportFilters.proj.map((item, index) => (
                            <MenuItem key={`projects-list-item-${index}`} value={item}>{item.shortName}</MenuItem>
                        ))}

                    </Select>
                </FormControl>
                <FormControl variant="outlined" className={classes.formControl}>
                    <Button variant="contained" color="primary" className={classes.button2}
                            onClick={() => {
                                store.dispatch(getWorkDuration(this.state.projects.map(project => project.shortName)));
                            }
                            }>
                        Загрузить
                    </Button>
                </FormControl>
                <FormControl variant="outlined" className={classes.formControl}>
                    <Button variant="contained" color="primary" className={classes.button2}
                            onClick={() =>

                                this.exportToExcel()
                            }>
                        Выгрузить в xlsx
                    </Button>
                </FormControl>
            </div>
            {this.props.workDurationData.durationItems.map((item, index) => (
                <div key={`di-${index}`}>{JSON.stringify(item)}</div>))}
        </div>;
    }

    getData() {
        console.log('AAA')
    }

}


DurationDisplay.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        appBarState: state.appBarState,
        workDurationData: state.workDurationData,
        reportFilters: state.reportFilters
    }
}

export default withStyles(styles, {withTheme: true})(connect(mapStateToProps, null)(DurationDisplay));
