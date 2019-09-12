import React, {useEffect, useState} from 'react';
import connect from 'react-redux/es/connect/connect';
import {fetchKpiReportData} from '../../redux/actions/kpiActions';
import {setSelectedNavItem} from '../../redux/actions/appBarActions';
import {PAGES, sidebarWidthClosed, sidebarWidthOpenWide} from '../../Const';
import {Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis} from 'recharts';
import {fetchProjects} from "../../redux/actions/reportFiltersActions";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import KPISidebar from "./KPISidebar";
import {styles} from "../../Styles";
import {ChartContainerHalf, ChartContainerWide} from "../ChartContainers";
import {CircularProgress} from "@material-ui/core";


function KPIContainer({location, data, setTitle, loadData, df, dt, isFetching,}) {
    const {containerWithSidebar, dataContainer} = styles;
    const [open, setOpen] = useState(false);
    const [w1, w2] = [`calc(100% - ${open ? sidebarWidthOpenWide : sidebarWidthClosed} - 16px)`, open ? sidebarWidthOpenWide : sidebarWidthClosed];

    useEffect(() => {
        setTitle(location);
        loadData();
    }, []);

    const close = () => setOpen(false);

    return (<div style={containerWithSidebar}>
        {isFetching ? <div style={{...dataContainer, width: w1, minHeight: '80%'}}><CircularProgress style={{margin:'auto'}}/></div> :
            <div style={{...dataContainer, width: w1}}>
                <div style={{textAlign: 'center', width: '100%'}}><h3>{`Показатели за период с ${df} по ${dt}`}</h3>
                </div>
                <ChartContainerWide>
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray='3 3'/>
                        <XAxis dataKey='user'/>
                        <YAxis/>
                        <Tooltip/>
                        <Legend/>
                        <Bar name='Рейтинг' dataKey='result' fill='#e74c3c' legendType={'circle'}/>
                        <Bar name='Всего запросов' dataKey='total' fill='#34495e' legendType={'circle'}/>
                        <Bar name='Предложено решений' dataKey='suggestedSolutions' fill='#2ecc71'
                             legendType={'circle'}/>
                        <Bar name='Запрошено уточнений' dataKey='requestedClarifications' fill='#3498db'
                             legendType={'circle'}/>
                        <Bar name='Переносено сроков решения' dataKey='postponements' fill='#9b59b6'
                             legendType={'circle'}/>
                        <Bar name='Оценки' dataKey='positiveAssessment' fill='#e67e22' legendType={'circle'}/>
                        <Bar name='Нарушено SLA' dataKey='violations' fill='#e74c3c' legendType={'circle'}/>
                    </BarChart>
                </ChartContainerWide>
                {data.map((user, index) => {
                    return <ChartContainerHalf key={index}>
                        <BarChart data={[user]}>
                            <CartesianGrid strokeDasharray='3 3'/>
                            <XAxis dataKey='user'/>
                            <YAxis/>
                            <Tooltip itemSorter={() => 1}/>
                            <Bar name='Всего запросов' dataKey='total' fill='#34495e' legendType={'circle'}/>
                            <Bar name='Предложено решений' dataKey='suggestedSolutions' fill='#2ecc71'
                                 legendType={'circle'}/>
                            <Bar name='Запрошено уточнений' dataKey='requestedClarifications' fill='#3498db'
                                 legendType={'circle'}/>
                            <Bar name='Переносено сроков решения' dataKey='postponements' fill='#9b59b6'
                                 legendType={'circle'}/>
                            <Bar name='Нарушено SLA' dataKey='violations' fill='#e74c3c' legendType={'circle'}/>
                        </BarChart>
                    </ChartContainerHalf>
                })}
            </div>}

        <div style={{
            width: w2,
            margin: '8px',
            padding: '8px',
            height: '100%',
            boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
            transition: '0.3s',
            ':hover': {
                boxShadow: '0 8px 16px 0 rgba(0,0,0,0.2)'
            },
        }}>
            <IconButton onClick={() => setOpen(!open)} style={{
                display: 'block',
                margin: open ? '0px' : '0px auto',
            }}>
                {open ? <ChevronRightIcon/> : <ChevronLeftIcon/>}
            </IconButton>
            {open ? <KPISidebar close={close}/> : <div/>}
        </div>
    </div>);

}

function mapStateToProps(state) {
    return {
        data: state.kpi.kpiData,
        isFetching: state.kpi.fetching,
        df: state.kpiFilters.dateFrom,
        dt: state.kpiFilters.dateTo,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setTitle: ({pathname}) => {
            dispatch(setSelectedNavItem(PAGES.filter((page) => page.path === pathname)[0]));
        },
        loadData: () => {
            dispatch(fetchProjects());
            dispatch(fetchKpiReportData())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(KPIContainer);
