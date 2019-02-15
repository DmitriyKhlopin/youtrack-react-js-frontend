import React, {Component} from "react";
import {AUTH_TOKEN} from "../Config";
import {IssueDetailsDisplay} from "./IssueDetailsDisplay";
import Button from '@material-ui/core/Button';
import {YT_ENDPOINT} from "../Const";
import * as PropTypes from "prop-types";
import withStyles from "../../node_modules/@material-ui/core/styles/withStyles";
import {styles} from "../Styles";
import store from "../redux/store";
import {setSelectedNavItem} from "../redux/actions/appBarActions";

class IssuesDisplay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            issues: null,
            activeIssue: -1,
        };
    }

    componentWillMount() {
        store.dispatch(setSelectedNavItem({title: 'Запросы', selectedId: 3}));
    }

    componentWillUnmount() {
        this.isCancelled = true;
    }


    componentDidMount() {
        const url = YT_ENDPOINT + "issue";
        const obj = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Origin': 'http://10.9.172.76:3000',
                'Authorization': AUTH_TOKEN
            }
        };
        fetch(url, obj)
            .then(res => res.json())
            .then(json => !this.isCancelled && this.setState({
                issues: json.issue,
                activeIssue: 0
            })).catch(err => console.log(err));
    }

    render() {
        const {classes} = this.props;
        const issues = this.state.issues;
        const activeIssue = this.state.activeIssue;
        if (issues === null) return <div>Loading issues</div>;
        if (activeIssue === -1) return <div>Loading issues</div>;
        if (issues.length === 0) return <div>There are no active issues</div>;
        return <div>
            {issues.map((item, index) => (
                <Button variant="outlined" color="primary" className={classes.button}
                        key={index}
                        onClick={() => {
                            this.setState({id: issues[index].id});
                            this.setState({activeIssue: index});
                        }}>
                    {item.id}
                </Button>
            ))}

            <IssueDetailsDisplay id={issues[activeIssue].id} key={activeIssue}/>
        </div>

    }
}

IssuesDisplay.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles, {withTheme: true})(IssuesDisplay);
