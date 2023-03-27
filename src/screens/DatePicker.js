import React, { useState } from "react";
import { Alert, Platform } from "react-native";
import DatePicker from "react-native-modern-datepicker";
import { Layout, TopNav, Button } from "react-native-rapi-ui";
import { Ionicons } from "@expo/vector-icons";
import { getFirestore, addDoc, collection } from "firebase/firestore";

export default function ({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  async function AddDate() {
    setLoading(true);
    const db = getFirestore();
    await addDoc(collection(db, "Chosen date"), {
      date: date,
    })
      .then((docRef) => {
        setLoading(false);

        setDate("");
        if (Platform.OS === "ios" || Platform.OS === "android")
          Alert.alert("Date added successsfully");
        else alert("Date added succesfully");
      })
      .catch((error) => {
        if (Platform.OS === "ios" || Platform.OS === "android")
          Alert.alert("Error adding date:");
        else alert("Error adding date: ");
      });
  }

  return (
    <Layout>
      <TopNav
        middleContent="Pick your date"
        leftContent={<Ionicons name="chevron-back" size={20} />}
        leftAction={() => navigation.goBack()}
      />
      <>
        <DatePicker
          modal
          open={open}
          date={date}
          onConfirm={(date) => {
            setOpen(false);
            setDate(date);
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />
      </>

      <Button
        text={loading ? "Loading" : "Done"}
        onPress={() => {
          AddDate();
          navigation.navigate("Home");
        }}
        style={{
          marginTop: 20,
        }}
        disabled={loading}
      />
    </Layout>
  );
}
