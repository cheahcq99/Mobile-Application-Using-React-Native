import React, { useState, useEffect } from "react";
import { View, Linking, Image, StyleSheet } from "react-native";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import {
  Layout,
  Button,
  Text,
  TopNav,
  Section,
  SectionContent,
  useTheme,
} from "react-native-rapi-ui";
import { Ionicons } from "@expo/vector-icons";
export default function({ navigation }) {
  const { isDarkmode, setTheme } = useTheme();
  const [display_name, setDisplayName] = useState("");
  const [photoURL, setPhotoURL] = useState(
    "https://image.shutterstock.com/image-vector/man-icon-vector-260nw-1040084344.jpg"
  );
  const auth = getAuth();

  useEffect(() => {
    getUserInformation();
  }, []);

  async function getUserInformation() {
    await onAuthStateChanged(auth, (u) => {
      if (u) {
        //alert(u.displayName)
        setDisplayName(u.displayName);
        setPhotoURL(u.photoURL);
        // getUserData();
      } else {
        setUser(false);
        // setUserData(null);
      }
    });
  }

  return (
    <Layout>
      <TopNav
        middleContent="Choose Your Block"
        leftContent={<Ionicons name="chevron-back" size={20} />}
        leftAction={() => navigation.goBack()}
      />
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          marginHorizontal: 20,
        }}
      >
        <Section>
          <SectionContent>
            <Text fontWeight="bold" style={{ textAlign: "center" }}>
              Parking Sites
            </Text>

            <Button
              text="Block A"
              onPress={() => {
                navigation.navigate("BlockA");
              }}
              style={{
                marginTop: 10,
              }}
            />
            <Button
              text="Block B"
              onPress={() => {
                navigation.navigate("BlockB");
              }}
              style={{
                marginTop: 10,
              }}
            />
            <Button
              text="Block H"
              onPress={() => {
                navigation.navigate("BlockH");
              }}
              style={{
                marginTop: 10,
              }}
            />
            <Button
              text="Block N"
              onPress={() => {
                navigation.navigate("BlockN");
              }}
              style={{
                marginTop: 10,
              }}
            />
            <Button
              color="green"
              text="Block View"
              onPress={() => {
                navigation.navigate("Image");
              }}
              style={{
                marginTop: 10,
              }}
            />
          </SectionContent>
        </Section>
      </View>
    </Layout>
  );
}
