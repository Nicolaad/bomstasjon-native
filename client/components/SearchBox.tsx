import React, { useState } from "react";
import { StyleSheet, View, TextInput, Button } from "react-native";
import { Card } from "react-native-elements";
import { CheckBox } from "react-native-elements";
import { useSelector, useDispatch } from "react-redux";
import {
  changeSearch,
  changeType,
  selectText,
  selectType,
} from "./state/filterSlice";

const SearchBox = ({ navigation }: any) => {
  const filterType = useSelector(selectType);
  const filterText = useSelector(selectText);
  const dispatch = useDispatch();

  /**
   * Dispatch to redux store to update the state
   */
  const toggleFilter = (type: string) => {
    filterType == type
      ? dispatch(changeType("null"))
      : dispatch(changeType(type));
  };

  /*Checks if a filter is specified, and a search text exist */
  const isInvalid = () => {
    if (filterType == "null" || filterText.length < 1) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <Card>
      <Card.Title>TollTelleren</Card.Title>
      <TextInput
        style={styles.searchBar}
        placeholder="Type Here..."
        onChangeText={(text) => dispatch(changeSearch(text))}
        value={filterText}
        //lightTheme={true}
      ></TextInput>
      <Button
        onPress={() => {
          navigation.navigate("Results");
        }}
        disabled={isInvalid()}
        title="Search!"
        color="#841584"
        accessibilityLabel="Click me to submit the search!"
      />
      <View style={styles.filterContainer}>
        <CheckBox
          center
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          title="Fylke"
          checked={filterType === "Fylke"}
          onPress={() => toggleFilter("Fylke")}
        />
        <CheckBox
          center
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          title="Kommune"
          checked={filterType === "Kommune"}
          onPress={() => toggleFilter("Kommune")}
        />
        <CheckBox
          center
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          title="Temp"
          checked={filterType === "Kommune"}
          onPress={() => toggleFilter("Kommune")}
        />
        <CheckBox
          center
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          title="Temp"
          checked={filterType === "Kommune"}
          onPress={() => toggleFilter("Kommune")}
        />
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    //width: "80vw",
  },
  baseText: {
    fontFamily: "Cochin",
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  searchBar: {
    borderWidth: 1,
  },
  filterContainer: {
    display: "flex",
    flexDirection: "row",
  },
});

export default SearchBox;
