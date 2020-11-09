import {dynamicSort} from "./helper_functions/sorting";
import {Line} from "recharts";
import {MATERIAL_LINE_CHART_COLORS} from "./Const";
import React from "react";
import {format} from "date-fns";

export const groupBy = function (arr, criteria) {
    return arr.reduce(function (obj, item) {

        // Check if the criteria is a function to run on the item or a property of it
        const key = typeof criteria === 'function' ? criteria(item) : item[criteria];

        // If the key doesn't exist yet, create it
        if (!obj.hasOwnProperty(key)) {
            obj[key] = [];
        }

        // Push the value to the object
        obj[key].push(item);

        // Return the object to the next item in the loop
        return obj;

    }, {});
};

export const customSort = (a, b) => a > b ? 1 : -1;



export function customMap(data, property) {
    return data.map((item) => {
        return {'indicator': item.agent, 'agent': item[property]}
    }).sort(dynamicSort('-agent'));
}

Array.prototype.sum = function (prop) {
    var total = 0
    for ( var i = 0, _len = this.length; i < _len; i++ ) {
        total += this[i][prop]
    }
    return total
}


export function line(index, name, dataKey) {
    return <Line type="monotone" dataKey={dataKey} stroke={MATERIAL_LINE_CHART_COLORS[index]} name={name} strokeWidth={3} isAnimationActive={false}/>
}

export function formatXAxis(tickItem) {
// If using moment.js
    return format(tickItem, 'yyyy.MM.dd');
}
