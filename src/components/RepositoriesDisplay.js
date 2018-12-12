import React, {Component} from "react";
import ReactTable from "react-table";
import store from "../redux/store";
import {setSelectedNavItem} from "../redux/actions/appBarActions";
import * as PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import {styles} from "../Styles";
import connect from "react-redux/es/connect/connect";
import Button from "@material-ui/core/Button/Button";
import RefreshIcon from '@material-ui/icons/Refresh';
import SaveIcon from '@material-ui/icons/Save';
import {PAGE_IDS} from "../Const";
import {getAllRepositoriesData, postRepository} from "../redux/actions/repositoriesActions";
import TextField from "@material-ui/core/TextField";

class RepositoriesDisplay extends Component {
    state = {
        projectId: '',
        customer: '',
        url: '',
        dbName: '',
        schema: '',
        dbType: '',
        user: '',
        password: ''
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    componentWillMount() {
        store.dispatch(setSelectedNavItem({title: PAGE_IDS.repositories.name, selectedId: PAGE_IDS.repositories.id}));
    }

    requestData = () => {
        store.dispatch(getAllRepositoriesData());
    };

    addRepository = () => {
        console.log('posting');
        console.log(this.state);
        store.dispatch(postRepository(this.state));
    };

    componentDidMount() {
        store.dispatch(getAllRepositoriesData());
    }

    render() {
        const {classes} = this.props;
        const items = this.props.repositoriesData.repositoriesData;
        const columns = [
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
                filterMethod: (filter, row) =>
                    row[filter.id].startsWith(filter.value) ||
                    row[filter.id].endsWith(filter.value)
            },
            {
                Header: 'Тип БД',
                accessor: 'dbType',
                filterMethod: (filter, row) =>
                    row[filter.id].startsWith(filter.value) ||
                    row[filter.id].endsWith(filter.value)
            },
            {
                Header: 'Пользователь',
                accessor: 'user',
            },
            {
                Header: 'Пароль',
                accessor: 'password',
            }
        ];

        return <div style={{minWidth: '100%'}}>

            <ReactTable
                style={classes.content}
                data={items}
                filterable
                defaultFilterMethod={(filter, row) =>
                    String(row[filter.id]) === filter.value}
                columns={columns}
            />
            <Button variant="fab" mini className={classes.fab} color={'secondary'}
                    onClick={this.requestData}>
                <RefreshIcon/>
            </Button>
            <form variant="outlined" style={{
                display: 'flex',
                flexWrap: 'wrap',
            }}>
                <TextField
                    id="standard-name"
                    label="Проект"
                    className={classes.textField}
                    value={this.state.projectId}
                    onChange={this.handleChange('projectId')}
                    margin="normal"
                />
                <TextField
                    id="standard-name"
                    label="Заказчик"
                    className={classes.textField}
                    value={this.state.customer}
                    onChange={this.handleChange('customer')}
                    margin="normal"
                />
                <TextField
                    id="standard-name"
                    label="URL"
                    className={classes.textField}
                    value={this.state.url}
                    onChange={this.handleChange('url')}
                    margin="normal"
                />
                <TextField
                    id="standard-name"
                    label="Имя БД"
                    className={classes.textField}
                    value={this.state.dbName}
                    onChange={this.handleChange('dbName')}
                    margin="normal"
                />
                <TextField
                    id="standard-name"
                    label="Схема"
                    className={classes.textField}
                    value={this.state.schema}
                    onChange={this.handleChange('schema')}
                    margin="normal"
                />
                <TextField
                    id="standard-name"
                    label="Тип БД"
                    className={classes.textField}
                    value={this.state.dbType}
                    onChange={this.handleChange('dbType')}
                    margin="normal"
                />
                <TextField
                    id="standard-name"
                    label="Пользователь"
                    className={classes.textField}
                    value={this.state.user}
                    onChange={this.handleChange('user')}
                    margin="normal"
                />
                <TextField
                    id="standard-name"
                    label="Пароль"
                    className={classes.textField}
                    value={this.state.password}
                    onChange={this.handleChange('password')}
                    margin="normal"
                />
                <Button onClick={this.addRepository}>
                    <SaveIcon/>
                </Button>
            </form>
        </div>
    }
}

RepositoriesDisplay.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        appBarState: state.appBarState,
        repositoriesData: state.repositoriesData
    }
}

export default withStyles(styles, {withTheme: true})(connect(mapStateToProps, null)(RepositoriesDisplay));