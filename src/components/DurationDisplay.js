import React, {Component} from "react";
import styles from "../styles/components.module.css"
import {store} from "../redux/store";
import connect from "react-redux/es/connect/connect";
import {fetchTimeAccountingData} from "../redux/actions/timeAccountingActions";
import * as ReactDOM from "react-dom";
import {getWorkDuration} from "../redux/actions/workDurationActions";
import * as X from 'xlsx';
import {Select} from "react-select";
import {fetchProjects} from "../redux/combined/dictionaries";

/*import { withTheme } from '@material-ui/styles';*/

function Workbook() {
    if (!(this instanceof Workbook))
        return new Workbook();
    this.SheetNames = [];
    this.Sheets = {}
}

//TODO style={classes.content} causes crashes in firefox

class DurationDisplay extends Component {
    state = {
        open: false,
        scroll: 'paper',
        projects: [],
        labelWidth: 0
    };

    static s2ab(s) {
        const buf = new ArrayBuffer(s.length);
        const view = new Uint8Array(buf);
        for (let i = 0; i !== s.length; ++i)
            view[i] = s.charCodeAt(i) & 0xFF;
        return buf
    }

    requestData = () => {
        store.dispatch(fetchTimeAccountingData());
    };

    componentDidMount() {
        if (this.props.reportFilters.proj.length === 0) {
            store.dispatch(fetchProjects());
        }
        this.setState({
            labelWidth: ReactDOM.findDOMNode(this.InputLabelRef2).offsetWidth,
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

    exportToExcel() {
        const wb = new Workbook();
        const ws = X.utils.json_to_sheet(this.props.workDurationData.durationItems);
        wb.SheetNames.push('');
        wb.Sheets[''] = ws;
        const wbout = X.write(wb, {bookType: 'xlsx', bookSST: true, type: 'binary'});
        let url = window.URL.createObjectURL(new Blob([DurationDisplay.s2ab(wbout)], {type: 'application/octet-stream'}));
        this.download(url, 'export.xlsx');
    }

    render() {
        return <div style={{minWidth: '100%'}}>
            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
            }}>
                <div>Add iterations select</div>
                <button className={styles.button}
                        onClick={() => store.dispatch(getWorkDuration(this.state.projects.map(project => project.shortName)))}>
                    Загрузить
                </button>

                <button className={styles.button}
                        onClick={() =>

                            this.exportToExcel()
                        }>
                    Выгрузить в xlsx
                </button>

            </div>
            {this.props.workDurationData.fetching
                ? <div className={styles.loader}/>
                : this.props.workDurationData.durationItems.map((item, index) => (<div key={`di-${index}`}>{JSON.stringify(item)}</div>))}
        </div>;
    }
}


function mapStateToProps(state) {
    return {
        appBarState: state.appBarState,
        workDurationData: state.workDurationData,
        reportFilters: state.reportFilters
    }
}


export default connect(mapStateToProps, null)(DurationDisplay);

