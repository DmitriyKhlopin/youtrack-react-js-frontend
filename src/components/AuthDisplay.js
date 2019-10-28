import React, {Component} from "react";
import * as PropTypes from "prop-types";
import withStyles from "../../node_modules/@material-ui/core/styles/withStyles";
import {styles} from "../Styles";
import {store} from "../redux/store";
import {setSelectedNavItem} from "../redux/actions/appBarActions";
import connect from "react-redux/es/connect/connect";
import FormControl from "../../node_modules/@material-ui/core/FormControl/FormControl";
import InputLabel from "../../node_modules/@material-ui/core/InputLabel/InputLabel";
import Input from "../../node_modules/@material-ui/core/Input/Input";
import InputAdornment from "../../node_modules/@material-ui/core/InputAdornment/InputAdornment";
import IconButton from "../../node_modules/@material-ui/core/IconButton/IconButton";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Paper from "../../node_modules/@material-ui/core/Paper/Paper";
import Button from "../../node_modules/@material-ui/core/Button/Button";
import {fetchToken, setUserLogin, setUserPassword} from "../redux/actions/userActions";
import {PAGES} from "../Const";

const clientServiceId = '95dc00cf-e9da-479d-84ea-fbe73f4652a5';
const redirectUrl = 'http://10.9.172.76:3000/login';

class AuthDisplay extends Component {
    state = {
        user: '',
        password: '',
        showPassword: false,
    };

    handleClickShowPassword = () => {
        this.setState(state => ({showPassword: !state.showPassword}));
    };

    componentWillMount() {
        store.dispatch(setSelectedNavItem(PAGES.filter((page) => page.path === this.props.location.pathname)[0]));
    }

    render() {
        const a = decodeURIComponent(this.props.location.hash);
        console.log(a);
        const s = a.substring('#access_token='.length, a.indexOf('&token_type='));
        console.log(s);
        console.log(this.state);
        return <div style={{display: 'flex', height: '80%'}}>
            <Paper style={{margin: 'auto', padding: 16, maxWidth: 256, alignSelf: 'center'}}>
                <a href={'https://support.fsight.ru/hub/api/rest/oauth2/auth?response_type=token&state=' + clientServiceId + '&redirect_uri=' + redirectUrl + '&request_credentials=default&client_id=' + clientServiceId + '&scope=' + clientServiceId}>
                    <Button style={{width: '100%'}} variant="contained">Sign in via YouTrack</Button>
                </a>
            </Paper>
        </div>
    }
}

AuthDisplay.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        appBarState: state.appBarState,
        user: state.user
    }
}

export default withStyles(styles, {withTheme: true})(connect(mapStateToProps, null)(AuthDisplay));
