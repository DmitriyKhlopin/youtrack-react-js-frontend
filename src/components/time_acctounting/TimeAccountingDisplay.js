import React, {useEffect, useMemo} from "react";
import moment from "moment";
import {setSelectedNavItem} from "../../redux/actions/appBarActions";
import {fetchTimeAccountingData} from "../../redux/actions/timeAccountingActions";
import {PAGES} from "../../Const";
import LinearProgress from "@material-ui/core/LinearProgress";
import {useDispatch, useSelector} from "react-redux";
import {selectTimeAccountingData} from "../../redux/reducers/timeAccountingReducers";
import {compose} from "recompose";
import {withRouter} from "react-router-dom";
import {useTable} from "react-table";
import Table from "../table/Table";


function TimeAccountingDisplay({location}) {
    const dispatch = useDispatch();
    const timeAccountingData = useSelector(selectTimeAccountingData);
    useEffect(() => {
        dispatch(setSelectedNavItem(PAGES.filter((page) => page.path === location.pathname)[0]));
        dispatch(fetchTimeAccountingData());
    }, []);

    const data = timeAccountingData.timeData;
    let table;

    if (data === null) table = <div>Error</div>;
    if (data && timeAccountingData.timeLoading === true) table = <LinearProgress/>;
    if (data && timeAccountingData.timeLoading === false && data.length === 0) table = <div>No items to display</div>;
    const columns = useMemo(() => [
            {
                Header: 'ID задачи',
                accessor: 'id',
                Footer: (
                    <span><strong>Popular: </strong>{" "} {data.map(item => item.id).reduce(
                        (a, b, i, arr) =>
                            (arr.filter(v => v === a).length >= arr.filter(v => v === b).length ? a : b),
                        null)}</span>
                ),
                filterMethod: (filter, row) =>
                    row[filter.id].startsWith(filter.value) ||
                    row[filter.id].endsWith(filter.value)
            },
            {
                Header: 'Сотрудник', accessor: 'agent', filterMethod: (filter, row) =>
                    row[filter.id].startsWith(filter.value) ||
                    row[filter.id].endsWith(filter.value)
            },
            {Header: 'Трудозатраты', accessor: 'units',},
            {id: 'crDate', Header: 'Дата', accessor: d => moment(d.changedDate).format('YYYY-MM-DD')},
            {
                Header: 'Проект',
                accessor: 'projects'
            },
            {
                Header: 'Этап',
                accessor: 'iterationPath'

            },
            {
                Header: 'Приоритет',
                accessor: 'priority'
            }
        ]
        , []);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({columns, data});
    return (<Table data={data} columns={columns} editable={false} updateMyData={(index, id, value)=>console.log(index, id, value)} skipPageReset={true} filterableColumns={false}/>)
}

export default compose(withRouter)(TimeAccountingDisplay);
