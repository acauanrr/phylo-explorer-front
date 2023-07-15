import { useEffect, useRef } from "react";
import * as d3 from "d3";
import cloud from "d3-cloud";
import { Flex } from "@chakra-ui/react";
import { usePhyloCtx } from "../../../contexts/PhyloContext";

export default function WordCloudVis() {
  const { visDataWords } = usePhyloCtx();
  const refwordcloud = useRef();
  const update = useRef(false);
  var svgCloud, color;
  var chartWidth, chartHeight;
  var fontFamily = "Verdana, Arial, Helvetica, sans-serif";
  var tamanho;

  function createSVG(dataWords) {
    color = d3
      .scaleOrdinal()
      .domain([1, dataWords ? d3.max(dataWords?.map((d) => d.qtd)) : 10]) // .domain(root.children)
      .range([
        "#f72585",
        "#b5179e",
        "#7209b7",
        "#560bad",
        "#480ca8",
        "#3a0ca3",
        "#3f37c9",
        "#4361ee",
        "#4895ef",
        "#555",
      ]);

    tamanho = d3
      .scaleSqrt()
      .domain([1, dataWords ? d3.max(dataWords?.map((d) => d.qtd)) : 10])
      .range([2, 50]);

    svgCloud = cloud()
      .size([chartWidth, chartHeight])
      .words(
        dataWords?.map(function (d) {
          return { text: d.word, size: tamanho(d.qtd) };
        })
      )
      .padding(1)
      .rotate(() => 10)
      .font("Verdana")
      .fontSize(function (d) {
        return d.size;
      })
      .on("end", draw);

    svgCloud.start();

    function draw(words) {
      d3.select(refwordcloud.current)
        .append("svg")
        .attr("id", "word-cloud")
        .attr("viewBox", [0, 0, chartWidth, chartHeight])
        .append("g")
        .attr(
          "transform",
          "translate(" +
            svgCloud.size()[0] / 2 +
            "," +
            svgCloud.size()[1] / 2 +
            ")"
        )
        .selectAll("text")
        .data(words)
        .enter()
        .append("text")
        .style("font-size", function (d) {
          return d.size + "px";
        })
        .style("font-family", fontFamily)
        .attr("text-anchor", "middle")
        .style("fill", (d) => color(d.size))
        .attr("transform", function (d) {
          return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
        })
        .text(function (d) {
          return d.text;
        });
    }
  }

  useEffect(() => {
    var dataWords = visDataWords;

    // Clear
    if (update.current) {
      d3.select(refwordcloud.current).selectAll("g").remove();
    } else {
      update.current = true;
    }
    // Setup ViewBox
    chartWidth = +d3.select("#idwordcloud").style("width").slice(0, -2);
    chartHeight = d3.select("#idwordcloud").style("height").slice(0, -2);

    createSVG(dataWords);
  }, [visDataWords]);

  return (
    <Flex
      id="idwordcloud"
      width="100%"
      height="96%"
      position="relative"
      pt={0.5}
    >
      <svg ref={refwordcloud} width="100%"></svg>
    </Flex>
  );
}
