import React, {useEffect} from "react";
import {NewElement} from "./NewElement";
import {useDispatch, useSelector} from "react-redux";
import Table from "../table/Table";
import {fetchTimeAccountingDictionaryData, selectTimeAccountingData, selectTimeAccountingDataIsLoading, selectTimeAccountingDataIsPosting} from "../../redux/combined/timeAccountingDictionary";
import styles from "../../styles/components.module.css"
import {format} from "date-fns";


const columns = [
    {
        id: 'projectShortName',
        Header: 'PROJECT',
        accessor: 'projectShortName',
    },
    {
        id: 'customer',
        Header: 'Customer',
        accessor: 'customer',
    },
    {
        id: 'ets',
        Header: 'ETS',
        accessor: 'projectEts',
    },
    {

        id: 'iterationPath',
        Header: 'iterationPath',
        accessor: 'iterationPath',
    },
    {
        id: 'dateFrom',
        Header: 'Начало',
        accessor: d => format(d.dateFrom, 'yyyy-MM-dd'),
    },
    {
        id: 'dateTo',
        Header: 'Окончание',
        accessor: d => format(d.dateTo, 'yyyy-MM-dd'),
    }/*,
    {
        filterable: false,
        Header: 'Утверждён',
        sortable: false,
    }*/
];

function TimeAccountingDictionaryDisplay() {
    const timeAccountingData = useSelector(selectTimeAccountingData);
    const loading = useSelector(selectTimeAccountingDataIsLoading);
    const posting = useSelector(selectTimeAccountingDataIsPosting);
    const dispatch = useDispatch();
    useEffect(() => {
        requestData();
    }, []);


    const requestData = () => {
        dispatch(fetchTimeAccountingDictionaryData());
    };

    const items = timeAccountingData.dictionaryData;
    let table;
    if (items === null) table = <div>Loading</div>;
    if (items && items.length === 0) table = <div>No items to display</div>;

    function handleChange({value}, original, column) {
        console.log(original, column.id);
        console.log(value);
    }


    return (<div className={styles.mediumMargin}>
        {loading === true ? <div className={styles.linearProgress}/> : <Table data={timeAccountingData} columns={columns}/>}
        <br/>
        {posting === true ? <div className={styles.linearProgress}/> : <NewElement/>}
    </div>)

};

export default (TimeAccountingDictionaryDisplay);
