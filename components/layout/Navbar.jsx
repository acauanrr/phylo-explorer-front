import {
  Box,
  Flex,
  useColorModeValue,
  useDisclosure,
  IconButton,
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  Image,
  VStack,
  HStack,
  DrawerCloseButton,
  Table,
  Tr,
  Tbody,
  Td,
  Thead,
  Th,
  TableContainer,
  Text,
} from "@chakra-ui/react";
import Logo from "../_ui/Logo";
import { FiMenu } from "react-icons/fi";
import InfoMenu from "./InfoMenu";
import FileUploadNew from "../_ui/FileUploadNew";
import { BiRightArrowAlt } from "react-icons/bi";
import { usePhyloCtx } from "../../contexts/PhyloContext";

import { Link } from "@chakra-ui/next-js";

async function createFile(path, name, type) {
  let response = await fetch(path);
  let data = await response.blob();
  let metadata = {
    type: type,
  };
  return new File([data], name, metadata);
}

const sampleFiles = [
  {
    fileName: "01_All_the_News_70.csv",
    src: `${
      process.env.NODE_ENV === "production" ? "/phylo" : ""
    }/datasets/csv/01_All_the_News_70.csv`,
  },
  {
    fileName: "01_All_the_News_185.csv",
    src: `${
      process.env.NODE_ENV === "production" ? "/phylo" : ""
    }/datasets/csv/01_All_the_News_185.csv`,
  },
  {
    fileName: "01_All_the_News_300.csv",
    src: `${
      process.env.NODE_ENV === "production" ? "/phylo" : ""
    }/datasets/csv/01_All_the_News_300.csv`,
  },
  {
    fileName: "05_sb_FakeNews_Class_50.csv",
    src: `${
      process.env.NODE_ENV === "production" ? "/phylo" : ""
    }/datasets/csv/05_sb_FakeNews_Class_50.csv`,
  },
  {
    fileName: "05_sb_FakeNews_Class_100.csv",
    src: `${
      process.env.NODE_ENV === "production" ? "/phylo" : ""
    }/datasets/csv/05_sb_FakeNews_Class_100.csv`,
  },
  {
    fileName: "05_sb_FakeNews_Class_100_fakelabels.csv",
    src: `${
      process.env.NODE_ENV === "production" ? "/phylo" : ""
    }/datasets/csv/05_sb_FakeNews_Class_100_fakelabels.csv`,
  },
];

export default function Navbar() {
  const { setSelectedFilePipe } = usePhyloCtx();
  const bg = useColorModeValue("gray.50", "gray.800");
  const navbarMobile = useDisclosure();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleLoadFile = async (csvFile) => {
    await createFile(csvFile.src, csvFile.fileName, "text/csv").then((file) => {
      setSelectedFilePipe(file);
    });
  };

  return (
    <Box
      as="header"
      bg={bg}
      w="full"
      px={{
        base: 2,
        md: 4,
      }}
      py={4}
      shadow="md"
    >
      <Flex alignItems="center" justifyContent="space-between" w="full">
        <Box
          display={{
            base: "inline-flex",
            md: "none",
          }}
        >
          <IconButton
            aria-label="Menu"
            display={{ base: "inline-flex", md: "none" }}
            onClick={navbarMobile.onOpen}
            icon={<FiMenu />}
            size="lg"
          />
        </Box>
        <Flex justifyContent="center" w={{ base: "full", md: "fit-content" }}>
          <Link href="/" color="blue.400" _hover={{ color: "blue.500" }}>
            <Logo
              src={`${
                process.env.NODE_ENV === "production" ? "/phylo" : ""
              }/images/logo/logo-phylo.png`}
              w={40}
            />
          </Link>
        </Flex>

        <Flex pr={2} gap={2}>
          <Button
            leftIcon={
              <Image
                src={`${
                  process.env.NODE_ENV === "production" ? "/phylo" : ""
                }/icons/database.png`}
                alt="db"
                w={5}
              />
            }
            fontSize="sm"
            variant="solid"
            onClick={onOpen}
          >
            Add Dataset
          </Button>

          <InfoMenu />
        </Flex>
      </Flex>
      <Drawer placement="bottom" onClose={onClose} isOpen={isOpen} size="2xl">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px" py={1}>
            Input Dataset Pipeline
          </DrawerHeader>
          <DrawerBody>
            <VStack spacing={2}>
              <HStack w="full" spacing={20} alignItems="flex-start">
                <Flex direction="column" w="25%">
                  <Text fontSize="sm">
                    The purpose of this pipeline is to create phylogenetic
                    trees, wordcloud, timevis and geomap visualizations from
                    textual databases. To do so, enter with a dataset that
                    contains an array of documents. For example News Datasets
                    like:{" "}
                    <a
                      href="https://www.kaggle.com/datasets?search=news"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      https://www.kaggle.com/datasets?search=news
                    </a>
                  </Text>
                </Flex>
                <Flex borderBottomWidth="1px" w="75%" pb={2}>
                  <Box>
                    <Image
                      src={`${
                        process.env.NODE_ENV === "production" ? "/phylo" : ""
                      }/images/input-pipeline.png`}
                      alt="pipe"
                      w={700}
                    />
                  </Box>
                </Flex>
              </HStack>
              <HStack w="full" spacing={20} alignItems="flex-start" pt={2}>
                <Flex direction="column" w="25%" gap={2}>
                  <Flex w="full">
                    <TableContainer w="full">
                      <Table variant="simple" size="xs">
                        <Thead fontSize="xs">
                          <Tr>
                            <Th color="darkblue">Dataset Samples</Th>
                            <Th color="darkblue">Load</Th>
                          </Tr>
                        </Thead>
                        <Tbody fontSize="sm">
                          {sampleFiles &&
                            sampleFiles.map((f, i) => (
                              <Tr key={i} lineHeight={8}>
                                <Td fontSize="xs">
                                  <a
                                    href={f.src}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    {f.fileName}
                                  </a>
                                </Td>
                                <Td>
                                  <IconButton
                                    icon={<BiRightArrowAlt />}
                                    size="xs"
                                    onClick={() => handleLoadFile(f)}
                                  />
                                </Td>
                              </Tr>
                            ))}
                        </Tbody>
                      </Table>
                    </TableContainer>
                  </Flex>
                </Flex>

                <Flex direction="column" w="75%">
                  <Flex w="full" justifyContent="flex-start">
                    <FileUploadNew onClose={onClose} />
                  </Flex>
                </Flex>
              </HStack>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}
