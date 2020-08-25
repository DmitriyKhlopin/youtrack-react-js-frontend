import TimeAccountingDisplay from "./TimeAccountingDisplay";
import {faClock} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import {NavBar} from "./NavBar";

const timeAccounting = {
    id: 1,
    name: 'Трудозатраты',
    path: '/time_accounting',
    component: TimeAccountingDisplay,
    availableInDrawer: true,
    icon: faClock,
    navBar: NavBar
}

export default timeAccounting;