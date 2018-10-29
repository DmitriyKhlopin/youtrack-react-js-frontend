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
import {TimeAccountingDisplay} from "./components/TimeAccountingDisplay";
import ETLDisplay from "./components/ETLDisplay";
import ReportContainer from "./components/ReportContainer";
import ListItemIcon from "../node_modules/@material-ui/core/ListItemIcon/ListItemIcon";
import ListItemText from "../node_modules/@material-ui/core/ListItemText/ListItemText";
import ListItem from "../node_modules/@material-ui/core/ListItem/ListItem";
import {Link, Route, Router, Switch} from "react-router-dom";
import MainAppBar from "./components/MainAppBar";
import connect from "react-redux/es/connect/connect";
import store from "./redux/store";
import {toggleAppBar} from "./redux/actions/appBarActions";
import LicenseRequest from "./components/LicenseRequest";
import AuthDisplay from "./components/AuthDisplay";

export const history = createBrowserHistory();

class App extends React.Component {
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
                                <ListItem component={Link} to="/" selected={this.props.appBarState.selectedId === 0}>
                                    <ListItemIcon>
                                        <MenuIcon/>
                                    </ListItemIcon>
                                    <ListItemText primary={'Отчёты'}/>
                                </ListItem>
                                <ListItem component={Link} to="/time_accounting"
                                          selected={this.props.appBarState.selectedId === 1}>
                                    <ListItemIcon>
                                        <MenuIcon/>
                                    </ListItemIcon>
                                    <ListItemText primary={'Трудозатраты'}/>
                                </ListItem>
                                <ListItem component={Link} to="/etl" selected={this.props.appBarState.selectedId === 2}>
                                    <ListItemIcon>
                                        <MenuIcon/>
                                    </ListItemIcon>
                                    <ListItemText primary={'ETL'}/>
                                </ListItem>
                                <ListItem component={Link} to="/issues"
                                          selected={this.props.appBarState.selectedId === 3}>
                                    <ListItemIcon>
                                        <MenuIcon/>
                                    </ListItemIcon>
                                    <ListItemText primary={'Запросы'}/>
                                </ListItem>
                                <ListItem component={Link} to="/license"
                                          selected={this.props.appBarState.selectedId === 4}>
                                    <ListItemIcon>
                                        <MenuIcon/>
                                    </ListItemIcon>
                                    <ListItemText primary={'Получить лицензию'}/>
                                </ListItem>
                            </div>
                        </Drawer>
                        <main className={classes.content}>
                            <Switch>
                                <Route exact path='/' component={ReportContainer}/>
                                <Route exact path='/time_accounting' component={TimeAccountingDisplay}/>
                                <Route exact path='/etl' component={ETLDisplay}/>
                                <Route exact path='/issues' component={IssuesDisplay}/>
                                <Route exact path='/license' component={LicenseRequest}/>
                                <Route exact path='/login' component={AuthDisplay}/>
                            </Switch>
                        </main>
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