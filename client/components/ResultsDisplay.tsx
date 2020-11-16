import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import BomCard from "./BomCard";
import { useQuery, gql } from "@apollo/client";
import { ActivityIndicator, Text } from "react-native";
import { useSelector } from "react-redux";
import { selectText, selectType } from "./state/filterSlice";

type bomData = {
  id: string;
  NAVN_BOMSTASJON: string;
  FYLKE: string;
  KOMMUNE: string;
  TAKST_LITEN_BIL: Number;
  TAKST_STOR_BIL: Number;
};

const ResultDisplay: React.FC = () => {
  const filterType = useSelector(selectType);
  const filterText = useSelector(selectText);
  let query;

  //Prepares query based on filtertype. TODO: extract this to tidy up file
  if (filterType == "Fylke") {
    query = gql`
      query boms($text: String) {
        bomstasjoner: bomstasjonerByFylke(FYLKE: $text) {
          id
          NAVN_BOMSTASJON
          FYLKE
          KOMMUNE
          TAKST_STOR_BIL
          TAKST_LITEN_BIL
        }
      }
    `;
  } else if (filterType == "Kommune") {
    query = gql`
      query boms($text: String) {
        bomstasjoner: bomstasjonerByKommune(KOMMUNE: $text) {
          id
          NAVN_BOMSTASJON
          FYLKE
          KOMMUNE
          TAKST_STOR_BIL
          TAKST_LITEN_BIL
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
    const { loading, data, fetchMore } = useQuery(query, {
      variables: {
        text: filterText,
      },
    });

    if (loading) {
      return <ActivityIndicator size="large" />;
    }

    return (
      <ScrollView>
        {data.bomstasjoner.map((bomData: bomData) => (
          <BomCard
            key={bomData.id}
            name={bomData.NAVN_BOMSTASJON}
            fylke={bomData.FYLKE}
            kommune={bomData.KOMMUNE}
            carPrice={bomData.TAKST_LITEN_BIL}
            truckPrice={bomData.TAKST_STOR_BIL}
          ></BomCard>
        ))}
      </ScrollView>
    );
  }
};

export default ResultDisplay;
