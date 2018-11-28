import React, {Component} from "react";
import store from "../redux/store";
import {setSelectedNavItem} from "../redux/actions/appBarActions";
import * as PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import {styles} from "../Styles";
import connect from "react-redux/es/connect/connect";
import {getPossibleErrors} from "../redux/actions/possibleErrorsActions";
import {PAGE_IDS} from "../Const";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/es/Typography/Typography";

class PossibleErrorsDisplay extends Component {
    componentDidMount() {
        store.dispatch(getPossibleErrors());
        store.dispatch(setSelectedNavItem({
            title: PAGE_IDS.possibleErrors.name,
            selectedId: PAGE_IDS.possibleErrors.id
        }));
    }

    render() {
        const data = this.props.possibleErrors.possibleErrorsData;
        const {classes} = this.props;
        return <Grid container spacing={8} className={classes.componentRoot} wrap={'wrap'}>
            {data.map(tile => (
                <Grid item={true} key={tile.ytIssueId}>
                    <Typography>{tile.ytIssueId}</Typography>
                    <Typography>{tile.assignee}</Typography>
                    {tile.list.map(wi => (
                        <Typography key={tile.ytIssueId + wi.systemId}>
                            {`${wi.systemId}: ${wi.state} ->  ${wi.previousState}`}
                        </Typography>
                    ))}
                </Grid>
            ))}
        </Grid>
    }
}

PossibleErrorsDisplay.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        appBarState: state.appBarState,
        possibleErrors: state.possibleErrors,
    }
}

export default withStyles(styles, {withTheme: true})(connect(mapStateToProps, null)(PossibleErrorsDisplay));