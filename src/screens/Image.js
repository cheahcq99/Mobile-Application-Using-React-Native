import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Layout, TopNav } from "react-native-rapi-ui";


export default function({ navigation }) {
  return (
    <Layout>
      <TopNav
        middleContent="This is the map of UTAR"
        leftContent={<Ionicons name="chevron-back" size={20} />}
        leftAction={() => navigation.goBack()}
      />
      <View style={styles.container}>
        <Image
          source={{
            uri: "https://utar.edu.my/images/kpr/Kampar_Campus_Map.jpg",
          }}
          style={{ width: 380, height: 300 }}
        />

        <Text style={{ color: "white", fontSize: 18}}>
          Hello newbies! If you are uncertain where to park, here's a Map for
          you!
        </Text>

      </View>
    </Layout>
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
