import React, { useState } from "react";
import { View, Alert, Platform } from "react-native";
import {
  Layout,
  TopNav,
  Text,
  TextInput,
  Button,
  useTheme,
  themeColor,
} from "react-native-rapi-ui";
import { Ionicons } from "@expo/vector-icons";
import { getFirestore, addDoc, collection } from "firebase/firestore";

export default function ({ navigation }) {
  const { isDarkmode } = useTheme();
  const [question, setQuestion] = useState("");
  const [question1, setQuestion1] = useState("");
  const [question2, setQuestion2] = useState("");
  const [question3, setQuestion3] = useState("");
  const [loading, setLoading] = useState(false);

  async function AddFavourites() {
    setLoading(true);
    const db = getFirestore();
    const startDate = new Date();
    await addDoc(collection(db, "Favourites"), {
      question: question,
      question1: question1,
      question2: question2,
      question3: question3,
      startDate: startDate,
    })
      .then((docRef) => {
        setLoading(false);

        setQuestion("");
        setQuestion1("");
        setQuestion2("");
        setQuestion3("");
        if (Platform.OS === "ios" || Platform.OS === "android")
          Alert.alert(
            "Your booking has been added to favourites. Document written with ID: ",
            docRef.id
          );
        else
          alert(
            "Your booking has been added to favourites. Document written with ID: " +
              docRef.id
          );
      })
      .catch((error) => {
        if (Platform.OS === "ios" || Platform.OS === "android")
          Alert.alert("Error adding document: ", error);
        else alert("Error adding document: " + error);
      });
  }

  return (
    <Layout>
      <TopNav
        middleContent="Add Favourites"
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
          flex: 3,
          paddingHorizontal: 20,
          paddingBottom: 20,
          backgroundColor: isDarkmode ? themeColor.dark : themeColor.white,
        }}
      >
        <Text
          size="h3"
          fontWeight="bold"
          style={{
            alignSelf: "center",
            padding: 30,
          }}
        >
          Add Favourites
        </Text>
        <Text>Name</Text>
        <TextInput
          containerStyle={{ marginTop: 15 }}
          placeholder="Enter your name"
          value={question}
          onChangeText={(text) => setQuestion(text)}
        />
        <Text>Car Plate</Text>
        <TextInput
          containerStyle={{ marginTop: 15 }}
          placeholder="Enter your car plate number"
          value={question1}
          onChangeText={(text) => setQuestion1(text)}
        />
        <Text>Block and Slot number</Text>
        <TextInput
          containerStyle={{ marginTop: 15 }}
          placeholder="Enter your block and slot"
          value={question2}
          onChangeText={(text) => setQuestion2(text)}
        />
        <Text>Parking duration</Text>
        <TextInput
          containerStyle={{ marginTop: 15 }}
          placeholder="Enter your parking duration"
          value={question3}
          onChangeText={(text) => setQuestion3(text)}
        />
        <Button
          text={loading ? "Loading" : "Add to favourites"}
          onPress={() => {
            AddFavourites();
            navigation.navigate("BlogList");
          }}
          style={{
            marginTop: 20,
          }}
          disabled={loading}
        />
      </View>
    </Layout>
  );
}
