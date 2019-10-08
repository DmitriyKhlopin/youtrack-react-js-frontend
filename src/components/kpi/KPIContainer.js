import React, {useEffect, useState} from 'react';
import connect from 'react-redux/es/connect/connect';
import {fetchKpiReportData} from '../../redux/actions/kpiActions';
import {setSelectedNavItem} from '../../redux/actions/appBarActions';
import {MATERIAL_COLORS, PAGES, sidebarWidthClosed, sidebarWidthOpenWide} from '../../Const';
import {Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis} from 'recharts';
import {fetchProjects} from "../../redux/actions/reportFiltersActions";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import KPISidebar from "./KPISidebar";
import {styles} from "../../Styles";
import {ChartContainerHalf, ChartContainerWide} from "../ChartContainers";
import {CircularProgress} from "@material-ui/core";
import {customMap} from "../../HelperFunctions";
import useWindowDimensions from "../../helper_functions/dimensions";


function KPIContainer({location, data, detailedData, setTitle, loadData, df, dt, isFetching,}) {
    /**Размеры окна*/
    const size = useWindowDimensions();
    let percentage;
    let legendFontSize;
    let showLegend = true;
    switch (true) {
        case (size.width >= 1600):
            percentage = 0.5;
            legendFontSize = 14;
            break;
        case (size.width < 1000):
            percentage = 1;
            showLegend = false;
            legendFontSize = 10;
            break;
        default:
            percentage = 0.5;
            legendFontSize = 20;
            break;
    }

    /**Импорт стилей, определение состояний*/
    const {containerWithSidebar, dataContainer} = styles;
    const [open, setOpen] = useState(false);
    const [w1, w2] = [`calc(100% - ${open ? sidebarWidthOpenWide : sidebarWidthClosed} - 16px)`, open ? sidebarWidthOpenWide : sidebarWidthClosed];

    useEffect(() => {
        setTitle(location);
        loadData();
    }, []);

    const close = () => setOpen(false);


    const renderLegend = (props) => {
        const {payload} = props;
        return (
            <ul style={{textAlign: 'center'}}>
                {
                    payload.map((entry, index) => (
                        <li key={`item-${index}`} style={{fontSize: legendFontSize, display: 'inline-block', marginRight: '8px'}}>
                            <svg className="recharts-surface" width="14" height="14" viewBox="0 0 32 32" version="1.1"
                                 style={{
                                     display: 'inline-block', verticalAlign: 'middle', marginRight: '4px'
                                 }}>
                                <path fill={entry.color} className="recharts-symbols" transform="translate(16, 16)"
                                      d="M16,0A16,16,0,1,1,-16,0A16,16,0,1,1,16,0"/>
                            </svg>
                            {entry.value}</li>
                    ))
                }
            </ul>
        );
    };

    return (<div style={containerWithSidebar}>
        {isFetching ?
            <div style={{...dataContainer, width: w1, minHeight: '80%'}}><CircularProgress style={{margin: 'auto'}}/>
            </div> :
            <div style={{...dataContainer, width: w1}}>
                <div style={{textAlign: 'center', width: '100%'}}><h2>{`Показатели за период с ${df} по ${dt}`}</h2>
                </div>
                <ChartContainerWide>
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray='3 3'/>
                        <XAxis dataKey='agent'/>
                        <YAxis yAxisId="left" orientation="left" stroke="#8884d8"/>
                        <YAxis yAxisId="right" orientation="right" stroke="#82ca9d"/>
                        <Tooltip/>
                        {showLegend ? <Legend content={renderLegend}/> : <div/>}

                        <Bar yAxisId="left" name='Рейтинг/Количество задач' dataKey='totalAvg' fill={MATERIAL_COLORS[0]}
                             legendType={'circle'} stroke="#8884d8" strokeWidth="3"/>
                        <Bar yAxisId="right" name='Рейтинг' dataKey='totalWithViolations' fill={MATERIAL_COLORS[1]}
                             legendType={'circle'} stroke="#82ca9d" strokeWidth="3"/>
                        <Bar yAxisId="right" name='Рейтинг без учёта SLA' dataKey='total' fill={MATERIAL_COLORS[2]}
                             legendType={'circle'} stroke="#82ca9d" strokeWidth="3"/>
                    </BarChart>
                </ChartContainerWide>
                <ChartContainerWide>
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray='3 3'/>
                        <XAxis dataKey='agent'/>
                        <YAxis yAxisId="left" orientation="left" stroke="#8884d8"/>
                        <YAxis yAxisId="right" orientation="right" stroke="#82ca9d"/>
                        <Tooltip/>
                        {showLegend ? <Legend content={renderLegend}/> : <div/>}
                        <Bar yAxisId="left" name='Решения' dataKey='solutionSum' fill={MATERIAL_COLORS[2]}
                             legendType={'circle'} stroke="#82ca9d"/>
                        <Bar yAxisId="left" name='Уточнения' dataKey='clarificationSum' fill={MATERIAL_COLORS[3]}
                             legendType={'circle'} stroke="#82ca9d"/>
                        <Bar yAxisId="left" name='Переносы сроков решения' dataKey='postponementSum'
                             fill={MATERIAL_COLORS[4]}
                             legendType={'circle'} stroke="#82ca9d"/>
                        <Bar yAxisId="left" name='Оценки' dataKey='evaluationSum' fill={MATERIAL_COLORS[5]}
                             legendType={'circle'} stroke="#82ca9d"/>
                        <Bar yAxisId="left" name='Типы задач' dataKey='issueTypeSum' fill={MATERIAL_COLORS[6]}
                             legendType={'circle'} stroke="#82ca9d"/>
                        <Bar yAxisId="left" name='Приоритеты' dataKey='prioritySum' fill={MATERIAL_COLORS[7]}
                             legendType={'circle'} stroke="#82ca9d"/>
                        <Bar yAxisId="left" name='Уровни решения' dataKey='levelSum' fill={MATERIAL_COLORS[8]}
                             legendType={'circle'} stroke="#82ca9d"/>
                        <Bar yAxisId="left" name='Нарушено SLA' dataKey='violations' fill={MATERIAL_COLORS[14]}
                             legendType={'circle'} stroke="#82ca9d"/>
                    </BarChart>
                </ChartContainerWide>
                <ChartContainerWide>
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray='3 3'/>
                        <XAxis dataKey='agent'/>
                        <YAxis yAxisId="left" orientation="left" stroke="#8884d8"/>
                        <YAxis yAxisId="right" orientation="right" stroke="#82ca9d"/>
                        <Tooltip/>
                        {showLegend ? <Legend content={renderLegend}/> : <div/>}
                        <Bar yAxisId="left" name='Решения (avg)' dataKey='solutionAvg' fill={MATERIAL_COLORS[2]}
                             legendType={'circle'}/>
                        <Bar yAxisId="left" name='Уточнения (avg)' dataKey='clarificationAvg' fill={MATERIAL_COLORS[3]}
                             legendType={'circle'}/>
                        <Bar yAxisId="left" name='Переносы сроков решения (avg)' dataKey='postponementAvg' fill={MATERIAL_COLORS[4]}
                             legendType={'circle'}/>
                        <Bar yAxisId="left" name='Оценки (avg)' dataKey='evaluationAvg' fill={MATERIAL_COLORS[5]}
                             legendType={'circle'}/>
                        <Bar yAxisId="left" name='Типы задач (avg)' dataKey='issueTypeAvg' fill={MATERIAL_COLORS[6]}
                             legendType={'circle'}/>
                        <Bar yAxisId="left" name='Приоритеты (avg)' dataKey='priorityAvg' fill={MATERIAL_COLORS[7]}
                             legendType={'circle'}/>
                        <Bar yAxisId="left" name='Уровни решения (avg)' dataKey='levelAvg' fill={MATERIAL_COLORS[8]}
                             legendType={'circle'}/>
                    </BarChart>
                </ChartContainerWide>
                <ChartContainerWide>
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray='3 3'/>
                        <XAxis dataKey='agent'/>
                        <YAxis yAxisId="left" orientation="left" stroke="#8884d8"/>
                        <YAxis yAxisId="right" orientation="right" stroke="#82ca9d"/>
                        <Tooltip/>
                        {showLegend ? <Legend content={renderLegend}/> : <div/>}
                        <Bar yAxisId="left" name='Решения (count)' dataKey='solutionCount' fill={MATERIAL_COLORS[2]}
                             legendType={'circle'}/>
                        <Bar yAxisId="left" name='Уточнения (count)' dataKey='clarificationCount' fill={MATERIAL_COLORS[3]}
                             legendType={'circle'}/>
                        <Bar yAxisId="left" name='Переносы сроков решения (count)' dataKey='postponementCount'
                             fill={MATERIAL_COLORS[4]}
                             legendType={'circle'}/>
                        <Bar yAxisId="left" name='Оценки (count)' dataKey='evaluationCount' fill={MATERIAL_COLORS[5]}
                             legendType={'circle'}/>
                        <Bar yAxisId="left" name='Типы задач (count)' dataKey='issueTypeCount' fill={MATERIAL_COLORS[6]}
                             legendType={'circle'}/>
                        <Bar yAxisId="left" name='Приоритеты (count)' dataKey='priorityCount' fill={MATERIAL_COLORS[7]}
                             legendType={'circle'}/>
                        <Bar yAxisId="left" name='Уровни решения (count)' dataKey='levelCount' fill={MATERIAL_COLORS[8]}
                             legendType={'circle'}/>
                    </BarChart>
                </ChartContainerWide>
                {detailedData.map((e, index) => {
                    return (<ChartContainerHalf>
                        <BarChart data={e.data}>
                            <CartesianGrid strokeDasharray='3 3'/>
                            <XAxis dataKey='indicator'/>
                            <YAxis/>
                            <Tooltip/>
                            {showLegend ? <Legend content={renderLegend}/> : <div/>}
                            <Bar name={e.name} dataKey='agent' fill={MATERIAL_COLORS[index]} legendType={'circle'}/>
                        </BarChart>
                    </ChartContainerHalf>)
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
    let solutionsRating = [];
    let clarificationRating = [];
    let postponementRating = [];
    let evaluationRating = [];
    let issueTypeRating = [];
    let priorityRating = [];
    let levelRating = [];
    let violationsRating = [];
    if (state.kpi.kpiData[0] && state.kpi.kpiData[0] !== null) {
        solutionsRating = customMap(state.kpi.kpiData, 'solutionSum');
        clarificationRating = customMap(state.kpi.kpiData, 'clarificationSum');
        postponementRating = customMap(state.kpi.kpiData, 'postponementSum');
        evaluationRating = customMap(state.kpi.kpiData, 'evaluationSum');
        issueTypeRating = customMap(state.kpi.kpiData, 'issueTypeSum');
        priorityRating = customMap(state.kpi.kpiData, 'prioritySum');
        levelRating = customMap(state.kpi.kpiData, 'levelSum');
        violationsRating = customMap(state.kpi.kpiData, 'violations');
    }

    let detailedData = [
        {name: 'Решения', data: solutionsRating},
        {name: 'Уточнения', data: clarificationRating},
        {name: 'Переносы', data: postponementRating},
        {name: 'Оценки', data: evaluationRating},
        {name: 'Типы запросов', data: issueTypeRating},
        {name: 'Приоритеты запросов', data: priorityRating},
        {name: 'Уровни решения', data: levelRating},
        {name: 'Нарушения', data: violationsRating},
    ];

    return {
        data: state.kpi.kpiData,
        isFetching: state.kpi.fetching,
        df: state.kpiFilters.dateFrom,
        dt: state.kpiFilters.dateTo,
        detailedData: detailedData
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
