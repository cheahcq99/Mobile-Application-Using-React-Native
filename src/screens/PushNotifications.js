import React, { useEffect, useState } from "react";
import { StyleSheet, View, Alert, Platform } from "react-native";
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
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import { getFirestore, collection, onSnapshot } from "firebase/firestore";
import { Picker } from "@react-native-picker/picker";

// Show notifications when the app is in the foreground
Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldShowAlert: true,
    };
  },
});

export default function App({ navigation }) {
  const { isDarkmode } = useTheme();
  const [title, setTitle] = useState();
  const [body, setBody] = useState();
  const [selectedValue, setSelectedValue] = useState("");
  const [notificationList, setNotificationList] = useState([]);

  const db = getFirestore();

  useEffect(() => {
    // Permission for iOS
    Permissions.getAsync(Permissions.NOTIFICATIONS)
      .then((statusObj) => {
        // Check if we already have permission
        if (statusObj.status !== "granted") {
          // If permission is not there, ask for the same
          return Permissions.askAsync(Permissions.NOTIFICATIONS);
        }
        return statusObj;
      })
      .then((statusObj) => {
        // If permission is still not given throw error
        if (statusObj.status !== "granted") {
          throw new Error("Permission not granted");
        }
      })
      .then(() => {
        return Notifications.getExpoPushTokenAsync();
      })
      .then((response) => {
        const deviceToken = response.data;
        console.log({ deviceToken });

        //addNotification(deviceToken);
      })
      .catch((err) => {
        return null;
      });
  }, []);

  useEffect(() => {
    const receivedSubscription = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log("Notification Received!");
        console.log(notification);
      }
    );

    const responseSubscription =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log("Notification Clicked!");
        console.log(response);
      });
    return () => {
      receivedSubscription.remove();
      responseSubscription.remove();
    };
  }, []);

  useEffect(() => {
    getUserTokenList();
  }, []);

  const getUserTokenList = async () => {
    const subscriber = onSnapshot(collection(db, "users"), (querySnapshot) => {
      const notifications = [];

      querySnapshot.forEach((doc) => {
        notifications.push({
          ...doc.data(),
          key: doc.id,
        });
      });

      setNotificationList(notifications);

      setSelectedValue(notifications[0].tokenId);
    });
  };

  const renderUserTokenList = () => {
    return notificationList.map((element) => {
      return (
        <Picker.Item
          label={element.email}
          value={element.notificationToken}
          key={element.email}
        />
      );
    });
  };

  const triggerLocalNotificationHandler = () => {
    Notifications.scheduleNotificationAsync({
      content: {
        title: title,
        body: body,
      },
      trigger: { seconds: 5 },
    });
  };

  const triggerPushNotificationHandler = () => {
    fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Accept-Encoding": "gzip,deflate",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: selectedValue,
        title,
        body,
      }),
    });
  };

  return (
    <Layout>
      <TopNav
        middleContent="Push Notification to Other Device"
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
          Push Notification to Other Device
        </Text>

        <Button
          title="Trigger Local Notification"
          text="Trigger Local Notification"
          onPress={triggerLocalNotificationHandler}
        />

        <Picker
          selectedValue={selectedValue}
          style={styles.textInput}
          onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
        >
          {renderUserTokenList()}
        </Picker>

        <TextInput
          containerStyle={{ marginTop: 15 }}
          value={title}
          placeholder="Title"
          onChangeText={setTitle}
        />
        <TextInput
          containerStyle={{ marginTop: 15 }}
          value={body}
          placeholder="Body"
          onChangeText={setBody}
        />
        <Button
          title="Trigger Push Notification"
          text="Trigger Push Notification"
          onPress={triggerPushNotificationHandler}
        />
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  textInput: {
    borderBottomWidth: 1,
    padding: 5,
    margin: 15,
    width: "80%",
  },
});
