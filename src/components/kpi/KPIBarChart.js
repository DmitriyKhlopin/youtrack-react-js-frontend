import {Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis} from "recharts";
import {MATERIAL_COLORS} from "../../Const";
import React from "react";
import ResponsiveContainer from "recharts/lib/component/ResponsiveContainer";

export function KPIBarChart({aspect, settings, data}) {
    return (
        <ResponsiveContainer width='100%' aspect={aspect}>
            <BarChart data={data}>
                <CartesianGrid strokeDasharray='3 3'/>
                <XAxis dataKey={settings.dataKey}/>
                {settings.y.left && <YAxis yAxisId={settings.y.left.id} orientation={settings.y.left.orientation} stroke={settings.y.left.stroke}/>}
                {settings.y.right && <YAxis yAxisId={settings.y.right.id} orientation={settings.y.right.orientation} stroke={settings.y.right.stroke}/>}
                <Tooltip/>
                <Legend/>
                {settings.bars.map((item, index) =>
                    <Bar key={`bar-test-${index}`}
                         yAxisId={item.yAxisId}
                         name={item.name}
                         dataKey={item.dataKey}
                         fill={MATERIAL_COLORS[index + settings.paletteOffset]}
                         legendType={item.legendType}
                         stroke={settings.y[item.yAxisId].stroke}
                         strokeWidth={settings.y[item.yAxisId].strokeWidth}/>)}
            </BarChart>
        </ResponsiveContainer>)
}