import React, { useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import BomCard from "./BomCard";
import { useQuery } from "@apollo/client";
import { ActivityIndicator, Text, View, Pressable } from "react-native";
import { useSelector } from "react-redux";
import { selectText, selectType } from "./state/filterSlice";
import Modal from "react-native-modal";
import { Card, ButtonGroup, Button } from "react-native-elements";
import { getQuery } from "./helpers/querys";
import { filterType, takstType, bomData, queryData } from "./helpers/types";

const ResultDisplay: React.FC = () => {
  //state from redux used for query
  const filterType: filterType = useSelector(selectType);
  const filterText: string = useSelector(selectText);

  //state used to keep track of current loaded page, and load next query
  const [page, setPage] = useState<number>(0);

  //state for which direction to sort, and on what type
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [sortType, setSortType] = useState<takstType>("TAKST_LITEN_BIL");

  //Used for modal to show/hide, and specify what data to show
  const [visible, setVisible] = useState<true | false>(false);
  const [modalObject, setModalObject] = useState<bomData | undefined>();

  const enableOverlay = (bomData: bomData) => {
    setModalObject(bomData);
    setVisible(true);
  };

  /*Changes sorting type based on index given from the direction buttongroup.
   Also sets page to 0 if a change occurs */
  const TypeButtonGroupOnPress = (index: 0 | 1) => {
    if (index == 0) {
      sortType == "TAKST_LITEN_BIL"
        ? null
        : (setSortType("TAKST_LITEN_BIL"), setPage(0));
    } else {
      sortType == "TAKST_STOR_BIL"
        ? null
        : (setSortType("TAKST_STOR_BIL"), setPage(0));
    }
  };

  /*Changes sorting direction based on index given from the direction buttongroup
  Also sets page to 0 if a change occurs */
  const DirectionButtonGroupOnPress = (index: 0 | 1) => {
    if (index == 0) {
      sortDirection == "asc" ? null : (setSortDirection("asc"), setPage(0));
    } else {
      sortDirection == "desc" ? null : (setSortDirection("desc"), setPage(0));
    }
  };

  //gets the correct query based on filtertype
  const query = getQuery(filterType);

  //checks if the query is undefined
  if (query == undefined) {
    return (
      <ScrollView>
        <Text>The query is invalid (undefined)</Text>
      </ScrollView>
    );
  } else {
    //Calls query
    const { error, loading, data } = useQuery<queryData>(query, {
      variables: {
        text: filterText,
        offset: 10 * page,
        limit: 10,
        sortType: sortType,
        sortDirection: sortDirection,
      },
    });

    //if query gives an error or is loading
    if (loading) {
      return <ActivityIndicator size="large" />;
    } else if (error) {
      console.log(error);
      return <Text>Whops, an error occured! {error}</Text>;
    } else if (data == undefined) {
      return <Text>Whops, an error occured! (data is undefined!)</Text>;
    }

    return (
      <ScrollView>
        {/*Modal that gives additional information of a bomstasjon.
         It is envoked by button presses on a bomcard*/}
        <Modal
          onBackdropPress={() => setVisible(false)}
          style={{ flex: 1 }}
          isVisible={visible}
        >
          <Card>
            <Card.Title h3={true}>{modalObject?.NAVN_BOMSTASJON} </Card.Title>
            <Card.Divider></Card.Divider>
            <Text>Fylke: {modalObject?.FYLKE}</Text>
            <Text>Kommune: {modalObject?.KOMMUNE}</Text>
            <Text>Vegtype: {modalObject?.VEGKATEGORI}</Text>
            <Text>Takst stor bil: {modalObject?.TAKST_STOR_BIL}</Text>
            <Text>Takst liten bil: {modalObject?.TAKST_LITEN_BIL}</Text>
            <Text>
              Eier:{" "}
              {modalObject?.NAVN_BOMPENGEANLEGG_FRA_CS
                ? modalObject?.NAVN_BOMPENGEANLEGG_FRA_CS
                : "Ukjent"}
            </Text>
            <Text>
              Nettside:{" "}
              {modalObject?.LINK_TIL_BOMSTASJON
                ? modalObject?.LINK_TIL_BOMSTASJON
                : "Ukjent"}
            </Text>
          </Card>
        </Modal>

        {/*Button groups used specifying sorting*/}
        <ButtonGroup
          onPress={TypeButtonGroupOnPress}
          selectedIndex={sortType == "TAKST_LITEN_BIL" ? 0 : 1}
          buttons={["Bil", "Truck"]}
          containerStyle={{ height: 50 }}
        />
        <ButtonGroup
          onPress={DirectionButtonGroupOnPress}
          selectedIndex={sortDirection == "asc" ? 0 : 1}
          buttons={["Stigende", "Synkende"]}
          containerStyle={{ height: 50 }}
        />

        {/*goes back to previous page on press, by changing page stat */}
        <Button
          disabled={page < 1}
          buttonStyle={{ backgroundColor: "red", height: 60 }}
          title="Bla tilbake"
          onPress={() => setPage(page - 1)}
        ></Button>

        {/*generation of bomCards, which are pressable and invokes a modal */}
        {data.result.bomstasjoner.map((bomData: bomData) => (
          <View key={bomData.id}>
            <Pressable onPress={() => enableOverlay(bomData)}>
              <BomCard
                name={bomData.NAVN_BOMSTASJON}
                fylke={bomData.FYLKE}
                kommune={bomData.KOMMUNE}
                carPrice={bomData.TAKST_LITEN_BIL}
                truckPrice={bomData.TAKST_STOR_BIL}
              ></BomCard>
            </Pressable>
          </View>
        ))}

        {/*Turn to the next page by changing page state */}
        <Button
          containerStyle={{ marginTop: 20 }}
          buttonStyle={{ backgroundColor: "green", height: 70 }}
          disabled={data.result.numberOfDocuments <= (page + 1) * 10}
          title="Se flere!"
          onPress={() => setPage(page + 1)}
        ></Button>
      </ScrollView>
    );
  }
};

export default ResultDisplay;
