import React, { useState } from "react";
import {
  TouchableOpacity,
  KeyboardAvoidingView,
  Image,
  View,
  Platform,
  ScrollView,
  Keyboard,
  StyleSheet,
  SafeAreaView,
  Alert,
} from "react-native";
import {
  Layout,
  TopNav,
  Text,
  TextInput,
  Button,
  themeColor,
  useTheme,
} from "react-native-rapi-ui";
import { Ionicons } from "@expo/vector-icons";
import {
  getFirestore,
  doc,
  setDoc,
  addDoc,
  collection,
} from "firebase/firestore";

export default function ({ navigation, route }) {
  const { isDarkmode } = useTheme();
  const [imageURL, setImageURL] = useState(route.params.imageURLVal);
  const [experienceTitle, setexperienceTitle] = useState(
    route.params.experienceTitleVal
  );
  const [experienceDescription, setexperienceDescription] = useState(
    route.params.experienceDescriptionVal
  );
  const [loading, setLoading] = useState(false);
  console.log(route.params.keyVal);

  const emptyState = () => {
    setexperienceTitle("");
    setexperienceDescription("");
  };

  const handlePress = () => {
    setLoading(true);
    if (!experienceTitle) {
      if (Platform.OS === "ios" || Platform.OS === "android")
        Alert.alert("Title is required");
      else alert("Title is required");
    } else if (!experienceDescription) {
      if (Platform.OS === "ios" || Platform.OS === "android")
        Alert.alert("Content is required");
      else alert("Content is required");
    } else {
      const d = new Date();
      setLoading(true);
      const db = getFirestore();
      setDoc(doc(db, "Experience", route.params.keyVal), {
        experienceTitle: experienceTitle,
        experienceDescription: experienceDescription,
        imageURL: route.params.imageURLVal,
        //createdBy: route.params.createdByVal,
        startDate: route.params.startDateVal,
        imageLocation: route.params.imageLocationVal,
      })
        .then(() => {
          if (Platform.OS === "ios" || Platform.OS === "android")
            Alert.alert("Feeds successfully edit!");
          else alert("Feeds successfully edit!");
          setLoading(false);
        })
        .catch((error) => {
          if (Platform.OS === "ios" || Platform.OS === "android")
            Alert.alert("Error editing feeds: ", error);
          else alert("Error editing feeds: ", error);

          setLoading(false);
        });
    }
  };

  return (
    <KeyboardAvoidingView behavior="height" enabled style={{ flex: 1 }}>
      <Layout>
        <TopNav
          middleContent="Edit Experience Sharing"
          leftContent={
            <Ionicons
              name="chevron-back"
              size={20}
              color={isDarkmode ? themeColor.white100 : themeColor.black}
            />
          }
          leftAction={() => navigation.goBack()}
        />
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
          }}
        >
          <View
            style={{
              flex: 3,
              paddingHorizontal: 20,
              paddingBottom: 20,
              backgroundColor: isDarkmode ? themeColor.dark : themeColor.white,
            }}
          >
            <Text
              fontWeight="bold"
              style={{
                alignSelf: "center",
                padding: 30,
              }}
              size="h3"
            >
              Edit Experience Sharing
            </Text>
            <Image
              source={{ uri: imageURL }}
              style={{
                width: 150,
                height: 150,
                borderWidth: 2,
                borderColor: "#d35647",
                resizeMode: "contain",
                margin: 8,
              }}
            />
            <Text>Experience Sharing Title</Text>
            <TextInput
              containerStyle={{ marginTop: 15 }}
              placeholder="Title*"
              value={experienceTitle}
              autoCapitalize="none"
              autoCompleteType="on"
              autoCorrect={true}
              onChangeText={(experienceTitle) =>
                setexperienceTitle(experienceTitle)
              }
            />

            <Text style={{ marginTop: 15 }}>Content</Text>
            <TextInput
              containerStyle={{ marginTop: 15 }}
              placeholder="What's on your mind*"
              value={experienceDescription}
              autoCapitalize="none"
              autoCompleteType="on"
              autoCorrect={true}
              onChangeText={(experienceDescription) =>
                setexperienceDescription(experienceDescription)
              }
            />
            <Button
              text={loading ? "Loading" : "Post"}
              onPress={() => {
                handlePress();
              }}
              style={{
                marginTop: 20,
              }}
              disabled={loading}
            />
          </View>
        </ScrollView>
      </Layout>
    </KeyboardAvoidingView>
  );
}
