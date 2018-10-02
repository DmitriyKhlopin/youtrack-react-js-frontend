import React, {Component} from "react";
import {AUTH_TOKEN} from "../Config";
import {IssueDetailsDisplay} from "./IssueDetailsDisplay";
import Button from '@material-ui/core/Button';
import MuiThemeProvider from "../../node_modules/@material-ui/core/styles/MuiThemeProvider";
import createMuiTheme from "@material-ui/core/es/styles/createMuiTheme";

const theme = createMuiTheme();

export class IssuesDisplay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            issues: null,
            activeIssue: -1,
        };
    }

    componentDidMount() {
        const myHeaders = new Headers();
        myHeaders.append('Authorization', AUTH_TOKEN);
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
        /*return <MuiThemeProvider> <Button variant="outlined" color="primary"
                                          >aaa</Button></MuiThemeProvider>;*/

        return <MuiThemeProvider theme={theme}>
            {issues.map((item, index) => (
                <Button variant="outlined" color="primary"
                        key={index}
                        onClick={() => {
                            this.setState({id: issues[index].id});
                            this.setState({activeIssue: index});
                        }}>
                    {item.id}
                </Button>
            ))}

            <IssueDetailsDisplay id={issues[activeIssue].id} key={activeIssue}/>
        </MuiThemeProvider>

    }
}

/*
IssuesDisplay.propTypes = {
    classes: PropTypes.object.isRequired,
};*/
