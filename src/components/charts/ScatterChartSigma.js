import {Legend, ReferenceArea, ResponsiveContainer, Scatter, ScatterChart, Tooltip, XAxis, YAxis} from "recharts";
import {CHART_DEFAULT_MARGINS, MATERIAL_SIGMA_COLORS} from "../../Const";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import styles from "../../styles/components.module.css";
import {selectProjects} from "../../redux/combined/dictionaries";
import {fetchSigmaData, fetchSigmaDataByDayValue, selectSigmaData, selectSigmaDetails, selectSigmaIsLoading} from "../../redux/combined/sigmaReport";
import {selectSelectedPriorities, selectSelectedProjects, selectSelectedStates, selectSelectedTypes} from "../../redux/combined/reportFilters";
import {openDialog} from "../../redux/combined/mainDialog";

const CustomTooltip = ({active, payload, label}) => {
    if (active) {
        return (
            <div className="custom-tooltip">
                <p className="label">{`${payload[0].name} : ${payload[0].value}`}</p>
                <p className="label">{`${payload[1].name} : ${payload[1].value}`}</p>
            </div>
        );
    }
    return null;
};

const ScatterChartSigma = () => {
    const dispatch = useDispatch();
    const [activeTooltip, setActiveTooltip] = useState(true);
    const projects = useSelector(selectProjects);
    const selectedTypes = useSelector(selectSelectedTypes);
    const selectedProjects = useSelector(selectSelectedProjects);
    const selectedStates = useSelector(selectSelectedStates);
    const selectedPriorities = useSelector(selectSelectedPriorities);
    const sigma2 = useSelector(selectSigmaData);


    useEffect(() => {
        dispatch(fetchSigmaData())
    }, [projects, selectedProjects, selectedTypes, selectedStates, selectedPriorities])

    const handleClick = (data) => {
        dispatch(openDialog(<DayDetails day={data.day}/>));

    };
    return <ResponsiveContainer width='100%' aspect={4.0 / 2.0}>
        <ScatterChart margin={CHART_DEFAULT_MARGINS}
        >
            <ReferenceArea x1={0} x2={sigma2.sigma} y1={0} y2={sigma2.sigmaMaxY}
                           fill={MATERIAL_SIGMA_COLORS[1]} fillOpacity={1.0}/>
            <ReferenceArea x1={sigma2.sigma}
                           x2={(sigma2.sigma * 2 > sigma2.sigmaMaxX) ? sigma2.sigmaMaxX : sigma2.sigma * 2}
                           y1={0}
                           y2={sigma2.sigmaMaxY}
                           fill={MATERIAL_SIGMA_COLORS[2]} fillOpacity={1.0}/>
            <ReferenceArea x1={sigma2.sigma * 2} x2={sigma2.sigmaMaxX} y1={0} y2={sigma2.sigmaMaxY}
                           fill={MATERIAL_SIGMA_COLORS[3]} fillOpacity={1.0}/>
            <XAxis dataKey={'day'} type="number" name='Дни' unit='' domain={[0, sigma2.sigmaMaxX]}/>
            <YAxis axisLine={false} dataKey={'count'} type="number" name='Количетство запросов' unit=''
                   domain={[0, sigma2.sigmaMaxY]}/>
            <Tooltip cursor={{strokeDasharray: '4 6'}} content={<CustomTooltip/>}/>
            <Scatter name='Активные запросы' data={sigma2.sigmaItems} fill={MATERIAL_SIGMA_COLORS[0]} onClick={handleClick}/>

            <Legend
                payload={[
                    {
                        value: 'Область допустимых значений',
                        type: 'circle',
                        id: 'ID01',
                        color: MATERIAL_SIGMA_COLORS[1]
                    },
                    {
                        value: 'Область наблюдения',
                        type: 'circle',
                        id: 'ID01',
                        color: MATERIAL_SIGMA_COLORS[2]
                    },
                    {
                        value: 'Область контроля',
                        type: 'circle',
                        id: 'ID01',
                        color: MATERIAL_SIGMA_COLORS[3]
                    }
                ]}/>
        </ScatterChart>
    </ResponsiveContainer>


}

export default ScatterChartSigma;


const DayDetails = ({day}) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchSigmaDataByDayValue(day));
    }, [day]);
    const items = useSelector(selectSigmaDetails);
    const isLoading = useSelector(selectSigmaIsLoading)

    return <div className={styles.column}>
        <div>Продолжительность работы над задачами: {day}</div>
        {isLoading ? <div className={styles.linearProgress}/> : items.map((item, index) => <div key={`sigma-item-detail-${index}`}>
            <a href={`https://support.fsight.ru/issue/${item}`} target="_blank" style={{textDecoration: 'none', overflowWrap: 'break-word'}}>{item}</a>
        </div>)}
    </div>
}


