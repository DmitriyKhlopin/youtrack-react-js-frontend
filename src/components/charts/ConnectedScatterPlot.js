import React, {useEffect, useRef, useState} from "react";
import * as d3 from "d3";
import {useSelector} from "react-redux";
import {selectDrawerState} from "../../redux/combined/appBar";
import useWindowDimensions from "../../helper_functions/dimensions";
import VelocityChartByWeeks from "./VelocityChartByWeeks";

const data2 = [
    {orient: "left", name: "1956", x: 3683.6965, y: 2.3829},
    {orient: "right", name: "1957", x: 3722.7648, y: 2.4026},
    {orient: "bottom", name: "1958", x: 3776.8595, y: 2.2539},
    {orient: "top", name: "1959", x: 3912.0962, y: 2.3079},
    {orient: "right", name: "1960", x: 3942.1488, y: 2.2658},
    {orient: "bottom", name: "1961", x: 3984.2224, y: 2.2526},
    {orient: "right", name: "1962", x: 4089.4064, y: 2.2158},
    {orient: "bottom", name: "1963", x: 4230.6536, y: 2.1237},
    {orient: "bottom", name: "1964", x: 4383.9219, y: 2.1039},
    {orient: "bottom", name: "1965", x: 4546.2059, y: 2.1368},
    {orient: "top", name: "1966", x: 4681.4425, y: 2.1421},
    {orient: "bottom", name: "1967", x: 4837.716, y: 2.1408},
    {orient: "right", name: "1968", x: 5048.0841, y: 2.1263},
    {orient: "right", name: "1969", x: 5216.3787, y: 2.0737},
    {orient: "right", name: "1970", x: 5384.6732, y: 2.0118},
    {orient: "bottom", name: "1971", x: 5652.1412, y: 1.9316},
    {orient: "bottom", name: "1972", x: 5979.7145, y: 1.8737},
    {orient: "right", name: "1973", x: 6160.0301, y: 1.9026},
    {orient: "left", name: "1974", x: 5946.6566, y: 2.3447},
    {orient: "bottom", name: "1975", x: 6117.9564, y: 2.3079}
]

/*SA-441*/
const data3 = [
    {orient: 'left', x: 0, name: 'Backlog 1ЛП', y: 26},
    {orient: 'left', x: 4, name: 'В работе 2ЛП', y: 25},
    {orient: 'left', x: 3, name: 'Backlog 2ЛП', y: 24},
    {orient: 'left', x: 6, name: 'Proposed', y: 23},
    {orient: 'left', x: 3, name: 'Backlog 2ЛП', y: 22},
    {orient: 'left', x: 6, name: 'Proposed', y: 21},
    {orient: 'left', x: 3, name: 'Backlog 2ЛП', y: 20},
    {orient: 'left', x: 6, name: 'Proposed', y: 19},
    {orient: 'left', x: 3, name: 'Backlog 2ЛП', y: 18},
    {orient: 'left', x: 8, name: 'Active', y: 17},
    {orient: 'left', x: 3, name: 'Backlog 2ЛП', y: 16},
    {orient: 'left', x: 8, name: 'Active', y: 15},
    {orient: 'left', x: 7, name: 'Backlog', y: 14},
    {orient: 'left', x: 3, name: 'Backlog 2ЛП', y: 13},
    {orient: 'left', x: 4, name: 'В работе 2ЛП', y: 12},
    {orient: 'left', x: 3, name: 'Backlog 2ЛП', y: 11},
    {orient: 'left', x: 7, name: 'Backlog', y: 10},
    {orient: 'left', x: 8, name: 'Active', y: 9},
    {orient: 'left', x: 6, name: 'Proposed', y: 8},
    {orient: 'left', x: 8, name: 'Active', y: 7},
    {orient: 'left', x: 6, name: 'Proposed', y: 6},
    {orient: 'left', x: 8, name: 'Active', y: 5},
    {orient: 'left', x: 11, name: 'Backlog проверки', y: 4},
    {orient: 'left', x: 15, name: 'Ожидает подтверждения', y: 3},
    {orient: 'left', x: 3, name: 'Backlog 2ЛП', y: 2},
    {orient: 'left', x: 15, name: 'Ожидает подтверждения', y: 1},
    {orient: 'left', x: 17, name: 'Подтверждена', y: 0},
]

/*CL-130*/
const d = [
    {orient: 'left', x: 17, name: 'Подтверждена', y: 1},
    {orient: 'left', x: 15, name: 'Ожидает подтверждения', y: 2},
    {orient: 'left', x: 4, name: 'В работе 2ЛП', y: 3},
    {orient: 'left', x: 3, name: 'Backlog 2ЛП', y: 4},
    {orient: 'left', x: 15, name: 'Ожидает подтверждения', y: 5},
    {orient: 'left', x: 7, name: 'Backlog', y: 6},
    {orient: 'left', x: 3, name: 'Backlog 2ЛП', y: 7},
    {orient: 'left', x: 15, name: 'Ожидает подтверждения', y: 8},
    {orient: 'left', x: 4, name: 'В работе 2ЛП', y: 9},
    {orient: 'left', x: 3, name: 'Backlog 2ЛП', y: 10},
    {orient: 'left', x: 4, name: 'В работе 2ЛП', y: 11},
    {orient: 'left', x: 3, name: 'Backlog 2ЛП', y: 12},
    {orient: 'left', x: 15, name: 'Ожидает подтверждения', y: 13},
    {orient: 'left', x: 4, name: 'В работе 2ЛП', y: 14},
    {orient: 'left', x: 3, name: 'Backlog 2ЛП', y: 15},
    {orient: 'left', x: 15, name: 'Ожидает подтверждения', y: 16},
    {orient: 'left', x: 4, name: 'В работе 2ЛП', y: 17},
    {orient: 'left', x: 3, name: 'Backlog 2ЛП', y: 18},
    {orient: 'left', x: 15, name: 'Ожидает подтверждения', y: 19},
    {orient: 'left', x: 4, name: 'В работе 2ЛП', y: 20},
    {orient: 'left', x: 3, name: 'Backlog 2ЛП', y: 21},
    {orient: 'left', x: 4, name: 'В работе 2ЛП', y: 22},
    {orient: 'left', x: 3, name: 'Backlog 2ЛП', y: 23},
    {orient: 'left', x: 15, name: 'Ожидает подтверждения', y: 24},
    {orient: 'left', x: 3, name: 'Backlog 2ЛП', y: 25},
    {orient: 'left', x: 15, name: 'Ожидает подтверждения', y: 26},
    {orient: 'left', x: 4, name: 'В работе 2ЛП', y: 27},
    {orient: 'left', x: 3, name: 'Backlog 2ЛП', y: 28},
    {orient: 'left', x: 15, name: 'Ожидает подтверждения', y: 29},
    {orient: 'left', x: 4, name: 'В работе 2ЛП', y: 30},
    {orient: 'left', x: 3, name: 'Backlog 2ЛП', y: 31},
    {orient: 'left', x: 15, name: 'Ожидает подтверждения', y: 32},
    {orient: 'left', x: 4, name: 'В работе 2ЛП', y: 33},
    {orient: 'left', x: 3, name: 'Backlog 2ЛП', y: 34},
    {orient: 'left', x: 15, name: 'Ожидает подтверждения', y: 35},
    {orient: 'left', x: 4, name: 'В работе 2ЛП', y: 36},
    {orient: 'left', x: 7, name: 'Backlog', y: 37},
    {orient: 'left', x: 3, name: 'Backlog 2ЛП', y: 38},
    {orient: 'left', x: 7, name: 'Backlog', y: 39},
    {orient: 'left', x: 4, name: 'В работе 2ЛП', y: 40},
    {orient: 'left', x: 3, name: 'Backlog 2ЛП', y: 41},
    {orient: 'left', x: 15, name: 'Ожидает подтверждения', y: 42},
    {orient: 'left', x: 4, name: 'В работе 2ЛП', y: 43},
    {orient: 'left', x: 1, name: 'Backlog 1ЛП', y: 44}]

const data = d.reverse()


const ConnectedScatterPlot = () => {
    const ref = useRef();
    const targetRef = useRef();
    const size = useWindowDimensions();
    const [dimensions, setDimensions] = useState({width: 0, height: 0});
    const drawerOpened = useSelector(selectDrawerState);
    useEffect(() => {
        if (targetRef.current) {
            setDimensions({
                width: targetRef.current.offsetWidth,
                height: targetRef.current.offsetHeight
            });
        }
    }, [drawerOpened, size]);

    const height = data.length * 16;
    const width = dimensions.width;
    const margin = ({top: 20, right: 30, bottom: 30, left: 40});
    const x = d3.scaleLinear()
        .domain(d3.extent(data, d => d.x)).nice()
        .range([margin.left, width - margin.right])
    const y = d3.scaleLinear()
        .domain(d3.extent(data, d => d.y)).nice()
        .range([height - margin.bottom, margin.top])

    const xAxis = g => g
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x).ticks(width / 80))
        .call(g => g.select(".domain").remove())
        .call(g => g.selectAll(".tick line").clone()
            .attr("y2", -height)
            .attr("stroke-opacity", 0.1))
        .call(g => g.append("text")
            .attr("x", width - 4)
            .attr("y", -4)
            .attr("font-weight", "bold")
            .attr("text-anchor", "end")
            .attr("fill", "black")
            .text(data.x)
            .call(halo))

    const yAxis = g => g
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(y).ticks(null, "$.2f"))
        .call(g => g.select(".domain").remove())
        .call(g => g.selectAll(".tick line").clone()
            .attr("x2", width)
            .attr("stroke-opacity", 0.1))
        .call(g => g.select(".tick:last-of-type text").clone()
            .attr("x", 4)
            .attr("text-anchor", "start")
            .attr("font-weight", "bold")
            .attr("fill", "black")
            .text(data.y)
            .call(halo))

    function halo(text) {
        text.select(function () {
            return this.parentNode.insertBefore(this.cloneNode(true), this);
        })
            .attr("fill", "none")
            .attr("stroke", "white")
            .attr("stroke-width", 4)
            .attr("stroke-linejoin", "round");
    }

    function length(path) {
        return d3.create("svg:path").attr("d", path).node().getTotalLength();
    }

    const line = d3.line()
        .curve(d3.curveCatmullRom)
        .x(d => x(d.x))
        .y(d => y(d.y))

    useEffect(() => {
        /*d3.select("#chart1").remove();*/
        d3.selectAll("#chart1 > *").remove();
        const svgElement = d3.select(ref.current);
        const l = length(line(data));
        /*svgElement.append("g")
            .call(xAxis);*/

        /*svgElement.append("g")
            .call(yAxis);*/
        /*svgElement.append("circle")
            .attr("cx", 150)
            .attr("cy", 70)
            .attr("r", 50)*/
        svgElement.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "black")
            .attr("stroke-width", 2.5)
            .attr("stroke-linejoin", "round")
            .attr("stroke-linecap", "round")
            .attr("stroke-dasharray", `0,${l}`)
            .attr("d", line)
            .transition()
            .duration(2000)
            .ease(d3.easeLinear)
            .attr("stroke-dasharray", `${l},${l}`);

        svgElement.append("g")
            .attr("fill", "white")
            .attr("stroke", "black")
            .attr("stroke-width", 2)
            .selectAll("circle")
            .data(data)
            .join("circle")
            .attr("cx", d => x(d.x))
            .attr("cy", d => y(d.y))
            .attr("r", 3);

        const label = svgElement.append("g")
            .attr("font-family", "sans-serif")
            .attr("font-size", 10)
            .selectAll("g")
            .data(data)
            .join("g")
            .attr("transform", d => `translate(${x(d.x)},${y(d.y)})`)
            .attr("opacity", 0);

        label.append("text")
            .text(d => d.name)
            .each(function (d) {
                const t = d3.select(this);
                switch (d.orient) {
                    case "top":
                        t.attr("text-anchor", "middle").attr("dy", "-0.7em");
                        break;
                    case "right":
                        t.attr("dx", "0.5em").attr("dy", "0.32em").attr("text-anchor", "start");
                        break;
                    case "bottom":
                        t.attr("text-anchor", "middle").attr("dy", "1.4em");
                        break;
                    case "left":
                        t.attr("dx", "-0.5em").attr("dy", "0.32em").attr("text-anchor", "end");
                        break;
                }
            })
            .call(halo);

        label.transition()
            .delay((d, i) => length(line(data.slice(0, i + 1))) / l * (2000 - 125))
            .attr("opacity", 1);


    }, [dimensions])
    return <div ref={targetRef} style={{width: '100%'}}>
        <p>{dimensions.width}</p>
        <p>{dimensions.height}</p>
        <svg id="chart1"
             width={width} height={height}
            /*viewBox="0 0  20"*/
             ref={ref}
        />
    </div>;

}
export default ConnectedScatterPlot

