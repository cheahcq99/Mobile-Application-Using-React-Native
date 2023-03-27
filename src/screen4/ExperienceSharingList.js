import React, { useEffect, useState } from "react";

import {
  View,
  Platform,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight,
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Image,
} from "react-native";

import {
  Layout,
  Text,
  TopNav,
  useTheme,
  themeColor,
} from "react-native-rapi-ui";

import {
  getFirestore,
  doc,
  onSnapshot,
  collection,
  deleteDoc,
} from "firebase/firestore";

import { getStorage, ref, deleteObject } from "firebase/storage";

import { SwipeListView } from "react-native-swipe-list-view";
import { Ionicons } from "@expo/vector-icons";

export default function ({ navigation }) {
  const { isDarkmode } = useTheme();
  const db = getFirestore();

  const storage = getStorage();

  const [loading, setLoading] = useState(true); // Set loading to true on component mount

  const [experience, setExperience] = useState(); // Initial empty

  useEffect(() => {
    const subscriber = onSnapshot(
      collection(db, "Experience"),
      (querySnapshot) => {
        const users = [];

        querySnapshot.forEach((doc) => {
          users.push({
            ...doc.data(),

            key: doc.id,
          });
        });

        setExperience(users);

        setLoading(false);
      }
    );

    // Unsubscribe from events when no longer in use

    return () => subscriber();
  }, []);

  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const deleteRow = (rowMap, rowKey, imageLocation) => {
    closeRow(rowMap, rowKey);
    try {
      const desertRef = ref(storage, imageLocation);
      console.log(desertRef);
      // Delete the file
      deleteObject(desertRef)
        .then(() => {
          console.log("Feeds deleted successfully");
          deleteDoc(doc(db, "Experience", rowKey));
          console.log("Feeds successfully deleted!");
          // File deleted successfully

          const newData = [...experience];
          const prevIndex = experience.findIndex((item) => item.key === rowKey);
          newData.splice(prevIndex, 1);
          setExperience(newData);
        })
        .catch((err) => {
          // Uh-oh, an error occurred!
          if (Platform.OS === "ios" || Platform.OS === "android")
            Alert.alert("There is something wrong!", err.message);
          else alert(err.message);
        });
    } catch (err) {
      if (Platform.OS === "ios" || Platform.OS === "android")
        Alert.alert("There is something wrong!", err.message);
      else alert(err.message);
    }
  };

  const onRowDidOpen = (rowKey) => {
    console.log("This row opened", rowKey);
  };

  const renderItem = (data) => (
    <TouchableHighlight
      onPress={() => {
        navigation.navigate("ExperienceSharingDetail", {
          key: data.item.key,
          experienceTitle: data.item.experienceTitle,
          experienceDescription: data.item.experienceDescription,
          imageURL: data.item.imageURL,
        });
      }}
      style={styles.rowFront}
      underlayColor={"#AAA"}
    >
      <View style={[styles.row, { flexDirection: "column" }]}>
        <Image
          source={{ uri: data.item.imageURL }}
          style={{
            width: 70,
            height: 70,
            borderWidth: 2,
            borderColor: "#d35647",
            resizeMode: "contain",
            margin: 8,
          }}
        />
        <Text>{data.item.experienceTitle}</Text>
      </View>
    </TouchableHighlight>
  );

  const renderHiddenItem = (data, rowMap) => (
    <View style={styles.rowBack}>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnLeft]}
        onPress={() => closeRow(rowMap, data.item.key)}
      >
        <Text style={styles.backTextWhite}>Close</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnMiddle]}
        onPress={() => {
          navigation.navigate("EditExperienceSharing", {
            keyVal: data.item.key,
            experienceTitleVal: data.item.experienceTitle,
            experienceDescriptionVal: data.item.experienceDescription,
            imageURLVal: data.item.imageURL,
            imageLocationVal: data.item.imageLocation,
            //createdByVal: data.item.createdBy,
            startDateVal: data.item.startDate,
          });
        }}
      >
        <Text style={styles.backTextWhite}>Edit</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnRight]}
        onPress={() =>
          deleteRow(rowMap, data.item.key, data.item.imageLocation)
        }
      >
        <Text style={styles.backTextWhite}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <Layout>
      <TopNav
        middleContent="Experience Sharing List"
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
          flexDirection: "row",

          alignItems: "center",

          marginTop: 30,

          justifyContent: "center",
        }}
      >
        <Text>Experience Sharing List</Text>
      </View>

      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <SwipeListView
            data={experience}
            renderItem={renderItem}
            renderHiddenItem={renderHiddenItem}
            rightOpenValue={-215}
            previewRowKey={"0"}
            previewOpenValue={-40}
            previewOpenDelay={3000}
            onRowDidOpen={onRowDidOpen}
          />
        </View>
      </SafeAreaView>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",

    flex: 1,
  },

  backTextWhite: {
    color: "#FFF",
  },

  rowFront: {
    alignItems: "center",

    backgroundColor: "#CCC",

    borderBottomColor: "black",

    borderBottomWidth: 1,

    justifyContent: "center",

    height: 100,
  },

  rowBack: {
    alignItems: "center",

    backgroundColor: "#DDD",

    flex: 1,

    flexDirection: "row",

    justifyContent: "space-between",

    paddingLeft: 15,
  },

  backRightBtn: {
    alignItems: "center",

    bottom: 0,

    justifyContent: "center",

    position: "absolute",

    top: 0,

    width: 75,
  },

  backRightBtnLeft: {
    backgroundColor: "blue",

    right: 150,
  },

  backRightBtnMiddle: {
    backgroundColor: "green",

    right: 75,
  },

  backRightBtnRight: {
    backgroundColor: "red",

    right: 0,
  },

  row: {
    flex: 1,

    flexDirection: "row",

    flexWrap: "wrap",

    alignItems: "center",

    marginBottom: 10,
  },
});
