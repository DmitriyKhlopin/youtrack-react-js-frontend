import React, {useEffect} from 'react';
import './App.css';
import {createBrowserHistory} from 'history';
import {BrowserRouter, Link, NavLink, Route, Router, Switch} from "react-router-dom";
import {selectDrawerState, toggleAppBar} from "./redux/combined/appBar";
import {PAGES} from "./Const";
import styles from "./styles/components.module.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars} from '@fortawesome/free-solid-svg-icons'
import {useDispatch, useSelector} from "react-redux";
import BaseDialog from "./components/dialogs/BaseDialog";
import {selectMainDialogState} from "./redux/combined/mainDialog";
import {fetchPartnerCustomers, fetchProjects} from "./redux/combined/dictionaries";


export const history = createBrowserHistory();

function App() {
    const dispatch = useDispatch();
    const drawerOpened = useSelector(selectDrawerState);
    const mainDialogOpened = useSelector(selectMainDialogState);

    useEffect(() => {
        dispatch(fetchProjects())
        dispatch(fetchPartnerCustomers())
    }, [])

    const toggle = () => {
        dispatch(toggleAppBar())
    };

    const hamburger = <FontAwesomeIcon
        icon={faBars}
        className={styles.iconButton}
        onClick={toggle} size={'1x'}
    />;

    return (
        <BrowserRouter history={history} style={{background: mainDialogOpened ? 'grey' : 'white'}}>
            <BaseDialog/>
            <div className={styles.navBar} style={{zIndex: 1}}>
                {hamburger}
                <Switch>
                    {PAGES.map((item, index) => <Route exact path={item.path} component={item.navBar} key={`key-route-help-content-${index}`}/>)}
                </Switch>
                <Link to="/login">Login</Link>
            </div>

            <div className={styles.baseContainer}>
                {drawerOpened
                    ? <div className={styles.drawer}>
                        {PAGES.filter((item) => item.availableInDrawer === true).map((item, index) =>
                            <NavLink key={`key-drawer-${index}`} exact to={item.path} className={styles.sidebarItem} activeClassName={styles.sidebarItemActive}>
                                {item.icon && <FontAwesomeIcon icon={item.icon} size={'1x'} className={styles.sidebarItemIcon}/>} <span>{item.name}</span>
                            </NavLink>)}
                    </div>
                    : null}
                <div className={styles.contentContainer} style={{overflowY: 'visible !important'}}>
                    <Switch>
                        {PAGES.map((item, index) =>
                            <Route exact path={item.path} component={item.component} key={`key-route-${index}`}/>
                        )}
                    </Switch>

                </div>

            </div>

        </BrowserRouter>
    );
}

export default App;
