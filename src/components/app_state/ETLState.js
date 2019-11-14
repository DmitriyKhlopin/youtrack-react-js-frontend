import React, {useEffect, useState} from "react";

import {Stomp} from '@stomp/stompjs';
import SockJS from 'sockjs-client';

export function ETLState() {
    const [connected, setConnected] = useState(false);
    const [result, setResult] = useState(null);

    function c() {
        const socket = new SockJS("http://localhost:8080/handler");
        const stompClient = Stomp.over(socket);
        stompClient.connect({}, function (frame) {
            setConnected(true);
            stompClient.subscribe('/topic/all', notification => {
                setResult(notification.toString());
                console.log(notification);

            })
        }, function (err) {
            console.log('err', err);
        });
    }

    const sendMessage = () => {
        try {
            console.log('sending message');

            return true;
        } catch (e) {
            console.log(e);
            return false;
        }
    };
    useEffect(() => c(), []);

    return (<div>
        <div>Connected = {connected.toString()} {result}</div>
        <div onClick={() => sendMessage()}>Click me</div>
    </div>)
}