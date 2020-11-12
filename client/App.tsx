import React from "react";
import { StyleSheet, Text, View } from "react-native";
import SearchBox from "./components/SearchBox";
import BomCard from "./components/BomCard";

const bomData = {
  name: "Bombom",
  fylke: "viken",
  kommune: "Bærum",
  carPrice: 69,
  truckPrice: 420,
};

export default function App() {
  return (
    <View style={styles.container}>
      <SearchBox></SearchBox>
      <BomCard
        name={bomData.name}
        fylke={bomData.fylke}
        kommune={bomData.kommune}
        carPrice={bomData.carPrice}
        truckPrice={bomData.truckPrice}
      ></BomCard>
      <BomCard
        name={bomData.name}
        fylke={bomData.fylke}
        kommune={bomData.kommune}
        carPrice={bomData.carPrice}
        truckPrice={bomData.truckPrice}
      ></BomCard>
      <BomCard
        name={bomData.name}
        fylke={bomData.fylke}
        kommune={bomData.kommune}
        carPrice={bomData.carPrice}
        truckPrice={bomData.truckPrice}
      ></BomCard>
      <BomCard
        name={bomData.name}
        fylke={bomData.fylke}
        kommune={bomData.kommune}
        carPrice={bomData.carPrice}
        truckPrice={bomData.truckPrice}
      ></BomCard>
      <BomCard
        name={bomData.name}
        fylke={bomData.fylke}
        kommune={bomData.kommune}
        carPrice={bomData.carPrice}
        truckPrice={bomData.truckPrice}
      ></BomCard>
      <BomCard
        name={bomData.name}
        fylke={bomData.fylke}
        kommune={bomData.kommune}
        carPrice={bomData.carPrice}
        truckPrice={bomData.truckPrice}
      ></BomCard>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
