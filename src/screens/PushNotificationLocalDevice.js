import React, { useState, useEffect } from "react";
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
import * as Notifications from "expo-notifications"
import * as Permissions from "expo-permissions"


// Show notifications when the app is in the foreground
Notifications.setNotificationHandler({
    handleNotification: async () => {
        return {
            shouldShowAlert: true,
        }
    },
})



export default function ({ navigation }) {
    const { isDarkmode } = useTheme();
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [token, setToken] = useState('')


    useEffect(() => {
        // Permission for iOS
        Permissions.getAsync(Permissions.NOTIFICATIONS)
            .then(statusObj => {
                // Check if we already have permission
                if (statusObj.status !== "granted") {
                    // If permission is not there, ask for the same
                    return Permissions.askAsync(Permissions.NOTIFICATIONS)
                }
                return statusObj
            })
            .then(statusObj => {
                // If permission is still not given throw error
                if (statusObj.status !== "granted") {
                    throw new Error("Permission not granted")
                }
            })
            .then(() => {
                return Notifications.getExpoPushTokenAsync()
            })
            .then(response => {
                const deviceToken = response.data
                console.log({ deviceToken })
                setToken(deviceToken)

            })
            .catch(err => {
                return null
            })
    }, [])



    useEffect(() => {
        const receivedSubscription = Notifications.addNotificationReceivedListener(
            notification => {
                console.log("Notification Received!")
                console.log(notification)
            }
        )


        const responseSubscription =
            Notifications.addNotificationResponseReceivedListener(response => {
                console.log("Notification Clicked!")
                console.log(response)
            })
        return () => {
            receivedSubscription.remove()
            responseSubscription.remove()
        }
    }, [])


    const triggerLocalNotificationHandler = () => {
        Notifications.scheduleNotificationAsync({
            content: {
                title: title,
                body: body,
            },
            trigger: { seconds: 5 },
        })
    }


    const triggerPushNotificationHandler = () => {
        fetch("https://exp.host/--/api/v2/push/send", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Accept-Encoding": "gzip,deflate",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                to: token,
                title,
                body,
            }),
        })
    }


    return (
        <Layout>
            <TopNav
                middleContent="Local Notification"
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
                    Local Notification
                </Text>
                <Button
                    title="Trigger Local Notification"
                    text="Trigger Local Notification"
                    onPress={triggerLocalNotificationHandler}
                />
                <TextInput
                    containerStyle={{ marginTop: 15 }}
                    value={title}
                    placeholder="Title"
                    onChangeText={setTitle}
                />
                <TextInput
                    containerStyle={{ marginTop: 15 }}
                    placeholder="Body"
                    onChangeText={setBody}
                />
                <TextInput
                    containerStyle={{ marginTop: 15 }}
                    value={token}
                    placeholder="Token"
                    onChangeText={setToken}
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
