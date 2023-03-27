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
import { addEvent } from "../API/firebaseMethod2";

export default function({ navigation }) {
  const { isDarkmode } = useTheme();
  const [image, setImage] = useState(null);
  const [eventTitle, seteventTitle] = useState("");
  const [eventDescription, seteventDescription] = useState("");
  const [eventStartDate, setEventStartDate] = useState("");
  const [eventEndDate, setEventEndDate] = useState("");
  const [eventStartTime, setEventStartTime] = useState("");

  const [eventEndTime, setEventEndTime] = useState("");
  //const [date, setDate] = useState("09-10-2020");
  const [loading, setLoading] = useState(false);

  const emptyState = () => {
    setImage(null);
    seteventTitle("");
    seteventDescription("");
    setEventStartDate("");
    setEventEndDate("");
    setEventStartTime("");
    setEventEndTime("");
    //setDate(date);
  };

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const {
          status,
        } = await ImagePicker.requestMediaLibraryPermissionsAsync();
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
    if (!eventTitle) {
      if (Platform.OS === "ios" || Platform.OS === "android")
        Alert.alert("Title is required");
      else alert("Title is required");
    } else if (!eventDescription) {
      if (Platform.OS === "ios" || Platform.OS === "android")
        Alert.alert("Description is required");
      else alert("Description is required");
    } else if (image == null) {
      if (Platform.OS === "ios" || Platform.OS === "android")
        Alert.alert("Image is required.");
      else alert("Image is required.");
    } else if (eventStartDate == null) {
      if (Platform.OS === "ios" || Platform.OS === "android")
        Alert.alert("Event Start Date is required.");
      else alert("Event Start Date is required.");
    } else if (eventEndDate == null) {
      if (Platform.OS === "ios" || Platform.OS === "android")
        Alert.alert("Event End Date is required.");
      else alert("Event End Date is required.");
    } else if (eventStartTime == null) {
      if (Platform.OS === "ios" || Platform.OS === "android")
        Alert.alert("Start Time is required.");
      else alert("Start Time is required.");
    } else if (eventEndTime == null) {
      if (Platform.OS === "ios" || Platform.OS === "android")
        Alert.alert("Start Time is required.");
      else alert("Start Time is required.");
    } else {
      const d = new Date();
      addEvent(
        eventTitle,
        eventDescription,
        eventStartDate,
        eventEndDate,
        eventStartTime,
        eventEndTime,
        image,
        "event_images",
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
          middleContent="Add Event Details"
          leftContent={
            <Ionicons
              name="chevron-back"
              size={30}
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
              Add Event Details
            </Text>
            <Button text="Pick an image" onPress={pickImage} />
            {Image && (
              <Image
                source={{ uri: image }}
                style={{ width: 200, height: 200 }}
              />
            )}

            <Text>Event Title</Text>
            <TextInput
              containerStyle={{ marginTop: 15 }}
              placeholder="EventTitle*"
              value={eventTitle}
              autoCapitalize="none"
              autoCompleteType="on"
              autoCorrect={true}
              onChangeText={(eventTitle) => seteventTitle(eventTitle)}
            />

            <Text style={{ marginTop: 15 }}>Event Description</Text>
            <TextInput
              containerStyle={{ marginTop: 15 }}
              placeholder="EventDescription*"
              value={eventDescription}
              autoCapitalize="none"
              autoCompleteType="on"
              autoCorrect={true}
              onChangeText={(eventDescription) =>
                seteventDescription(eventDescription)
              }
            />

            <Text style={{ marginTop: 15 }}>Event Start Date</Text>
            <TextInput
              containerStyle={{ marginTop: 15 }}
              placeholder="EventStartDate*"
              value={eventStartDate}
              autoCapitalize="none"
              autoCompleteType="on"
              autoCorrect={true}
              onChangeText={(eventStartDate) =>
                setEventStartDate(eventStartDate)
              }
            />

            <Text style={{ marginTop: 15 }}>Event End Date</Text>
            <TextInput
              containerStyle={{ marginTop: 15 }}
              placeholder="EventEndDate*"
              value={eventEndDate}
              autoCapitalize="none"
              autoCompleteType="on"
              autoCorrect={true}
              onChangeText={(eventEndDate) => setEventEndDate(eventEndDate)}
            />

            <Text style={{ marginTop: 15 }}>Event Start Time</Text>
            <TextInput
              containerStyle={{ marginTop: 15 }}
              placeholder="EventTime*"
              value={eventStartTime}
              autoCapitalize="none"
              autoCompleteType="on"
              autoCorrect={true}
              onChangeText={(eventStartTime) =>
                setEventStartTime(eventStartTime)
              }
            />

            <Text style={{ marginTop: 15 }}>Event End Time</Text>
            <TextInput
              containerStyle={{ marginTop: 15 }}
              placeholder="EventTime*"
              value={eventEndTime}
              autoCapitalize="none"
              autoCompleteType="on"
              autoCorrect={true}
              onChangeText={(eventEndTime) => setEventEndTime(eventEndTime)}
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
