import React, {useEffect} from "react";
import moment from "moment";
import ReactTable from "react-table";
import {store} from "../../redux/store";
import {setSelectedNavItem} from "../../redux/actions/appBarActions";
import connect from "react-redux/es/connect/connect";
import {deleteTimeAccountingDictionaryItem, fetchTimeAccountingDictionaryData, toggleTimeAccountingDictionaryItem} from "../../redux/actions/timeAccountingActions";
import {PAGES} from "../../Const";
import {withRouter} from "react-router-dom";
import {NewElement} from "./NewElement";
import styles from "../../styles/components.module.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSpinner, faToggleOff, faToggleOn, faTrash} from "@fortawesome/free-solid-svg-icons";
import cx from "classnames";
import {useDispatch} from "react-redux";


function TimeAccountingDictionaryDisplay({location, timeAccountingData}) {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setSelectedNavItem(PAGES.filter((page) => page.path === location.pathname)[0]));
        requestData();
    }, []);


    const requestData = () => {
        dispatch(fetchTimeAccountingDictionaryData());
    };

    const items = timeAccountingData.dictionaryData;
    let table;
    let columns;
    if (items === null) table = <div>Loading</div>;
    if (items && items.length === 0) table = <div>No items to display</div>;

    function handleChange({value}, original, column) {
        console.log(original, column.id);
        console.log(value);


    }

    if (items && items.length !== 0) columns = [
        {
            id: 'projectShortName',
            Header: 'PROJECT',
            accessor: 'projectShortName',
            Cell: ({original, column}) => <div
                /*type={'text'}*/
                className={cx(styles.row, styles.centered, styles.textPrimary)}
                /*value={original.projectShortName}
                onChange={({target}) => handleChange(target, original, column)}*/>{original.projectShortName}</div>,
            filterMethod: (filter, row) => row[filter.id].startsWith(filter.value) || row[filter.id].endsWith(filter.value)
        },
        {
            id: 'customer',
            Header: 'Customer',
            accessor: 'customer',
            Cell: ({original}) => <div className={cx(styles.row, styles.centered, styles.textPrimary)}>{original.customer}</div>,
            filterMethod: (filter, row) => row[filter.id].startsWith(filter.value) || row[filter.id].endsWith(filter.value)
        },
        {
            id: 'ets',
            Header: 'ETS',
            accessor: 'projectEts',
            Cell: ({original}) => <div className={cx(styles.row, styles.centered, styles.textPrimary)}>{original.projectEts}</div>,
            filterMethod: (filter, row) => row[filter.id].startsWith(filter.value) || row[filter.id].endsWith(filter.value)
        },
        {

            id: 'iterationPath',
            Header: 'iterationPath',
            accessor: 'iterationPath',
            Cell: ({original}) => <div className={cx(styles.row, styles.centered, styles.textPrimary)}>{original.iterationPath === null ? 'Зависит от версии продукта' : original.iterationPath}</div>,
            filterMethod: (filter, row) => row[filter.id].startsWith(filter.value) || row[filter.id].endsWith(filter.value)
        },
        {
            id: 'dateFrom',
            Header: 'Начало',
            accessor: 'dateFrom',
            Cell: ({original}) => <div className={cx(styles.row, styles.centered, styles.textPrimary)}>{moment(original.dateFrom).format('YYYY-MM-DD')}</div>,
            filterable: false,
        },
        {
            id: 'dateTo',
            Header: 'Окончание',
            accessor: 'dateTo',
            Cell: ({original}) => <div className={cx(styles.row, styles.centered, styles.textPrimary)}>{moment(original.dateTo).format('YYYY-MM-DD')}</div>,
            filterable: false,
        },
        {
            filterable: false,
            Header: 'Утверждён',
            sortable: false,
            /*width: 64,*/
            Cell: ({original}) => <div>
                <button className={styles.iconButton} onClick={() => dispatch(toggleTimeAccountingDictionaryItem(original.id))}>
                    <FontAwesomeIcon icon={original.loading === true ? faSpinner : original.approved ? faToggleOn : faToggleOff} size={'2x'}/>
                </button>
                {!original.approved && <button className={styles.iconButton} onClick={() => dispatch(deleteTimeAccountingDictionaryItem(original.id))}>
                    <FontAwesomeIcon icon={faTrash} size={'2x'}/>
                </button>}
            </div>

        }

    ];

    if (columns) {
        table = <ReactTable
            data={items}
            filterable
            defaultFilterMethod={(filter, row) =>
                String(row[filter.id]) === filter.value}
            columns={columns}
        />
    }
    return (<div style={{width: '100%'}}>{table}<NewElement/></div>)
}

function mapStateToProps(state) {
    return {
        appBarState: state.appBarState,
        timeAccountingData: state.timeAccountingData,
    }
}

export default withRouter(connect(mapStateToProps, null)(TimeAccountingDictionaryDisplay));
