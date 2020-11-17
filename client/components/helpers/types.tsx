type filterType = "Fylke" | "Kommune" | "All";

type takstType = "TAKST_STOR_BIL" | "TAKST_LITEN_BIL";

/**
 * Represents all the data from a bom
 */
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

/**
 * Data type for how the queries are recived
 */
type queryData = {
  result: {
    numberOfDocuments: number;
    bomstasjoner: bomData[];
  };
};

/**
 * All the props that are visible on a BomCard components
 */
type BomCardProps = {
  name: string;
  fylke: string;
  kommune: string;
  truckPrice: number;
  carPrice: number;
};

export { filterType, takstType, bomData, queryData, BomCardProps };
