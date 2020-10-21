import {useDispatch, useSelector} from "react-redux";
import Select from "react-select";
import React, {useEffect} from "react";
import {fetchPartnerCustomers, selectPartnerCustomers} from "../../redux/combined/dictionaries";
import {selectSelectedPartnerCustomers, selectSelectedProjects, setSelectedPartnerCustomers} from "../../redux/combined/reportFilters";
import {ValueContainer} from "./ValueContainer";
import {customStyles} from "./Styles";

export function PartnerCustomersFilter() {
    const dispatch = useDispatch();
    const customersDictionary = useSelector(selectPartnerCustomers);
    const customers = useSelector(selectSelectedPartnerCustomers);
    const components = {ValueContainer};
    useEffect(() => {
        if (customersDictionary.length === 0) dispatch(fetchPartnerCustomers());
    }, []);
    const handleProjectsChange = (selectedOption) => {
        dispatch(setSelectedPartnerCustomers(selectedOption ? selectedOption : []));
    }
    return (<Select
        styles={customStyles}
        isMulti
        options={customersDictionary}
        placeholder="Заказчики"
        value={customers}
        onChange={handleProjectsChange}
        closeMenuOnSelect={false}
        hideSelectedOptions={false}
        components={components}
        isSearchable={true}
    />)
}
