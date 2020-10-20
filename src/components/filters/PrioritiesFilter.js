import {useDispatch, useSelector} from "react-redux";
import Select from "react-select";
import React, {useEffect} from "react";
import {selectSelectedPriorities, setSelectedPriorities} from "../../redux/combined/reportFilters";
import {ValueContainer} from "./ValueContainer";
import {customStyles} from "./Styles";
import {PRIORITIES_DICTIONARY} from "../../Const";

export function PrioritiesFilter() {
    const dispatch = useDispatch();
    const priorities = useSelector(selectSelectedPriorities);
    const components = {ValueContainer};

    useEffect(() => {
        dispatch(setSelectedPriorities(priorities == null ? [PRIORITIES_DICTIONARY[0]] : priorities));
    }, [])

    const handleProjectsChange = (selectedOption) => {
        dispatch(setSelectedPriorities(selectedOption ? selectedOption : []));
    }
    return (<Select
        styles={customStyles}
        isMulti
        options={PRIORITIES_DICTIONARY}
        placeholder="Приоритеты"
        value={priorities}
        onChange={handleProjectsChange}
        closeMenuOnSelect={false}
        hideSelectedOptions={false}
        components={components}
        isSearchable={true}
    />)
}
