import React from "react";
import styles from "../../styles/components.module.css"
import {NavLink} from "react-router-dom";
import {useDispatch} from "react-redux";
import {closeDialog} from "../../redux/combined/mainDialog";

export default function Help() {
    const dispatch = useDispatch();
    return (<div className={styles.column}>
        <span>Данные загружаются раз в 10 минут.</span>
        <span>Информация о привязке проектов к ETS находится <NavLink exact to={'/time_accounting_dictionary'} onClick={() => dispatch(closeDialog())}>здесь</NavLink>.</span>
    </div>)
}