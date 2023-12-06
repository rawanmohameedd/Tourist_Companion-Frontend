import * as React from 'react';
import { Image , StyleSheet , View} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import EnterEmailUPT from './Pages/Tourist/SignupTour';
import EnterEmailUPTG from './Pages/Tour guide/SignupTourguide';
import WelcomeApp from './Pages/WelcomeScreen';
import HomeT from './Pages/Tourist/HomeScreenTour';
import EnterEmailIN from './Pages/Tourist/SigninT';
import ForgetPasswordPage from './Pages/ForgetPasswordScreen';
import VisitTour from './Pages/Tourist/MuseumsVisitTour';
import GridComponent from './Pages/Tourist/MusemsInfoTour';
import HomeTG from './Pages/Tour guide/HomeScreenTourguide';
import ProfilePageT from './Pages/Tourist/ProfilePageT';
import ProfilePageTG from './Pages/Tour guide/ProfilePageTG';
const Stack = createNativeStackNavigator();
const Tab= createBottomTabNavigator();

const HomeTabT =()=>{
  return(
    <View style={styles.container}>

    <Tab.Navigator
      screenOptions={({
      tabBarInactiveTintColor: 'gray',
      tabBarActiveTintColor: 'blue',
      })}>
    <Tab.Screen 
        name="HomeT" 
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
        
        }} />

      <Tab.Screen 
        name="Profile" 
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
        }}/>
    </Tab.Navigator>
    </View>    
  );
};

const HomeTabTG =()=>{
  return(
    <Tab.Navigator style={styles.tabbar}>
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
        <Stack.Screen name="Sign up as a tourist" component={EnterEmailUPT} />
        <Stack.Screen name="Sign up as a tour guide" component={EnterEmailUPTG} />
        <Stack.Screen name="Sign in as a tourist" component={EnterEmailIN}  />
        <Stack.Screen name="Sign in as a tourguide" component={EnterEmailIN}  />
        <Stack.Screen name="Home Tourist" component={HomeTabT} options={{headerShown: false}} />
        <Stack.Screen name="Home Tourguide" component={HomeTabTG} options={{headerShown: false}}/>
        <Stack.Screen name="Forget your Password" component={ForgetPasswordPage} />
        <Stack.Screen name="Museum Visit" component={VisitTour} />
        <Stack.Screen name="Museum Info" component={GridComponent} />
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