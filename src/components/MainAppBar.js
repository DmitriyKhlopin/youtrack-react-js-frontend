import React, {Component} from "react";
import * as PropTypes from "prop-types";
import withStyles from "../../node_modules/@material-ui/core/styles/withStyles";
import connect from "react-redux/es/connect/connect";
import classNames from "classnames";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "../../node_modules/@material-ui/icons/Menu";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import {styles} from "../Styles";
import store from "../redux/store";
import {toggleAppBar} from "../redux/actions/appBarActions";
import AccountCircle from '@material-ui/icons/AccountCircle';

class MainAppBar extends Component {
    render() {
        const {classes} = this.props;
        return (<AppBar
                position="fixed"
                className={classNames(classes.appBar, this.props.appBarState.drawerOpened && classes.appBarShift)}>
                <Toolbar disableGutters={!this.props.appBarState.drawerOpened}>
                    <IconButton
                        color="inherit"
                        aria-label="Open drawer"
                        onClick={() => store.dispatch(toggleAppBar())}
                        className={classNames(classes.menuButton, this.props.appBarState.drawerOpened && classes.hide)}>
                        <MenuIcon/>
                    </IconButton>
                    <Typography className={classes.title} variant="title" color="inherit" noWrap>
                        {this.props.appBarState.title}
                    </Typography>
                    <div className={classes.grow}/>
                    <IconButton className={classes.menuButton} onClick={() => console.log('a')} color="inherit">
                        <AccountCircle/>
                    </IconButton>
                </Toolbar>
            </AppBar>
        );
    }
}

MainAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        appBarState: state.appBarState,
    }
}

export default withStyles(styles, {withTheme: true})(connect(mapStateToProps, null)(MainAppBar));