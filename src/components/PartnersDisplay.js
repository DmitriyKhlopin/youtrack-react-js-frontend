import React, {useEffect, useState} from "react";
import store from "../redux/store";
import connect from "react-redux/es/connect/connect";
import {PAGES} from "../Const";
import {getHighPriorityIssues} from "../redux/actions/highPriorityIssuesActions";
import {makeStyles} from "@material-ui/core/styles";
import {setSelectedNavItem} from "../redux/actions/appBarActions";
import {fetchPartners} from "../redux/actions/partnersActions";
import {dynamicSort, groupBy} from "../HelperFunctions";
import {useTheme} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles(theme => ({
    content: {display: 'flex', padding: 0, margin: 0, flexDirection: 'row', flexWrap: 'wrap', width: '100%'},
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: `calc(192px - ${theme.spacing(2)})`,
    },
}));

function PartnersDisplay({location, filters, data}) {
    const [sidebarWidthOpen, sidebarWidthClosed] = ['192px', '60px'];
    const theme = useTheme();
    const styles = useStyles();

    const [priorities, setPriorities] = useState(['Major', 'Normal', 'Minor']);
    const [open, setOpen] = useState(false);
    const [project, setProject] = useState('');

    useEffect(() => {
        store.dispatch(setSelectedNavItem(PAGES.filter((page) => page.path === location.pathname)[0]));
        store.dispatch(fetchPartners());
    }, []);

    const loadData = () => store.dispatch(getHighPriorityIssues(priorities));
    const i = groupBy(data.data, 'partnerName');
    console.log(Object.values(i));

    return (<div className={styles.content}>
        <div style={{
            width: `calc(100% - ${open ? sidebarWidthOpen : sidebarWidthClosed} - 16px)`,
            display: 'flex',
            padding: '0px',
            margin: '0px',
            flexDirection: 'row',
            flexWrap: 'wrap',

        }}>
            {Object.values(i).filter((pr) => project === '' || pr.filter((e2) => e2['customerName'].toLowerCase().includes(project.toLowerCase())).length > 0).map((item, index) =>
                <div
                    key={`partner-${index}`}
                    style={{
                        minWidth: 'calc(100% / 9)',
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
                    <div>{item.sort(dynamicSort('-issuesCount'))
                        .filter((e) => project === '' || e['customerName'].toLowerCase().includes(project.toLowerCase()))
                        .map((item2, index2) => {
                                const i = project !== '' && item2['customerName'].toLowerCase().includes(project.toLowerCase());
                                return <div key={`customer-${index2}`}
                                    /*style={{background: i ? 'red' : 'transparent'}}*/>
                                    {item2['customerName'] + ' ' + item2['issuesCount']}</div>
                            }
                        )}
                    </div>
                </div>)}
        </div>

        <div style={{
            width: open ? sidebarWidthOpen : sidebarWidthClosed,
            margin: '8px',
            padding: '0px',
            height: 'auto',
            boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
            transition: '0.3s',
            ':hover': {
                boxShadow: '0 8px 16px 0 rgba(0,0,0,0.2)'
            },
        }}>
            <IconButton onClick={() => setOpen(!open)} style={{
                display: 'block',
                marginLeft: 'auto',
                marginRight: 'auto'
            }}>
                {open ? <ChevronRightIcon/> : <ChevronLeftIcon/>}
            </IconButton>
            <TextField
                id="standard-name"
                label="Проект"
                className={styles.textField}
                value={project}
                onChange={(event) => setProject(event.target.value)}
                margin="normal"
                style={{visibility: open ? 'visible' : 'hidden'}}
            />
        </div>
    </div>);
}

function mapStateToProps(state) {
    return {
        filters: state.reportFilters,
        data: state.partnersData,
    }
}

export default (connect(mapStateToProps, null)(PartnersDisplay))

