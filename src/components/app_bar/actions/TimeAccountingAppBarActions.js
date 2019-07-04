import React from 'react';
import {connect} from 'react-redux';
import RefreshIcon from '@material-ui/icons/Refresh';
import DownloadIcon from '@material-ui/icons/CloudDownload';
import FilterIcon from '@material-ui/icons/Settings';
import IconButton from '@material-ui/core/IconButton';
import store from "../../../redux/store";
import {fetchTimeAccountingData} from "../../../redux/actions/timeAccountingActions";
import moment from "moment";
import {Workbook} from "../../../Const";
import * as XLSX from "xlsx";
import TimeAccountingFilterDialog from "../../TimeAccountingFilterDialog";

class TimeAccountingAppBarActions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            /*scroll: 'paper',*/
        }
    }


    componentDidMount() {
        console.log(1);
    }

    handleClickOpen = () => () => {
        this.setState({open: true, scroll: 'paper'});
    };

    handleClose = () => {
        this.requestData();
        this.setState({open: false});
    };

    requestData = () => {
        store.dispatch(fetchTimeAccountingData());
    };

    download = (url, name) => {
        let a = document.createElement('a');
        a.href = url;
        a.download = name;
        a.click();
        window.URL.revokeObjectURL(url)
    };

    static s2ab(s) {
        const buf = new ArrayBuffer(s.length);
        const view = new Uint8Array(buf);
        for (let i = 0; i !== s.length; ++i)
            view[i] = s.charCodeAt(i) & 0xFF;
        return buf
    }

    exportToExcel = () => {
        const issues = this.props.timeAccountingData.timeData.map((item) => {
            return {
                id: item.id,
                agent: item.agent,
                created: moment.unix(item.crDate / 1000).format("DD.MM.YYYY"),
                changed: moment.unix(item.changedDate / 1000).format("DD.MM.YYYY"),
                discipline: item.discipline,
                iterationPath: item.iterationPath,
                person: item.person,
                priority: item.priority,
                projects: item.projects,
                role: item.role,
                server: item.server,
                teamProject: item.teamProject,
                title: item.title,
                units: item.units,
                wit: item.wit,
            }
        });

        const wb = new Workbook();
        let ws = XLSX.utils.json_to_sheet(issues);
        XLSX.utils.book_append_sheet(wb, ws, "issues");
        XLSX.writeFile(wb, "export.xlsx");
    };

    render() {
        return (
            <div style={{
                /*width: '20%',
                minWidth: '160px',*/
                height: '100%',
                display: 'flex',
                flexDirection: 'row',
                backgroundColor: 'transparent',
            }}>
                <div style={{margin: 0, flex: 1}}>
                    <IconButton color='inherit'
                                onClick={this.requestData}>
                        <RefreshIcon/>
                    </IconButton>
                </div>
                <div style={{margin: 0, flex: 1}}>
                    <IconButton color='inherit'
                                onClick={this.handleClickOpen('paper')}>
                        <FilterIcon/>
                    </IconButton>
                </div>
                <div style={{margin: 0, flex: 1, float: 'right'}}>
                    <IconButton color='inherit'  /*color={'primary'}*/
                                onClick={this.exportToExcel}>
                        <DownloadIcon/>
                    </IconButton>
                </div>
                <TimeAccountingFilterDialog open={this.state.open}
                                            handleClose={this.handleClose}
                                            aria-labelledby="scroll-dialog-title"/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        appBarState: state.appBarState,
        timeAccountingData: state.timeAccountingData,
    }
}

export default connect(mapStateToProps, null)(TimeAccountingAppBarActions);
