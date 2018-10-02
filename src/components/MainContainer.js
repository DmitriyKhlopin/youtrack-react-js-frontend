import React, {Component} from "react";
import {TimeAccountingDisplay} from "./TimeAccountingDisplay";
import {IssuesDisplay} from "./IssuesDisplay";

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
        return <div>{state}</div>;
    }
}