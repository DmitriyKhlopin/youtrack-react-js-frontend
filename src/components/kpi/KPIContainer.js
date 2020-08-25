import React, {useEffect, useState} from 'react';
import {format} from 'date-fns'
import {kpiCharts, kpiDetails, MATERIAL_COLORS} from '../../Const';
import {Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis} from 'recharts';
import useWindowDimensions from "../../helper_functions/dimensions";
import {CustomA, CustomCard, CustomH4} from "../../styled_components/StyledComponents";
import {KPIBarChart} from "./KPIBarChart";
import {dynamicSort} from "../../helper_functions/sorting";
import styles from "../../styles/components.module.css";
import {useDispatch, useSelector} from "react-redux";
import {fetchKpiData, selectKpiData, selectKpiDateFrom, selectKpiDateTo, selectKpiDetails, selectKpiIsFetching, selectKpiOverallData} from "../../redux/combined/kpi";
import cx from "classnames";
import ResponsiveContainer from "recharts/lib/component/ResponsiveContainer";

function KPIContainer() {
    const size = useWindowDimensions();
    const [sidebarWidthOpen, sidebarWidthClosed] = [640, 64];
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch()
    const isFetching = useSelector(selectKpiIsFetching);
    const dateFrom = format(useSelector(selectKpiDateFrom), 'yyyy-MM-dd');
    const dateTo = format(useSelector(selectKpiDateTo), 'yyyy-MM-dd');
    const data = useSelector(selectKpiData);
    const overallData = useSelector(selectKpiOverallData);
    const detailedData = useSelector(selectKpiDetails);

    useEffect(() => {
        dispatch(fetchKpiData())
    }, []);
    const close = () => setOpen(false);
    const w1 = size.width;

    const h1 = w1 / 5;
    const baseUrl = 'https://support.fsight.ru/issues?q=';
    const additionalIndicators = [
        {
            name: 'Выполнение SLA (комм. проекты)',
            key: 'notViolatedCommercial',
            divider: 'totalCommercial',
            target: 95,
            link: `(SLA по первому ответу: Нарушен или SLA по решению:  Нарушен) и дата завершения: ${dateFrom} .. ${dateTo}`
        },
        {
            name: 'Удовлетворенность качеством технической поддержки (комм. проекты)',
            key: 'satisfiedCommercial',
            divider: 'totalCommercial',
            target: 95,
            link: `Неудовлетворительно и дата завершения: ${dateFrom} .. ${dateTo}`
        },
        {name: 'Решение на уровне ЦТП (комм. проекты)', key: 'selfSolvedCommercial', divider: 'totalCommercial', target: 15},
        {name: 'Решение с 1 раза (комм. проекты)', key: 'singleSolutionCommercial', divider: 'totalCommercial', target: 70},
        {name: 'Выполнение SLA', key: 'notViolated', divider: 'total', target: 95, link: `(SLA по первому ответу: Нарушен или SLA по решению:  Нарушен) и дата завершения: ${dateFrom} .. ${dateTo}`},
        {name: 'Удовлетворенность качеством технической поддержки', key: 'satisfied', divider: 'total', target: 95, link: `Неудовлетворительно и дата завершения: ${dateFrom} .. ${dateTo}`},
        {name: 'Решение на уровне ЦТП', key: 'selfSolved', divider: 'total', target: 15},
        {name: 'Решение с 1 раза', key: 'singleSolution', divider: 'total', target: 70}];


    return isFetching ? <div className={styles.linearProgress}/> :
        <div className={styles.column}>
            <div className={styles.row}>
                <h2 style={{textAlign: 'center', width: '100%'}}>{`Показатели за период с ${dateFrom} по ${dateTo}`}</h2>
            </div>
            <div className={cx(styles.row, styles.defaultMargin, styles.wrap, styles.spread)}>
                {overallData && additionalIndicators.map((item, index) => {
                        const value = Number(100 * overallData[item.key] / overallData[item.divider]).toFixed(2);
                        const b = value < item.target;
                        return <CustomCard key={`add-ind${index}`}
                                           style={{
                                               width: 'calc(100%/4 - 3rem)',
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
                                const v2 = Number(100 * item2.second[item.key] / item2.second[item.divider]).toFixed(2);
                                return <div style={{flex: '1 0 50%', margin: '8px 0px'}}>{format(item2.first.first, 'yyyy.MM.dd')} - {format(item2.first.second, 'yyyy.MM.dd')}<br/>{v2}%</div>
                            })}</div>

                        </CustomCard>
                    }
                )}
            </div>
            <div className={cx(styles.row, styles.defaultMargin)}>
                {kpiCharts.map((item, index) =>
                    <div style={{width: 'calc(100%/3)'}}>
                        <KPIBarChart
                            key={`kpi-barchart-wide-${index}`}
                            aspect={2.0}
                            data={data && [...data].sort(dynamicSort('-' + item.bars[0].dataKey))}
                            settings={item}/></div>)}
            </div>
            {kpiDetails.map((item, index) => <KPIBarChart key={`kpi-barchart-wide-${index}`} aspect={6.0} data={data && data} settings={item}/>)}
            <div className={cx(styles.row, styles.wrap, styles.defaultMargin)}>
                {detailedData.map((e, index) => {
                    return (
                        <div key={`kpi-detailed-data-${index}`} style={{width: '50%'}}>
                            <h3 style={{textAlign: 'center', color: MATERIAL_COLORS[index]}}>{e.name}</h3>
                            <ResponsiveContainer width='100%' aspect={3.0}>
                                <BarChart data={e.data}>
                                    <CartesianGrid strokeDasharray='3 3'/>
                                    <XAxis dataKey='indicator'/>
                                    <YAxis/>
                                    <Tooltip/>
                                    <Legend/>
                                    <Bar name={e.name} dataKey='agent' fill={MATERIAL_COLORS[index]} legendType={'circle'}/>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    )
                })}
            </div>
        </div>

}

export default KPIContainer;
