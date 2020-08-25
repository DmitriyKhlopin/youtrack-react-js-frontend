import {faChartBar} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import {NavBar} from "./NavBar";
import ReportContainer from "./ReportContainer";

const reports = {
    id: 0,
    name: 'Отчёты',
    path: '/',
    component: ReportContainer,
    availableInDrawer: true,
    icon: faChartBar,
    navBar: NavBar
}

export default reports;