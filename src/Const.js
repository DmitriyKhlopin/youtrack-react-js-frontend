import PossibleErrorsDisplay from "./components/PossibleErrorsDisplay";
import AccountedTimeDisplay from "./components/AccountedTimeDisplay";
import ETLDisplay from "./components/ETLDisplay";
import LicenseRequest from "./components/LicenseRequest";
import AuthDisplay from "./components/AuthDisplay";
import RepositoriesDisplay from "./components/RepositoriesDisplay";
import DurationDisplay from "./components/DurationDisplay";
import React from "react";
import PartnersDisplay from "./components/partners_report/PartnersDisplay";
import KeyPartnersReportContainer from "./components/key_partners_report/container";
import SingleIndicator from "./components/partners_report/SingleIndicator";
import {faClock, faEdit, faSpinner} from '@fortawesome/free-solid-svg-icons';
import TimeAccountingDictionaryDisplay from "./components/time_accounting/TimeAccountingDictionaryDisplay";
import IssueDetails from "./components/high_priority_issues"
import TimeAccounting from "./components/time_accounting"
import Reports from "./components/reports"
import KPI from "./components/kpi";
import ConnectedScatterPlot from "./components/charts/ConnectedScatterPlot";

export const drawerWidth = 300;
export const [sidebarWidthOpen, sidebarWidthOpenWide, sidebarWidthClosed] = ['320px', '640px', '60px'];
export const PAGES = [
    {
        id: -3,
        name: 'Scatter',
        path: '/scatter',
        component: ConnectedScatterPlot,
        availableInDrawer: true,
        appBarActions: null,
        icon: faEdit
    },
    Reports,
    /*{
        id: 0,
        name: 'Отчёты',
        path: '/',
        component: ReportContainer,
        availableInDrawer: true,
        appBarActions: <ReportsAppBarActions key={'asdfasdfasd'}/>,
        icon: faChartBar
    },*/
    TimeAccounting,
    /*{
        id: 1,
        name: 'Трудозатраты',
        path: '/time_accounting',
        component: TimeAccountingDisplay,
        availableInDrawer: true,
        appBarActions: <TimeAccountingAppBarActions/>,
        icon: faClock
    },*/
    {
        id: 6,
        name: 'Привязка проектов YT в ETS',
        path: '/time_accounting_dictionary',
        component: TimeAccountingDictionaryDisplay,
        availableInDrawer: true,
        appBarActions: null,
        icon: faEdit
    },
    {
        id: 2,
        name: 'Отработанное время',
        path: '/accounted_time',
        component: AccountedTimeDisplay,
        availableInDrawer: true,
        appBarActions: null,
        icon: faClock
    },
    {
        id: 3,
        name: 'ETL',
        path: '/etl',
        component: ETLDisplay,
        availableInDrawer: true,
        appBarActions: null,
        icon: faSpinner
    },
    {
        id: 5,
        name: 'Получить лицензию',
        path: '/license',
        component: LicenseRequest,
        availableInDrawer: false,
        appBarActions: null
    },
    {
        id: 8,
        name: 'Возможные ошибки',
        path: '/possible_errors',
        component: PossibleErrorsDisplay,
        availableInDrawer: false,
        appBarActions: null
    },
    KPI,
    /*{
        id: 9,
        name: 'KPI',
        path: '/kpi',
        component: KPIContainer,
        availableInDrawer: true,
        appBarActions: <KPIAppBarActions/>,
        icon: faPray
    },*/
    {
        id: 10,
        name: 'Репозитории',
        path: '/repositories',
        component: RepositoriesDisplay,
        availableInDrawer: true,
        appBarActions: null
    },
    {
        id: 12,
        name: 'Продолжительность работ',
        path: '/duration',
        component: DurationDisplay,
        availableInDrawer: false,
        appBarActions: null
    },
    IssueDetails,
    /*{
        id: 13,
        name: 'Детализация по запросам',
        path: '/issues_with_tfs_details',
        component: IssuesWithTFSDetailsDisplay,
        availableInDrawer: true,
        appBarActions: null,
        help: null
    },*/
    {
        id: 14,
        name: 'Авторизация',
        path: '/login',
        component: AuthDisplay,
        availableInDrawer: false,
        appBarActions: null
    },
    {
        id: 15,
        name: 'Реестр партнёров',
        path: '/partners',
        component: PartnersDisplay,
        availableInDrawer: true,
        appBarActions: null
    },
    {
        id: 17,
        name: 'Реестр партнёров',
        path: '/partners/byIndicator',
        component: SingleIndicator,
        availableInDrawer: false,
        appBarActions: null
    },
    {
        id: 16,
        name: 'Отчёт по ключевым проектам',
        path: '/key_partners',
        component: KeyPartnersReportContainer,
        availableInDrawer: false,
        appBarActions: null
    },
];


export const YT_ENDPOINT = 'http://support.fsight.ru/api/';
export const ENDPOINT = process.env.NODE_ENV === 'development' ? 'http://localhost:8080' : 'http://10.30.207.22:8080';
export const RADIAN = Math.PI / 180;
export const innerProjects = ['PP_Lic', 'FMP_LIC', 'SD', 'PDP', 'W', 'P_PROJ1', 'T', 'TEST', 'SPAM', 'TC', 'RELEASE', 'PO', 'P'];
export const licProjects = ['PP_Lic',];

/**https://flatuicolors.com/palette/defo*/
export const MATERIAL_COLORS = [/*'#F44336',
'#E91E63',*/
    '#9C27B0',
    '#673AB7',
    '#3F51B5',
    '#2196F3',
    '#03A9F4',
    '#00BCD4',
    '#009688',
    '#4CAF50',
    '#8BC34A',
    '#CDDC39',
    '#FFEB3B',
    '#FFC107',
    '#FF9800',
    '#FF5722',
    '#795548',
    '#9E9E9E',
    '#607D8B'];
export const MATERIAL_LINE_CHART_COLORS = ['#2196F3', '#FFC107', '#4CAF50'];
export const MATERIAL_SIGMA_COLORS = ['#34495e', '#4CAF50', '#FFEB3B', '#FF9800'];

export const kpiCharts = [
    {
        id: 't1-1',
        title: 't',
        dataKey: 'agent',
        paletteOffset: 0,
        y: {left: {id: 'left', orientation: 'left'},},
        bars: [
            {yAxisId: 'left', name: 'Рейтинг/Количество задач', dataKey: 'totalAvg', legendType: 'circle',},
        ]
    },
    {
        id: 't1-2',
        title: 't',
        dataKey: 'agent',
        paletteOffset: 1,
        y: {left: {id: 'left', orientation: 'left'},},
        bars: [
            {yAxisId: 'left', name: 'Рейтинг', dataKey: 'totalWithViolations', legendType: 'circle',},
        ]
    },
    {
        id: 't1-3',
        title: 't',
        dataKey: 'agent',
        paletteOffset: 2,
        y: {left: {id: 'left', orientation: 'left'},},
        bars: [
            {yAxisId: 'left', name: 'Рейтинг без учёта SLA', dataKey: 'total', legendType: 'circle',}
        ]
    },
];


export const kpiDetails = [
    {
        id: 't1',
        title: 't',
        dataKey: 'agent',
        paletteOffset: 0,
        y: {
            left: {id: 'left', orientation: 'left', stroke: '#8884d8', strokeWidth: 3},
            right: {id: 'right', orientation: 'right', stroke: '#82ca9d', strokeWidth: 3}
        },
        bars: [
            {yAxisId: 'left', name: 'Рейтинг/Количество задач', dataKey: 'totalAvg', legendType: 'circle',},
            {yAxisId: 'right', name: 'Рейтинг', dataKey: 'totalWithViolations', legendType: 'circle',},
            {yAxisId: 'right', name: 'Рейтинг без учёта SLA', dataKey: 'total', legendType: 'circle',}
        ]
    },
    {
        id: 't2',
        title: 't2',
        dataKey: 'agent',
        paletteOffset: 2,
        y: {
            left: {id: 'left', orientation: 'left',},
            right: {id: 'right', orientation: 'right', stroke: 'rgba(0,0,0,0)'},
        },
        bars: [
            {yAxisId: 'left', name: 'Решения', dataKey: 'solutionSum', legendType: 'circle',},
            {yAxisId: 'left', name: 'Уточнения', dataKey: 'clarificationSum', legendType: 'circle',},
            {yAxisId: 'left', name: 'Переносы сроков решения', dataKey: 'postponementSum', legendType: 'circle',},
            {yAxisId: 'left', name: 'Оценки', dataKey: 'evaluationSum', legendType: 'circle',},
            {yAxisId: 'left', name: 'Типы задач', dataKey: 'issueTypeSum', legendType: 'circle',},
            {yAxisId: 'left', name: 'Приоритеты', dataKey: 'prioritySum', legendType: 'circle',},
            {yAxisId: 'left', name: 'Уровни решения', dataKey: 'levelSum', legendType: 'circle',},
            {yAxisId: 'left', name: 'Нарушено SLA', dataKey: 'violations', legendType: 'circle',},
        ]
    },
    {
        id: 't3',
        title: 't3',
        dataKey: 'agent',
        paletteOffset: 2,
        y: {
            left: {id: 'left', orientation: 'left',},
            right: {id: 'right', orientation: 'right', stroke: 'rgba(0,0,0,0)'},
        },
        bars: [
            {yAxisId: 'left', name: 'Решения (avg)', dataKey: 'solutionAvg', legendType: 'circle',},
            {yAxisId: 'left', name: 'Уточнения (avg)', dataKey: 'clarificationAvg', legendType: 'circle',},
            {yAxisId: 'left', name: 'Переносы сроков решения (avg)', dataKey: 'postponementAvg', legendType: 'circle',},
            {yAxisId: 'left', name: 'Оценки (avg)', dataKey: 'evaluationAvg', legendType: 'circle',},
            {yAxisId: 'left', name: 'Типы задач (avg)', dataKey: 'issueTypeAvg', legendType: 'circle',},
            {yAxisId: 'left', name: 'Приоритеты (avg)', dataKey: 'priorityAvg', legendType: 'circle',},
            {yAxisId: 'left', name: 'Уровни решения (avg)', dataKey: 'levelAvg', legendType: 'circle',},
        ]
    },
    {
        id: 't4',
        title: 't4',
        dataKey: 'agent',
        paletteOffset: 2,
        y: {
            left: {id: 'left', orientation: 'left',},
            right: {id: 'right', orientation: 'right', stroke: 'rgba(0,0,0,0)'},
        },
        bars: [
            {yAxisId: 'left', name: 'Решения (count)', dataKey: 'solutionCount', legendType: 'circle',},
            {yAxisId: 'left', name: 'Уточнения (count)', dataKey: 'clarificationCount', legendType: 'circle',},
            {
                yAxisId: 'left',
                name: 'Переносы сроков решения (count)',
                dataKey: 'postponementCount',
                legendType: 'circle',
            },
            {yAxisId: 'left', name: 'Оценки (count)', dataKey: 'evaluationCount', legendType: 'circle',},
            {yAxisId: 'left', name: 'Типы задач (count)', dataKey: 'issueTypeCount', legendType: 'circle',},
            {yAxisId: 'left', name: 'Приоритеты (count)', dataKey: 'priorityCount', legendType: 'circle',},
            {yAxisId: 'left', name: 'Уровни решения (count)', dataKey: 'levelCount', legendType: 'circle',},
        ]
    }
];

export const renderLegend = (props) => {
    const {payload} = props;
    return (
        <ul style={{textAlign: 'center'}}>
            {
                payload.map((entry, index) => (
                    <li key={`item-${index}`} style={{fontSize: 14, display: 'inline-block', marginRight: '8px'}}>
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

export const PRIORITIES_DICTIONARY = [
    {value: 'Major', label: 'Высокий', color: '#00B8D9'},
    {value: 'Normal', label: 'Обычный', color: '#00B8D9'},
    {value: 'Minor', label: 'Низкий', color: '#00B8D9'}
]

export const STATES_DICTIONARY = [
    {value: 'Submitted', label: 'Зарегистрирована', color: '#00B8D9', resolved: false},
    {value: 'Open', label: 'Открыта', color: '#00B8D9', resolved: false},
    {value: 'In Progress', label: 'В обработке', color: '#00B8D9', resolved: false},
    {value: 'Направлена разработчику', label: 'Направлена разработчику', color: '#00B8D9', resolved: false},
    {value: 'Ожидает ответа', label: 'Ожидает ответа', color: '#00B8D9', resolved: false},
    {value: 'Ожидает подтверждения', label: 'Ожидает подтверждения', color: '#00B8D9', resolved: false},
    {value: 'Подтверждена', label: 'Подтверждена', color: '#00B8D9', resolved: true},
    {value: 'Без подтверждения', label: 'Без подтверждения', color: '#00B8D9', resolved: true},
    {value: 'Duplicate', label: 'Дубликат', color: '#00B8D9', resolved: true},
]