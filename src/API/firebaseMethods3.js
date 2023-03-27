import { Alert, Platform } from "react-native";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
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

export async function uploadToCloud(
  title,
  description,
  startDate,
  uri,
  folderName
) {
  try {
    const app = initializeApp(apiKey.firebaseConfig);
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

        addDoc(collection(db, "Volunteer"), {
          title: title,
          description: description,
          imageURL: downloadURL,
          CreatedBy: currentUser.uid,
          CreatedUserName: currentUser.displayName,
          CreatedUserPhoto: currentUser.photoURL,
          startDate: startDate,
          imageLocation: folderName + "/" + guid,
        })
          .then((docRef) => {
            if (Platform.OS === "ios" || Platform.OS === "android")
              Alert.alert(
                "Added successfully. Document written with ID: ",
                docRef.id
              );
            else
              alert(
                "Added successfully. Document written with ID: " + docRef.id
              );
          })
          .catch((error) => {
            if (Platform.OS === "ios" || Platform.OS === "android")
              Alert.alert("Error adding document: ", error);
            else alert("Error adding document: " + error);
          });
      });
    });
  } catch (err) {
    if (Platform.OS === "ios" || Platform.OS === "android")
      Alert.alert("There is something wrong!", err.message);
    else alert("There is something wrong!" + err.message);
  }
}

export async function addBlog(
  title,
  description,
  image,
  folderName,
  startDate
) {
  try {
    await uploadToCloud(title, description, startDate, image, folderName);
  } catch (err) {
    if (Platform.OS === "ios" || Platform.OS === "android")
      Alert.alert("There is something wrong!", err.message);
    else alert("There is something wrong!" + err.message);
  }
}
