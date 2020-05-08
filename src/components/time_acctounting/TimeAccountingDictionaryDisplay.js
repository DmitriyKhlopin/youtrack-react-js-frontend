import React, {useEffect} from "react";
import {fetchTimeAccountingDictionaryData} from "../../redux/actions/timeAccountingActions";
import {NewElement} from "./NewElement";
import {useDispatch, useSelector} from "react-redux";
import {selectTimeAccountingData} from "../../redux/reducers/timeAccountingReducers";
import {compose} from "recompose";
import {withRouter} from "react-router-dom";
import Table from "../table/Table";


function TimeAccountingDictionaryDisplay({location}) {
    const timeAccountingData = useSelector(selectTimeAccountingData);
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
            /*Cell: ({original}) => <div className={cx(styles.row, styles.centered, styles.textPrimary)}>{original.customer}</div>,
            filterMethod: (filter, row) => row[filter.id].startsWith(filter.value) || row[filter.id].endsWith(filter.value)*/
        },
        {
            id: 'ets',
            Header: 'ETS',
            accessor: 'projectEts',
            /*Cell: ({original}) => <div className={cx(styles.row, styles.centered, styles.textPrimary)}>{original.projectEts}</div>,
            filterMethod: (filter, row) => row[filter.id].startsWith(filter.value) || row[filter.id].endsWith(filter.value)*/
        },
        {

            id: 'iterationPath',
            Header: 'iterationPath',
            accessor: 'iterationPath',
            /*Cell: ({original}) => <div className={cx(styles.row, styles.centered, styles.textPrimary)}>{original.iterationPath === null ? 'Зависит от версии продукта' : original.iterationPath}</div>,
            filterMethod: (filter, row) => row[filter.id].startsWith(filter.value) || row[filter.id].endsWith(filter.value)*/
        },
        {
            id: 'dateFrom',
            Header: 'Начало',
            accessor: 'dateFrom',
            /*Cell: ({original}) => <div className={cx(styles.row, styles.centered, styles.textPrimary)}>{moment(original.dateFrom).format('YYYY-MM-DD')}</div>,
            filterable: false,*/
        },
        {
            id: 'dateTo',
            Header: 'Окончание',
            accessor: 'dateTo',
            /*Cell: ({original}) => <div className={cx(styles.row, styles.centered, styles.textPrimary)}>{moment(original.dateTo).format('YYYY-MM-DD')}</div>,
            filterable: false,*/
        },
        {
            filterable: false,
            Header: 'Утверждён',
            sortable: false,
            /*width: 64,*/
            /*Cell: ({original}) => <div>
                <button className={styles.iconButton} onClick={() => dispatch(toggleTimeAccountingDictionaryItem(original.id))}>
                    <FontAwesomeIcon icon={original.loading === true ? faSpinner : original.approved ? faToggleOn : faToggleOff} size={'2x'}/>
                </button>
                {!original.approved && <button className={styles.iconButton} onClick={() => dispatch(deleteTimeAccountingDictionaryItem(original.id))}>
                    <FontAwesomeIcon icon={faTrash} size={'2x'}/>
                </button>}
            </div>*/

        }

    ];
    return (<div style={{width: '100%'}}>
        <Table data={items} columns={columns}/>
        <NewElement/>
    </div>)

};

export default compose(withRouter)(TimeAccountingDictionaryDisplay);
