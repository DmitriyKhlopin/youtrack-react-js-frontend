import React, {useState} from 'react';
import RefreshIcon from '@material-ui/icons/Refresh';
import DownloadIcon from '@material-ui/icons/CloudDownload';
import FilterIcon from '@material-ui/icons/Settings';
import IconButton from '@material-ui/core/IconButton';
import store from "../../../redux/store";
import {fetchReportData} from "../../../redux/actions/reportsActions";
import ReportFilterDialog from "../../dialogs/ReportFilterDialog";

function ReportsAppBarActions() {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleCloseAndUpdate = () => {
        requestData();
        setOpen(false);
    };

    const requestData = () => {
        store.dispatch(fetchReportData());
    };

    const download = (url, name) => {
        let a = document.createElement('a');
        a.href = url;
        a.download = name;
        a.click();
        window.URL.revokeObjectURL(url)
    };

    /*static s2ab(s) {
        const buf = new ArrayBuffer(s.length);
        const view = new Uint8Array(buf);
        for (let i = 0; i !== s.length; ++i)
            view[i] = s.charCodeAt(i) & 0xFF;
        return buf
    }*/

    const exportToExcel = () => {
        window.alert('Not implemented');
        /*const issues = this.props.timeAccountingData.timeData.map((item) => {
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
        XLSX.writeFile(wb, "export.xlsx");*/
    };


    return (
        <div style={{
            height: '100%',
            display: 'flex',
            flexDirection: 'row',
            backgroundColor: 'transparent',
        }}>
            <div style={{margin: 0, flex: 1}}>
                <IconButton color='inherit'
                            onClick={requestData}>
                    <RefreshIcon/>
                </IconButton>
            </div>
            <div style={{margin: 0, flex: 1}}>
                <IconButton color='inherit'
                            onClick={handleClickOpen('paper')}>
                    <FilterIcon/>
                </IconButton>
            </div>
            <div style={{margin: 0, flex: 1, float: 'right'}}>
                <IconButton color='inherit'
                            onClick={exportToExcel}>
                    <DownloadIcon/>
                </IconButton>
            </div>
            <ReportFilterDialog open={open}
                                handleClose={handleClose}
                                handleCloseAndUpdate={handleCloseAndUpdate}
                                aria-labelledby="scroll-dialog-title"/>
        </div>
    )

}

export default ReportsAppBarActions;
