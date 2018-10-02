import React, {Component} from "react";
import {AUTH_TOKEN} from "../Config";

export class IssueDetailsDisplay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            issueData: []
        };
    }

    componentWillUnmount() {
        this.isCancelled = true;
    }

    componentDidMount() {
        const id = this.props.id;
        const headers = new Headers();
        headers.append('Authorization', AUTH_TOKEN);
        headers.append('Accept', 'application/json');
        const url = "http://support.fsight.ru/rest/issue/" + id;
        fetch(url, {
            method: "GET",
            headers: headers
        }).then(res => res.json()).then(json => {
            !this.isCancelled && this.setState({issueData: json.field});
        }).catch(err => console.log(err));
    }

    render() {
        const issueData = this.state.issueData;
        if (issueData.length===0) return <div>Loading</div>;
        return issueData.map(function (item, index) {
            /*console.log(item);*/
            return <div key={index}>{item['name'] + ' - ' + item['value']}</div>;
        });
    }
}