import React from "react";
import styles from "../../styles/components.module.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faQuestionCircle} from "@fortawesome/free-solid-svg-icons";
import {openDialog} from "../../redux/combined/mainDialog";
import {useDispatch} from "react-redux";
import Help from "./Help";
import NavBarActions from "./NavBarActions";


export function NavBar() {
    const dispatch = useDispatch();
    const infoButton = <FontAwesomeIcon
        icon={faQuestionCircle}
        className={styles.iconButton}
        onClick={() => dispatch(openDialog(<Help/>))} size={'1x'}
    />;

    return <>
        <span className={styles.title}>Отчёты</span>
        {infoButton}
        <div className={styles.expand}/>
        <NavBarActions/>
    </>
}