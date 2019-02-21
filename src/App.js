import React from 'react';
import 'react-table/react-table.css'
import './App.css';
import classNames from 'classnames';
import {withStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import * as PropTypes from "prop-types";
import {styles} from "./Styles";
import MuiThemeProvider from "../node_modules/@material-ui/core/styles/MuiThemeProvider";
import createBrowserHistory from 'history/createBrowserHistory'
import IssuesDisplay from "./components/IssuesDisplay";
import TimeAccountingDisplay from "./components/TimeAccountingDisplay";
import ETLDisplay from "./components/ETLDisplay";
import ReportContainer from "./components/ReportContainer";
import ListItemIcon from "../node_modules/@material-ui/core/ListItemIcon/ListItemIcon";
import ListItemText from "../node_modules/@material-ui/core/ListItemText/ListItemText";
import ListItem from "../node_modules/@material-ui/core/ListItem/ListItem";
import {Link, Route, Router, Switch} from "react-router-dom";
import MainAppBar from "./components/MainAppBar";
import connect from "react-redux/es/connect/connect";
import store from "./redux/store";
import {closeMainDialog, toggleAppBar} from "./redux/actions/appBarActions";
import LicenseRequest from "./components/LicenseRequest";
import AuthDisplay from "./components/AuthDisplay";
import HelpDialog from "./components/HelpDialog";
import AccountedTimeDisplay from "./components/AccountedTimeDisplay";
import PossibleErrorsDisplay from "./components/PossibleErrorsDisplay";
import {PAGE_IDS} from "./Const";
import KPIContainer from "./components/KPIContainer";
import RepositoriesDisplay from "./components/RepositoriesDisplay";
import FixedDefectsDisplay from "./components/FixedDefectsDisplay";
import DurationDisplay from "./components/DurationDisplay";

export const history = createBrowserHistory();

class App extends React.Component {
    handleClose = () => {
        store.dispatch(closeMainDialog());
    };

    render() {
        const {classes, theme} = this.props;
        return (
            <Router history={history}>
                <MuiThemeProvider theme={theme}>
                    <div className={classes.root}>
                        <MainAppBar/>
                        <Drawer
                            variant="permanent"
                            classes={{
                                paper: classNames(classes.drawerPaper, !this.props.appBarState.drawerOpened && classes.drawerPaperClose),
                            }}
                            open={this.props.appBarState.drawerOpened}>
                            <div className={classes.toolbar}>
                                <IconButton onClick={() => store.dispatch(toggleAppBar())}>
                                    {theme.direction === 'rtl' ? <ChevronRightIcon/> : <ChevronLeftIcon/>}
                                </IconButton>
                            </div>
                            <Divider/>
                            <div>
                                <ListItem style={{paddingLeft: 24}} component={Link} to="/"
                                          selected={this.props.appBarState.selectedId === 0}>
                                    <ListItemIcon>
                                        <MenuIcon/>
                                    </ListItemIcon>
                                    <ListItemText primary={'Отчёты'}/>
                                </ListItem>
                                <ListItem style={{paddingLeft: 24}} component={Link} to="/kpi"
                                          selected={this.props.appBarState.selectedId === PAGE_IDS.kpi.id}>
                                    <ListItemIcon>
                                        <MenuIcon/>
                                    </ListItemIcon>
                                    <ListItemText primary={PAGE_IDS.kpi.name}/>
                                </ListItem>
                                <ListItem style={{paddingLeft: 24}} component={Link} to="/accounted_time"
                                          selected={this.props.appBarState.selectedId === 6}>
                                    <ListItemIcon>
                                        <MenuIcon/>
                                    </ListItemIcon>
                                    <ListItemText primary={'Отработанное время'}/>
                                </ListItem>
                                <ListItem style={{paddingLeft: 24}} component={Link} to="/time_accounting"
                                          selected={this.props.appBarState.selectedId === 1}>
                                    <ListItemIcon>
                                        <MenuIcon/>
                                    </ListItemIcon>
                                    <ListItemText primary={'Трудозатраты'}/>
                                </ListItem>
                                <ListItem style={{paddingLeft: 24}} component={Link} to="/etl"
                                          selected={this.props.appBarState.selectedId === 2}>
                                    <ListItemIcon>
                                        <MenuIcon/>
                                    </ListItemIcon>
                                    <ListItemText primary={'ETL'}/>
                                </ListItem>
                                <ListItem style={{paddingLeft: 24}} component={Link} to="/issues"
                                          selected={this.props.appBarState.selectedId === 3}>
                                    <ListItemIcon>
                                        <MenuIcon/>
                                    </ListItemIcon>
                                    <ListItemText primary={'Запросы'}/>
                                </ListItem>
                                <ListItem style={{paddingLeft: 24}} component={Link} to="/license"
                                          selected={this.props.appBarState.selectedId === 4}>
                                    <ListItemIcon>
                                        <MenuIcon/>
                                    </ListItemIcon>
                                    <ListItemText primary={'Получить лицензию'}/>
                                </ListItem>
                                <ListItem style={{paddingLeft: 24}} component={Link} to="/possible_errors"
                                          selected={this.props.appBarState.selectedId === PAGE_IDS.possibleErrors.id}>
                                    <ListItemIcon>
                                        <MenuIcon/>
                                    </ListItemIcon>
                                    <ListItemText primary={PAGE_IDS.possibleErrors.name}/>
                                </ListItem>
                                <ListItem style={{paddingLeft: 24}} component={Link} to="/repositories"
                                          selected={this.props.appBarState.selectedId === PAGE_IDS.repositories.id}>
                                    <ListItemIcon>
                                        <MenuIcon/>
                                    </ListItemIcon>
                                    <ListItemText primary={PAGE_IDS.repositories.name}/>
                                </ListItem>
                                <ListItem style={{paddingLeft: 24}} component={Link} to="/fixed_defects"
                                          selected={this.props.appBarState.selectedId === PAGE_IDS.fixedDefects.id}>
                                    <ListItemIcon>
                                        <MenuIcon/>
                                    </ListItemIcon>
                                    <ListItemText primary={PAGE_IDS.fixedDefects.name}/>
                                </ListItem>
                                <ListItem style={{paddingLeft: 24}} component={Link} to="/duration"
                                          selected={this.props.appBarState.selectedId === PAGE_IDS.duration.id}>
                                    <ListItemIcon>
                                        <MenuIcon/>
                                    </ListItemIcon>
                                    <ListItemText primary={PAGE_IDS.duration.name}/>
                                </ListItem>
                            </div>
                        </Drawer>
                        <main className={classes.content}>
                            <Switch>
                                <Route exact path='/' component={ReportContainer}/>
                                <Route exact path='/index.html' component={ReportContainer}/>
                                <Route exact path='/time_accounting' component={TimeAccountingDisplay}/>
                                <Route exact path='/kpi' component={KPIContainer}/>
                                <Route exact path='/etl' component={ETLDisplay}/>
                                <Route exact path='/issues' component={IssuesDisplay}/>
                                <Route exact path='/license' component={LicenseRequest}/>
                                <Route exact path='/login' component={AuthDisplay}/>
                                <Route exact path='/accounted_time' component={AccountedTimeDisplay}/>
                                <Route exact path='/possible_errors' component={PossibleErrorsDisplay}/>
                                <Route exact path='/repositories' component={RepositoriesDisplay}/>
                                <Route exact path='/fixed_defects' component={FixedDefectsDisplay}/>
                                <Route exact path='/duration' component={DurationDisplay}/>
                            </Switch>
                        </main>
                        <HelpDialog open={this.props.appBarState.dialogOpened}
                                    handleClose={this.handleClose}
                                    aria-labelledby="scroll-dialog-title"/>
                    </div>
                </MuiThemeProvider>
            </Router>
        );
    }
}

App.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        appBarState: state.appBarState,
    }
}

export default withStyles(styles, {withTheme: true})(connect(mapStateToProps, null)(App));
