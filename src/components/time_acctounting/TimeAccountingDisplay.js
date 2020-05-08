import React, {useEffect, useMemo} from "react";
import moment from "moment";
import {fetchTimeAccountingData} from "../../redux/actions/timeAccountingActions";
import {useDispatch, useSelector} from "react-redux";
import {selectTimeAccountingData} from "../../redux/reducers/timeAccountingReducers";
import Table from "../table/Table";
import styles from "../../styles/components.module.css";
import styled from "styled-components";

const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }
`

function TimeAccountingDisplay({location}) {
    const dispatch = useDispatch();
    const timeAccountingData = useSelector(selectTimeAccountingData);
    useEffect(() => {
        dispatch(fetchTimeAccountingData());
    }, []);

    const data = timeAccountingData.timeData;
    let table;

    if (data === null) table = <div>Error</div>;
    if (data && timeAccountingData.timeLoading === true) table = <div className={styles.loader}/>;
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
    return (<Styles><Table data={data} columns={columns} editable={false} updateMyData={(index, id, value) => console.log(index, id, value)} skipPageReset={true} filterableColumns={false}/></Styles>)
}

export default TimeAccountingDisplay;
