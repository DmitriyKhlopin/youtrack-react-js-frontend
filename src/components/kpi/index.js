import {NavBar} from "./NavBar";
import KPIContainer from "./KPIContainer";
import KPIAppBarActions from "../app_bar/actions/KPIAppBarActions";
import {faPray} from "@fortawesome/free-solid-svg-icons";
import React from "react";

const KPI = {
    id: 9,
    name: 'KPI',
    path: '/kpi',
    component: KPIContainer,
    availableInDrawer: true,
    appBarActions: <KPIAppBarActions/>,
    icon: faPray,
    navBar: NavBar
}

export default KPI;