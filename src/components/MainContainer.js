import React, {Component} from "react";
import {TimeAccountingDisplay} from "./TimeAccountingDisplay";
import {IssuesDisplay} from "./IssuesDisplay";
import {ETLDisplay} from "./ETLDisplay";
import {ReportDisplay} from "./ReportDisplay";

export class MainContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeNav: 0
        }
    }

    componentDidMount() {
        const id = this.props.id;
        this.setState({activeNav: id});
        console.log("id = " + id);
    }

    render() {
        const state = this.state.activeNav;
        /*if (!state) return <div>Loading</div>;*/
        if (state === 0) return <IssuesDisplay/>;
        if (state === 1) return <TimeAccountingDisplay/>;
        if (state === 2) return <ETLDisplay/>;
        if (state === 3) return <ReportDisplay/>;
        return <div>{state}</div>;
    }
}