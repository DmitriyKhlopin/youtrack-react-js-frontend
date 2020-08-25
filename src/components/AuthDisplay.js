import React, {useCallback} from "react";
import qs from "query-string";

const clientServiceId = '64cf7005-df32-4ca1-8d05-41791683275c';
const redirectUrl = 'http://localhost:3000/login';

const AuthDisplay = ({location}) => {
    const parsed = qs.parse(location.hash);
    let token;
    if (parsed.access_token) {
        token = parsed.access_token;
        const obj = {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'authorization': `Bearer ${token}`,
                    'scope': clientServiceId
                }
            }
        ;
        fetch("https://support.fsight.ru/hub/api/rest/users/me", obj)
            .then(res => res.json())
            .then(json => console.log(json))
    }

    const handleLogin = useCallback(async () => {
        const qParams = [
            `response_type=token`,
            `redirect_uri=${redirectUrl}`,
            `client_id=${clientServiceId}`,
            `scope=${clientServiceId}`,
            `state=youtrack`,
            `request_credentials=default`
        ].join("&");
        try {
            window.location.assign(`https://support.fsight.ru/hub/api/rest/oauth2/auth?${qParams}`);
        } catch (e) {
            console.error(e);
        }

    }, []);

    return <div>
        <button onClick={handleLogin}>Login with YouTrack</button>
    </div>

}

export default AuthDisplay;