import { useEffect, useRef, useState } from "react";
import {
  Button,
  Flex,
  Heading,
  HStack,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  VStack,
} from "@chakra-ui/react";
import { BsArrowBarUp } from "react-icons/bs";
import { ImMagicWand } from "react-icons/im";
import { usePhyloCtx } from "../../../contexts/PhyloContext";

let urls = {
  development: process.env.NEXT_PUBLIC_API_URL_LOCAL,
  production: process.env.NEXT_PUBLIC_API_URL_DEPLOY,
};

function formatBytes(bytes, decimals = 2) {
  if (!+bytes) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

export default function FileUploadNew({ onClose }) {
  const {
    setVisDataPhylo,
    setVisDataWords,
    setVisDataTime,
    setVisDataObj,
    setVisDataLoc,
    selectedFilePipe,
    setSelectedFilePipe,
  } = usePhyloCtx();

  const [isSelected, setIsSelected] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");
  const inputRef = useRef(null);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (selectedFilePipe) {
      setIsSelected(true);
    }
  }, [selectedFilePipe]);

  const changeHandler = (event) => {
    setSelectedFilePipe(event.target.files[0]);
  };

  const handleUploadClick = () => {
    inputRef.current?.click();
  };

  const handleSubmission = () => {
    setStatusMsg("Uploading...");
    setIsLoading(true);
    const formData = new FormData();

    formData.append("file", selectedFilePipe);

    fetch(`${urls[process.env.NODE_ENV]}/upload/files`, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((result) => {
        setVisDataPhylo(result.phyloNewickData);
        setVisDataWords(result.wordcloudData);
        setVisDataTime(result.timevisData);
        setVisDataLoc(result.locationData);
        setVisDataObj(result.objData);
        setStatusMsg("Done!");
        setIsDone(true);
        setIsLoading(false);
        console.log("Success:", result);
      })
      .catch((error) => {
        setStatusMsg("Error");
        console.error("Error:", error);
      });
  };

  return (
    <VStack>
      <Flex w="full" justifyContent="start">
        <Heading size="sm">Input Data (.csv)</Heading>
      </Flex>
      <VStack
        className="form-container"
        border="0.15rem"
        borderStyle="dashed"
        borderColor="gray.400"
        p={5}
        rounded="md"
        spacing={8}
      >
        <Flex w="full">
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>File Name</Th>
                <Th textAlign="center">Size</Th>
                <Th textAlign="center">Column to Distance Matrix</Th>
                <Th textAlign="center">Status</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody fontSize="sm">
              {isSelected ? (
                <Tr>
                  <Td>{selectedFilePipe?.name}</Td>
                  <Td textAlign="center">
                    {formatBytes(selectedFilePipe?.size)}
                  </Td>
                  <Td textAlign="center">content</Td>
                  <Td
                    textAlign="center"
                    color={
                      statusMsg == "Uploading..."
                        ? "green.500"
                        : statusMsg == "Done!"
                        ? "blue.500"
                        : "red.500"
                    }
                  >
                    {statusMsg}
                  </Td>
                  <Td>
                    <Button
                      leftIcon={<ImMagicWand />}
                      colorScheme={isSelected ? "linkedin" : ""}
                      size="sm"
                      px={4}
                      py={5}
                      disabled={!isDone}
                      onClick={onClose}
                    >
                      Show Visualizations
                    </Button>
                  </Td>
                </Tr>
              ) : (
                <Tr>
                  <Td>Select a file to show details</Td>
                </Tr>
              )}
            </Tbody>
          </Table>
        </Flex>

        <HStack>
          <Button
            onClick={handleUploadClick}
            size="sm"
            variant="solid"
            colorScheme="blackAlpha"
            px={8}
            py={5}
            ml={100}
          >
            {selectedFilePipe
              ? `${selectedFilePipe?.name}`
              : "Select Local .csv file"}
          </Button>

          <input
            type="file"
            ref={inputRef}
            onChange={changeHandler}
            style={{ display: "none" }}
          />

          <Button
            leftIcon={<BsArrowBarUp />}
            onClick={handleSubmission}
            colorScheme={isSelected ? "linkedin" : ""}
            size="sm"
            isActive={isSelected}
            disabled={isDone}
            isLoading={isLoading}
          >
            Upload
          </Button>
        </HStack>
      </VStack>
    </VStack>
  );
}
