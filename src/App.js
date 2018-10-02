import React, {Component} from 'react';
import ReactTable from "react-table";
import 'react-table/react-table.css'
import './App.css';
import moment from "moment";

class App extends Component {
    constructor() {
        super();
        this.state = {
            activeNav: 2,
        };
    }

    render() {
        const activeNav = this.state.activeNav;
        return (
            <div className="App">
                <div className="topnav">
                    {NAV_ITEMS.map((item, index) => (
                        <a className="a"
                           key={index}
                           onClick={() => {
                               this.setState({activeNav: index});
                           }}>
                            {item.name}
                        </a>

                    ))}
                </div>
                <MainContainer
                    id={NAV_ITEMS[activeNav].id}
                    key={activeNav}
                />
            </div>
        );
    }
}

const NAV_ITEMS = [
    {name: "Активные запросы", id: "0"},
    {name: "Отчёты", id: "1"},
    {name: "Трудозатраты", id: "2"},
    {name: "Пользователи", id: "3"},
    {name: "Новая лицензия", id: "4"}
];

class MainContainer extends Component {
    constructor() {
        super();
        this.state = {
            activeNav: null
        }
    }

    componentDidMount() {
        const id = this.props.id;
        this.setState({activeNav: id})
    }

    render() {
        const state = this.state.activeNav;
        if (!state) return <div>Loading</div>;
        if (state === "0") return <IssuesDisplay/>;
        if (state === "2") return <TimeAccountingDisplay/>;
        return <div>{state}</div>;
    }
}

class IssuesDisplay extends Component {
    constructor() {
        super();
        this.state = {
            issues: null,
            activeIssue: -1,
        };
    }

    componentDidMount() {
        const myHeaders = new Headers();
        myHeaders.append('Authorization', 'Bearer perm:YWRtaW4=.dGVzdA==.xRSgd89yoN9DapAjIZIMTTxXyEyXhS');
        myHeaders.append('Accept', 'application/json');
        const url = "http://support.fsight.ru/rest/issue?filter=%23Unresolved -SD -SPAM&with=Summary&max=1000";
        fetch(url, {
            method: "GET",
            headers: myHeaders
        }).then(res => res.json()).then(json => {
            this.setState({issues: json.issue});
            this.setState({activeIssue: 0});
        }).catch(err => console.log(err));
    }

    render() {
        const issues = this.state.issues;
        const activeIssue = this.state.activeIssue;
        if (issues === null) return <div>Loading issues</div>;
        if (activeIssue === -1) return <div>Loading issues</div>;
        if (issues.length === 0) return <div>There are no active issues</div>;

        return <div>
            {issues.map((item, index) => (
                <button
                    key={index}
                    onClick={() => {
                        this.setState({id: issues[index].id});
                        this.setState({activeIssue: index});
                    }}>
                    {item.id}
                </button>
            ))}

            <IssueDetailsDisplay id={issues[activeIssue].id} key={activeIssue}/>
        </div>

    }
}

class IssueDetailsDisplay extends Component {
    constructor() {
        super();
        this.state = {
            issueData: null
        };
    }

    componentDidMount() {
        const id = this.props.id;
        console.log("component did mount " + id);
        const headers = new Headers();
        headers.append('Authorization', 'Bearer perm:YWRtaW4=.dGVzdA==.xRSgd89yoN9DapAjIZIMTTxXyEyXhS');
        headers.append('Accept', 'application/json');
        const url = "http://support.fsight.ru/rest/issue/" + id;
        console.log(url);
        fetch(url, {
            method: "GET",
            headers: headers
        }).then(res => res.json()).then(json => {
            this.setState({issueData: json});
        }).catch(err => console.log(err));
    }

    render() {
        const issueData = this.state.issueData;
        if (!issueData) return <div>Loading</div>;
        return issueData.field.map(function (item, index) {
            /*console.log(item);*/
            return <div key={index}>{item['name'] + ' - ' + item['value']}</div>;
        });
    }
}

class TimeAccountingDisplay extends Component {
    constructor() {
        super();
        this.state = {
            items: null
        }
    }

    componentDidMount() {
        const myHeaders = new Headers();
        //myHeaders.append('Authorization', 'Bearer perm:YWRtaW4=.dGVzdA==.xRSgd89yoN9DapAjIZIMTTxXyEyXhS');
        myHeaders.append('Accept', 'application/json');
        const url = "http://10.0.172.42:8081/api/wi_today";
        fetch(url, {
            method: "GET",
            headers: myHeaders
        }).then(res => res.json()).then(json => {
            console.log(json);
            this.setState({items: json});
        }).catch(err => console.log(err));
    }

    render() {
        const items = this.state.items;
        if (items === null) return <div>Loading</div>;
        if (items.length === 0) return <div>No items to display</div>;
        const i = items.map(item => item.id).reduce(
            (a, b, i, arr) =>
                (arr.filter(v => v === a).length >= arr.filter(v => v === b).length ? a : b),
            null);
        console.log(i);
        const columns = [{
            Header: 'ID',
            accessor: 'id',
            Footer: (
                <span><strong>Popular: </strong>{" "} {items.map(item => item.id).reduce(
                    (a, b, i, arr) =>
                        (arr.filter(v => v === a).length >= arr.filter(v => v === b).length ? a : b),
                    null)}</span>
            ),
            filterMethod: (filter, row) =>
                row[filter.id].startsWith(filter.value) ||
                row[filter.id].endsWith(filter.value)
        },
            {
                Header: 'User', accessor: 'agent', filterMethod: (filter, row) =>
                    row[filter.id].startsWith(filter.value) ||
                    row[filter.id].endsWith(filter.value)
            },
            {Header: 'Трудозатраты', accessor: 'units',},
            {id: 'crDate', Header: 'Дата', accessor: d => moment(d).format('YYYY-MM-DD')},
            {
                Header: 'Проект',
                accessor: 'projects',
                Footer: (
                    <span><strong>Popular: </strong>{" "} {items.map(item => item.projects).reduce(
                        (a, b, i, arr) =>
                            (arr.filter(v => v === a).length >= arr.filter(v => v === b).length ? a : b),
                        null)}</span>
                )
            },
            {
                Header: 'Этап',
                accessor: 'iterationPath',
                Footer: (
                    <span><strong>Popular: </strong>{" "} {items.map(item => item.iterationPath).reduce(
                        (a, b, i, arr) =>
                            (arr.filter(v => v === a).length >= arr.filter(v => v === b).length ? a : b),
                        null)}</span>
                ),
                filterMethod: (filter, row) =>
                    row[filter.id].startsWith(filter.value) ||
                    row[filter.id].endsWith(filter.value)
            }];

        return <ReactTable
            data={items}
            filterable
            defaultFilterMethod={(filter, row) =>
                String(row[filter.id]) === filter.value}
            columns={columns}
        />
    }
}

export default App;