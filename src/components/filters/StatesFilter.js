import {STATES_DICTIONARY} from "../../Const";
import Select from "react-select";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectSelectedStates, setSelectedStates} from "../../redux/combined/reportFilters";
import {ValueContainer} from "./ValueContainer";
import {customStyles} from "./Styles";

export function StatesFilter() {
    const dispatch = useDispatch();
    const states = useSelector(selectSelectedStates);
    const components = {ValueContainer};

    useEffect(() => {
        dispatch(setSelectedStates(states == null ? [STATES_DICTIONARY[3]] : states));
    }, [])

    const handleStatesChange = (selectedOption) => {
        dispatch(setSelectedStates(selectedOption ? selectedOption : []));
    }

    return (
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
            isSearchable={true}
        />
    )
}
