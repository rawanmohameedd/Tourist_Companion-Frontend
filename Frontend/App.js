
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from 'react-native-vector-icons';


import WelcomeApp from './Pages/WelcomeScreen';
import signinT from './Pages/Tourist/SigninT';
import signupT from './Pages/Tourist/SignupTour';
import signinTG from './Pages/Tour guide/SigninTG';
import signupTG from './Pages/Tour guide/SignupTourguide';
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

const Stack = createStackNavigator();
const Tab= createBottomTabNavigator();

const HomeTabT = () => {
  return (
    <Tab.Navigator style={styles.tabbar}>
      <Tab.Screen
        name="HomeT"
        component={HomeT}
        options={{
          headerShown: false,
          tabBarLabel: 'Home',
        //   tabBarIcon: ({ color, size }) => (
        //     <Ionicons name="home" color={color} size={size} />
        //   ),
        }}
      />

      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          headerShown: false,
          tabBarLabel: 'Search',
          // tabBarIcon: ({ color, size }) => (
          //   <Ionicons name="search" color={color} size={size} />
          // ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfilePageT}
        options={{
          headerShown: false,
          tabBarLabel: 'Profile',
          // tabBarIcon: ({ color, size }) => (
          //   <Ionicons name="person-outline" color={color} size={size} />
          // ),
        }}
      />
    </Tab.Navigator>
  );
};

const HomeTabTG = () => {
  return (
    <Tab.Navigator style={styles.tabbar}>
      <Tab.Screen
        name="HomeTG"
        component={HomeTG}
        options={{
          headerShown: false,
          tabBarLabel: 'Home',
          // tabBarIcon: ({ color, size }) => (
          //   <Ionicons name="home" color={color} size={size} />
          // ),
        }}
      />

      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          headerShown: false,
          tabBarLabel: 'Search',
          // tabBarIcon: ({ color, size }) => (
          //   <Ionicons name="search" color={color} size={size} />
          // ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfilePageTG}
        options={{
          headerShown: false,
          tabBarLabel: 'Profile',
          // tabBarIcon: ({ color, size }) => (
          //   <Ionicons name="person-outline" color={color} size={size} />
          // ),
        }}
      />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={WelcomeApp} options={{ headerShown: false }} />
        <Stack.Screen name="Sign in as a tourist" component={signinT} options={{ title: 'Sign in as a Tourist' }} />
        <Stack.Screen name="Sign in as a tourguide" component={signinTG} options={{ title: 'Sign in as a Tour Guide' }} />
        <Stack.Screen name="Sign up as a tourist" component={signupT} />
        <Stack.Screen name="Sign up as a tour guide" component={signupTG} />
        <Stack.Screen name="Forget your Password" component={ForgetPasswordPage} />
        <Stack.Screen name="Home Tourist" component={HomeTabT} options={{headerShown: false}} />
        <Stack.Screen name="Home Tourguide" component={HomeTabTG} options={{headerShown: false}}/>
        <Stack.Screen name="Search" component={Search} options={{headerShown: false}}/>
        <Stack.Screen name="Museum Visit" component={VisitTour} />
        <Stack.Screen options={{headerTitle:'Museum visit'}} name="Museum Visit TG" component={VisitTG} />
        <Stack.Screen name="Museum Info" component={GridComponent} />
        <Stack.Screen options={{headerShown: false}} name="Info page" component={Infopage} />
        <Stack.Screen options={{headerShown: false}}  name="SearchPageT" component={SearchProfileT}/>
        <Stack.Screen options={{headerShown: false}} name="SearchPageTG" component={SearchProfileTG}/>
        <Stack.Screen name="Find a guide" component={FindAGuide}/>
        <Stack.Screen options={{headerShown: false}} name="Rating" component={SubmitRating} />
        <Stack.Screen options={{headerShown: false}} name="Connect" component={Connect} />
        <Stack.Screen options={{headerShown: false}} name="ConnectOneTime" component={ConnectOneTime} />
        <Stack.Screen options={{headerShown: false}} name="ConnectMultipleDays" component={ConnectMultipleDays} />
        <Stack.Screen options={{headerShown: false}} name="Museum List" component={MuseumList}/>
        </Stack.Navigator>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  tabbar: {
    flex: 1,
    backgroundColor: 'black',
  },
});