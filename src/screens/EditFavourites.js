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

export default function({ navigation, route }) {
  const { isDarkmode } = useTheme();
  const [question, setQuestion] = useState(route.params.questionVal);
  const [question1, setQuestion1] = useState(route.params.question1Val);
  const [question2, setQuestion2] = useState(route.params.question2Val);
  const [question3, setQuestion3] = useState(route.params.question3Val);
  const [loading, setLoading] = useState(false);
  console.log(route.params.keyVal);

  const emptyState = () => {
    setQuestion("");
    setQuestion1("");
    setQuestion2("");
    setQuestion3("");
  };

  const handlePress = () => {
    setLoading(true);
    if (!question) {
      if (Platform.OS === "ios" || Platform.OS === "android")
        Alert.alert("Name is required");
      else alert("Name is required");
    } else if (!question1) {
      if (Platform.OS === "ios" || Platform.OS === "android")
        Alert.alert("Car Plate number required");
      else alert("Car Plate number required");
    } else if (!question2) {
      if (Platform.OS === "ios" || Platform.OS === "android")
        Alert.alert("Block and slot number required");
      else alert("Block and slot number required");
    } else if (!question3) {
      if (Platform.OS === "ios" || Platform.OS === "android")
        Alert.alert("Parking duration required");
      else alert("Parking duration required");
    } else {
      const d = new Date();
      setLoading(true);
      const db = getFirestore();
      setDoc(doc(db, "Favourites", route.params.keyVal), {
        question: question,
        question1: question1,
        question2: question2,
        question3: question3,
        startDate: route.params.startDateVal,
      })
        .then(() => {
          if (Platform.OS === "ios" || Platform.OS === "android")
            Alert.alert("Favourites updated!");
          else alert("Favourites updated!");
          setLoading(false);
        })
        .catch((error) => {
          if (Platform.OS === "ios" || Platform.OS === "android")
            Alert.alert("Error writing document: ", error);
          else alert("Error writing document: ", error);
          setLoading(false);
        });

      emptyState();
    }
  };

  return (
    <KeyboardAvoidingView behavior="height" enabled style={{ flex: 1 }}>
      <Layout>
        <TopNav
          middleContent="Edit Favourites"
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
              Edit Favourites
            </Text>

            <Text>Name</Text>
            <TextInput
              containerStyle={{ marginTop: 15 }}
              placeholder="Name"
              value={question}
              autoCapitalize="none"
              autoCompleteType="on"
              autoCorrect={true}
              onChangeText={(question) => setQuestion(question)}
            />

            <Text style={{ marginTop: 15 }}>Car Plate number</Text>
            <TextInput
              containerStyle={{ marginTop: 15 }}
              placeholder="ABC9999"
              value={question1}
              autoCapitalize="none"
              autoCompleteType="on"
              autoCorrect={true}
              onChangeText={(question1) => setQuestion1(question1)}
            />

            <Text style={{ marginTop: 15 }}>Block and slot number</Text>
            <TextInput
              containerStyle={{ marginTop: 15 }}
              placeholder="Block A Slot 1"
              value={question2}
              autoCapitalize="none"
              autoCompleteType="on"
              autoCorrect={true}
              onChangeText={(question2) => setQuestion2(question2)}
            />

            <Text style={{ marginTop: 15 }}>Parking duration</Text>
            <TextInput
              containerStyle={{ marginTop: 15 }}
              placeholder="X hours"
              value={question3}
              autoCapitalize="none"
              autoCompleteType="on"
              autoCorrect={true}
              onChangeText={(question3) => setQuestion3(question3)}
            />

            <Button
              text={loading ? "Loading" : "Done"}
              onPress={() => {
                handlePress();
                navigation.navigate("FavouriteList");
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
