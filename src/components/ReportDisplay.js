import React, {Component} from "react";
import {CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis} from 'recharts'
import {drawerWidth} from "../Const";
import moment from "moment";

export class ReportDisplay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: null,
            isLoading: false,
            etlState: null
        }
    }

    componentWillUnmount() {
        this.isCancelled = true;
    }

    componentDidMount() {
        this.loadData()
    }


    loadData() {
        this.setState({isLoading: true});
        console.log("aaa");
        const myHeaders = new Headers();
        myHeaders.append('Accept', 'application/json');
        const url = "http://10.0.172.42:8081/api/chart/1";
        fetch(url, {
            method: "GET",
            headers: myHeaders
        }).then(res => res.json()).then(json => {
            const res = json.slice(json.length - 9, json.length - 1).map(function (item) {
                item.week = moment(item.week).format('L');
                return item
            });
            !this.isCancelled && this.setState({items: res, isLoading: false});
        }).catch(err => console.log(err));
    }


    render() {
        const items = this.state.items;
        /*const isLoading = this.state.isLoading;*/
        const etlState = this.state.etlState;
        console.log(etlState);
        if (items === null) return <div>No data</div>;
        return (
            <LineChart width={window.innerWidth - drawerWidth} height={600} data={items}
                       margin={{top: 30, right: 60, left: 30, bottom: 30}}>
                <XAxis dataKey="week"/>
                <YAxis axisLine={false}/>
                <CartesianGrid strokeDasharray="3 3"/>
                <Tooltip/>
                <Legend/>
                <Line type="monotone" dataKey="active" stroke="#1E88E5"/>
                <Line type="monotone" dataKey="created" stroke="#FDD835"/>
                <Line type="monotone" dataKey="resolved" stroke="#43A047"/>
            </LineChart>
        );

    }
}

/*angle={-90} */