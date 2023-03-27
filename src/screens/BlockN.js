import React from "react";
import {
  StyleSheet,
  Button,
  View,
  SafeAreaView,
  Text,
  Alert,
} from "react-native";
import {
  Layout,
  TopNav,
  TextInput,
  themeColor,
  useTheme,
} from "react-native-rapi-ui";
import { Ionicons } from "@expo/vector-icons";
const Separator = () => <View style={styles.separator} />;

const App = ({ navigation }) => (
  <Layout>
    <TopNav
      middleContent="Block N Parking"
      leftContent={<Ionicons name="chevron-back" size={20} />}
      leftAction={() => navigation.goBack()}
    />
    <SafeAreaView style={styles.container}>
      <View>
        <View style={styles.fixToText}>
          <Button
            title="Slot 1"
            onPress={() => {
              navigation.navigate("AddBlogByUploadImage");
            }}
          />
          <Button
            title="Slot 2"
            onPress={() => {
              navigation.navigate("AddBlogByUploadImage");
            }}
          />
        </View>
        <Separator />
        <View style={styles.fixToText}>
          <Button
            title="Slot 3"
            onPress={() => {
              navigation.navigate("AddBlogByUploadImage");
            }}
          />
          <Button
            title="Slot 4"
            onPress={() => {
              navigation.navigate("AddBlogByUploadImage");
            }}
          />
        </View>
        <Separator />
        <View style={styles.fixToText}>
          <Button
            title="Slot 5"
            onPress={() => {
              navigation.navigate("AddBlogByUploadImage");
            }}
          />
          <Button
            title="Slot 6"
            onPress={() => {
              navigation.navigate("AddBlogByUploadImage");
            }}
          />
        </View>
        <Separator />
        <View style={styles.fixToText}>
          <Button
            title="Slot 7"
            onPress={() => {
              navigation.navigate("AddBlogByUploadImage");
            }}
          />
          <Button
            title="Slot 8"
            onPress={() => {
              navigation.navigate("AddBlogByUploadImage");
            }}
          />
        </View>
        <Separator />
        <View style={styles.fixToText}>
          <Button
            title="Slot 9"
            onPress={() => {
              navigation.navigate("AddBlogByUploadImage");
            }}
          />
          <Button
            title="Slot 10"
            onPress={() => {
              navigation.navigate("AddBlogByUploadImage");
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  </Layout>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 16,
  },
  title: {
    textAlign: "center",
    marginVertical: 8,
  },
  fixToText: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: "#737373",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

export default App;
