import React, {useState} from 'react';
import {connect} from 'react-redux';
import RefreshIcon from '@material-ui/icons/Refresh';
import DownloadIcon from '@material-ui/icons/CloudDownload';
import IconButton from '@material-ui/core/IconButton';
import KPIFilterDialog from "../../dialogs/KPIFilterDialog";
import {fetchKpiReportData} from "../../../redux/actions/kpiActions";
import {exportToExcel} from "../../../helper_functions/export_to_excel";

function KPIAppBarActions({loadData, data}) {
    const [open, setOpen] = useState(false);

    return (
        <div style={{
            height: '100%',
            display: 'flex',
            flexDirection: 'row',
            backgroundColor: 'transparent',
        }}>
            <div style={{margin: 0, flex: 1}}>
                <IconButton color='inherit' onClick={() => loadData()}> <RefreshIcon/> </IconButton>
            </div>
            <div style={{margin: 0, flex: 1, float: 'right'}}>
                <IconButton color='inherit' onClick={() => exportToExcel(data, 'KPI', 'KPI')}> <DownloadIcon/>
                </IconButton>
            </div>
            <KPIFilterDialog open={open} handleClose={() => setOpen(false)} aria-labelledby="scroll-dialog-title"/>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        appBarState: state.appBarState,
        data: state.kpi.kpiData.map((item) => {
            return {
                'Сотрудник': item.user,
                'Результат': item.result,
                'Всего запросов': item.total,
                'Предложенные решения': item.suggestedSolutions,
                'Положительные оценки': item.positiveAssessment,
                'Запрошенные уточнения': item.requestedClarifications,
                'Переносы сроков': item.postponements,
                'Нарушения SLA': item.violations,
            }
        })
    }
}

function mapDispatchToProps(dispatch) {
    return {
        loadData: () => dispatch(fetchKpiReportData())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(KPIAppBarActions);
