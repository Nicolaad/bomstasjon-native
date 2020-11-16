import React, { useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import BomCard from "./BomCard";
import { useQuery, gql } from "@apollo/client";
import { ActivityIndicator, Text, Button } from "react-native";
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
  const [page, setPage] = useState(0); //state used to keep track of current loaded page, and load next query

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
    const { loading, data } = useQuery(query, {
      variables: {
        text: filterText,
        offset: page * 10,
        limit: 10,
      },
    });

    if (loading) {
      return <ActivityIndicator size="large" />;
    }

    return (
      <ScrollView>
        {data.result.bomstasjoner.map((bomData: bomData) => (
          <BomCard
            key={bomData.id}
            name={bomData.NAVN_BOMSTASJON}
            fylke={bomData.FYLKE}
            kommune={bomData.KOMMUNE}
            carPrice={bomData.TAKST_LITEN_BIL}
            truckPrice={bomData.TAKST_STOR_BIL}
          ></BomCard>
        ))}

        <Button
          disabled={data.result.numberOfDocuments <= (page + 1) * 10}
          title="load more!"
          onPress={() => setPage(page + 1)}
        ></Button>

        <Button
          disabled={page < 1}
          title="go back!"
          onPress={() => setPage(page - 1)}
        ></Button>
      </ScrollView>
    );
  }
};

export default ResultDisplay;
