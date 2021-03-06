import { gql } from "@apollo/client";
import { filterType } from "./types";

/*
This is a helper file for storing the querys and supplying the right query with the getQuery method 
*/

function getQuery(filterType: filterType) {
  if (filterType == "Fylke") {
    return FylkeQuery;
  } else if (filterType == "Kommune") {
    return KommuneQuery;
  } else if (filterType == "All") {
    return AllQuery;
  }
}

const FylkeQuery = gql`
  query boms(
    $text: String
    $offset: Int
    $sortDirection: String
    $sortType: String
  ) {
    result: getBomstasjoner(
      FYLKE: $text
      start: $offset
      sortDirection: $sortDirection
      whatToSort: $sortType
    ) {
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

const KommuneQuery = gql`
  query boms(
    $text: String
    $offset: Int
    $sortDirection: String
    $sortType: String
  ) {
    result: getBomstasjoner(
      KOMMUNE: $text
      start: $offset
      sortDirection: $sortDirection
      whatToSort: $sortType
    ) {
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

const AllQuery = gql`
  query boms($offset: Int, $sortDirection: String, $sortType: String) {
    result: getBomstasjoner(
      start: $offset
      sortDirection: $sortDirection
      whatToSort: $sortType
    ) {
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

export { getQuery };
