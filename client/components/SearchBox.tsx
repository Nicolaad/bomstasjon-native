import React from "react";
import { StyleSheet, View, TextInput } from "react-native";
import { Button, CheckBox, Card } from "react-native-elements";
import { useSelector, useDispatch } from "react-redux";
import {
  changeSearch,
  changeType,
  selectText,
  selectType,
} from "./state/filterSlice";

const SearchBox = ({ navigation }: any) => {
  /*Redux variables for storing and handling the search state.*/
  const filterType = useSelector(selectType);
  const filterText = useSelector(selectText);
  const dispatch = useDispatch();

  /**
   * Dispatch to redux store to update the state. Null denotes that nothing is selected
   */
  const toggleFilter = (type: string) => {
    filterType == type
      ? dispatch(changeType("null"))
      : dispatch(changeType(type));
  };

  /*Checks if a filter is specified, and a search text exist. 
  If the filtertype is all, the lenght requirement is ommitted */
  const isInvalid = () => {
    return (
      filterType == "null" || (!(filterType == "All") && filterText.length < 1)
    );
  };

  return (
    <Card>
      <Card.Title h2={true}>Bom Basen</Card.Title>
      <TextInput
        style={
          filterType === "All"
            ? [styles.searchBar, styles.disabled]
            : styles.searchBar
        }
        placeholder="Oslo..."
        onChangeText={(text) =>
          filterType === "All" ? null : dispatch(changeSearch(text))
        }
        value={filterText}
      />
      {/*Radio buttons for deciding what type the search is. State is stored with redux*/}
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

      {/*Search button for submitting the search */}
      <Button
        buttonStyle={styles.searchButton}
        titleStyle={styles.searchButtonText}
        onPress={() => {
          navigation.navigate("Resultat");
        }}
        disabled={isInvalid()}
        title="Søk!"
        accessibilityLabel="Trykk på meg for å sende inn søket!"
      />
    </Card>
  );
};

const styles = StyleSheet.create({
  //page title style
  titleText: {
    fontSize: 20,
    fontWeight: "bold",
  },

  //searchbar styles
  searchBar: {
    height: 50,
    fontSize: 25,
    paddingLeft: 15,
    borderWidth: 1,
    marginBottom: 10,
    borderColor: "lightgray",
  },
  disabled: {
    backgroundColor: "lightgray",
  },

  //filter container styles
  filterContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  filertBox: {
    flex: 1,
  },

  //submitt button styles
  searchButton: {
    height: 50,
  },
  searchButtonText: {
    fontSize: 30,
  },
});

export default SearchBox;
