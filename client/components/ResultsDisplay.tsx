import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import BomCard from "./BomCard";
import { useQuery, gql } from "@apollo/client";
import { ActivityIndicator, Text } from "react-native";

type bomData = {
  id: string;
  NAVN_BOMSTASJON: string;
  FYLKE: string;
  KOMMUNE: string;
  TAKST_LITEN_BIL: Number;
  TAKST_STOR_BIL: Number;
};
const BOMSTASJONER = gql`
  {
    bomstasjoner {
      id
      NAVN_BOMSTASJON
      FYLKE
      TAKST_STOR_BIL
      TAKST_LITEN_BIL
    }
  }
`;

//TODO: make it fetch with apollo here, baswed on redux state!
const ResultDisplay: React.FC = () => {
  const { loading, data, fetchMore } = useQuery(BOMSTASJONER, {
    variables: {
      offset: 0,
      limit: 10,
    },
  });
  if (!loading) {
    console.log(data.bomstasjoner);
  }

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
};

export default ResultDisplay;
