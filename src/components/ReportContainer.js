import React, {Component} from "react";
import {CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis} from 'recharts'
import {drawerWidth} from "../Const";
import moment from "moment";
import Button from "../../node_modules/@material-ui/core/Button/Button";
import * as PropTypes from "prop-types";
import withStyles from "../../node_modules/@material-ui/core/styles/withStyles";
import FilterIcon from '@material-ui/icons/Filter';
import RefreshIcon from '@material-ui/icons/Refresh';
import ReportFilterDialog from "./ReportFilterDialog";

const styles = theme => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        padding: theme.spacing.unit / 2,
    },
    fab: {
        position: 'absolute',
        top: theme.spacing.unit * 2 + 64,
        right: theme.spacing.unit * 2,
    },
    fabLoad: {
        position: 'absolute',
        top: theme.spacing.unit * 2 + 64,
        right: theme.spacing.unit * 2 + 64,
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        margin: theme.spacing.unit,

    },
    button: {
        margin: theme.spacing.unit,
    },
    card: {
        margin: '16px',
    },
});

class ReportContainer extends Component {
    constructor(props) {
        super(props);
        this.updateSelectedProjects = this.updateSelectedProjects.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.state = {
            projects: [],
            selectedProjects: [],
            items: null,
            isLoading: false,
            etlState: null,
            dateFrom: moment().subtract(9, 'weeks').format('YYYY-MM-DD'),
            dateTo: moment().format('YYYY-MM-DD'),
            currentMode: "PP",
            expanded: true,
            open: false,
            scroll: 'paper',
        }
    }

    componentWillUnmount() {
        this.isCancelled = true;
    }

    componentDidMount() {
        this.loadProjects();
    }

    loadProjects() {
        this.setState({isLoading: true});
        const myHeaders = new Headers();
        myHeaders.append('Accept', 'application/json');
        const url = "http://10.0.172.42:8081/api/project";
        fetch(url, {
            method: "GET",
            headers: myHeaders
        }).then(res => res.json()).then(json => {
            console.log(json);
            /*!this.isCancelled &&*/
            this.setState({
                projects: json,
                selectedProjects: json.map(item => item.shortName),
                isLoading: false
            });
        }).catch(err => console.log(err));
    }

    handleClickOpen = scroll => () => {
        console.log(this.state.open);
        this.setState({open: true, scroll});
    };

    handleClose(open, dateFrom, dateTo, projects) {
        console.log(dateFrom, dateTo, projects);
        this.setState({open: open});
        if (dateFrom !== null && dateTo !== null) {
            console.log("hey motherfucker, i'm updating");
            this.setState({dateFrom: dateFrom, dateTo: dateTo, selectedProjects: projects})
        }
    };

    loadData = () => {
        const projects = this.state.selectedProjects;
        console.log(projects);
        this.setState({isLoading: true});
        const myHeaders = new Headers();
        myHeaders.append('Accept', 'application/json');
        const url = "http://10.0.172.42:8081/api/chart/dynamics?" + "projects=" + projects + "&dateFrom=" + this.state.dateFrom + "&dateTo=" + this.state.dateTo;
        fetch(url, {
            method: "GET",
            headers: myHeaders
        }).then(res => res.json()).then(json => {
            const res = json.map(function (item) {
                item.week = moment(item.week).format('L');
                return item
            });
            !this.isCancelled && this.setState({items: res, isLoading: false});
        }).catch(err => console.log(err));

        const url2 = "http://10.0.172.42:8081/api/chart/sigma?" + "projects=" + projects + "&dateFrom=" + this.state.dateFrom + "&dateTo=" + this.state.dateTo;
        fetch(url2, {
            method: "GET",
            headers: myHeaders
        }).then(res => res.json()).then(json => console.log(json))
    };

    updateSelectedProjects(projects) {
        /*const p = projects.map(item => item.shortName);*/
        this.setState({selectedProjects: projects.map(item => item.shortName)});
    };

    render() {
        const {classes} = this.props;
        const {items, currentMode} = this.state;
        return (
            <form className={classes.container} noValidate autoComplete="off">
                <LineChart width={window.innerWidth - drawerWidth} height={600} data={items}
                           margin={{top: 30, right: 60, left: 30, bottom: 30}}>
                    <XAxis dataKey="week"/>
                    <YAxis axisLine={false}/>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <Tooltip/>
                    <Legend/>
                    <Line type="monotone" dataKey="active" stroke="#1E88E5" name="В работе"/>
                    <Line type="monotone" dataKey="created" stroke="#FDD835" name="Создано"/>
                    <Line type="monotone" dataKey="resolved" stroke="#43A047" name="Решено"/>
                </LineChart>
                <Button variant="fab" className={classes.fabLoad} color={'secondary'} onClick={this.loadData}>
                    <RefreshIcon/>
                </Button>
                <Button variant="fab" className={classes.fab} color={'primary'} onClick={this.handleClickOpen('paper')}>
                    <FilterIcon/>
                </Button>
                <ReportFilterDialog open={this.state.open}
                                    handleClose={this.handleClose}
                                    projects={this.state.projects}
                                    selectedprojects={this.state.selectedProjects}
                                    currentMode={currentMode}
                                    aria-labelledby="scroll-dialog-title"/>
            </form>
        );
    }
}

ReportContainer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ReportContainer);


/*<ChipsArray projects={projects} currentMode={currentMode}
                               onProjectsChanged={this.updateSelectedProjects}/>
                   <Button variant="outlined" color="primary" className={classes.button}
                           onClick={() => this.setState({currentMode: "PP"})}>
                       Внешние проекты
                   </Button>
                   <Button variant="outlined" color="primary" className={classes.button}
                           onClick={() => this.setState({currentMode: "notPP"})}>
                       Внутренние проекты
                   </Button>
                   <Button variant="outlined" color="primary" className={classes.button}
                           onClick={() => this.setState({currentMode: "LIC"})}>
                       Лицензирование
                   </Button>
                   <Button variant="outlined" color="primary" className={classes.button}
                           onClick={() => this.setState({currentMode: "ALL"})}>
                       Все проекты
                   </Button>
                   <Button variant="outlined" color="primary" className={classes.button}
                           onClick={() => this.setState({currentMode: "NONE"})}>
                       Снять отметку
                   </Button>
                   <TextField
                       variant="outlined"
                       id="date"
                       label="Date from"
                       type="date"
                       defaultValue={moment().subtract(9, 'weeks').format('YYYY-MM-DD')}
                       onChange={field => this.setState({dateFrom: field.target.value})}
                       className={classes.textField}
                       InputLabelProps={{shrink: true,}}
                   />
                   <TextField
                       variant="outlined"
                       id="date"
                       label="Date to"
                       type="date"
                       defaultValue={moment().format('YYYY-MM-DD')}
                       onChange={field => this.setState({dateTo: field.target.value})}
                       className={classes.textField}
                       InputLabelProps={{shrink: true,}}
                   />*/