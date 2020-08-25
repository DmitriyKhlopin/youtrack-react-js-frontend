import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import styles from "../../styles/components.module.css";
import cx from "classnames";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSync} from "@fortawesome/free-solid-svg-icons";
import {fetchSigmaData} from "../../redux/actions/reportsActions";
import Select, {components} from "react-select";
import {selectProjects} from "../../redux/combined/dictionaries";
import {selectSelectedProjects, setSelectedProjects} from "../../redux/combined/reportFilters";


const customStyles = {
    container: base => ({
        ...base,
        display: 'inline-block',
        width: '240px',
        margin: '0.5rem',
        scrollbarColor: 'gray lightgray',
        height: '3rem'
    }),
    valueContainer: (base) => ({
        ...base,
        height: '3rem',
    })
};


const ValueContainer = ({children, ...props}) => {
    const {getValue, hasValue} = props;
    const nbValues = getValue().length;
    if (!hasValue) {
        return (
            <components.ValueContainer {...props}>
                {children}
            </components.ValueContainer>
        );
    }
    return (
        <components.ValueContainer {...props}>
            {`${nbValues} items selected`}
        </components.ValueContainer>
    );
};

function NavBarActions() {
    const dispatch = useDispatch();
    const options = useSelector(selectProjects);
    const projects=useSelector(selectSelectedProjects);
    const components = {ValueContainer};
    const handleProjectsChange = (selectedOption) => {
        /*setProjects(selectedOption);*/
        dispatch(setSelectedProjects(selectedOption));
    }

    const refresh = <FontAwesomeIcon
        icon={faSync}
        className={cx(styles.iconButton, styles.defaultPadding)}
        onClick={() => dispatch(fetchSigmaData())} size={'1x'}
    />;

    return (
        <div className={cx(styles.row, styles.centered)}>
            <Select
                styles={customStyles}
                isMulti
                options={options.map(e => new Object({value: e.shortName, label: e.name, color: '#00B8D9'}))}
                placeholder="Проекты"
                value={projects}
                onChange={handleProjectsChange}
                closeMenuOnSelect={false}
                components={components}
                isSearchable={true}
            />
            {refresh}
        </div>
    )

}

export default NavBarActions;

