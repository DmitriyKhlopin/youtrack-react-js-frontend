import {ResponsiveContainer} from "recharts";
import React from "react";

export function ChartContainerWide(props) {
    return (
        <div style={{width: 'calc(100% - 32px)', padding: '8px',}}>
            <ResponsiveContainer aspect={4.0}>
                {props.children}
            </ResponsiveContainer>
        </div>
    )
}

export function ChartContainerHalf(props) {
    return (
        <div style={{width: 'calc(50% - 24px)', padding: '8px',}}>
            <ResponsiveContainer aspect={4.0}>
                {props.children}
            </ResponsiveContainer>
        </div>
    )
}
