import {useDispatch, useSelector} from "react-redux";
import Select from "react-select";
import React, {useEffect} from "react";
import {fetchProjects, fetchTags, selectTags} from "../../redux/combined/dictionaries";
import {selectSelectedTags, setSelectedTags} from "../../redux/combined/reportFilters";
import {ValueContainer} from "./ValueContainer";
import {customStyles} from "./Styles";

export function TagsFilter() {
    const dispatch = useDispatch();
    const tagsDictionary = useSelector(selectTags);
    const tags = useSelector(selectSelectedTags);
    const components = {ValueContainer};

    useEffect(() => {
        if (tagsDictionary.length === 0) dispatch(fetchTags());
    }, []);

    const handleChange = (selectedOption) => {
        dispatch(setSelectedTags(selectedOption ? selectedOption : []));
    }

    return (<Select
        styles={customStyles}
        isMulti
        options={tagsDictionary}
        placeholder="Тэги"
        value={tags}
        onChange={handleChange}
        closeMenuOnSelect={false}
        hideSelectedOptions={false}
        components={components}
        isSearchable={true}
    />)
}
