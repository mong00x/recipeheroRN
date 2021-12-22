import React, { useContext, useState, useEffect } from "react";
import {
  Box,
  Button,
  Input,
  Select,
  ScrollView,
  FormControl,
  HStack,
  Heading,
  IconButton,
  Icon,
  VStack,
  useDisclose,
  Text,
} from "native-base";

// import Context as data
import { AppContext } from "../../services/AppContext";

import Ingredients from "./Ingredients/Ingredients";

const Storage = ({ Data, setData, storage, setStorage }) => {
  useEffect(() => {
    setStorage(Data.storage);
    console.log(storage);
  }, []);

  const [IDList, setIDList] = useState([]);

  // const onSelect = (id, ingredient) => {
  //   console.log("selected");
  //   setSelected([...selected, id]);
  //   ingredient.selectecd = true;
  // };

  // const onUnSelect = (id, ingredient) => {
  //   console.log("unSelected");
  //   setSelected(selected.filter((ele) => ele.id === id));
  //   storage.indexOf(ingredient);
  // };

  const onFinish = (IDList) => {
    setStorage(storage.filter((ingredient) => !IDList.includes(ingredient.id)));
    setIDList([]);
  };

  return (
    <Box>
      <VStack space={2} mt={3}>
        <Heading px={3} fontSize="28">
          My Storage
        </Heading>
        <ScrollView px={3} height="89%" top="3">
          <Ingredients
            ingredients={storage}
            IDList={IDList}
            setIDList={setIDList}
          />
        </ScrollView>
      </VStack>
      <Button
        onPress={() => {
          onFinish(IDList);
        }}
        display={IDList.length > 0 ? "flex" : "none"}
        w="36%"
        h="48px"
        borderRadius="full"
        posision="absolute"
        zIndex="99"
        bottom="30%"
        m="auto"
      >
        <Text fontSize="16px" fontWeight="bold" color="white" shadow="1">
          Finished
        </Text>
      </Button>
    </Box>
  );
};

export default Storage;
