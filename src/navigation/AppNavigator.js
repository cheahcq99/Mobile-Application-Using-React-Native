import React, { useContext } from "react";
import { initializeApp, getApps } from "firebase/app";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { useTheme, themeColor } from "react-native-rapi-ui";
import TabBarIcon from "../components/utils/TabBarIcon";
import TabBarText from "../components/utils/TabBarText";
//Screens
import Home from "../screens/Home";
import About from "../screens/About";
import Profile from "../screens/Profile";
import Loading from "../screens/utils/Loading";
import Booking from "../screens/Booking";
import CreateQuestion from "../screens/CreateQuestion";
import QuestionList from "../screens/QuestionList";
import BlockA from "../screens/BlockA";
import BlockB from "../screens/BlockB";
import BlockH from "../screens/BlockH";
import BlockN from "../screens/BlockN";
import BlogList from "../screens/BlogList";
import BlogDetail from "../screens/BlogDetail";
import EditBlog from "../screens/EditBlog";
import LocalNotification from "../screens/LocalNotification";
import PushNotificationLocalDevice from "../screens/PushNotificationLocalDevice";
import PushNotifications from "../screens/PushNotifications";
import ParkingDetail from "../screens/ParkingDetail";
import DatePicker from "../screens/DatePicker";
import Favourite from "../screens/Favourite";
import BlockSlotView from "../screens/BlockSlotView";
import EditParking from "../screens/EditParking";
import Module1 from "../../HomeScreen.js/Module1";
import Module2 from "../../HomeScreen.js/Module2";
import Module3 from "../../HomeScreen.js/Module3";
import Module4 from "../../HomeScreen.js/Module4";
import Image from "../screens/Image";
import AddEvent from "../screens1/AddEvent";
import EditEvent from "../screens1/EditEvent";
import EventDetails from "../screens1/EventDetails";
import EventList from "../screens1/EventList";
import MapLocation from "../screens1/MapLocation";
import Weather from "../screens1/Weather";
import AddVolunteerByUploadImage from "../screens2/AddVolunteerByUploadImage";
import EditVolunteer from "../screens2/EditVolunteer";
import Graph from "../screens2/Graph";
import VolunteerDetails from "../screens2/VolunteerDetails";
import VolunteerList from "../screens2/VolunteerList";
import AddExperienceSharing from "../screen4/AddExperienceSharing";
import EditExperienceSharing from "../screen4/EditExperienceSharing";
import ExperienceSharingDetail from "../screen4/ExperienceSharingDetail";
import ExperienceSharingList from "../screen4/ExperienceSharingList";
import SearchBar from "../screen4/SearchBar";
import DetailsScreen from "../screen4/DetailsScreen";
import SearchBarHome from "../screen4/SearchBarHome";
import FavouriteList from "../screens/FavouriteList";
import EditFavourites from "../screens/EditFavourites";

// Auth screens
import Login from "../screens/auth/Login";
import Register from "../screens/auth/Register";
import ForgetPassword from "../screens/auth/ForgetPassword";
import { AuthContext } from "../provider/AuthProvider";
import AddBlogByUploadImage from "../screens/AddBlogByUploadImage";
import apiKey from "../keys/Keys";

if (getApps().length === 0) {
  initializeApp(apiKey.firebaseConfig);
}

const AuthStack = createNativeStackNavigator();
const Auth = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <AuthStack.Screen name="Login" component={Login} />
      <AuthStack.Screen name="Register" component={Register} />
      <AuthStack.Screen name="ForgetPassword" component={ForgetPassword} />
    </AuthStack.Navigator>
  );
};

const MainStack = createNativeStackNavigator();
const Main = () => {
  return (
    <MainStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <MainStack.Screen name="MainTabs" component={MainTabs} />
      <MainStack.Screen name="Booking" component={Booking} />
      <MainStack.Screen name="CreateQuestion" component={CreateQuestion} />
      <MainStack.Screen name="QuestionList" component={QuestionList} />
      <MainStack.Screen
        name="AddBlogByUploadImage"
        component={AddBlogByUploadImage}
      />
      <MainStack.Screen name="BlockA" component={BlockA} />
      <MainStack.Screen name="BlockB" component={BlockB} />
      <MainStack.Screen name="BlockH" component={BlockH} />
      <MainStack.Screen name="BlockN" component={BlockN} />
      <MainStack.Screen name="BlogList" component={BlogList} />
      <MainStack.Screen name="BlogDetail" component={BlogDetail} />
      <MainStack.Screen name="EditBlog" component={EditBlog} />
      <MainStack.Screen
        name="LocalNotification"
        component={LocalNotification}
      />
      <MainStack.Screen
        name="PushNotificationLocalDevice"
        component={PushNotificationLocalDevice}
      />
      <MainStack.Screen
        name="PushNotifications"
        component={PushNotifications}
      />
      <MainStack.Screen name="ParkingDetail" component={ParkingDetail} />
      <MainStack.Screen name="DatePicker" component={DatePicker} />
      <MainStack.Screen name="Favourite" component={Favourite} />
      <MainStack.Screen name="BlockSlotView" component={BlockSlotView} />
      <MainStack.Screen name="EditParking" component={EditParking} />
      <MainStack.Screen name="Module1" component={Module1} />
      <MainStack.Screen name="Module2" component={Module2} />
      <MainStack.Screen name="Module3" component={Module3} />
      <MainStack.Screen name="Module4" component={Module4} />
      <MainStack.Screen name="About" component={About} />
      <MainStack.Screen name="Profile" component={Profile} />
      <MainStack.Screen name="Image" component={Image} />
      <MainStack.Screen name="AddEvent" component={AddEvent} />
      <MainStack.Screen name="EditEvent" component={EditEvent} />
      <MainStack.Screen name="EventList" component={EventList} />
      <MainStack.Screen name="EventDetails" component={EventDetails} />
      <MainStack.Screen name="MapLocation" component={MapLocation} />
      <MainStack.Screen name="Weather" component={Weather} />
      <MainStack.Screen name="AddVolunteerByUploadImage" component={AddVolunteerByUploadImage} />
      <MainStack.Screen name="EditVolunteer" component={EditVolunteer} />
      <MainStack.Screen name="Graph" component={Graph} />
      <MainStack.Screen name="VolunteerDetails" component={VolunteerDetails} />
      <MainStack.Screen name="VolunteerList" component={VolunteerList} />
      <MainStack.Screen name="AddExperienceSharing" component={AddExperienceSharing} />
      <MainStack.Screen name="EditExperienceSharing" component={EditExperienceSharing} />
      <MainStack.Screen name="ExperienceSharingDetail" component={ExperienceSharingDetail} />
      <MainStack.Screen name="ExperienceSharingList" component={ExperienceSharingList} />
      <MainStack.Screen name="SearchBar" component={SearchBar} />
      <MainStack.Screen name="DetailsScreen" component={DetailsScreen} />
      <MainStack.Screen name="SearchBarHome" component={SearchBarHome} />
      <MainStack.Screen name="FavouriteList" component={FavouriteList}/>
      <MainStack.Screen name="EditFavourites" component={EditFavourites}/>
      
    </MainStack.Navigator>
  );
};

const Tabs = createBottomTabNavigator();
const MainTabs = () => {
  const { isDarkmode } = useTheme();
  return (
    <Tabs.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          borderTopColor: isDarkmode ? themeColor.dark100 : "#c0c0c0",
          backgroundColor: isDarkmode ? themeColor.dark200 : "#ffffff",
        },
      }}
    >
      {/* these icons using Ionicons */}
      <Tabs.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: ({ focused }) => (
            <TabBarText focused={focused} title="Home" />
          ),
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} icon={"md-home"} />
          ),
        }}
      />
      <Tabs.Screen
        name="Video"
        component={Profile}
        options={{
          tabBarLabel: ({ focused }) => (
            <TabBarText focused={focused} title="Video" />
          ),
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} icon={"person"} />
          ),
        }}
      />
      <Tabs.Screen
        name="Maps"
        component={About}
        options={{
          tabBarLabel: ({ focused }) => (
            <TabBarText focused={focused} title="Maps" />
          ),
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} icon={"ios-information-circle"} />
          ),
        }}
      />
    </Tabs.Navigator>
  );
};

export default () => {
  const auth = useContext(AuthContext);
  const user = auth.user;
  return (
    <NavigationContainer>
      {user == null && <Loading />}
      {user == false && <Auth />}
      {user == true && <Main />}
    </NavigationContainer>
  );
};
