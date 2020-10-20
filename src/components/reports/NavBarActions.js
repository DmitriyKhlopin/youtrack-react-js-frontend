import React from 'react';
import {useDispatch} from 'react-redux';
import styles from "../../styles/components.module.css";
import cx from "classnames";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSync} from "@fortawesome/free-solid-svg-icons";
import {fetchSigmaData} from "../../redux/combined/sigmaReport";
import {ProjectsFilter} from "../filters/ProjectsFilter";
import {StatesFilter} from "../filters/StatesFilter";
import {TypesFilter} from "../filters/TypesFilter";




function NavBarActions() {
    const dispatch = useDispatch();


    const refresh = <FontAwesomeIcon
        icon={faSync}
        className={cx(styles.iconButton, styles.defaultPadding)}
        onClick={() => dispatch(fetchSigmaData())} size={'1x'}
    />;


    return (
        <div className={cx(styles.row, styles.centered)}>
            <ProjectsFilter/>
            <TypesFilter/>
            <StatesFilter/>
            {refresh}
        </div>
    )

}

export default NavBarActions;

