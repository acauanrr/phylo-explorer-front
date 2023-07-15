"use client";

import { PhyloContextProvider } from "@/contexts/PhyloContext";
import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";

export function Providers({ children }) {
  return (
    <PhyloContextProvider>
      <CacheProvider>
        <ChakraProvider>{children}</ChakraProvider>
      </CacheProvider>
    </PhyloContextProvider>
  );
}
