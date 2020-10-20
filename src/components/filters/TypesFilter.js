import {TYPES_DICTIONARY} from "../../Const";
import Select from "react-select";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectSelectedTypes, setSelectedTypes} from "../../redux/combined/reportFilters";
import {ValueContainer} from "./ValueContainer";
import {customStyles} from "./Styles";

export function TypesFilter() {
    const dispatch = useDispatch();
    const types = useSelector(selectSelectedTypes);
    const components = {ValueContainer};

    useEffect(() => {
        dispatch(setSelectedTypes(types == null ? [TYPES_DICTIONARY[1]] : types));
    }, [])

    const handleTypesChange = (selectedOption) => {
        dispatch(setSelectedTypes(selectedOption ? selectedOption : []));
    }
    return (
        <Select
            styles={customStyles}
            isMulti
            options={TYPES_DICTIONARY}
            placeholder="Типы"
            value={types}
            onChange={handleTypesChange}
            closeMenuOnSelect={false}
            hideSelectedOptions={false}
            components={components}
            /*isSearchable={true}*/
        />
    )
}
