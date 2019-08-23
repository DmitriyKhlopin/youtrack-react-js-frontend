import React, {useEffect, useState} from "react";
import store from "../redux/store";
import connect from "react-redux/es/connect/connect";
import {PAGES} from "../Const";
import {getHighPriorityIssues} from "../redux/actions/highPriorityIssuesActions";
import makeStyles from "@material-ui/styles/makeStyles";
import {setSelectedNavItem} from "../redux/actions/appBarActions";
import {fetchPartners} from "../redux/actions/partnersActions";
import {dynamicSort, groupBy} from "../HelperFunctions";

const useStyles = makeStyles(theme => ({
    content: {display: 'flex', padding: 0, margin: 0, flexDirection: 'row', flexWrap: 'wrap', width: '100%'},
}));

function PartnersDisplay({location, filters, data}) {
    const styles = useStyles();
    const [priorities, setPriorities] = useState(['Major', 'Normal', 'Minor']);

    useEffect(() => {
        store.dispatch(setSelectedNavItem(PAGES.filter((page) => page.path === location.pathname)[0]));
        store.dispatch(fetchPartners());
    }, []);

    const loadData = () => store.dispatch(getHighPriorityIssues(priorities));
    const i = groupBy(data.data, 'partnerName');
    console.log(Object.values(i));

    return (<div className={styles.content}>
        <div style={{
            width: 'calc(100% - 32px)',
            display: 'flex',
            padding: '0px',
            margin: '0px',
            flexDirection: 'row',
            flexWrap: 'wrap',

        }}>
            {Object.values(i).map((item, index) => <div style={{
                /*width: 'calc(25% - 32px)',*/
                minWidth: 'calc(100% / 9)',
                /*maxHeight:'200px',*/
                display: 'flex',
                flexDirection: 'column',
                margin: '8px',
                padding: '8px',
                boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
                transition: '0.3s',
                ':hover': {
                    boxShadow: '0 8px 16px 0 rgba(0,0,0,0.2)'
                },
            }}>
                <div style={{textAlign: 'center'}}>{item.find(Boolean)['partnerName']}</div>
                <div>{item.sort(dynamicSort('-issuesCount')).map((item2, index2) =>
                    <div>{item2['customerName'] + ' ' + item2['issuesCount']}</div>)}</div>
            </div>)}
        </div>

        <div style={{width: '32px', background: 'red'}}/>

    </div>);
}

function mapStateToProps(state) {
    return {
        filters: state.reportFilters,
        data: state.partnersData,
    }
}

export default (connect(mapStateToProps, null)(PartnersDisplay))

