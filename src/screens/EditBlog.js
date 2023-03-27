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
  const [name, setName] = useState(route.params.nameVal);
  const [studentid, setStudentID] = useState(route.params.studentidVal);
  const [loading, setLoading] = useState(false);
  console.log(route.params.keyVal);

  const emptyState = () => {
    setName("");
    setStudentID("");
  };

  const handlePress = () => {
    setLoading(true);
    if (!name) {
      if (Platform.OS === "ios" || Platform.OS === "android")
        Alert.alert("Name is required");
      else alert("Name is required");
    } else if (!studentid) {
      if (Platform.OS === "ios" || Platform.OS === "android")
        Alert.alert("Student id is required");
      else alert("Student id is required");
    } else {
      const d = new Date();
      setLoading(true);
      const db = getFirestore();
      setDoc(doc(db, "Blog", route.params.keyVal), {
        name: name,
        studentid: studentid,
        imageURL: route.params.imageURLVal,
        startDate: route.params.startDateVal,
        imageLocation: route.params.imageLocationVal,
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
          middleContent="Edit User Detail"
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
              Edit User Detail
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
            <Text>Name</Text>
            <TextInput
              containerStyle={{ marginTop: 15 }}
              placeholder="Name"
              value={name}
              autoCapitalize="none"
              autoCompleteType="on"
              autoCorrect={true}
              onChangeText={(name) => setName(name)}
            />

            <Text style={{ marginTop: 15 }}>Student ID</Text>
            <TextInput
              containerStyle={{ marginTop: 15 }}
              placeholder="Student ID"
              value={studentid}
              autoCapitalize="none"
              autoCompleteType="on"
              autoCorrect={true}
              onChangeText={(studentid) => setStudentID(studentid)}
            />

            <Button
              text={loading ? "Loading" : "Done"}
              onPress={() => {
                handlePress();
                navigation.navigate("BlockSlotView");
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
