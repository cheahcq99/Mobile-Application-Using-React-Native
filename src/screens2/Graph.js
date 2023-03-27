import React, { useState, useEffect } from "react";

// import all the components we are going to use
import {
  SafeAreaView,
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  ActivityIndicator,
} from "react-native";

//import React Native chart Kit for different kind of Chart
import { LineChart, StackedBarChart } from "react-native-chart-kit";

import {
  Layout,
  TopNav,
  Text,
  themeColor,
  useTheme,
  Button,
} from "react-native-rapi-ui";
import { Ionicons } from "@expo/vector-icons";
import { getFirestore, onSnapshot, collection } from "firebase/firestore";

const App = ({ navigation }) => {
  const { isDarkmode } = useTheme();
  const db = getFirestore();
  const [myLineChartLabel, setMyLineChartLabel] = useState([]);
  const [myLineChartData, setMyLineChartData] = useState([0, 0, 0, 0, 0, 0]);

  useEffect(() => {
    getMyLineChartInformation();
  }, []);

  async function getMyLineChartInformation() {
    await onSnapshot(collection(db, "LineGraph"), (querySnapshot) => {
      const lineChartLabel = [];
      const lineChartData = [];
      querySnapshot.forEach((doc) => {
        lineChartLabel.push(doc.data().Name);
        lineChartData.push(doc.data().task);
      });

      setMyLineChartLabel(lineChartLabel);
      setMyLineChartData(lineChartData);
      console.log(lineChartData);
    });
  }

  if (myLineChartLabel) {
    if (myLineChartLabel.length) {
      return (
        <SafeAreaView style={{ flex: 1 }}>
          <Layout>
            <TopNav
              middleContent="Chart Screen"
              leftContent={
                <Ionicons
                  name="chevron-back"
                  size={20}
                  color={isDarkmode ? themeColor.white100 : themeColor.black}
                />
              }
              leftAction={() => navigation.goBack()}
            />

            <ScrollView>
              <View>
                <Text>Volunteer's Total Task Done</Text>
                <Text> </Text>
                <LineChart
                  data={{
                    labels: myLineChartLabel,
                    datasets: [
                      {
                        data: myLineChartData,
                        strokeWidth: 2,
                      },
                    ],
                  }}
                  width={Dimensions.get("window").width - 16}
                  height={500}
                  chartConfig={{
                    backgroundColor: "#1cc910",
                    backgroundGradientFrom: "#eff3ff",
                    backgroundGradientTo: "#efefef",
                    decimalPlaces: 2,
                    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    style: {
                      borderRadius: 16,
                    },
                  }}
                  style={{
                    marginVertical: 8,
                    borderRadius: 16,
                  }}
                />
              </View>
            </ScrollView>
          </Layout>
        </SafeAreaView>
      );
    } else {
      return (
        <View
          style={{ justifyContent: "center", alignItems: "center", flex: 1 }}
        >
          <ActivityIndicator size="large" />
        </View>
      );
    }
  } else {
    return (
      <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
        <Text>no data found</Text>
      </View>
    );
  }
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    padding: 10,
  },
  header: {
    textAlign: "center",
    fontSize: 18,
    padding: 16,
    marginTop: 16,
  },
});
