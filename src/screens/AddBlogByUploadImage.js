import React, { useState, useEffect } from "react";
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
import * as ImagePicker from "expo-image-picker";
import { addBlog } from "../API/firebaseMethods";

export default function ({ navigation }) {
  const { isDarkmode } = useTheme();
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [studentid, setStudentID] = useState("");
  const [loading, setLoading] = useState(false);

  const emptyState = () => {
    setImage(null);
    setName("");
    setStudentID("");
  };

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const handlePress = () => {
    setLoading(true);
    if (!name) {
      if (Platform.OS === "ios" || Platform.OS === "android")
        Alert.alert("Name is required");
      else alert("Name is required");
    } else if (!studentid) {
      if (Platform.OS === "ios" || Platform.OS === "android")
        Alert.alert("Student ID is required");
      else alert("Student ID is required");
    } else if (image == null) {
      if (Platform.OS === "ios" || Platform.OS === "android")
        Alert.alert("Image is required.");
      else alert("Image is required.");
    } else {
      const d = new Date();
      addBlog(name, studentid, image, "blog_images", d);
      emptyState();
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView behavior="height" enabled style={{ flex: 1 }}>
      <Layout>
        <TopNav
          middleContent="Please insert your student ID"
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
              Student Information
            </Text>
            <Button text="Pick an image from camera roll" onPress={pickImage} />
            {image && (
              <Image
                source={{ uri: image }}
                style={{ width: 200, height: 200 }}
              />
            )}

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
                navigation.navigate("ParkingDetail");
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
