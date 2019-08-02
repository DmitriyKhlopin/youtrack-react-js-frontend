import React from 'react';
import 'react-table/react-table.css'
import './App.css';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import {createBrowserHistory} from 'history';
import ListItemIcon from "../node_modules/@material-ui/core/ListItemIcon/ListItemIcon";
import ListItemText from "../node_modules/@material-ui/core/ListItemText/ListItemText";
import ListItem from "../node_modules/@material-ui/core/ListItem/ListItem";
import {Link, Route, Router, Switch} from "react-router-dom";
import connect from "react-redux/es/connect/connect";
import {closeMainDialog, openMainDialog, toggleAppBar} from "./redux/actions/appBarActions";
import HelpDialog from "./components/HelpDialog";
import {PAGES} from "./Const";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import store from "./redux/store";
import AccountCircle from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Help';
import clsx from 'clsx';

export const history = createBrowserHistory();

const drawerWidth = 300;
const useStyles = makeStyles(theme => ({
    root: {
        minHeight: '100vh',
        maxHeight: '100vh',
        maxWidth: '100vw',
        height: '100%',
        zIndex: 1,
        padding: 0,
        position: 'relative',
        display: 'flex',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: '0 8px',
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: 0,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: drawerWidth,
    },
    grow: {
        flexGrow: 1,
    },
}));


function App({appBarState}) {
    const classes = useStyles();
    const theme = useTheme();

    const handleClose = () => {
        store.dispatch(closeMainDialog());
    };

    const handleClickOpenMainDialog = () => {
        store.dispatch(openMainDialog());
    };

    const toggle = () => {
        store.dispatch(toggleAppBar())
    };

    return (
        <Router history={history}>
            <div className={classes.root}>
                <AppBar
                    position="fixed"
                    className={clsx(classes.appBar, {[classes.appBarShift]: appBarState.drawerOpened})}>
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="Open drawer"
                            edge="start"
                            onClick={toggle}
                            className={clsx(classes.menuButton, appBarState.drawerOpened && classes.hide)}>
                            <MenuIcon/>
                        </IconButton>
                        <Typography className={classes.title} variant="h6" color="inherit" noWrap>
                            {appBarState.currentPage === null ? 'Default' : appBarState.currentPage.name}
                        </Typography>
                        <div>
                            <IconButton color="inherit" onClick={handleClickOpenMainDialog}>
                                <NotificationsIcon/>
                            </IconButton>
                        </div>
                        <div className={classes.grow}/>
                        {appBarState.currentPage && appBarState.currentPage.appBarActions ? appBarState.currentPage.appBarActions :
                            <div/>}
                        <IconButton className={classes.menuButton} color="inherit" component={Link} to="/login">
                            <AccountCircle/>
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Drawer
                    variant="persistent"
                    anchor="left"
                    classes={{paper: classes.drawerPaper}}
                    open={appBarState.drawerOpened}>
                    <div className={classes.drawerHeader}>
                        <IconButton onClick={toggle}>
                            {theme.direction === 'ltr' ? <ChevronLeftIcon/> : <ChevronRightIcon/>}
                        </IconButton>
                    </div>
                    <Divider/>
                    <div>
                        {PAGES.filter((item) => item.availableInDrawer === true).map((item, index) => <ListItem
                            key={`key-drawer-${index}`}
                            style={{paddingLeft: 24}} component={Link} to={item.path}
                            selected={appBarState.selectedId === item.id}>
                            <ListItemIcon>
                                <MenuIcon/>
                            </ListItemIcon>
                            <ListItemText primary={item.name}/>
                        </ListItem>)}
                    </div>
                    <Divider/>
                </Drawer>
                <main className={clsx(classes.content, {
                    [classes.contentShift]: appBarState.drawerOpened,
                })}>
                    <div className={classes.drawerHeader}/>
                    <Switch>
                        {PAGES.map((item, index) =>
                            <Route exact path={item.path}
                                   component={item.component}
                                   key={`key-route-${index}`}/>
                        )}
                    </Switch>
                </main>
                <HelpDialog open={appBarState.dialogOpened}
                            handleClose={handleClose}
                            aria-labelledby="scroll-dialog-title"/>
            </div>
        </Router>
    );
}

function mapStateToProps(state) {
    return {
        appBarState: state.appBarState,
    }
}

export default connect(mapStateToProps, null)(App);
