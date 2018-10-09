import React, {Component} from "react";
import {CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis} from 'recharts'
import {drawerWidth} from "../Const";
import moment from "moment";
import ChipsArray from "./ChipArray";
import Button from "../../node_modules/@material-ui/core/Button/Button";
import * as PropTypes from "prop-types";
import withStyles from "../../node_modules/@material-ui/core/styles/withStyles";
import Paper from "@material-ui/core/Paper";
import TextField from "../../node_modules/@material-ui/core/TextField/TextField";

const styles = theme => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        padding: theme.spacing.unit / 2,
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
    }
});

class ReportDisplay extends Component {
    constructor(props) {
        super(props);
        this.updateSelectedProjects = this.updateSelectedProjects.bind(this);
        this.state = {
            projects: [],
            selectedProjects: [],
            items: null,
            isLoading: false,
            etlState: null,
            dateFrom: moment().subtract(9, 'weeks').format('YYYY-MM-DD'),
            dateTo: moment().format('YYYY-MM-DD'),
            currentMode: "PP"
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
    };

    updateSelectedProjects(projects) {
        const p = projects.map(item => item.shortName);
        this.setState({selectedProjects: p});
    };

    render() {
        const {classes} = this.props;
        const {items, projects, currentMode} = this.state;
        return (
            <form className={classes.container} noValidate autoComplete="off">
                <Paper className={classes.root}>
                    <ChipsArray projects={projects} currentMode={currentMode}
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
                    />
                    <Button variant="outlined" color="primary" className={classes.button}
                            onClick={this.loadData}>
                        Загрузить данные
                    </Button>
                </Paper>
                <LineChart width={window.innerWidth - drawerWidth} height={600} data={items}
                           margin={{top: 30, right: 60, left: 30, bottom: 30}}>
                    <XAxis dataKey="week"/>
                    <YAxis axisLine={false}/>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <Tooltip/>
                    <Legend/>
                    <Line type="monotone" dataKey="active" stroke="#1E88E5"/>
                    <Line type="monotone" dataKey="created" stroke="#FDD835"/>
                    <Line type="monotone" dataKey="resolved" stroke="#43A047"/>
                </LineChart>
            </form>
        );
    }
}

ReportDisplay.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ReportDisplay);
