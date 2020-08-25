import React, {useEffect, useMemo} from "react";
import moment from "moment";
import {fetchTimeAccountingData} from "../../redux/actions/timeAccountingActions";
import {useDispatch, useSelector} from "react-redux";
import Table from "../table/Table";
import styled from "styled-components";
import {selectTimeAccountingData} from "../../redux/reducers/timeAccountingReducers";
import styles from "../../styles/components.module.css"

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
      font-size: .75rem;
    }
  }
`

function TimeAccountingDisplay() {
    const dispatch = useDispatch();
    const data = useSelector(selectTimeAccountingData);
    useEffect(() => {
        dispatch(fetchTimeAccountingData());
    }, []);


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
    return (<div className={styles.mediumMargin}>
        <Table
            data={data}
            columns={columns}
            editable={false}
            updateMyData={(index, id, value) => console.log(index, id, value)}
            skipPageReset={true}
            filterableColumns={false}
        />
    </div>)
}

export default TimeAccountingDisplay;
