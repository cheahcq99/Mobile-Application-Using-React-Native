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
//import { EditEvent } from "../API/firebaseMethods2";

export default function ({ navigation, route }) {
  const { isDarkmode } = useTheme();
  const [imageURL, setImageURL] = useState(route.params.imageURLVal);
  const [eventTitle, seteventTitle] = useState(route.params.eventTitleVal);
  const [eventDescription, seteventDescription] = useState(
    route.params.eventDescriptionVal
  );

  const [eventStartDate, setEventStartDate] = useState(
    route.params.eventStartDateVal
  );
  const [eventEndDate, setEventEndDate] = useState(
    route.params.eventEndDateVal
  );
  const [eventStartTime, setEventStartTime] = useState(
    route.params.eventStartTimeVal
  );
  const [eventEndTime, setEventEndTime] = useState(
    route.params.eventEndTimeVal
  );

  const [loading, setLoading] = useState(false);
  console.log(route.params.keyVal);

  const emptyState = () => {
    seteventTitle("");
    seteventDescription("");
    setEventStartDate("");
    setEventEndDate("");
    setEventStartTime("");
    setEventEndTime("");
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
    } else if (!eventStartDate) {
      if (Platform.OS === "ios" || Platform.OS === "android")
        Alert.alert("Start Date is required.");
      else alert("Event Start Date is required.");
    } else if (!eventEndDate) {
      if (Platform.OS === "ios" || Platform.OS === "android")
        Alert.alert("End Date is required.");
      else alert("End Date is required.");
    } else if (!eventStartTime) {
      if (Platform.OS === "ios" || Platform.OS === "android")
        Alert.alert("Start Time is required.");
      else alert("Start Time is required.");
    } else if (!eventEndTime) {
      if (Platform.OS === "ios" || Platform.OS === "android")
        Alert.alert("Start Time is required.");
      else alert("Start Time is required.");
    } else {
      const d = new Date();
      setLoading(true);
      const db = getFirestore();
      setDoc(doc(db, "Event", route.params.keyVal), {
        eventTitle: eventTitle,
        eventDescription: eventDescription,
        eventStartDate: eventStartDate,
        eventEndDate: eventEndDate,
        eventStartTime: eventStartTime,
        eventEndTime: eventEndTime,
        imageURL: route.params.imageURLVal,
        CreatedBy: route.params.createdByVal,
        startDate: route.params.startDateVal,
        imageLocation: route.params.imageLocationVal,
      })
        .then(() => {
          if (Platform.OS === "ios" || Platform.OS === "android")
            Alert.alert("Document successfully edit!");
          else alert("Document successfully edit!");
        })
        .catch((error) => {
          if (Platform.OS === "ios" || Platform.OS === "android")
            Alert.alert("Error writing document: ", error);
          else alert("Error writing document: ", error);

          setLoading(false);
        });

      // editBlog(
      //   title,
      //  description,
      // route.params.keyVal,
      // route.params.imageURLVal,
      // route.params.createdByVal,
      // route.params.startDateVal,
      // route.params.imageLocationVal
      // );
    }
  };

  return (
    <KeyboardAvoidingView behavior="height" enabled style={{ flex: 1 }}>
      <Layout>
        <TopNav
          middleContent="Edit Event Details"
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
              Edit Event
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
            <Text>Event Title</Text>
            <TextInput
              containerStyle={{ marginTop: 15 }}
              placeholder="Event Title*"
              value={eventTitle}
              autoCapitalize="none"
              autoCompleteType="on"
              autoCorrect={true}
              onChangeText={(eventTitle) => seteventTitle(eventTitle)}
            />

            <Text style={{ marginTop: 15 }}>Event Description</Text>
            <TextInput
              containerStyle={{ marginTop: 15 }}
              placeholder="Description*"
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
              placeholder="EventStartTime*"
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
              placeholder="EventEndTime*"
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
