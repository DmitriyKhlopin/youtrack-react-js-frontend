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
import MuiThemeProvider from "@material-ui/styles/ThemeProvider";
import createBrowserHistory from 'history/createBrowserHistory'
import ListItemIcon from "../node_modules/@material-ui/core/ListItemIcon/ListItemIcon";
import ListItemText from "../node_modules/@material-ui/core/ListItemText/ListItemText";
import ListItem from "../node_modules/@material-ui/core/ListItem/ListItem";
import {Link, Route, Router, Switch} from "react-router-dom";
import MainAppBar from "./components/MainAppBar";
import connect from "react-redux/es/connect/connect";
import store from "./redux/store";
import {closeMainDialog, toggleAppBar} from "./redux/actions/appBarActions";
import HelpDialog from "./components/HelpDialog";
import {PAGES} from "./Const";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import blue from '@material-ui/core/colors/blue';

export const history = createBrowserHistory();
const theme = createMuiTheme({
    palette: {
        primary: blue,
    },
    typography: {
        useNextVariants: true,
    },
});
class App extends React.Component {
    handleClose = () => {
        store.dispatch(closeMainDialog());
    };

    render() {
        const {classes} = this.props;
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
                                {PAGES.filter((item) => item.availableInDrawer === true).map((item, index) => <ListItem
                                    key={`key-drawer-${index}`}
                                    style={{paddingLeft: 24}} component={Link} to={item.path}
                                    selected={this.props.appBarState.selectedId === item.id}>
                                    <ListItemIcon>
                                        <MenuIcon/>
                                    </ListItemIcon>
                                    <ListItemText primary={item.name}/>
                                </ListItem>)}

                            </div>
                        </Drawer>
                        <main className={classes.content}>
                            <Switch>
                                {PAGES.map((item, index) =>
                                    <Route exact path={item.path}
                                           component={item.component}
                                           key={`key-route-${index}`}/>
                                )}
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
