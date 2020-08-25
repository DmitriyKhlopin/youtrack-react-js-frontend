import React, {useEffect} from "react";
import connect from "react-redux/es/connect/connect";
import {getAllRepositoriesData} from "../redux/actions/repositoriesActions";
import {useDispatch} from "react-redux";
import ReactTable from "react-table";
import Table from "./table/Table";


function RepositoriesDisplay({location, repositoriesData}) {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllRepositoriesData());
    }, []);


    let columns=[];
    const items = repositoriesData.repositoriesData;
    if (items && items.length !== 0) {
        columns = [
            {
                Header: 'Проект',
                accessor: 'projectId',
                filterMethod: (filter, row) => row[filter.id].startsWith(filter.value) || row[filter.id].endsWith(filter.value)
            },
            {
                Header: 'Заказчик',
                accessor: 'customer',
                filterMethod: (filter, row) => row[filter.id].startsWith(filter.value) || row[filter.id].endsWith(filter.value)
            },
            {
                Header: 'URL',
                accessor: 'url',
                filterMethod: (filter, row) => row[filter.id].startsWith(filter.value) || row[filter.id].endsWith(filter.value)
            },
            {
                Header: 'Имя БД',
                accessor: 'dbName',
                filterMethod: (filter, row) => row[filter.id].startsWith(filter.value) || row[filter.id].endsWith(filter.value)
            },
            {
                Header: 'Схема',
                accessor: 'schema',
                filterMethod: (filter, row) => row[filter.id].startsWith(filter.value) || row[filter.id].endsWith(filter.value)
            },
            {
                Header: 'Тип БД',
                accessor: 'dbType',
                filterMethod: (filter, row) => row[filter.id].startsWith(filter.value) || row[filter.id].endsWith(filter.value)
            },
            {
                Header: 'Пользователь',
                accessor: 'userName',
            },
            {
                Header: 'Пароль',
                accessor: 'password',
            }
        ];
    }



    return (<Table data={items} columns={columns} editable={false} updateMyData={(index, id, value) => console.log(index, id, value)} skipPageReset={true} filterableColumns={false}/>)

}

function mapStateToProps(state) {
    return {
        repositoriesData: state.repositoriesData
    }
}

export default connect(mapStateToProps, null)(RepositoriesDisplay);
