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
import { addExperience } from "../API/firebaseMethods4";

export default function ({ navigation }) {
  const { isDarkmode } = useTheme();
  const [image, setImage] = useState(null);
  const [experienceTitle, setexperienceTitle] = useState("");
  const [experienceDescription, setexperienceDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const emptyState = () => {
    setImage(null);
    setexperienceTitle("");
    setexperienceDescription("");
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
    if (!experienceTitle) {
      if (Platform.OS === "ios" || Platform.OS === "android")
        Alert.alert("Title is required");
      else alert("Title is required");
    } else if (!experienceDescription) {
      if (Platform.OS === "ios" || Platform.OS === "android")
        Alert.alert("Content is required");
      else alert("Content is required");
    } else if (image == null) {
      if (Platform.OS === "ios" || Platform.OS === "android")
        Alert.alert("Image is required.");
      else alert("Image is required.");
    } else {
      const d = new Date();
      addExperience(
        experienceTitle,
        experienceDescription,
        image,
        "experience_images",
        d
      );
      emptyState();
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView behavior="height" enabled style={{ flex: 1 }}>
      <Layout>
        <TopNav
          middleContent="Add Experience Sharing"
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
              Add Experience Sharing
            </Text>
            <Button text="Select an image" onPress={pickImage} />
            {image && (
              <Image
                source={{ uri: image }}
                style={{ width: 200, height: 200 }}
              />
            )}

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
