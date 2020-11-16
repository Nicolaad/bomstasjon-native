import React from "react";
import { StyleSheet, Text, View, Modal, Pressable } from "react-native";
import { Card } from "react-native-elements";

type BomCardProps = {
  name: string;
  fylke: string;
  kommune: string;
  truckPrice: number;
  carPrice: number;
};

const BomCard: React.FC<BomCardProps> = (props: BomCardProps) => {
  return (
    <Card>
      <Card.Title>{props.name}</Card.Title>
      <Text>
        {props.kommune}, {props.fylke}
      </Text>
      <Card.Divider />
      <Text>Bil: {props.carPrice}</Text>
      <Text>truck: {props.truckPrice}</Text>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default BomCard;
