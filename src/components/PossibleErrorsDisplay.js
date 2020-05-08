import React, {useEffect} from "react";
import connect from "react-redux/es/connect/connect";
import {getPossibleErrors} from "../redux/actions/possibleErrorsActions";
import {useDispatch} from "react-redux";


/*const styles = createStyles({
    componentRoot: {
        display: 'flex',
        justifyContent: 'left',
        flexWrap: 'wrap',
        padding: 0,
        margin: 0,
    },
});*/


const PossibleErrorsDisplay = ({data, location}) => {
    const dispatch = useDispatch();
    useEffect(dispatch(getPossibleErrors()), []);
    /*store.dispatch(setSelectedNavItem(PAGES.filter((page) => page.path === this.props.location.pathname)[0]));*/

    return (<div>
        {data.map(tile => (
            <div key={tile.ytIssueId}>
                <div>{tile.ytIssueId}</div>
                <div>{tile.assignee}</div>
                {tile.list.map(wi => (
                    <div key={tile.ytIssueId + wi.systemId}>
                        {`${wi.systemId}: ${wi.state} ->  ${wi.previousState}`}
                    </div>
                ))}
            </div>
        ))}
    </div>);
}


function mapStateToProps(state) {
    return {
        appBarState: state.appBarState,
        data: state.possibleErrors.possibleErrorsData,
    }
}

export default connect(mapStateToProps, null)(PossibleErrorsDisplay);
