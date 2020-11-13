import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import BomCard from "./BomCard";

const bomData = {
  name: "Bombom",
  fylke: "viken",
  kommune: "Bærum",
  carPrice: 69,
  truckPrice: 420,
};

//TODO: make it fetch with apollo here, baswed on redux state!
const ResultDisplay: React.FC = () => {
  return (
    <ScrollView>
      <BomCard
        name={bomData.name}
        fylke={bomData.fylke}
        kommune={bomData.kommune}
        carPrice={bomData.carPrice}
        truckPrice={bomData.truckPrice}
      />

      <BomCard
        name={bomData.name}
        fylke={bomData.fylke}
        kommune={bomData.kommune}
        carPrice={bomData.carPrice}
        truckPrice={bomData.truckPrice}
      />

      <BomCard
        name={bomData.name}
        fylke={bomData.fylke}
        kommune={bomData.kommune}
        carPrice={bomData.carPrice}
        truckPrice={bomData.truckPrice}
      />

      <BomCard
        name={bomData.name}
        fylke={bomData.fylke}
        kommune={bomData.kommune}
        carPrice={bomData.carPrice}
        truckPrice={bomData.truckPrice}
      />
    </ScrollView>
  );
};

export default ResultDisplay;
