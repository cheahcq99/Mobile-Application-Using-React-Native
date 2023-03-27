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
  const [question, setQuestion] = useState(route.params.questionVal);
  const [question1, setQuestion1] = useState(route.params.question1Val);
  const [question2, setQuestion2] = useState(route.params.question2Val);
  const [loading, setLoading] = useState(false);
  console.log(route.params.keyVal);

  const emptyState = () => {
    setQuestion("");
    setQuestion1("");
    setQuestion2("");
  };

  const handlePress = () => {
    setLoading(true);
    if (!question) {
      if (Platform.OS === "ios" || Platform.OS === "android")
        Alert.alert("Car Plate is required");
      else alert("Car Plate is required");
    } else if (!question1) {
      if (Platform.OS === "ios" || Platform.OS === "android")
        Alert.alert("Block and slot number required");
      else alert("Block and slot number required");
    } else if (!question2) {
      if (Platform.OS === "ios" || Platform.OS === "android")
        Alert.alert("Duration of parking required");
      else alert("Duration of parking required");
    } else {
      const d = new Date();
      setLoading(true);
      const db = getFirestore();
      setDoc(doc(db, "Parking", route.params.keyVal), {
        question: question,
        question1: question1,
        question2: question2,
        startDate: route.params.startDateVal,
      })
        .then(() => {
          if (Platform.OS === "ios" || Platform.OS === "android")
            Alert.alert("Document successfully edit!");
          else alert("Document successfully edit!");
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
          middleContent="Edit Parking Detail"
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
              Edit Parking Detail
            </Text>

            <Text>Car Plate</Text>
            <TextInput
              containerStyle={{ marginTop: 15 }}
              placeholder="ABC9999"
              value={question}
              autoCapitalize="none"
              autoCompleteType="on"
              autoCorrect={true}
              onChangeText={(question) => setQuestion(question)}
            />

            <Text style={{ marginTop: 15 }}>Block and Slot number</Text>
            <TextInput
              containerStyle={{ marginTop: 15 }}
              placeholder="Block A SLot 4"
              value={question1}
              autoCapitalize="none"
              autoCompleteType="on"
              autoCorrect={true}
              onChangeText={(question1) => setQuestion1(question1)}
            />

            <Text style={{ marginTop: 15 }}>Parking Duration</Text>
            <TextInput
              containerStyle={{ marginTop: 15 }}
              placeholder="3 hours"
              value={question2}
              autoCapitalize="none"
              autoCompleteType="on"
              autoCorrect={true}
              onChangeText={(question2) => setQuestion2(question2)}
            />

            <Button
              text={loading ? "Loading" : "Done"}
              onPress={() => {
                handlePress();
                navigation.navigate("BlogList");
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
