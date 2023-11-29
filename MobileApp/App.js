import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import EnterEmailUPT from './Pages/SignupTour';
import EnterEmailUPTG from './Pages/SignupTourguide';
import WelcomeApp from './Pages/WelcomeScreen';
import Home from './Pages/HomeScreenTour';
import EnterEmailIN from './Pages/SigninScreen';
import ForgetPasswordPage from './Pages/ForgetPasswordScreen';
import ProfilePage from './Pages/Profile page';
import VisitTour from './Pages/MuseumsVisitTour';
import InfoTour from './Pages/MusemsInfoTour';

const Stack = createNativeStackNavigator();
const Tab= createBottomTabNavigator();

const HomeTab =()=>{
  return(
    <Tab.Navigator >
      <Tab.Screen name=" Home " component={Home} />
      <Tab.Screen name=" Profile  " component={ProfilePage} />
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
        <Stack.Screen options={{headerShown: false}} name="Welcome" component={WelcomeApp} />
        <Stack.Screen name="Sign up as a tourist" component={EnterEmailUPT} />
        <Stack.Screen name="Sign in" component={EnterEmailIN}  />
        <Stack.Screen name="Home Page" component={HomeTab} />
        <Stack.Screen name="Forget your Password" component={ForgetPasswordPage} />
        <Stack.Screen name="Sign up as a tour guide" component={EnterEmailUPTG} />
        <Stack.Screen name="Museum Visit" component={VisitTour} />
        <Stack.Screen name="Museum Info" component={InfoTour} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}