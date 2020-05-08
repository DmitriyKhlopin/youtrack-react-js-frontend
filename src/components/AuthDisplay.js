import React, {Component} from "react";
import connect from "react-redux/es/connect/connect";
import styles from "../styles/components.module.css"

const clientServiceId = '64cf7005-df32-4ca1-8d05-41791683275c';
const redirectUrl = 'http://localhost:3000/login';

class AuthDisplay extends Component {
    render() {
        const a = decodeURIComponent(this.props.location.hash);
        console.log(a);
        const s = a.substring('#access_token='.length, a.indexOf('&token_type='));
        console.log(s);
        return <div style={{display: 'flex', height: '80%'}}>
            <div style={{margin: 'auto', padding: 16, maxWidth: 256, alignSelf: 'center'}}>
                <a href={'https://support.fsight.ru/hub/api/rest/oauth2/auth?response_type=token&state=' + clientServiceId + '&redirect_uri=' + redirectUrl + '&request_credentials=default&client_id=' + clientServiceId + '&scope=' + clientServiceId}>
                    <button className={styles.button}>Sign in via YouTrack</button>
                </a>
            </div>
        </div>
    }
}

function mapStateToProps(state) {
    return {
        appBarState: state.appBarState,
        user: state.user
    }
}

export default connect(mapStateToProps, null)(AuthDisplay);