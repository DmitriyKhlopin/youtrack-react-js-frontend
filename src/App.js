import React from 'react';
import 'react-table/react-table.css'
import './App.css';
import classNames from 'classnames';
import {withStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import * as PropTypes from "prop-types";
import {styles} from "./Styles";
import {MainContainer} from "./components/MainContainer";
import {NAV_ITEMS} from "./Const";
import {AbstractListItem} from "./components/navigation/AbstractListItem";


class App extends React.Component {
    constructor(props) {
        super(props);
        this.handleNavItemClick = this.handleNavItemClick.bind(this);
        this.state = {
            open: true,
            activeNav: 0
        };
    }


    handleDrawerOpen = () => {
        this.setState({open: true});
    };

    handleDrawerClose = () => {
        this.setState({open: false});
    };

    handleNavItemClick(id) {
        this.setState({activeNav: id});
    }

    render() {
        const {classes, theme} = this.props;
        const activeNav = this.state.activeNav;
        return (
            <div className={classes.root}>
                <AppBar
                    position="absolute"
                    className={classNames(classes.appBar, this.state.open && classes.appBarShift)}
                >
                    <Toolbar disableGutters={!this.state.open}>
                        <IconButton
                            color="inherit"
                            aria-label="Open drawer"
                            onClick={this.handleDrawerOpen}
                            className={classNames(classes.menuButton, this.state.open && classes.hide)}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Typography className={classes.title} variant="title" color="inherit" noWrap>
                            {/*Центр технической поддержки*/}
                            {NAV_ITEMS[activeNav].name}
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer
                    variant="permanent"
                    classes={{
                        paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
                    }}
                    open={this.state.open}>
                    <div className={classes.toolbar}>
                        <IconButton onClick={this.handleDrawerClose}>
                            {theme.direction === 'rtl' ? <ChevronRightIcon/> : <ChevronLeftIcon/>}
                        </IconButton>
                    </div>
                    <Divider/>
                    {NAV_ITEMS.map((item, index) => (
                        <AbstractListItem key={index} id={item.id} title={item.name}
                                          onItemClick={this.handleNavItemClick}/>
                    ))}
                </Drawer>
                <main className={classes.content}>
                    <div className={classes.toolbar}/>
                    <MainContainer id={activeNav}
                                   key={activeNav}/>
                </main>
            </div>
        );
    }
}

App.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, {withTheme: true})(App);