"use client";

import { useState } from "react";
import {
  Box,
  Grid,
  GridItem,
  HStack,
  Heading,
  Text,
  Tooltip,
  VStack,
} from "@chakra-ui/react";
import { TbArrowsMinimize, TbArrowsMaximize } from "react-icons/tb";
import Navbar from "../components/layout/Navbar";
import PhyloExplorer from "../components/visualizations/PhyloExplorer";
import WordCloudVis from "../components/visualizations/WordCloudVis";
import TimeVis from "../components/visualizations/TimeVis";

export default function Home() {
  const colorsBar = ["#184282", "#18294C", "gray.200"];
  const [show, setShow] = useState(true);

  const toggleShow = () => setShow(!show);

  return (
    <Grid
      h="100vh"
      templateRows={`${show ? "auto" : ""} 1fr ${show ? "auto auto" : ""}`}
      templateColumns={`${show ? "15%" : ""} 1fr ${show ? "20%" : ""}`}
      gap={0}
      spacing={0}
      bg="white"
    >
      {/* -------- NAVBAR MENU -------- */}
      <GridItem
        colSpan={3}
        borderBottom="1px"
        borderColor={colorsBar[2]}
        hidden={!show}
      >
        <Navbar />
      </GridItem>
      {/* -------- DETAILS OF NEWS -------- */}
      <GridItem
        colSpan={1}
        h="100%"
        borderRight="1px"
        borderColor={colorsBar[2]}
        hidden={!show}
      >
        <Heading
          as="h4"
          size="sm"
          w="full"
          h="6"
          color="white"
          px={3}
          bgGradient={`linear(to-l, ${colorsBar[0]}, ${colorsBar[1]})`}
          pt="0.5"
        >
          Details
        </Heading>
      </GridItem>
      {/* -------- MAIN : PHYLO VIS -------- */}
      <GridItem colSpan={1} h="96.8%">
        <HStack
          w="full"
          h="6"
          px={3}
          bgGradient={`linear(to-l, ${colorsBar[0]}, ${colorsBar[1]})`}
          pt="0.5"
          justifyContent="space-between"
          spacing={0}
        >
          <Heading as="h4" size="sm" color="white">
            Phylogenetic Tree Explorer
          </Heading>
          <Tooltip
            label={show ? "Full Screen" : "Minimize"}
            placement="top-start"
            fontSize="xs"
          >
            <Box
              color="white"
              onClick={toggleShow}
              _hover={{ color: "gray.400" }}
            >
              {show ? <TbArrowsMaximize /> : <TbArrowsMinimize />}
            </Box>
          </Tooltip>
        </HStack>
        <PhyloExplorer show={show} />
      </GridItem>
      {/* -------- MAP AND WORDCLOUD -------- */}
      <GridItem
        colSpan={1}
        borderLeft="1px"
        borderColor={colorsBar[2]}
        hidden={!show}
      >
        <VStack w="full" h="full" spacing={0}>
          <Box w="full" h="40%" borderBottom="1px" borderColor={colorsBar[2]}>
            <Heading
              as="h4"
              size="sm"
              w="full"
              h="6"
              color="white"
              px={3}
              bgGradient={`linear(to-l, ${colorsBar[0]}, ${colorsBar[1]})`}
              pt="0.5"
            >
              Location
            </Heading>
          </Box>
          <Box w="full" h="full">
            <Heading
              as="h4"
              size="sm"
              w="full"
              h="6"
              color="white"
              px={3}
              bgGradient={`linear(to-l, ${colorsBar[0]}, ${colorsBar[1]})`}
              pt="0.5"
            >
              Word Cloud
            </Heading>
            <WordCloudVis w="full" h="full" />
          </Box>
        </VStack>
      </GridItem>
      {/* -------- TIMELINE -------- */}
      <GridItem
        colSpan={3}
        borderTop="1px"
        borderColor={colorsBar[2]}
        hidden={!show}
      >
        <Box w="full" h="85%">
          <Heading
            as="h4"
            size="sm"
            w="full"
            h="6"
            color="white"
            px={3}
            bgGradient={`linear(to-l, ${colorsBar[0]}, ${colorsBar[1]})`}
            pt="0.5"
          >
            Timeline
          </Heading>
          <TimeVis />
        </Box>
      </GridItem>
    </Grid>
  );
}
