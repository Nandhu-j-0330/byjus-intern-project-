/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
// import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {NavigationContainer} from '@react-navigation/native';
import Welcomepage from './profile';
import Drawernavigator from './dashboard';
import Videocontainer from './physics';
import Videoplayer from './videoplayer';
import Mathematicspage from './maths';
import AsyncStorage from '@react-native-async-storage/async-storage';

// import firebase from 'firebase/compat/app';
// import {auth } from './firebase/firebase.config';
// import {firebase} from './firebase/firebase';
import auth from '@react-native-firebase/auth';
import Quizpage from './quiz';
import Signupscreen from './signup';
import Loginscreen from './signin';
import Upload from './uploadfiles';
import Chemistry from './chemistry';
import Biology from './biology';
import Logout from './Logout';
import Dbworks from './storagetorealdb';
import Editprofile from './editprofile';
const Stack = createNativeStackNavigator();
const App = () => {
  function onAuthStateChanged(user) {
    if (user && user.uid) {
      AsyncStorage.setItem('uid', user.uid);
    }
    // setUser(user);
    // if (initializing) setInitializing(false);
    console.log(user, 'user');
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);
  
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{header: () => null}}
        initialRouteName="profile">
        <Stack.Screen name="signin" component={Loginscreen} />
        <Stack.Screen name="profile" component={Welcomepage} />
        <Stack.Screen name="Dashboard" component={Drawernavigator} />
        <Stack.Screen name="physics" component={Videocontainer} />
        <Stack.Screen name="videoplayer" component={Videoplayer} />
        <Stack.Screen name="maths" component={Mathematicspage} />
        <Stack.Screen name="quiz" component={Quizpage} />
        <Stack.Screen name="signup" component={Signupscreen} />
        <Stack.Screen name="uploadfiles" component={Upload} />
        <Stack.Screen name="chemistry" component={Chemistry} />
        <Stack.Screen name="biology" component={Biology} />
        <Stack.Screen name="editprofile" component={Editprofile} />
        <Stack.Screen name="Logout" component={Logout} />

        {/* <Stack.Screen name="storagetorealdb" component={Dbworks} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
