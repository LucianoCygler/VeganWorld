import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import styles from "./PruebaGrafico.module.css";

function getMonth(index) {
  return months[index];
}

const months = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

function PruebaGrafico() {
  const chartRef = useRef(null);
  const tooltipRef= useRef(null);
  
  useEffect(() => {
    const generateChart = () => {
      const width = 800;
      const height = 400;
      const barWidth = width / 12;
      
      // Crea el contenedor SVG
      const svg = d3.select(chartRef.current)
        .append("svg")
        .attr("width", width + 100)
        .attr("height", height + 60);
      
      const tooltip = d3.select(tooltipRef.current);
      // Datos de ejemplo
      const data = [
        { date: new Date("2000-01-01"), gdp: 100 },
        { date: new Date("2000-02-01"), gdp: 200 },
        { date: new Date("2000-03-01"), gdp: 150 },
        // ... otros datos ...
      ];
      
      
      const xScale = d3.scaleBand()
        .domain(months)
        .range([0, width])
        .paddingInner(0.1)
        .paddingOuter(0);
      
      const GDP = months.map((month) => {
        const dataEntry = data.find((item) => getMonth(item.date.getMonth()) === month);
        return dataEntry ? dataEntry.gdp : 0;
      });

      const month = months.map((i) => {
        const dataEntry = data.find((d) => getMonth(d.date.getMonth()) === i);
        return dataEntry ? getMonth(dataEntry.date.getMonth()) : 0;
      });
      
      const gdpMax = d3.max(GDP);
      
      const linearScale = d3.scaleLinear()
        .domain([0, gdpMax + 2])
        .range([0, height]);
      
      const yAxisScale = d3.scaleLinear()
        .domain([0, gdpMax])
        .range([height, 5]);
      
      const xAxis = d3.axisBottom(xScale);
      
      const yAxis = d3.axisLeft(yAxisScale);
      
      svg.append("g")
        .call(xAxis)
        .attr("id", "x-axis")
        .attr("transform", `translate(59, ${height})`)
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-65)");
      
      svg.append("g")
        .call(yAxis)
        .attr("id", "y-axis")
        .attr("transform", "translate(59, 0)");
      
      svg.selectAll("rect")
        .data(GDP)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", (d, i) => xScale(getMonth(i + 1)))
        .attr("y", (d) => height - linearScale(d))
        .attr("width", xScale.bandwidth())
        .attr("height", (d) => linearScale(d))
        .attr("fill", "#33adff")
        .attr("transform", "translate(60, 0)")
        .on("mouseover", function (event, d) {
          d3.select(this)
            .style("fill", "orange");

          const mouseX = event.x - 60; // Restar el desplazamiento horizontal
          const closestIndex = Math.round(mouseX / barWidth); // Calcular el índice de la barra más cercana
  
          if (closestIndex >= 0 && closestIndex < GDP.length) {
            const currentMonth = getMonth(closestIndex + 1);
          
            tooltip
              .style("opacity", 0.9)
              .attr("data-date", months[closestIndex])
              .style("left", (closestIndex * barWidth + 100) + "px")
              .style("top", (height - linearScale(d) - 10) + "px")
              .html(currentMonth + " USD $" + d);
          }
        })
        .on("mouseout", function () {
          d3.select(this)
            .style("fill", "#33adff");
          
          tooltip
            .style("opacity", 0);
        });
      }
      
      generateChart();
      
      return () => {
        d3.select(chartRef.current)
          .selectAll("svg")
          .remove()
      }
    }, []);
    
    
    return (
    <div className={styles.main}>
      <div className={styles.container}>
        <div className={styles.info}>Ganancias</div>
        <div ref={chartRef} className={styles.visHolder}></div>
        <div className={styles.tooltip} ref={tooltipRef}></div>
      </div>
    </div>
  );
}

export default PruebaGrafico;
