import {useDispatch, useSelector} from "react-redux";
import Select from "react-select";
import React, {useEffect} from "react";
import {fetchProjects, selectProjects} from "../../redux/combined/dictionaries";
import {selectSelectedProjects, setSelectedProjects} from "../../redux/combined/reportFilters";
import {ValueContainer} from "./ValueContainer";
import {customStyles} from "./Styles";

export function ProjectsFilter() {
    const dispatch = useDispatch();
    const projectsDictionary = useSelector(selectProjects);
    const projects = useSelector(selectSelectedProjects);
    const components = {ValueContainer};
    useEffect(() => {
        if (projectsDictionary.length === 0) dispatch(fetchProjects());
    }, []);

    const handleProjectsChange = (selectedOption) => {
        dispatch(setSelectedProjects(selectedOption ? selectedOption : []));
    }
    return (<Select
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
    />)
}
