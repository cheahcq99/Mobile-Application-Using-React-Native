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
  const [imageURL] = useState(route.params.imageURLVal);
  const [title, setTitle] = useState(route.params.titleVal);
  const [task, setTask] = useState(route.params.taskVal);
  const [Name, setName] = useState(route.params.NameVal);
  const [description, setDescription] = useState(route.params.descriptionVal);
  const [remarks, setRemarks] = useState(route.params.remarksVal);
  const [loading, setLoading] = useState(false);
  console.log(route.params.keyVal);
  const handlePress = () => {
    setLoading(true);
    if (!title) {
      if (Platform.OS === "ios" || Platform.OS === "android")
        Alert.alert("Title is required");
      else alert("Title is required");
    } else if (!description) {
      if (Platform.OS === "ios" || Platform.OS === "android")
        Alert.alert("Description is required");
      else alert("Description is required");
    } else if (!remarks) {
      if (Platform.OS === "ios" || Platform.OS === "android")
        Alert.alert("Remarks is required");
      else alert("Remarks is required");
    } else {
      const d = new Date();
      setLoading(true);
      const db = getFirestore();
      setDoc(doc(db, "Volunteer", route.params.keyVal), {
        title: title,
        description: description,
        remarks: remarks,
        imageURL: route.params.imageURLVal,
        CreatedBy: route.params.createdByVal,
        startDate: route.params.startDateVal,
        imageLocation: route.params.imageLocationVal,
      });
      setDoc(doc(db, "LineGraph", route.params.keyVal), {
        Name: Name,
        task: task,
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
    }
  };
  return (
    <KeyboardAvoidingView behavior="height" enabled style={{ flex: 1 }}>
      <Layout>
        <TopNav
          middleContent="Edit Volunteer"
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
              Edit Blog
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
            <Text>Volunteer ID</Text>
            <TextInput
              containerStyle={{ marginTop: 15 }}
              placeholder="Volunteer ID*"
              value={title}
              autoCapitalize="none"
              autoCompleteType="on"
              autoCorrect={true}
              onChangeText={(title) => setTitle(title)}
            />
            <Text style={{ marginTop: 15 }}>Age</Text>
            <TextInput
              containerStyle={{ marginTop: 15 }}
              placeholder="Age*"
              value={description}
              autoCapitalize="none"
              autoCompleteType="on"
              autoCorrect={true}
              onChangeText={(description) => setDescription(description)}
            />
            <Text style={{ marginTop: 15 }}>Remarks</Text>
            <TextInput
              containerStyle={{ marginTop: 15 }}
              placeholder="Remarks*"
              value={remarks}
              autoCapitalize="none"
              autoCompleteType="on"
              autoCorrect={true}
              onChangeText={(remarks) => setRemarks(remarks)}
            />
            <Text>Name</Text>
            <TextInput
              containerStyle={{ marginTop: 15 }}
              placeholder="Name*"
              value={Name}
              autoCapitalize="none"
              autoCompleteType="on"
              autoCorrect={true}
              onChangeText={(Name) => setName(Name)}
            />
            <Text>Total Task Today</Text>
            <TextInput
              containerStyle={{ marginTop: 15 }}
              placeholder="Total Task Today*"
              value={task}
              autoCapitalize="none"
              autoCompleteType="on"
              autoCorrect={true}
              onChangeText={(task) => setTask(task)}
            />
            <Button
              text={loading ? "Loading" : "Done"}
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
