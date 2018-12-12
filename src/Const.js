export const YT_ENDPOINT = "http://support.fsight.ru/rest/";
export const ENDPOINT = process.env.NODE_ENV === "development" ? "http://10.9.172.76:8080" : 'http://10.30.207.22:8080';
export const drawerWidth = 240;
export const RADIAN = Math.PI / 180;
export const innerProjects = ["PP_Lic", "SD", "PDP", "W", "P_PROJ1", "T", "TEST", "SPAM", "TC"];
export const licProjects = ["PP_Lic"];

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

export const NAV_ITEMS = [
        {name: "Активные запросы", id: 0},
        {name: "Трудозатраты", id: 1},
        {name: "Экспорт данных из YT", id: 2},
        {name: "Отчёты", id: 3}
    ]
;

export const PAGE_IDS = {
    possibleErrors: {
        id: 8,
        name: 'Возможные ошибки'
    },
    kpi: {
        id: 9,
        name: 'KPI'
    },
    repositories: {
        id: 10,
        name: 'Репозитории'
    }
};