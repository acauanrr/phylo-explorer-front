"use client";

import { createContext, useContext, useState } from "react";

const PhyloContext = createContext({});

import initialData from "../public/datasets/initial-data.json";

export const PhyloContextProvider = ({ children }) => {
  const [visDataPhylo, setVisDataPhylo] = useState(initialData.phyloNewickData);
  const [visDataWords, setVisDataWords] = useState(initialData.wordcloudData);
  const [visDataTime, setVisDataTime] = useState(initialData.timevisData);
  const [visDataLoc, setVisDataLoc] = useState(initialData.locationData);
  const [visDataObj, setVisDataObj] = useState(initialData.objData);
  const [selectedFilePipe, setSelectedFilePipe] = useState(null);

  return (
    <PhyloContext.Provider
      value={{
        visDataPhylo,
        setVisDataPhylo,
        visDataWords,
        setVisDataWords,
        visDataTime,
        setVisDataTime,
        visDataLoc,
        visDataObj,
        setVisDataObj,
        setVisDataLoc,
        selectedFilePipe,
        setSelectedFilePipe,
      }}
    >
      {children}
    </PhyloContext.Provider>
  );
};

export const usePhyloCtx = () => useContext(PhyloContext);
