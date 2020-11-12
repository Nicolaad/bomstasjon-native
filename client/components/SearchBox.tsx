import React, { isValidElement, useState } from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";

import { SearchBar } from "react-native-elements";
import { CheckBox } from "react-native-elements";

const SearchBox: React.FC = () => {
  const [searchText, searchTextChange] = useState(""); //text state
  const [fylkeCheck, fylkeCheckChange] = useState(false);
  const [kommuneCheck, kommuneCheckChange] = useState(false);

  const isValid = () => {
    if (searchText) {
      return true;
    }
    false;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>TollTelleren</Text>
      <TextInput
        style={styles.searchBar}
        placeholder="Type Here..."
        onChangeText={(text) => searchTextChange(text)}
        value={searchText}
        //lightTheme={true}
      ></TextInput>
      <Button
        onPress={() => null}
        disabled={!isValid()}
        title="Search!"
        color="#841584"
        accessibilityLabel="Click me to submit the search!"
      />
      <View style={styles.filterContainer}>
        <CheckBox
          center
          title="Fylke"
          checked={fylkeCheck}
          onPress={() => fylkeCheckChange(!fylkeCheck)}
        />
        <CheckBox
          center
          title="Kommune"
          checked={kommuneCheck}
          onPress={() => kommuneCheckChange(!kommuneCheck)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "80vw",
  },
  baseText: {
    fontFamily: "Cochin",
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  searchBar: {
    borderWidth: "1px",
    height: "2em",
  },
  filterContainer: {
    display: "flex",
    flexDirection: "row",
  },
});

export default SearchBox;
