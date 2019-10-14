import PossibleErrorsDisplay from "./components/PossibleErrorsDisplay";
import KPIContainer from "./components/kpi/KPIContainer";
import IssuesWithTFSDetailsDisplay from "./components/high_priority_issues/IssuesWithTFSDetailsDisplay";
import ReportContainer from "./components/ReportContainer";
import TimeAccountingDisplay from "./components/TimeAccountingDisplay";
import AccountedTimeDisplay from "./components/AccountedTimeDisplay";
import ETLDisplay from "./components/ETLDisplay";
import IssuesDisplay from "./components/IssuesDisplay";
import LicenseRequest from "./components/LicenseRequest";
import AuthDisplay from "./components/AuthDisplay";
import RepositoriesDisplay from "./components/RepositoriesDisplay";
import FixedDefectsDisplay from "./components/FixedDefectsDisplay";
import DurationDisplay from "./components/DurationDisplay";
import TimeAccountingAppBarActions from "./components/app_bar/actions/TimeAccountingAppBarActions";
import React from "react";
import KPIAppBarActions from "./components/app_bar/actions/KPIAppBarActions";
import ReportsAppBarActions from "./components/app_bar/actions/ReportsAppBarActions";
import TimeAccountingDictionaryDisplay from "./components/TimeAccountingDictionaryDisplay";
import PartnersDisplay from "./components/partners_report/PartnersDisplay";
import KeyPartnersReportContainer from "./components/key_partners_report/container";
import {Workbook} from "./helper_functions/export_to_excel";
import * as XLSX from "xlsx";
export const drawerWidth = 300;
export const [sidebarWidthOpen, sidebarWidthOpenWide, sidebarWidthClosed] = ['320px', '640px', '60px'];
export const PAGES = [
    {
        id: 0,
        name: 'Отчёты',
        path: '/',
        component: ReportContainer,
        availableInDrawer: true,
        appBarActions: <ReportsAppBarActions/>

    },
    {
        id: 1,
        name: 'Трудозатраты',
        path: '/time_accounting',
        component: TimeAccountingDisplay,
        availableInDrawer: true,
        appBarActions: <TimeAccountingAppBarActions/>
    },
    {
        id: 6,
        name: 'Привязка проектов',
        path: '/time_accounting_dictionary',
        component: TimeAccountingDictionaryDisplay,
        availableInDrawer: true,
        appBarActions: null
    },
    {
        id: 2,
        name: 'Отработанное время',
        path: '/accounted_time',
        component: AccountedTimeDisplay,
        availableInDrawer: true,
        appBarActions: null
    },
    {
        id: 3,
        name: 'ETL',
        path: '/etl',
        component: ETLDisplay,
        availableInDrawer: true,
        appBarActions: null
    },
    {
        id: 4,
        name: 'Запросы в YT',
        path: '/issues',
        component: IssuesDisplay,
        availableInDrawer: true,
        appBarActions: null
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
    {
        id: 9,
        name: 'KPI',
        path: '/kpi',
        component: KPIContainer,
        availableInDrawer: true,
        appBarActions: <KPIAppBarActions/>
    },
    {
        id: 10,
        name: 'Репозитории',
        path: '/repositories',
        component: RepositoriesDisplay,
        availableInDrawer: true,
        appBarActions: null
    },
    {
        id: 11,
        name: 'Исправленные дефекты',
        path: '/fixed_defects',
        component: FixedDefectsDisplay,
        availableInDrawer: false,
        appBarActions: null
    },
    {
        id: 12,
        name: 'Продолжительность работ',
        path: '/duration',
        component: DurationDisplay,
        availableInDrawer: true,
        appBarActions: null
    },
    {
        id: 13,
        name: 'Детализация по запросам',
        path: '/issues_with_tfs_details',
        component: IssuesWithTFSDetailsDisplay,
        availableInDrawer: true,
        appBarActions: null
    },
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
        id: 16,
        name: 'Отчёт по ключевым проектам',
        path: '/key_partners',
        component: KeyPartnersReportContainer,
        availableInDrawer: true,
        appBarActions: null
    },
];


export const YT_ENDPOINT = 'http://support.fsight.ru/api/';
export const ENDPOINT = process.env.NODE_ENV === 'development' ? 'http://10.9.172.76:8080' : 'http://10.30.207.22:8080';
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


