import React, { useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import BomCard from "./BomCard";
import { useQuery, gql } from "@apollo/client";
import {
  ActivityIndicator,
  Text,
  Button,
  View,
  Pressable,
  StyleSheet,
} from "react-native";
import { useSelector } from "react-redux";
import { selectText, selectType } from "./state/filterSlice";
import Modal from "react-native-modal";
import { Card } from "react-native-elements";

type bomData = {
  id: string;
  NAVN_BOMSTASJON: string;
  FYLKE: string;
  KOMMUNE: string;
  TAKST_LITEN_BIL: number;
  TAKST_STOR_BIL: number;
  NAVN_BOMPENGEANLEGG_FRA_CS: string;
  LINK_TIL_BOMSTASJON: string;
  VEGKATEGORI: string;
};
type queryData = {
  result: {
    numberOfDocuments: number;
    bomstasjoner: bomData[];
  };
};

const ResultDisplay: React.FC = () => {
  const filterType = useSelector<string>(selectType);
  const filterText = useSelector<string>(selectText);
  const [page, setPage] = useState<number>(0); //state used to keep track of current loaded page, and load next query
  const [visible, setVisible] = useState<true | false>(false);
  const [modalObject, setModalObject] = useState<bomData | undefined>();

  const enableOverlay = (bomData: bomData) => {
    setModalObject(bomData);
    setVisible(true);
  };

  let query;

  //Prepares query based on filtertype. TODO: extract this to tidy up file
  if (filterType == "Fylke") {
    query = gql`
      query boms($text: String, $offset: Int) {
        result: getBomstasjoner(FYLKE: $text, start: $offset) {
          numberOfDocuments
          bomstasjoner {
            id
            NAVN_BOMSTASJON
            FYLKE
            KOMMUNE
            TAKST_STOR_BIL
            TAKST_LITEN_BIL
            NAVN_BOMPENGEANLEGG_FRA_CS
            LINK_TIL_BOMSTASJON
            VEGKATEGORI
          }
        }
      }
    `;
  } else if (filterType == "Kommune") {
    query = gql`
      query boms($text: String, $offset: Int) {
        result: getBomstasjoner(KOMMUNE: $text, start: $offset) {
          numberOfDocuments
          bomstasjoner {
            id
            NAVN_BOMSTASJON
            FYLKE
            KOMMUNE
            TAKST_STOR_BIL
            TAKST_LITEN_BIL
            NAVN_BOMPENGEANLEGG_FRA_CS
            LINK_TIL_BOMSTASJON
            VEGKATEGORI
          }
        }
      }
    `;
  } else if (filterType == "All") {
    query = gql`
      query boms($offset: Int) {
        result: getBomstasjoner(start: $offset) {
          numberOfDocuments
          bomstasjoner {
            id
            NAVN_BOMSTASJON
            FYLKE
            KOMMUNE
            TAKST_STOR_BIL
            TAKST_LITEN_BIL
            NAVN_BOMPENGEANLEGG_FRA_CS
            LINK_TIL_BOMSTASJON
            VEGKATEGORI
          }
        }
      }
    `;
  } else {
    query = null;
  }

  //if for some reason a invalid query is sent
  if (query == null) {
    return (
      <ScrollView>
        <Text>Your search is not valid</Text>
      </ScrollView>
    );
  } else {
    const { error, loading, data } = useQuery<queryData>(query, {
      variables: {
        text: filterText,
        offset: 10 * page,
        limit: 10,
      },
    });

    if (loading) {
      return <ActivityIndicator size="large" />;
    } else if (error) {
      console.log(error);
      return <Text>Whops, an error occured! {error}</Text>;
    }
    console.log(data?.result);
    return (
      <ScrollView>
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
        <Button
          disabled={page < 1}
          color="red"
          title="Bla tilbake"
          onPress={() => setPage(page - 1)}
        ></Button>
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
        <Button
          color="green"
          disabled={data.result.numberOfDocuments <= (page + 1) * 10}
          title="Se flere!"
          onPress={() => setPage(page + 1)}
        ></Button>
      </ScrollView>
    );
  }
};

export default ResultDisplay;
