import React from 'react';
import './App.css';
import IconButton from '@material-ui/core/IconButton';
import {createBrowserHistory} from 'history';
import {BrowserRouter, NavLink, Route, Router, Switch} from "react-router-dom";
import connect from "react-redux/es/connect/connect";
import {closeMainDialog, openMainDialog, toggleAppBar} from "./redux/actions/appBarActions";
import HelpDialog from "./components/HelpDialog";
import {PAGES} from "./Const";
import {store} from "./redux/store";
import AccountCircle from '@material-ui/icons/AccountCircle';
import styles from "./styles/components.module.css";
import cx from 'classnames';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars, faQuestionCircle} from '@fortawesome/free-solid-svg-icons'


export const history = createBrowserHistory();


/*
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
        overflow: 'visible\!important',
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
*/


function App({appBarState}) {


    const handleClose = () => {
        store.dispatch(closeMainDialog());
    };

    const handleClickOpenMainDialog = () => {
        store.dispatch(openMainDialog());
    };

    const toggle = () => {
        store.dispatch(toggleAppBar())
    };
    console.log(appBarState.currentPage);

    const hamburger = <FontAwesomeIcon
        icon={faBars}
        className={styles.button}
        onClick={toggle} size={'2x'}
    />;

    const infoButton = <FontAwesomeIcon
        icon={faQuestionCircle}
        className={styles.button}
        onClick={handleClickOpenMainDialog} size={'1x'}
    />;


    return (
        <BrowserRouter history={history}>

                <div className={styles.navBar}>
                    {hamburger}
                    <span className={styles.title} color="inherit">
                        {appBarState.currentPage === null ? 'Default' : appBarState.currentPage.name}
                    </span>
                    {infoButton}
                    <div className={styles.expand}/>
                    {appBarState.currentPage && appBarState.currentPage.appBarActions ? PAGES[appBarState.currentPage.id].appBarActions :
                        <div/>}
                    <IconButton /*className={classes.menuButton}*/ color="inherit" component={NavLink} to="/login">
                        <AccountCircle/>
                    </IconButton>
                </div>
                <div className={styles.row}>
                    {appBarState.drawerOpened
                        ? <div style={{display: 'flex', flexDirection: 'column', minWidth: `${appBarState.drawerOpened ? '240px' : '0px'}`}}>
                            {PAGES.filter((item) => item.availableInDrawer === true).map((item, index) =>
                                <NavLink key={`key-drawer-${index}`} exact to={item.path} className={styles.sidebarItem} activeClassName={styles.sidebarItemActive}>
                                    {item.icon && <FontAwesomeIcon icon={item.icon} size={'1x'} style={{margin: '0.5rem'}}/>} <span>{item.name}</span>
                                </NavLink>)}
                        </div>
                        : null}
                    <div style={{display: 'flex', flexDirection: 'column', flex: 1}}>
                        <Switch>
                            {PAGES.map((item, index) =>
                                <Route exact path={item.path} component={item.component} key={`key-route-${index}`}/>
                            )}
                        </Switch>
                    </div>
                    <HelpDialog open={appBarState.dialogOpened}
                                handleClose={handleClose}
                                aria-labelledby="scroll-dialog-title"/>
                </div>


        </BrowserRouter>
    );
}

function mapStateToProps(state) {
    return {
        appBarState: state.appBarState,
    }
}

export default connect(mapStateToProps, null)(App);
