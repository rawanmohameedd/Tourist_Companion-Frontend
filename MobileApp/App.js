import * as React from 'react';
import { Image , StyleSheet , View} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import signupT from './Pages/Tourist/SignupTour';
import signupTG from './Pages/Tour guide/SignupTourguide';
import WelcomeApp from './Pages/WelcomeScreen';
import HomeT from './Pages/Tourist/HomeScreenTour';
import signinT from './Pages/Tourist/SigninT';
import ForgetPasswordPage from './Pages/ForgetPasswordScreen';
import VisitTour from './Pages/Tourist/MuseumsVisitTour';
import VisitTG from './Pages/Tour guide/MuseumsVisitTG';
import GridComponent from './Pages/Tourist/MusemsInfoTour';
import HomeTG from './Pages/Tour guide/HomeScreenTourguide';
import ProfilePageT from './Pages/Tourist/ProfilePageT';
import ProfilePageTG from './Pages/Tour guide/ProfilePageTG';
import signinTG from './Pages/Tour guide/SigninTG';
import Search from './Pages/Search';
import Infopage from './Pages/infopage';
import SearchProfileTG from './Pages/Tour guide/ProfileSearchTG';
import SearchProfileT from './Pages/Tourist/ProfileSearchT';
import FindAGuide from './Pages/Tourist/FindAGuide';
import SubmitRating from './Pages/Tourist/RatingPage';

const Stack = createNativeStackNavigator();
const Tab= createBottomTabNavigator();

const HomeTabT =()=>{
  return(
    <Tab.Navigator style={styles.tabbar} swipeEnabled={true}
    >
      <Tab.Screen 
        name=" HomeT " 
        component={HomeT} 
        options={{
          headerShown: false,
          tabBarLabel: 'Home',
          tabBarIcon: ()=>( 
            
            <Image 
            source={require('./Images/home.png')}
            style={{width: 25, height: 25}}
            />
          ),
        }} 
      />

      <Tab.Screen 
        name=" Search " 
        component={Search} 
        options={{
          headerShown: false,
          tabBarLabel: 'Search',
          tabBarIcon: ({color,size})=>( 
            <Ionicons name="search" color={color} size={size}/>
          ),
        }} 
      />

      <Tab.Screen 
        name=" Profile" 
        component={ProfilePageT} 
        options={{
          headerShown: false,
          tabBarLabel: 'Profile',
          tabBarIcon: ()=>( 
            
            <Image 
            source={require('./Images/profile.png')}
            style={{width: 25, height: 25}}
            />
          ),
        }}
      />
    </Tab.Navigator>  
  );
};

const HomeTabTG =()=>{
  return(
    <Tab.Navigator style={styles.tabbar} swipeEnabled={true}
    >
      <Tab.Screen 
        name=" HomeTG " 
        component={HomeTG} 
        options={{
          headerShown: false,
          tabBarLabel: 'Home',
          tabBarIcon: ()=>( 
            
            <Image 
            source={require('./Images/home.png')}
            style={{width: 25, height: 25}}
            />
          ),
        }} 
        
      />

      <Tab.Screen 
        name=" Search " 
        component={Search} 
        options={{
          headerShown: false,
          tabBarLabel: 'Search',
          tabBarIcon: ({color,size})=>( 
            <Ionicons name="search" color={color} size={size} />
  
          ),
        }} 
        
      />
      <Tab.Screen 
        name=" Profile" 
        component={ProfilePageTG} 
        options={{
          headerShown: false,
          tabBarLabel: 'Profile',
          tabBarIcon: ()=>( 
            
            <Image 
            source={require('./Images/profile.png')}
            style={{width: 25, height: 25}}
            />
          ),
        }}/>

    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
      initialRouteName='Welcome'
      screenOptions={{
        headerStyle: { backgroundColor: 'black'},
        headerTintColor: 'white',
        headerBackTitleStyle:{
          fontWeight:'bold',
        },
        headerTitleAlign:'center',
      }}>
        <Stack.Screen options={{headerShown: false}} name= "Welcome" component={WelcomeApp} />
        <Stack.Screen name="Sign up as a tourist" component={signupT} />
        <Stack.Screen name="Sign up as a tour guide" component={signupTG} />
        <Stack.Screen name="Sign in as a tourist" component={signinT}  />
        <Stack.Screen name="Sign in as a tourguide" component={signinTG}  />
        <Stack.Screen name="Home Tourist" component={HomeTabT} options={{headerShown: false}} />
        <Stack.Screen name="Home Tourguide" component={HomeTabTG} options={{headerShown: false}}/>
        <Stack.Screen name="Search" component={Search} options={{headerShown: false}}/>
        <Stack.Screen name="Forget your Password" component={ForgetPasswordPage} />
        <Stack.Screen name="Museum Visit" component={VisitTour} />
        <Stack.Screen options={{headerTitle:'Museum visit'}} name="Museum Visit TG" component={VisitTG} />
        <Stack.Screen name="Museum Info" component={GridComponent} />
        <Stack.Screen options={{headerShown: false}} name="Info page" component={Infopage} />
        <Stack.Screen options={{headerShown: false}}  name="SearchPageT" component={SearchProfileT}/>
        <Stack.Screen options={{headerShown: false}} name="SearchPageTG" component={SearchProfileTG}/>
        <Stack.Screen name="Find a guide" component={FindAGuide}/>
        <Stack.Screen options={{headerShown: false}} name="Rating" component={SubmitRating} />
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