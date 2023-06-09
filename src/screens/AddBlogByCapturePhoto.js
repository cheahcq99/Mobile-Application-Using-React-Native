import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  Dimensions,
  View,
  TouchableOpacity, Button, Platform
} from "react-native";
import {
  Layout,
  TopNav,
  Text,
  themeColor,
  useTheme,
} from "react-native-rapi-ui";
import { Ionicons, AntDesign, MaterialIcons } from "@expo/vector-icons";
import { Camera } from 'expo-camera';


const WINDOW_HEIGHT = Dimensions.get('window').height;
const CAPTURE_SIZE = Math.floor(WINDOW_HEIGHT * 0.08);


export default function ({ navigation }) {
  const { isDarkmode } = useTheme();
  const cameraRef = useRef();
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [isPreview, setIsPreview] = useState(false);
  const [isCameraReady, setIsCameraReady] = useState(false);


  useEffect(() => {
    onHandlePermission();
  }, []);


  const onHandlePermission = async () => {
    const { status } = await Camera.getCameraPermissionsAsync();
    setHasPermission(status === 'granted');
  };


  const onCameraReady = () => {
    setIsCameraReady(true);
  };


  const switchCamera = () => {
    if (isPreview) {
      return;
    }
    setCameraType(prevCameraType =>
      prevCameraType === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };


  const onSnap = async () => {
    if (cameraRef.current) {
      const options = {
        quality: 0.7, base64: true
      };
      const data = await cameraRef.current.takePictureAsync(options);
      const source = data.base64;


      if (source) {
        await cameraRef.current.pausePreview();
        setIsPreview(true);


        //let base64Img = `data:image/jpeg;base64,${source}`;
        const d = new Date();




      }
    }
  };


  const cancelPreview = async () => {
    await cameraRef.current.resumePreview();
    setIsPreview(false);
  };


  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text style={styles.text}>No access to camera</Text>;
  }


  return (
    <Layout>
      <TopNav
        middleContent="Second Screen"
        leftContent={
          <Ionicons
            name="chevron-back"
            size={20}
            color={isDarkmode ? themeColor.white100 : themeColor.black}
          />
        }
        leftAction={() => navigation.goBack()}
      />
      <View style={styles.container}>
        <Camera
          ref={cameraRef}
          style={styles.container}
          type={cameraType}
          onCameraReady={onCameraReady}
          useCamera2Api={true}
        />
        <View style={styles.container}>
          {isPreview && (
            <TouchableOpacity
              onPress={cancelPreview}
              style={styles.closeButton}
              activeOpacity={0.7}
            >
              <AntDesign name='close' size={32} color='#fff' />
            </TouchableOpacity>
          )}
          {!isPreview && (
            <View style={styles.bottomButtonsContainer}>
              <TouchableOpacity disabled={!isCameraReady} onPress={switchCamera}>
                <MaterialIcons name='flip-camera-ios' size={28} color='white' />
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.7}
                disabled={!isCameraReady}
                onPress={onSnap}
                style={styles.capture}
              />
              <Button title="Go back" onPress={() => navigation.goBack()} />
            </View>
          )}
        </View>
      </View>
    </Layout>
  );
}
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject
  },
  text: {
    color: '#fff'
  },
  bottomButtonsContainer: {
    position: 'absolute',
    flexDirection: 'row',
    bottom: 28,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  closeButton: {
    position: 'absolute',
    top: 35,
    right: 20,
    height: 50,
    width: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#5A45FF',
    opacity: 0.7
  },
  capture: {
    backgroundColor: '#5A45FF',
    borderRadius: 5,
    height: CAPTURE_SIZE,
    width: CAPTURE_SIZE,
    borderRadius: Math.floor(CAPTURE_SIZE / 2),
    marginBottom: 28,
    marginHorizontal: 30
  }
});
