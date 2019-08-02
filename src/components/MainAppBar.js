import React, {Component} from "react";
import * as PropTypes from "prop-types";
import connect from "react-redux/es/connect/connect";
import classNames from "classnames";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "../../node_modules/@material-ui/icons/Menu";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import store from "../redux/store";
import {openMainDialog, toggleAppBar} from "../redux/actions/appBarActions";
import AccountCircle from '@material-ui/icons/AccountCircle';
import {Link} from "react-router-dom";
import NotificationsIcon from '@material-ui/icons/Help';

class MainAppBar extends Component {
    handleClickOpenMainDialog = () => {
        store.dispatch(openMainDialog());
    };

    render() {
        const {classes} = this.props;
        return (<AppBar
                position="fixed"
                className={classNames(classes.appBar)}>
                <Toolbar disableGutters={true}>
                    <IconButton
                        color="inherit"
                        aria-label="Open drawer"
                        onClick={() => store.dispatch(toggleAppBar())}
                        className={classNames(classes.menuButton)}>
                        <MenuIcon/>
                    </IconButton>
                    <Typography className={classes.title} variant="h6" color="inherit" noWrap>
                        {this.props.appBarState.currentPage === null ? 'Default' : this.props.appBarState.currentPage.name}
                    </Typography>
                    <div>
                        <IconButton color="inherit" onClick={this.handleClickOpenMainDialog}>
                            <NotificationsIcon/>
                        </IconButton>
                    </div>
                    <div className={classes.grow}/>
                    {this.props.appBarState.currentPage && this.props.appBarState.currentPage.appBarActions ? this.props.appBarState.currentPage.appBarActions :
                        <div/>}
                    <IconButton className={classes.menuButton} color="inherit" component={Link} to="/login">
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

export default connect(mapStateToProps, null)(MainAppBar);
