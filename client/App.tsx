import React from "react";
import { StyleSheet, Text, View } from "react-native";
import SearchBox from "./components/SearchBox";

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ResultsDisplay from "./components/ResultsDisplay";
import { Provider } from "react-redux";
import store from "./components/state/store";

// Initialize Apollo Client
const client = new ApolloClient({
  uri: "http://it2810-15.idi.ntnu.no:3000/bomstasjoner",
  cache: new InMemoryCache(),
});

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Search"
              component={SearchBox}
              options={{ title: "Welcome" }}
            />
            <Stack.Screen name="Results" component={ResultsDisplay} />
          </Stack.Navigator>
        </NavigationContainer>
      </ApolloProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
