import React, {useEffect, useState} from 'react';
import connect from 'react-redux/es/connect/connect';
import {fetchKpiReportData} from '../../redux/actions/kpiActions';
import {setSelectedNavItem} from '../../redux/actions/appBarActions';
import {format, parseISO} from 'date-fns'
import {drawerWidth, MATERIAL_COLORS, PAGES, sidebarWidthClosed, sidebarWidthOpenWide, kpiCharts} from '../../Const';
import {Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis} from 'recharts';
import {fetchProjects} from "../../redux/actions/reportFiltersActions";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import KPISidebar from "./KPISidebar";
import {CircularProgress} from "@material-ui/core";
import useWindowDimensions from "../../helper_functions/dimensions";
import {ContainerWithSidebar, CustomA, CustomCard, CustomH4, CustomSidebar, DataContainer} from "../../styled_components/StyledComponents";
import {KPIBarChart} from "./KPIBarChart";

function KPIContainer({location, data, detailedData, setTitle, loadData, df, dt, isFetching, appBarState, overallData}) {
    const size = useWindowDimensions();
    const [sidebarWidthOpen, sidebarWidthClosed] = [640, 64];
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setTitle(location);
        loadData();
    }, []);

    const close = () => setOpen(false);

    const w = size.width - (appBarState ? drawerWidth : 0) - (open ? sidebarWidthOpen : sidebarWidthClosed) - 17 - 16; //ширина окна - ширина боковика - ширина меню - вертикальный сролл - margin меню

    const w1 = w;
    const h1 = w / 5;
    const baseUrl = 'https://support.fsight.ru/issues?q=';
    const additionalIndicators = [{name: 'Выполнение SLA', key: 'notViolated', target: 95, link: `(SLA по первому ответу: Нарушен или SLA по решению:  Нарушен) и дата завершения: ${df} .. ${dt}`},
        {name: 'Удовлетворенность качеством технической поддержки', key: 'satisfied', target: 95, link: `Неудовлетворительно и дата завершения: ${df} .. ${dt}`},
        {name: 'Решение на уровне ЦТП', key: 'selfSolved', target: 15},
        {name: 'Решение с 1 раза', key: 'singleSolution', target: 70}];


    return (<ContainerWithSidebar>
        {isFetching ? <CircularProgress style={{margin: 'auto'}}/> :
            <DataContainer style={{width: w1}}>
                <div style={{display: 'flex', flexDirection: 'column', width: '100%'}}>
                    <h2 style={{textAlign: 'center', width: '100%'}}>{`Показатели за период с ${df} по ${dt}`}</h2>
                    <div style={{display: 'flex', flexDirection: 'row', padding: '16px'}}>
                        {overallData && additionalIndicators.map((item, index) => {
                                const value = Number(100 * overallData[item.key] / overallData['total']).toFixed(2);
                                const b = value < item.target;
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
                                                       borderColor: b ? 'rgba(0,0,0,0) rgba(0,0,0,0) #C2185B rgba(0,0,0,0)' : 'rgba(0,0,0,0)',
                                                       borderWidth: b ? '4px 0px 4px 0px' : '0px',
                                                   }}>
                                    <CustomA href={item.link ? encodeURI(`${baseUrl}${item.link}`) : null} target={'_blank'}>
                                        <CustomH4>{item.name}: {value}%</CustomH4></CustomA>
                                    <div style={{width: '100%', margin: '8px 16px', display: 'flex', flexFlow: 'row wrap', justifyContent: 'space-around'}}>{overallData.dynamics.map((item2, index2) => {
                                        const v2 = Number(100 * item2.second[item.key] / item2.second['total']).toFixed(2);
                                        return <div style={{flex: '1 0 50%', margin:'8px 0px'}}>{format(item2.first.first, 'yyyy.MM.dd')} - {format(item2.first.second, 'yyyy.MM.dd')}<br/>{v2}%</div>
                                    })}</div>

                                </CustomCard>
                            }
                        )}
                    </div>
                </div>
                {kpiCharts.map((item, index) => <KPIBarChart key={`kpi-barchart-wide-${index}`} w={w1} h={h1} data={data} settings={item}/>)}
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
            </DataContainer>}
        <CustomSidebar style={{width: open ? `${sidebarWidthOpen}px` : `${sidebarWidthClosed}px`, height: open ? 'auto' : '64px', borderRadius: open ? '4px' : '32px'}}>
            <IconButton onClick={() => setOpen(!open)} style={{display: 'block', margin: open ? '8px  auto' : '8px'}}>
                {open ? <ChevronRightIcon/> : <ChevronLeftIcon/>}
            </IconButton>
            {open ? <KPISidebar close={close}/> : <div/>}
        </CustomSidebar>
    </ContainerWithSidebar>);
}

function mapStateToProps(state) {
    return {
        data: state.kpi.kpiData[0],
        overallData: state.kpi.kpiData[1],
        isFetching: state.kpi.fetching,
        df: state.kpiFilters.dateFrom,
        dt: state.kpiFilters.dateTo,
        detailedData: state.kpi.detailedData,
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
