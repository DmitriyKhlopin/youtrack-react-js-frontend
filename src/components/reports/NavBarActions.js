import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import styles from "../../styles/components.module.css";
import cx from "classnames";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSync} from "@fortawesome/free-solid-svg-icons";
import Select, {components} from "react-select";
import {selectProjects} from "../../redux/combined/dictionaries";
import {selectSelectedProjects, selectSelectedStates, selectSelectedTypes, setSelectedProjects, setSelectedStates, setSelectedTypes} from "../../redux/combined/reportFilters";
import {STATES_DICTIONARY, TYPES_DICTIONARY} from "../../Const";
import {fetchSigmaData} from "../../redux/combined/sigmaReport";


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
    const projectsDictionary = useSelector(selectProjects);
    const projects = useSelector(selectSelectedProjects);
    const types = useSelector(selectSelectedTypes);
    const states = useSelector(selectSelectedStates);
    const components = {ValueContainer};

    useEffect(() => {
        dispatch(setSelectedTypes([TYPES_DICTIONARY[1]]));
        dispatch(setSelectedStates([STATES_DICTIONARY[3]]));
    }, [])

    const handleProjectsChange = (selectedOption) => {
        dispatch(setSelectedProjects(selectedOption?selectedOption:[]));
    }

    const handleTypesChange = (selectedOption) => {
        dispatch(setSelectedTypes(selectedOption?selectedOption:[]));
    }


    const handleStatesChange = (selectedOption) => {
        dispatch(setSelectedStates(selectedOption?selectedOption:[]));
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
                options={projectsDictionary}
                placeholder="Проекты"
                value={projects}
                onChange={handleProjectsChange}
                closeMenuOnSelect={false}
                hideSelectedOptions={false}
                components={components}
                isSearchable={true}
            />
            <Select
                styles={customStyles}
                isMulti
                options={TYPES_DICTIONARY}
                /*defaultValue={[TYPES_DICTIONARY[1]]}*/
                placeholder="Типы"
                value={types}
                onChange={handleTypesChange}
                closeMenuOnSelect={false}
                hideSelectedOptions={false}
                components={components}
                /*isSearchable={true}*/
            />
            <Select
                styles={customStyles}
                isMulti
                options={STATES_DICTIONARY}
                placeholder="Состояния"
                value={states}
                onChange={handleStatesChange}
                closeMenuOnSelect={false}
                hideSelectedOptions={false}
                components={components}
                /*isSearchable={true}*/
            />
            {refresh}
        </div>
    )

}

export default NavBarActions;

