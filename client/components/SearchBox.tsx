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
    if (filterType == "All") {
    }
    filterType == type
      ? dispatch(changeType("null"))
      : dispatch(changeType(type));
  };

  /*Checks if a filter is specified, and a search text exist. If the filtertype is all, the lenght requirement is skipped */
  const isInvalid = () => {
    return (
      filterType == "null" || (!(filterType == "All") && filterText.length < 1)
    );
  };

  return (
    <Card>
      <Card.Title h2={true}>Bom Basen</Card.Title>
      <TextInput
        style={filterType === "All" ? styles.disabled : styles.searchBar}
        placeholder="Oslo..."
        onChangeText={(text) =>
          filterType === "All" ? null : dispatch(changeSearch(text))
        }
        value={filterText}
        //lightTheme={true}
      ></TextInput>
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
          title="Se alt"
          checked={filterType === "All"}
          onPress={() => toggleFilter("All")}
        />
      </View>

      <Card.Divider></Card.Divider>
      <Button
        onPress={() => {
          navigation.navigate("Resultat");
        }}
        disabled={isInvalid()}
        title="Søk!"
        color="#0066cc"
        accessibilityLabel="Trykk på meg for å sende inn søket!"
      />
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {},
  baseText: {
    fontFamily: "Cochin",
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  searchBar: {
    height: 50,
    fontSize: 25,
    borderWidth: 1,
    marginBottom: 10,
    borderColor: "lightgray",
  },
  filterContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  disabled: {
    height: 50,
    fontSize: 25,
    borderWidth: 1,
    marginBottom: 10,
    backgroundColor: "lightgray",
    borderColor: "lightgray",
  },
});

export default SearchBox;
