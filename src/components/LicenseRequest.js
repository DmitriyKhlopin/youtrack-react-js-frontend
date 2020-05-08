import React, {Component} from "react";
import {store} from "../redux/store";
import connect from "react-redux/es/connect/connect";
import {PAGES} from "../Const";

const units = [{
    name: 'Prognoz Platform Server',
    limited: true,
    count: 0,
    availableFor: ['9.0 по прайсу', '8.2 по прайсу', '8 по прайсу', '7.2 по прайсу']
},
    {
        name: 'Prognoz Platform',
        limited: true,
        count: 0,
        availableFor: ['9.0 по единицам', '8.2 по единицам', '8 по единицам', '7.2 по единицам']
    },
    {name: 'DashboardViewer', limited: true, count: 0, availableFor: ['9.0 по прайсу']},
    {name: 'DashboardEditor', limited: true, count: 0, availableFor: ['9.0 по прайсу']},
    {name: 'ReportViewer', limited: true, count: 0, availableFor: ['9.0 по прайсу']},
    {name: 'ReportEditor', limited: true, count: 0, availableFor: ['9.0 по прайсу']},
    {
        name: 'Dashboards',
        limited: true,
        count: 0,
        availableFor: ['9.0 по единицам', '8.2 по единицам', '8 по единицам', '7.2 по единицам', '8.2 по прайсу', '8 по прайсу', '7.2 по прайсу']
    },
    {
        name: 'Reports',
        limited: true,
        count: 0,
        availableFor: ['9.0 по единицам', '8.2 по единицам', '8 по единицам', '7.2 по единицам', '8.2 по прайсу', '8 по прайсу', '7.2 по прайсу']
    },
    {
        name: 'Statistic and data mining',
        limited: true,
        count: 0,
        availableFor: ['9.0 по единицам', '8.2 по единицам', '8 по единицам', '7.2 по единицам', '9.0 по прайсу', '8.2 по прайсу', '8 по прайсу', '7.2 по прайсу']
    },
    {
        name: 'OLAP',
        limited: true,
        count: 0,
        availableFor: ['9.0 по единицам', '8.2 по единицам', '8 по единицам', '7.2 по единицам', '9.0 по прайсу', '8.2 по прайсу', '8 по прайсу', '7.2 по прайсу']
    },
    {
        name: 'Time series analysis',
        limited: true,
        count: 0,
        availableFor: ['9.0 по единицам', '8.2 по единицам', '8 по единицам', '7.2 по единицам', '9.0 по прайсу', '8.2 по прайсу', '8 по прайсу', '7.2 по прайсу']
    },
    {
        name: 'Predictive modeling and data mining',
        limited: true,
        count: 0,
        availableFor: ['9.0 по единицам', '8.2 по единицам', '8 по единицам', '7.2 по единицам', '9.0 по прайсу', '8.2 по прайсу', '8 по прайсу', '7.2 по прайсу']
    },
    {
        name: 'Microsoft Office add-in',
        limited: true,
        count: 0,
        availableFor: ['9.0 по прайсу', '8.2 по прайсу', '8 по прайсу', '7.2 по прайсу']
    },
    {
        name: 'MS Excel add-in',
        limited: true,
        count: 0,
        availableFor: ['9.0 по единицам', '8.2 по единицам', '8 по единицам', '7.2 по единицам']
    },
    {
        name: 'MS Word add-in',
        limited: true,
        count: 0,
        availableFor: ['9.0 по единицам', '8.2 по единицам', '8 по единицам', '7.2 по единицам']
    },
    {
        name: 'MS PowerPoint add-in',
        limited: true,
        count: 0,
        availableFor: ['9.0 по единицам', '8.2 по единицам', '8 по единицам', '7.2 по единицам']
    },
    {
        name: 'Data warehouse designer',
        limited: true,
        count: 0,
        availableFor: ['9.0 по единицам', '8.2 по единицам', '8 по единицам', '7.2 по единицам', '9.0 по прайсу', '8.2 по прайсу', '8 по прайсу', '7.2 по прайсу']
    },
    {
        name: 'Administration',
        limited: true,
        count: 0,
        availableFor: ['9.0 по единицам', '8.2 по единицам', '8 по единицам', '7.2 по единицам', '9.0 по прайсу', '8.2 по прайсу', '8 по прайсу', '7.2 по прайсу']
    },
    {
        name: 'Developer tools',
        limited: true,
        count: 0,
        availableFor: ['9.0 по единицам', '8.2 по единицам', '8 по единицам', '7.2 по единицам', '9.0 по прайсу', '8.2 по прайсу', '8 по прайсу', '7.2 по прайсу']
    },
    {name: 'АК Прогноз 5.26', limited: true, count: 0, availableFor: ['5.26']}];


class LicenseRequest extends Component {
    state = {
        type: 'Сетевая',
        duration: 'Постоянная',
    };

    render() {
        return (<div>{null}</div>)
    }
}

function mapStateToProps(state) {
    return {
        appBarState: state.appBarState,
        licenseRequestState: state.licenseRequestState
    }
}

export default connect(mapStateToProps, null)(LicenseRequest);