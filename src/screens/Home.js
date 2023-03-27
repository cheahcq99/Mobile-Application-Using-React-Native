import React, { useState, useEffect } from "react";
import {
  View,
  Linking,
  Image,
  ImageBackground,
  StyleSheet,
} from "react-native";
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

export default function ({ navigation }) {
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
              UTAR MENU
            </Text>

            <Button
              color="greenyellow"
              text="Parking"
              onPress={() => {
                navigation.navigate("Module1");
              }}
              style={{
                marginTop: 10,
              }}
            />
            <Button
              color="aqua"
              text="Volunteer"
              onPress={() => {
                navigation.navigate("Module2");
              }}
              style={{
                marginTop: 10,
              }}
            />
            <Button
              color="fuchsia"
              text="Event Management"
              onPress={() => {
                navigation.navigate("Module3");
              }}
              style={{
                marginTop: 10,
              }}
            />

            <Button
              color="gold"
              text="Experience sharing"
              onPress={() => {
                navigation.navigate("Module4");
              }}
              style={{
                marginTop: 10,
              }}
            />

            <Button
              status="danger"
              text="Logout"
              onPress={() => {
                signOut(auth);
              }}
              style={{
                marginTop: 10,
              }}
            />
            <Button
              color="grey"
              text={isDarkmode ? "Light Mode" : "Dark Mode"}
              status={isDarkmode ? "success" : "warning"}
              onPress={() => {
                if (isDarkmode) {
                  setTheme("light");
                } else {
                  setTheme("dark");
                }
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
