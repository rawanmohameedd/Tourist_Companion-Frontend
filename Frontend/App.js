import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Image, ActivityIndicator, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';

import WelcomeApp from './Pages/WelcomeScreen';
import SigninT from './Pages/Tourist/SigninT';
import SignupT from './Pages/Tourist/SignupTour';
import SigninTG from './Pages/Tour guide/SigninTG';
import SignupTG from './Pages/Tour guide/SignupTourguide';
import ForgetPasswordPage from './Pages/ForgetPasswordScreen';
import HomeT from './Pages/Tourist/HomeScreenTour';
import VisitTour from './Pages/Tourist/MuseumsVisitTour';
import VisitTG from './Pages/Tour guide/MuseumsVisitTG';
import GridComponent from './Pages/Tourist/MusemsInfoTour';
import HomeTG from './Pages/Tour guide/HomeScreenTourguide';
import ProfilePageT from './Pages/Tourist/ProfilePageT';
import ProfilePageTG from './Pages/Tour guide/ProfilePageTG';
import Search from './Pages/Search';
import Infopage from './Pages/infopage';
import SearchProfileTG from './Pages/Tour guide/ProfileSearchTG';
import SearchProfileT from './Pages/Tourist/ProfileSearchT';
import FindAGuide from './Pages/Tourist/FindAGuide';
import SubmitRating from './Pages/Tourist/RatingPage';
import Connect from './Pages/Tourist/Connect';
import ConnectOneTime from './Pages/Tourist/ConnectOneTime';
import ConnectMultipleDays from './Pages/Tourist/ConnectMultipleDays';
import MuseumList from './Pages/ChooseMuseum';
import NfcRead from './Pages/nfcread';
import DisplayCrowdedRooms from './Pages/CrowdManagement';
import UploadLicense from './Pages/Tour guide/UploadLicense';
import TrackGuide from './Pages/Tourist/TrackmyGuide';
import TouristsRequests from './Pages/Tour guide/TouristsRequests';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeTabT = () => (
  <Tab.Navigator style={styles.tabbar}>
    <Tab.Screen
      name="HomeT"
      component={HomeT}
      options={{
        headerShown: false,
        tabBarLabel: 'Home',
        tabBarIcon: () => (
          <Image source={require('./Images/home.png')} style={{ width: 25, height: 25 }} />
        ),
      }}
    />
    <Tab.Screen
      name="Search"
      component={Search}
      options={{
        headerShown: false,
        tabBarLabel: 'Search',
        tabBarIcon: () => (
          <Image source={require('./Images/search.png')} style={{ width: 45, height: 25 }} />
        ),
      }}
    />
    <Tab.Screen
      name="Profile"
      component={ProfilePageT}
      options={{
        headerShown: false,
        tabBarLabel: 'Profile',
        tabBarIcon: () => (
          <Image source={require('./Images/profile.png')} style={{ width: 25, height: 25 }} />
        ),
      }}
    />
  </Tab.Navigator>
);

const HomeTabTG = () => (
  <Tab.Navigator style={styles.tabbar}>
    <Tab.Screen
      name="HomeTG"
      component={HomeTG}
      options={{
        headerShown: false,
        tabBarLabel: 'Home',
        tabBarIcon: () => (
          <Image source={require('./Images/home.png')} style={{ width: 25, height: 25 }} />
        ),
      }}
    />
    <Tab.Screen
      name="Search"
      component={Search}
      options={{
        headerShown: false,
        tabBarLabel: 'Search',
        tabBarIcon: () => (
          <Image source={require('./Images/search.png')} style={{ width: 45, height: 25 }} />
        ),
      }}
    />
    <Tab.Screen
      name="Profile"
      component={ProfilePageTG}
      options={{
        headerShown: false,
        tabBarLabel: 'Profile',
        tabBarIcon: () => (
          <Image source={require('./Images/profile.png')} style={{ width: 25, height: 25 }} />
        ),
      }}
    />
  </Tab.Navigator>
);

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem('token');
      const role = await AsyncStorage.getItem('role');
      setUserToken(token);
      setRole(role);
      setIsLoading(false);
    };
    checkToken();
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={
          userToken == null ? "Welcome" : role == "tourist" ? "Home Tourist" : "Home Tourguide"
        }
      >
        <Stack.Screen name="Welcome" component={WelcomeApp} options={{ headerShown: false }} />
        <Stack.Screen name="Sign in as a tourist" component={SigninT} options={{ title: 'Sign in as a Tourist'}} />
        <Stack.Screen name="Sign in as a tourguide" component={SigninTG} options={{ title: 'Sign in as a Tour Guide' }} />
        <Stack.Screen name="Sign up as a tourist" component={SignupT} />
        <Stack.Screen name="Sign up as a tour guide" component={SignupTG} />
        <Stack.Screen name="Forget your Password" component={ForgetPasswordPage} />
        <Stack.Screen name="Home Tourist" component={HomeTabT} options={{headerShown: false}} />
        <Stack.Screen name="Home Tourguide" component={HomeTabTG} options={{headerShown: false}} />
        <Stack.Screen name="Search" component={Search} options={{headerShown: false}} />
        <Stack.Screen name="Museum Visit" component={VisitTour} />
        <Stack.Screen options={{headerTitle:'Museum visit'}} name="Museum Visit TG" component={VisitTG} />
        <Stack.Screen name="Museum Info" component={GridComponent} />
        <Stack.Screen options={{headerShown: false}} name="Info page" component={Infopage} />
        <Stack.Screen options={{headerShown: false}}  name="SearchPageT" component={SearchProfileT} />
        <Stack.Screen options={{headerShown: false}} name="SearchPageTG" component={SearchProfileTG} />
        <Stack.Screen name="Find a guide" component={FindAGuide} />
        <Stack.Screen options={{headerShown: false}} name="Rating" component={SubmitRating} />
        <Stack.Screen options={{headerShown: false}} name="Connect" component={Connect} />
        <Stack.Screen options={{headerShown: false}} name="ConnectOneTime" component={ConnectOneTime} />
        <Stack.Screen options={{headerShown: false}} name="ConnectMultipleDays" component={ConnectMultipleDays} />
        <Stack.Screen options={{headerShown: false}} name="Museum List" component={MuseumList} />
        <Stack.Screen options={{headerShown: false}} name="NFCread" component={NfcRead} />
        <Stack.Screen options={{headerShown: false}} name="Crowd Rooms" component={DisplayCrowdedRooms} />
        <Stack.Screen options={{headerShown: false}} name="UploadLicense" component={UploadLicense} />
        <Stack.Screen options={{headerShown: false}} name="Track my guide" component={TrackGuide} />
        <Stack.Screen options={{headerShown: false}} name="Tourists Requests" component={TouristsRequests} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabbar: {
    flex: 1,
    backgroundColor: 'black',
  },
  Header: {
    backgroundColor: 'black',
  }
});
