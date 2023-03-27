import React, { useState, useEffect } from "react";
import {
  View,
  Linking,
  Image,
  ImageBackground,
  StyleSheet,
} from "react-native";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import {
  Layout,
  Button,
  Text,
  TopNav,
  Section,
  SectionContent,
  useTheme,
  themeColor,
} from "react-native-rapi-ui";
import { Ionicons } from "@expo/vector-icons";

export default function({ navigation }) {
  const { isDarkmode, setTheme } = useTheme();
  const [display_name, setDisplayName] = useState("");
  const [photoURL, setPhotoURL] = useState(
    "https://image.shutterstock.com/image-vector/man-icon-vector-260nw-1040084344.jpg"
  );
  const auth = getAuth();
  const Tab = createBottomTabNavigator();

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
        middleContent="Experience Sharing System"
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
          marginHorizontal: 20,
        }}
      >
        <Section>
          <SectionContent>
            <Text fontWeight="bold" style={{ textAlign: "center" }}>
              Experience Sharing System
            </Text>

            <Button
              text="Add Experience Sharing"
              onPress={() => {
                navigation.navigate("AddExperienceSharing");
              }}
              style={{
                marginTop: 10,
              }}
            />

            <Button
              text="Experience Sharing List"
              onPress={() => {
                navigation.navigate("ExperienceSharingList");
              }}
              style={{
                marginTop: 10,
              }}
            />

            <Button
              text="Search Bar"
              onPress={() => {
                navigation.navigate("SearchBarHome");
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
