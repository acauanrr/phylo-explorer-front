import * as d3 from "d3";
import * as d3Collection from "d3-collection";
import { Flex } from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import { usePhyloCtx } from "../../../contexts/PhyloContext";

export default function TimeVis() {
  const { visDataTime } = usePhyloCtx();
  const reftime = useRef();
  const update = useRef(false);

  var svg;
  var years;
  var timeWeek = d3.utcSunday;

  function createSVG(dateValues) {
    years = d3Collection
      .nest()
      .key((d) => d.date.getUTCFullYear())
      .entries(dateValues)
      .reverse();

    const values = dateValues.map((c) => c.value);
    const maxValue = d3.max(values);
    const minValue = d3.min(values);

    const cellSize = 15;
    // const yearHeight = cellSize * 7;

    const group = svg.append("g");

    const year = group
      .selectAll("g")
      .data(years)
      .join("g")
      // .attr("transform", `translate(50, 2)`);
      .attr("transform", (d, i) => {
        console.log(i);
        console.log(d.values.length);
        console.log(years.length);
        return `translate(${
          50 +
          (50 + d.values.length * (years.length < 8 ? 7 : 1.7) * i + 1) * i
        }, 2)`; //palmas para mim
      });

   

    year
      .append("text")
      .attr("x", -5)
      .attr("y", -30)
      .attr("text-anchor", "end")
      .attr("font-size", 16)
      .attr("font-weight", 550)
      .attr("transform", "rotate(270)")
      .text((d) => d.key);

    const formatDay = (d) =>
      ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"][d.getUTCDay()];
    const countDay = (d) => d.getUTCDay();

    const formatDate = d3.utcFormat("%x");
    const colorFn = d3
      .scaleSequential(d3.interpolateBuGn)
      .domain([Math.floor(minValue), Math.ceil(maxValue)]);

    year
      .append("g")
      .attr("text-anchor", "end")
      .selectAll("text")
      .data(d3.range(7).map((i) => new Date(1995, 0, i)))
      .join("text")
      .attr("x", -5)
      .attr("y", (d) => (countDay(d) + 0.5) * cellSize)
      .attr("dy", "0.31em")
      .attr("font-size", 12)
      .text(formatDay);

    year
      .append("g")
      .selectAll("rect")
      .data((d) => d.values)
      .join("rect")
      .attr("width", cellSize - 1.5)
      .attr("height", cellSize - 1.5)
      .attr(
        "x",
        (d) => timeWeek?.count(d3.utcYear(d.date), d.date) * cellSize + 10
      )
      .attr("y", (d) => countDay(d.date) * cellSize + 0.5)
      .attr("fill", (d) => colorFn(d.value))
      .append("title")
      .text((d) => `${formatDate(d.date)}: ${d.value.toFixed(2)}`);
  }

  useEffect(() => {
    const sample = visDataTime;
    sample?.sort((a, b) => new Date(a.Date) - new Date(b.Date));

    const dateValues = sample?.map((dv) => ({
      date: d3.timeDay(new Date(dv.Date)),
      value: Number(dv.AnswerCount),
    }));

    svg = d3.select(reftime.current);
    // .attr("viewBox", [0, 0, chartWidth, chartHeight]);

    // Clear
    if (update.current) {
      d3.select(reftime.current).selectAll("g").remove();
    } else {
      update.current = true;
    }

    createSVG(dateValues);
  }, [visDataTime]);

  return (
    <Flex id="timevis" height="100%">
      <svg ref={reftime} width="100%"></svg>
    </Flex>
  );
}
