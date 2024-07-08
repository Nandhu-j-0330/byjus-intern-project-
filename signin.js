import React, {useId, useState} from 'react';
import {
  Button,
  TextInput,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Alert,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import {ScrollView} from 'react-native-gesture-handler';

const Loginscreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const signInbtnfn = () => {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    try {
      if (!email) {
        Alert.alert('Enter Email ');
        return;
      }
      if (reg.test(email) === false) {
        return Alert.alert('Enter valid E-mail');
      }
      if (!password) {
        Alert.alert('Enter Password ');
        return;
      }
      if (password.length < 5) {
        return Alert.alert('Password must be above five characters ');
      }

      const storeData = async value => {
        try {
          await AsyncStorage.setItem('uid', value);
        } catch (e) {
          // saving error
        }
      };
      // const retrieveData = async () => {
      //   try {
      //     const value = await AsyncStorage.getItem('email');
      //     if (value !== null) {
      //       // We have data!!
      //     }
      //   } catch (error) {
      //     // Error retrieving data
      //   }
      // };
      setLoading(true);
      auth()
        .signInWithEmailAndPassword(email, password)
        .then(res => {
          // storeData(res.user.uid);
          console.log('uid'+res.user.uid)
          // Alert.alert('Success : Logged In');
          setLoading(false);
          navigation.navigate('Dashboard', {screen: 'LandingScreen'});
        })
        .catch(err => {
          console.log(err.message);
          setLoading(false);
          Alert.alert(err.code);
        });
    } catch (e) {
      //   console.log(e.message)
      setLoading(false);
      Alert.alert(e.message);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View
          style={{
            flex: 1,
            backgroundColor: '#E3E1D9',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              width: '90%',
              padding: 20,
              alignItems: 'center',
              backgroundColor: 'white',
              // flex: 0.4,
              justifyContent: 'center',
              elevation: 10,
              borderRadius: 14,
            }}>
            <TextInput
              value={email}
              onChangeText={text => setEmail(text)}
              placeholder=" test@gmail.com"
              keyboardType='email-address'
              placeholderTextColor={'gray'}
              style={[styles.TextInput, styles.TextInputmargin]}
            />

            <TextInput
              value={password}
              secureTextEntry
              onChangeText={text => setPassword(text)}
              placeholder="enter password"
              placeholderTextColor={'gray'}
              style={styles.TextInput}
            />
            <Pressable
              onPress={() => navigation.navigate('signup')}
              style={styles.signupbtn}>
              <Text style={styles.signupbtntxt}>
                Don't Have Account ? Sign Up
              </Text>
            </Pressable>
            <TouchableOpacity onPress={signInbtnfn} style={styles.signinbtn}>
              <Text style={{color: 'black', fontSize: 14, fontWeight: '500'}}>
                Sign In
              </Text>
            </TouchableOpacity>
            <ActivityIndicator
              size={'Large'}
              color={'violet'}
              animating={loading}
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute',
              }}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  TextInputmargin: {
    marginTop: 18,
  },
  signupbtn: {
    alignSelf: 'flex-end',
  },
  signupbtntxt: {
    color: 'black',
    fontSize: 14,
    marginBottom: 8,
  },
  TextInput: {
    borderWidth: 1,
    height: 44,
    width: '90%',
    color: 'black',
    borderColor: 'black',
    marginBottom: 16,
    marginVertical: 4,
    marginTop: 8,
    borderRadius: 14,
    textAlign: 'left',
    paddingLeft: 10,
    fontSize: 14,
    fontWeight: '500',
    paddingLeft: 16,
  },
  signinbtn: {
    borderRadius: 15,
    backgroundColor: 'violet',
    justifyContent: 'center',
    alignItems: 'center',
    height: 32,
    width: 130,
    marginBottom: 18,
  },
});
export default Loginscreen;
