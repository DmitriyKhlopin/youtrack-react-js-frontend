import React, {useEffect, useState} from "react";
import FormGroup from "../../node_modules/@material-ui/core/FormGroup/FormGroup";
import TextField from "../../node_modules/@material-ui/core/TextField/TextField";
import connect from "react-redux/es/connect/connect";
import {fetchETL, setEtlFilterDateFrom, setEtlFilterDateTo} from "../redux/actions/etlFilterActions";
import {setSelectedNavItem} from "../redux/actions/appBarActions";
import {PAGES} from "../Const";
import {HoverButtonSmall} from "../styled_components/StyledComponents";

function ETLDisplay({location, etlFilters, setDateFrom, setDateTo, fetchETL, setSelectedNavItem}) {
    const [loading, setLoading] = useState(false);
    const [checked, setChecked] = useState(false);

    useEffect(() => setSelectedNavItem(location), []);


    return (<FormGroup row>
        <TextField
            variant="outlined"
            id="date"
            label="Date from"
            type="date"
            defaultValue={etlFilters.dateFrom}
            onChange={field => setDateFrom(field.target.value)}
            InputLabelProps={{shrink: true,}}
        />
        <TextField
            variant="outlined"
            id="date"
            label="Date to"
            type="date"
            defaultValue={etlFilters.dateTo}
            onChange={field => setDateTo(field.target.value)}
            InputLabelProps={{shrink: true,}}
        />
        {/*<Checkbox label={'label'} checked={checked} onChange={() => setChecked(!checked)}/>*/}
        <HoverButtonSmall style={{backgroundColor: '#4CAF50'}} disabled={loading} onClick={() => fetchETL()}> Загрузить
            данные </HoverButtonSmall>
    </FormGroup>);
}

function mapStateToProps(state) {
    return {
        etlFilters: state.etlFilters,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setDateFrom: (dateFrom) => dispatch(setEtlFilterDateFrom(dateFrom)),
        setDateTo: (dateFrom) => dispatch(setEtlFilterDateTo(dateFrom)),
        fetchETL: () => dispatch(fetchETL()),
        setSelectedNavItem: (location) => dispatch(setSelectedNavItem(PAGES.filter((page) => page.path === location.pathname)[0])),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ETLDisplay);

