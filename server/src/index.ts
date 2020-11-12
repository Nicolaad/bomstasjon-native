const Express = require("express");
const { graphqlHTTP } = require("express-graphql");
const mongoose = require("mongoose");

const {
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLType,
  GraphQLSchema,
  GraphQLNotNull,
  GraphQLObjectType,
  GraphQLInt,
} = require("graphql");

var app = Express();
var cors = require("cors");
const { SchemaDirectiveVisitor } = require("apollo-server");
const { resolve } = require("dns");

//Connect to our Mongo database through mongoose
const db = mongoose
  .connect("mongodb://it2810-15.idi.ntnu.no:27017/bomstasjoner", {
    auth: {
      user: "admin",
      password: "123",
    },
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to the database... "))
  .catch((err: Error) => console.log(err));

//Create a model of how a toll station should look like
const bomstasjonModel = mongoose.model(
  "bomstasjoner",
  new mongoose.Schema(
    {
      NAVN_BOMPENGEANLEGG_FRA_CS: { type: String },
      LINK_TIL_BOMSTASJON: { type: String },
      NAVN_BOMSTASJON: { type: String },
      TAKST_LITEN_BIL: { type: Number },
      TAKST_STOR_BIL: { type: Number },
      KOMMUNE: { type: String },
      FYLKE: { type: String },
      VEGKATEGORI: { type: String },
      INNKREVNINGSRETNING: { type: GraphQLString },
      TIMESREGEL: { type: GraphQLString },
    },
    { collection: "bomstasjoner" }
  )
);

//Define the model in GraphQL
const bomstasjonType = new GraphQLObjectType({
  name: "bomstasjoner",
  fields: {
    id: { type: GraphQLID }!,
    NAVN_BOMPENGEANLEGG_FRA_CS: { type: GraphQLString },
    LINK_TIL_BOMSTASJON: { type: GraphQLString },
    NAVN_BOMSTASJON: { type: GraphQLString },
    TAKST_LITEN_BIL: { type: GraphQLInt },
    TAKST_STOR_BIL: { type: GraphQLInt },
    KOMMUNE: { type: GraphQLString },
    FYLKE: { type: GraphQLString },
    VEGKATEGORI: { type: GraphQLString },
    INNKREVNINGSRETNING: { type: GraphQLString },
    TIMESREGEL: { type: GraphQLString },
  },
});

//Define a result type, that consists of a list of toll stations and the possibility to send a number
const bomstasjonResult = new GraphQLObjectType({
  name: "bomstasjonerResult",
  fields: {
    bomstasjoner: { type: GraphQLList(bomstasjonType) },
    numberOfDocuments: { type: GraphQLInt },
  },
});

//Our queries and mutations
//We do not use all of these now, but they are there if we need them in the future.
const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "Query",
    fields: {
      //Return all
      bomstasjoner: {
        type: GraphQLList(bomstasjonType),
        resolve: () => {
          return bomstasjonModel.find().exec();
        },
      },
      //Return all with specified county
      bomstasjonerByFylke: {
        type: GraphQLList(bomstasjonType),
        args: { FYLKE: { type: GraphQLString } },
        resolve: (_: any, args: any) => {
          return bomstasjonModel
            .find({ FYLKE: new RegExp(args.FYLKE, "i") })
            .exec();
        },
      },
      //Return all with specified municipality
      bomstasjonerByKommune: {
        type: GraphQLList(bomstasjonType),
        args: { KOMMUNE: { type: GraphQLString } },
        resolve: (_: any, args: any) => {
          return bomstasjonModel
            .find({ KOMMUNE: new RegExp(args.KOMMUNE, "i") })
            .exec();
        },
      },
      //Return all with specifed road category
      bomstasjonerByVegkategori: {
        type: GraphQLList(bomstasjonType),
        args: { VEGKATEGORI: { type: GraphQLString } },
        resolve: (_: any, args: any) => {
          return bomstasjonModel
            .find({ VEGKATEGORI: new RegExp(args.VEGKATEGORI, "i") })
            .exec();
        },
      },
      //Return all with specified owner name
      bomstasjonerByBompengeAnlegg: {
        type: GraphQLList(bomstasjonType),
        args: { BOMPENGE_ANLEGG: { type: GraphQLString } },
        resolve: (_: any, args: any) => {
          return bomstasjonModel
            .find({
              NAVN_BOMPENGEANLEGG_FRA_CS: new RegExp(args.BOMPENGE_ANLEGG, "i"),
            })
            .exec();
        },
      },
      //Return all with specified link to the owner of the toll station
      bomstasjonerByLinkBompengeAnlegg: {
        type: GraphQLList(bomstasjonType),
        args: { LINK: { type: GraphQLString } },
        resolve: (_: any, args: any) => {
          return bomstasjonModel
            .find({ LINK_TIL_BOMSTASJON: new RegExp(args.LINK, "i") })
            .exec();
        },
      },
      //Return all with specified name
      bomstasjonerByNavn: {
        type: GraphQLList(bomstasjonType),
        args: { NAVN: { type: GraphQLString } },
        resolve: (_: any, args: any) => {
          return bomstasjonModel
            .find({ NAVN_BOMSTASJON: new RegExp(args.NAVN, "i") })
            .exec();
        },
      },
      //Return all with specified rate for small cars
      bomstasjonerByTakstLitenBil: {
        type: GraphQLList(bomstasjonType),
        args: { TAKST_LITEN_BIL: { type: GraphQLString } },
        resolve: (_: any, args: any) => {
          return bomstasjonModel
            .find({ TAKST_LITEN_BIL: new RegExp(args.TAKST_LITEN_BIL, "i") })
            .exec();
        },
      },
      //Return all with specified rate for big cars
      bomstasjonerByTakstStorBil: {
        type: GraphQLList(bomstasjonType),
        args: { TAKST_STOR_BIL: { type: GraphQLString } },
        resolve: (_: any, args: any) => {
          return bomstasjonModel
            .find({ TAKST_STOR_BIL: new RegExp(args.TAKST_STOR_BIL, "i") })
            .exec();
        },
      },
      //Here you can specify all different paramters, add a limit, start index, range of rate for small and big cars and the direction of sorting
      bomstasjonerByAll: {
        type: bomstasjonResult,
        args: {
          FYLKE: { type: GraphQLString },
          KOMMUNE: { type: GraphQLString },
          VEGKATEGORI: { type: GraphQLString },
          NAVN_BOMPENGEANLEGG_FRA_CS: { type: GraphQLString },
          LINK_TIL_BOMSTASJON: { type: GraphQLString },
          NAVN: { type: GraphQLString },
          TAKST_LITEN_BIL: { type: GraphQLString },
          TAKST_STOR_BIL: { type: GraphQLString },
          start: { type: GraphQLInt },
          limit: { type: GraphQLInt, defaultValue: 10 },
          fromSmall: { type: GraphQLInt, defaultValue: 0 },
          toSmall: { type: GraphQLInt, defaultValue: 99999999 },
          fromLarge: { type: GraphQLInt, defaultValue: 0 },
          toLarge: { type: GraphQLInt, defaultValue: 99999999 },
          sortDirection: { type: GraphQLString },
        },
        resolve: async (_: any, args: any) => {
          let numberOfDocuments = 0;

          //Count how many documents with specified paramters
          await bomstasjonModel.countDocuments(
            {
              FYLKE: new RegExp(args.FYLKE, "i"),
              KOMMUNE: new RegExp(args.KOMMUNE, "i"),
              VEGKATEGORI: new RegExp(args.VEGKATEGORI, "i"),
              NAVN_BOMPENGEANLEGG_FRA_CS: new RegExp(args.BOMPENGE_ANLEGG, "i"),
              LINK_TIL_BOMSTASJON: new RegExp(args.LINK_TIL_BOMSTASJON, "i"),
              NAVN_BOMSTASJON: new RegExp(args.NAVN, "i"),
              TAKST_LITEN_BIL: {
                $gte: args.fromSmall,
                $lte: args.toSmall,
              },
              TAKST_STOR_BIL: {
                $gte: args.fromLarge,
                $lte: args.toLarge,
              },
            },
            function (err: Error, count: number) {
              if (err) {
                console.log(err);
              } else {
                numberOfDocuments = count;
              }
            }
          );

          const shouldSort =
            (args.toSmall === 99999999 && args.toLarge !== 99999999) ||
            (args.toSmall !== 99999999 && args.toLarge === 99999999);

          //Find all the documents with the specified paramters
          //Can also sort, limit, define index
          const bomstasjoner = await bomstasjonModel
            .find({
              FYLKE: new RegExp(args.FYLKE, "i"),
              KOMMUNE: new RegExp(args.KOMMUNE, "i"),
              VEGKATEGORI: new RegExp(args.VEGKATEGORI, "i"),
              NAVN_BOMPENGEANLEGG_FRA_CS: new RegExp(args.BOMPENGE_ANLEGG, "i"),
              LINK_TIL_BOMSTASJON: new RegExp(args.LINK_TIL_BOMSTASJON, "i"),
              NAVN_BOMSTASJON: new RegExp(args.NAVN, "i"),
              TAKST_LITEN_BIL: {
                $gte: args.fromSmall,
                $lte: args.toSmall,
              },
              TAKST_STOR_BIL: {
                $gte: args.fromLarge,
                $lte: args.toLarge,
              },
            })
            .skip(Math.max(0, args.start))
            .limit(args.limit)
            .sort(
              !shouldSort
                ? {}
                : args.toSmall === 99999999
                ? { TAKST_STOR_BIL: args.sortDirection }
                : { TAKST_LITEN_BIL: args.sortDirection }
            )
            .exec();
          return { bomstasjoner, numberOfDocuments };
        },
      },
    },
  }),
  //A mutation to create a new toll station
  mutation: new GraphQLObjectType({
    name: "Create",
    fields: {
      bomstasjoner: {
        type: bomstasjonType,
        args: {
          NAVN_BOMPENGEANLEGG_FRA_CS: { type: GraphQLString },
          LINK_TIL_BOMSTASJON: { type: GraphQLString },
          NAVN_BOMSTASJON: { type: GraphQLString },
          TAKST_LITEN_BIL: { type: GraphQLInt },
          TAKST_STOR_BIL: { type: GraphQLInt },
          KOMMUNE: { type: GraphQLString },
          FYLKE: { type: GraphQLString },
          VEGKATEGORI: { type: GraphQLString },
        },
        resolve: (_: any, args: any) => {
          let bomstasjon = new bomstasjonModel(args);
          return bomstasjon.save();
        },
      },
    },
  }),
});

//Start server
app.use(
  "/bomstasjoner",
  cors(),
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);

app.listen(3001, () => {
  console.log("Server is running on http://localhost:3001");
});
