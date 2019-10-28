import React, {Component} from "react";
import {store} from "../redux/store";
import {setSelectedNavItem} from "../redux/actions/appBarActions";
import withStyles from "@material-ui/styles/withStyles";
import connect from "react-redux/es/connect/connect";
import {getPossibleErrors} from "../redux/actions/possibleErrorsActions";
import {PAGES} from "../Const";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/es/Typography/Typography";
import {createStyles} from "@material-ui/styles";


const styles = createStyles({
    componentRoot: {
        display: 'flex',
        justifyContent: 'left',
        flexWrap: 'wrap',
        padding: 0,
        margin: 0,
    },
});


const PossibleErrorsDisplay = withStyles(styles)(class extends Component {
        componentDidMount() {
            store.dispatch(getPossibleErrors());
            store.dispatch(setSelectedNavItem(PAGES.filter((page) => page.path === this.props.location.pathname)[0]));
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
)

function mapStateToProps(state) {
    return {
        appBarState: state.appBarState,
        possibleErrors: state.possibleErrors,
    }
}

export default (connect(mapStateToProps, null)(PossibleErrorsDisplay));
