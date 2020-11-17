import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Card } from "react-native-elements";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { BomCardProps } from "./helpers/types";

const BomCard: React.FC<BomCardProps> = (props: BomCardProps) => {
  return (
    <Card
      containerStyle={{
        //inline style, as card does not like to be styled with  StyleSheet.create()
        backgroundColor: "#0066cc", //blue
        borderWidth: 3,
        borderColor: "white",
        borderRadius: 5,
        display: "flex",
        marginBottom: 3,
      }}
    >
      <Card.Title h3={true} style={styles.header}>
        {props.name}
      </Card.Title>
      <Card.FeaturedSubtitle style={styles.subtitle} h4={true}>
        {props.kommune}, {props.fylke}
      </Card.FeaturedSubtitle>

      <Card.Divider style={styles.divider} />
      <View style={styles.priceTable}>
        <View style={styles.vehicleRow}>
          <MaterialCommunityIcons
            style={styles.icon}
            name="truck"
            size={55}
            color="white"
          />
          <Text style={styles.text}>Kr </Text>
          <View style={styles.priceDisplay}>
            <Text style={styles.priceText}>{props.truckPrice + ".00"}</Text>
          </View>
        </View>
        <View style={styles.vehicleRow}>
          <MaterialCommunityIcons
            style={styles.icon}
            name="car-hatchback"
            size={55}
            color="white"
          />
          <Text style={styles.text}>Kr </Text>
          <View style={styles.priceDisplay}>
            <Text style={styles.priceText}>{props.carPrice + ".00"}</Text>
          </View>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  header: { color: "white" },
  divider: { backgroundColor: "white", paddingVertical: "1%" },
  text: { color: "white", flex: 1, fontSize: 40 },
  subtitle: { display: "flex", alignSelf: "center", color: "white" },
  priceTable: {
    display: "flex",
    flexDirection: "column",
  },
  vehicleRow: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  icon: { flex: 1 },
  priceDisplay: {
    display: "flex",
    flex: 1.5,
    backgroundColor: "#3c3b39", //black
    alignItems: "flex-end",
    marginTop: "1%",
    marginBottom: "1%",
  },
  priceText: {
    fontSize: 40,
    color: "yellow",
  },
});

export default BomCard;
