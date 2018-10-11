import React, {Component} from "react";
import {
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    ReferenceArea,
    ResponsiveContainer,
    Scatter,
    ScatterChart,
    Tooltip,
    XAxis,
    YAxis
} from 'recharts'
import moment from "moment";
import Button from "../../node_modules/@material-ui/core/Button/Button";
import * as PropTypes from "prop-types";
import withStyles from "../../node_modules/@material-ui/core/styles/withStyles";
import FilterIcon from '@material-ui/icons/Settings';
import RefreshIcon from '@material-ui/icons/Refresh';
import ReportFilterDialog from "./ReportFilterDialog";
import Grid from "../../node_modules/@material-ui/core/Grid/Grid";
import {innerProjects} from "../Const";

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
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
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
            sigmaItems: null,
            sigma: 0,
            sigmaMaxX: 0,
            sigmaMaxY: 0,
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
            console.log(json.map(item => item.shortName).filter(item => !innerProjects.includes(item)));
            /*!this.isCancelled &&*/
            this.setState({
                projects: json,
                selectedProjects: json.map(item => item.shortName).filter(item => !innerProjects.includes(item)),
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
            !this.isCancelled && this.setState({items: res});
        }).catch(err => console.log(err));

        const url2 = "http://10.0.172.42:8081/api/chart/sigma?" + "projects=" + projects + "&dateFrom=" + this.state.dateFrom + "&dateTo=" + this.state.dateTo;
        fetch(url2, {
            method: "GET",
            headers: myHeaders
        }).then(res => res.json()).then(json => {
            console.log(json);
            console.log(Math.max(...json.data.map(item => item.day)));
            !this.isCancelled && this.setState({
                sigmaItems: json.data,
                sigma: json.sigma,
                isLoading: false,
                sigmaMaxX: Math.max(...json.data.map(item => item.day)) + 2,
                sigmaMaxY: Math.max(...json.data.map(item => item.count)) + 2,
            });
        })
    };

    updateSelectedProjects(projects) {
        /*const p = projects.map(item => item.shortName);*/
        this.setState({selectedProjects: projects.map(item => item.shortName)});
    };

    render() {
        const {classes} = this.props;
        const {items, currentMode, sigmaItems, sigma, sigmaMaxX, sigmaMaxY} = this.state;
        return (
            <Grid container spacing={24}>
                <Grid item md={12} lg={6}>
                    <ResponsiveContainer width='100%' aspect={4.0 / 2.0}>
                        <LineChart data={items}
                                   margin={{top: 30, right: 60, left: 0, bottom: 30}}>
                            <XAxis dataKey="week"/>
                            <YAxis axisLine={false}/>
                            <CartesianGrid strokeDasharray="3 3"/>
                            <Tooltip/>
                            <Legend/>
                            <Line type="monotone" dataKey="active" stroke="#1E88E5" name="В работе"/>
                            <Line type="monotone" dataKey="created" stroke="#FDD835" name="Создано"/>
                            <Line type="monotone" dataKey="resolved" stroke="#43A047" name="Решено"/>
                        </LineChart>
                    </ResponsiveContainer>
                </Grid>
                {/*<Grid item md={12} lg={6}>
                    <ResponsiveContainer width='100%' aspect={4.0 / 2.0}>
                        <LineChart data={items}
                                   margin={{top: 30, right: 60, left: 0, bottom: 30}}>
                            <XAxis dataKey="week"/>
                            <YAxis axisLine={false}/>
                            <CartesianGrid strokeDasharray="3 3"/>
                            <Tooltip/>
                            <Legend/>
                            <Line type="monotone" dataKey="active" stroke="#1E88E5" name="В работе"/>
                            <Line type="monotone" dataKey="created" stroke="#FDD835" name="Создано"/>
                            <Line type="monotone" dataKey="resolved" stroke="#43A047" name="Решено"/>
                        </LineChart>
                    </ResponsiveContainer>
                </Grid>*/}
                <Grid item md={12} lg={6}>
                    <ResponsiveContainer width='100%' aspect={4.0 / 2.0}>
                        <ScatterChart margin={{top: 30, right: 60, left: 0, bottom: 30}}>
                            <ReferenceArea x1={0} x2={sigma} y1={0} y2={sigmaMaxY}
                                           fill="#A5D6A7" fillOpacity={1.0}/>
                            <ReferenceArea x1={sigma} x2={(sigma * 2 > sigmaMaxX) ? sigmaMaxX : sigma * 2} y1={0}
                                           y2={sigmaMaxY}
                                           fill="#E6EE9C" fillOpacity={1.0}/>
                            <ReferenceArea x1={sigma * 2} x2={sigmaMaxX} y1={0} y2={sigmaMaxY}
                                           fill="#FFAB91" fillOpacity={1.0}/>
                            <XAxis dataKey={'day'} type="number" name='Дни' unit='' domain={[0, sigmaMaxX]} tickSize={4} />
                            <YAxis axisLine={false} dataKey={'count'} type="number" name='Количетство запросов' unit=''
                                   domain={[0, sigmaMaxY]}/>
                            <Scatter name='A school' data={sigmaItems} fill='#8884d8'/>
                            <Tooltip cursor={{strokeDasharray: '4 6'}}/>
                        </ScatterChart>
                    </ResponsiveContainer>
                </Grid>
                <Button variant="fab" className={classes.fabLoad} color={'secondary'} onClick={this.loadData}>
                    <RefreshIcon/>
                </Button>
                <Button variant="fab" className={classes.fab} color={'primary'} onClick={this.handleClickOpen('paper')}>
                    <FilterIcon/>
                </Button>
                <ReportFilterDialog open={this.state.open}
                                    handleClose={this.handleClose}
                                    projects={this.state.projects}
                                    selectedProjects={this.state.selectedProjects}
                                    currentMode={currentMode}
                                    aria-labelledby="scroll-dialog-title"/>
            </Grid>
        );
    }
}

ReportContainer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ReportContainer);