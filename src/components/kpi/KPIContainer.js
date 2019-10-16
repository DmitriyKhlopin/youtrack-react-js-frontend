import React, {useEffect, useState} from 'react';
import connect from 'react-redux/es/connect/connect';
import {fetchKpiReportData} from '../../redux/actions/kpiActions';
import {setSelectedNavItem} from '../../redux/actions/appBarActions';
import {drawerWidth, MATERIAL_COLORS, PAGES, sidebarWidthClosed, sidebarWidthOpenWide} from '../../Const';
import {Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis} from 'recharts';
import {fetchProjects} from "../../redux/actions/reportFiltersActions";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import KPISidebar from "./KPISidebar";
import {styles} from "../../Styles";
import {CircularProgress} from "@material-ui/core";
import {customMap} from "../../HelperFunctions";
import useWindowDimensions from "../../helper_functions/dimensions";
import {CustomCard, CustomH4, CustomSidebar} from "../../styles/StyledComponents";


function KPIContainer({location, data, detailedData, setTitle, loadData, df, dt, isFetching, appBarState, overallData}) {
    /**Размеры окна*/
    const size = useWindowDimensions();
    const [sidebarWidthOpen, sidebarWidthClosed] = [640, 64];
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
    /*const [w1, w2] = [`calc(100% - ${open ? sidebarWidthOpenWide : sidebarWidthClosed} - 16px)`, open ? sidebarWidthOpenWide : sidebarWidthClosed];*/

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

    const w = size.width - (appBarState ? drawerWidth : 0) - (open ? sidebarWidthOpen : sidebarWidthClosed) - 17 - 16; //ширина окна - ширина боковика - ширина меню - вертикальный сролл - margin меню
    console.log(w);

    const w1 = w;
    const h1 = w / 5;

    const additionalIndicators = [{name: 'Выполнение SLA', key: 'notViolated', target: 95},
        {name: 'Удовлетворенность качеством технической поддержки', key: 'satisfied', target: 95},
        {name: 'Решение на уровне ЦТП', key: 'selfSolved', target: 15},
        {name: 'Решение с 1 раза', key: 'singleSolution', target: 70}];

    return (<div style={containerWithSidebar}>
        {isFetching ?
            <div style={{...dataContainer, width: w1, minHeight: '80%'}}><CircularProgress style={{margin: 'auto'}}/>
            </div> :
            <div style={{...dataContainer, width: w1}}>
                <div style={{display: 'flex', flexDirection: 'column', width: '100%'}}>
                    <h2 style={{textAlign: 'center', width: '100%'}}>{`Показатели за период с ${df} по ${dt}`}</h2>
                    <div style={{display: 'flex', flexDirection: 'row', padding: '16px'}}>
                        {overallData && additionalIndicators.map((item, index) => {
                                const b = Number(100 * overallData[item.key] / overallData['total']).toFixed(2) < item.target;
                                return <CustomCard key={`add-ind${index}`}
                                                   style={{
                                                       width: '25%',
                                                       backgroundColor: MATERIAL_COLORS[index],
                                                       margin: '8px',
                                                       color: 'white',
                                                       textAlign: 'center',
                                                       alignItems: 'center',
                                                       justifyContent: 'center',
                                                       borderStyle: b ? 'solid' : 'none',
                                                       borderColor: b ? '#C2185B' : 'rgba(0,0,0,0)',
                                                       borderWidth: b ? '0px 0px 4px 0px' : '0px',
                                                   }}>
                                    <CustomH4>{item.name}: {Number(100 * overallData[item.key] / overallData['total']).toFixed(2)}%</CustomH4>
                                </CustomCard>
                            }
                        )}
                    </div>
                </div>
                <BarChart data={data} width={w1} height={h1}>
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

                <BarChart data={data} width={w1} height={h1}>
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

                <BarChart data={data} width={w1} height={h1}>
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

                <BarChart data={data} width={w1} height={h1}>
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

                {detailedData.map((e, index) => {
                    return (
                        <div>
                            <h3 style={{textAlign: 'center', color: MATERIAL_COLORS[index]}}>{e.name}</h3>
                            <BarChart data={e.data} width={w1 / 2} height={h1 / 1.5}>
                                <CartesianGrid strokeDasharray='3 3'/>
                                <XAxis dataKey='indicator'/>
                                <YAxis/>
                                <Tooltip/>
                                <Bar name={e.name} dataKey='agent' fill={MATERIAL_COLORS[index]} legendType={'circle'}/>
                            </BarChart>
                        </div>
                    )
                })}
            </div>}

        <CustomSidebar style={{width: open ? `${sidebarWidthOpen}px` : `${sidebarWidthClosed}px`, height: open ? 'auto' : '64px', borderRadius: open ? '4px' : '32px'}}>
            <IconButton onClick={() => setOpen(!open)} style={{
                display: 'block',
                margin: open ? '8px  auto' : '8px',
            }}>
                {open ? <ChevronRightIcon/> : <ChevronLeftIcon/>}
            </IconButton>
            {open ? <KPISidebar close={close}/> : <div/>}
        </CustomSidebar>
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
        solutionsRating = customMap(state.kpi.kpiData[0], 'solutionSum');
        clarificationRating = customMap(state.kpi.kpiData[0], 'clarificationSum');
        postponementRating = customMap(state.kpi.kpiData[0], 'postponementSum');
        evaluationRating = customMap(state.kpi.kpiData[0], 'evaluationSum');
        issueTypeRating = customMap(state.kpi.kpiData[0], 'issueTypeSum');
        priorityRating = customMap(state.kpi.kpiData[0], 'prioritySum');
        levelRating = customMap(state.kpi.kpiData[0], 'levelSum');
        violationsRating = customMap(state.kpi.kpiData[0], 'violations');
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
        data: state.kpi.kpiData[0],
        overallData: state.kpi.kpiData[1],
        isFetching: state.kpi.fetching,
        df: state.kpiFilters.dateFrom,
        dt: state.kpiFilters.dateTo,
        detailedData: detailedData,
        appBarState: state.appBarState.drawerOpened,
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
