import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet } from "react-native";
import {
  Layout,
  TopNav,
  Text,
  themeColor,
  useTheme,
  Button,
} from "react-native-rapi-ui";
import { Video, AVPlaybackStatus } from "expo-av";
import YoutubePlayer from "react-native-youtube-iframe";

export default function({ navigation }) {
  const { isDarkmode } = useTheme();
  const video = useRef(null);
  const [status, setStatus] = useState({});

  return (
    <View>
      <YoutubePlayer height={300} play={true} videoId={"L8cUYWAKHUM"} />
    </View>
  );
}
