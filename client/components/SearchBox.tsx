import React, { useState } from "react";
import { StyleSheet, View, TextInput, Button } from "react-native";

import { Card } from "react-native-elements";
import { CheckBox } from "react-native-elements";

const SearchBox = ({ navigation }: any) => {
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
    <Card>
      <Card.Title>TollTelleren</Card.Title>
      <TextInput
        style={styles.searchBar}
        placeholder="Type Here..."
        onChangeText={(text) => searchTextChange(text)}
        value={searchText}
        //lightTheme={true}
      ></TextInput>
      <Button
        onPress={() => {
          navigation.navigate("Results");
        }}
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
        <CheckBox
          center
          title="Temp"
          checked={kommuneCheck}
          onPress={() => kommuneCheckChange(!kommuneCheck)}
        />
        <CheckBox
          center
          title="Temp"
          checked={kommuneCheck}
          onPress={() => kommuneCheckChange(!kommuneCheck)}
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
