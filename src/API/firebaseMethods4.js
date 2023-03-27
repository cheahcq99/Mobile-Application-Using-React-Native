import { Alert, Platform } from "react-native";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  connectFirestoreEmulator,
  initializeFirestore,
  doc,
  setDoc,
  addDoc,
  collection,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { initializeApp, getApp } from "firebase/app";
import apiKey from "../keys/Keys";

//import * as firestore from "firebase-admin";
//const db = firestore.firestore();
//db.settings({ ignoreUndefinedProperties: true });

export async function uploadToCloud(
  experienceTitle,
  experienceDescription,
  startDate,
  uri,
  folderName
) {
  try {
    //    initializeFirestore(app, {
    //      ignoreUndefinedProperties: true,
    //    });
    //    const firestore = getFirestore(app);
    const app = initializeApp(apiKey.firebaseConfig);
    //const db = getirestore.firestore();
    //db.settings({ ignoreUndefinedProperties: true });
    const auth = getAuth(app);
    const storage = getStorage(app);
    const db = getFirestore(app);

    const response = await fetch(uri);
    const blob = await response.blob();
    let u =
      Date.now().toString(16) + Math.random().toString(16) + "0".repeat(16);
    let guid = [
      u.substr(0, 8),
      u.substr(8, 4),
      "4000-8" + u.substr(13, 3),
      u.substr(16, 12),
    ].join("-");

    console.log(storage);
    // Child references can also take paths delimited by '/'
    const spaceRef = ref(storage, folderName + "/" + guid);

    uploadBytes(spaceRef, blob).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((downloadURL) => {
        console.log("File available at", downloadURL);
        const currentUser = auth.currentUser;

        addDoc(collection(db, "Experience"), {
          experienceTitle: experienceTitle,
          experienceDescription: experienceDescription,
          imageURL: downloadURL,
          CreatedUserID: currentUser.uid,
          //CreatedUserName: currentUser.displayName,
          CreatedUserPhoto: currentUser.photoURL,
          startDate: startDate,
          imageLocation: folderName + "/" + guid,
        })
          .then((docRef) => {
            if (Platform.OS === "ios" || Platform.OS === "android")
              Alert.alert("Feeds posted successfully. ", docRef.id);
            else alert("Feeds posted successfully. " + docRef.id);
          })
          .catch((error) => {
            if (Platform.OS === "ios" || Platform.OS === "android")
              Alert.alert("Error posting feeds: ", error);
            else alert("Error posting feeds: " + error);
          });
      });
    });
  } catch (err) {
    if (Platform.OS === "ios" || Platform.OS === "android")
      Alert.alert("There is something wrong!", err.message);
    else alert("There is something wrong!" + err.message);
  }
}

export async function addExperience(
  experienceTitle,
  experienceDescription,
  image,
  folderName,
  startDate
) {
  try {
    await uploadToCloud(
      experienceTitle,
      experienceDescription,
      startDate,
      image,
      folderName
    );
  } catch (err) {
    if (Platform.OS === "ios" || Platform.OS === "android")
      Alert.alert("There is something wrong!", err.message);
    else alert("There is something wrong!" + err.message);
  }
}

/*
export async function editExperience(
  experienceTitle,
  experienceDescription,
  key,
  downloadURL,
  user,
  startDate,
  imageLocation
) {
  try {
    const app = initializeApp(apiKey.firebaseConfig);
    const db = getFirestore(app);
    setDoc(doc(db, "Experience", key), {
      experienceTitle: experienceTitle,
      experienceDescription: experienceDescription,
      imageURL: downloadURL,
      CreatedBy: user,
      startDate: startDate,
      imageLocation: imageLocation,
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
      });
  } catch (err) {
    if (Platform.OS === "ios" || Platform.OS === "android")
      Alert.alert("There is something wrong!", err.message);
    else alert("There is something wrong! " + err.message);
  }
}

*/
