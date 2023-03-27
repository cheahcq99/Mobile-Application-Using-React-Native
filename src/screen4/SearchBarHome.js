import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  KeyboardAvoidingView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  StatusBar,
  FlatList,
  TouchableOpacity,
  TextInput,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { Layout, TopNav, useTheme, themeColor } from "react-native-rapi-ui";
import Searchbar from "./SearchBar";

export default function({ navigation }) {
  //export default function SearchFilterBarHome() {
  const [value, setValue] = useState();
  const { isDarkmode } = useTheme();
  function updateSearch(value) {
    //do your search logic or anything
    console.log(value);
  }
  return (
    <KeyboardAvoidingView behavior="height" enabled style={{ flex: 1 }}>
      <Layout>
        <TopNav
          middleContent="Search"
          leftContent={
            <Ionicons
              name="chevron-back"
              size={20}
              color={isDarkmode ? themeColor.white100 : themeColor.black}
            />
          }
          leftAction={() => navigation.goBack()}
        />
        <View style={styles.container}>
          <View
            style={{
              height: "20%",
              backgroundColor: "#3F569C",
              borderRadius: 10,
            }}
          >
            <Image
              style={{ marginTop: "15%", marginLeft: "5%" }}
              //source={require("../../assets/ic_back.png")}
            />
            <Searchbar
              value={value}
              updateSearch={updateSearch}
              style={{ marginTop: "8%" }}
            />
          </View>
        </View>
      </Layout>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'red', height: '100%', width: '100%'
  },
});
