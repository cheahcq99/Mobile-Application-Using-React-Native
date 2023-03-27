import React, { useState } from "react";
import { View } from "react-native";
import {
  Layout,
  TopNav,
  Text,
  themeColor,
  useTheme,
} from "react-native-rapi-ui";
import MapView, { Marker } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";

export default function ({ navigation }) {
  const { isDarkmode } = useTheme();

  const [mapRegion, setmapRegion] = useState({
    latitude: 4.334750711688257,
    longitude: 101.13513169737814,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  return (
    <Layout>
      <TopNav
        middleContent="UTAR Map"
        leftContent={
          <Ionicons
            name="chevron-back"
            size={20}
            color={isDarkmode ? themeColor.white100 : themeColor.black}
          />
        }
        leftAction={() => navigation.goBack()}
      />
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <MapView
          style={{ alignSelf: "stretch", height: "100%" }}
          region={mapRegion}
        >
          <Marker coordinate={mapRegion} title="Marker" />
        </MapView>
      </View>
    </Layout>
  );
}
