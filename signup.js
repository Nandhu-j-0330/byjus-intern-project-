import React, {useState} from 'react';
import {
  Button,
  TextInput,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';

import auth from '@react-native-firebase/auth';

const Signupscreen = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [mobilenumber, setMobilenumber] = useState();
  const [address, setAddress] = useState('');
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmpassword] = useState('');

  const Signupbtnfn = () => {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    try {
      Credential = undefined;
      if (!email) {
        return Alert.alert('Enter E-mail');
      }
      if (reg.test(email) === false) {
        return Alert.alert('Enter valid E-mail');
      }
      if (!password) {
        return Alert.alert('Enter Password');
      }
      if (password.length < 5) {
        Alert.alert('Failed : Password Should be above five ');
      }
      if (password != confirmpassword) {
        return Alert.alert('Mismathched password');
      }

      auth()
        .createUserWithEmailAndPassword(email, confirmpassword, password)
        .then(({user}) => {
          console.log(user, 'validated user');
          firestore()
            .collection('profile')
            .doc(user.uid)
            .set({email: user.email, address, gender, username, mobilenumber})
            .then(data => {
              console.log(data);
              Alert.alert('user created, please login..');
              navigation.navigate('signin');
            })
            .catch(e => {
              Alert.alert(e.message);
            });
        })
        .catch(err => {
          console.log(err);
          Alert.alert(err.code);
        });
    } catch (e) {
      Alert.alert(e.message);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior="height"
      keyboardVerticalOffset={0}
      style={{
        flex: 1,
        backgroundColor: '#E3E1D9',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View
        style={{
          width: '90%',
          padding: 30,
          alignItems: 'center',
          backgroundColor: 'white',
          // height: '46%',
          justifyContent: 'center',
          elevation: 4,
          borderRadius: 14,
        }}>
        <TextInput
          value={username}
          onChangeText={text => setUsername(text)}
          placeholder="User Name"
          placeholderTextColor={'gray'}
          validationMessage="please enter the credentials"
          style={{
            borderWidth: 1,
            height: 44,
            width: '90%',
            color: 'black',
            borderColor: 'black',
            marginBottom: 16,
            marginTop: 4,
            borderRadius: 14,
            paddingLeft: 16,
            fontWeight: '500',
            fontSize: 14,
          }}
        />

        <TextInput
          value={mobilenumber}
          onChangeText={text => setMobilenumber(text)}
          keyboardType="numeric"
          placeholder="Mobile Number"
          placeholderTextColor={'gray'}
          validationMessage="please enter the credentials"
          style={{
            borderWidth: 1,
            height: 44,
            width: '90%',
            color: 'black',
            borderColor: 'black',
            marginBottom: 16,
            marginTop: 4,
            borderRadius: 14,
            paddingLeft: 16,
            fontWeight: '500',
            fontSize: 14,
          }}
        />
        <TextInput
          value={address}
          onChangeText={text => setAddress(text)}
          placeholder="Address"
          placeholderTextColor={'gray'}
          validationMessage="please enter the credentials"
          style={{
            borderWidth: 1,
            height: 44,
            width: '90%',
            color: 'black',
            borderColor: 'black',
            marginBottom: 16,
            marginTop: 4,
            borderRadius: 14,
            paddingLeft: 16,
            fontWeight: '500',
            fontSize: 14,
          }}
        />
        {/* {getError( <Text>{errors.email}</Text>)} */}

        <TextInput
          value={gender}
          onChangeText={text => setGender(text)}
          placeholder="Gender"
          placeholderTextColor={'gray'}
          style={{
            borderWidth: 1,
            height: 44,
            width: '90%',
            borderColor: 'black',
            marginBottom: 16,
            borderRadius: 14,
            color: 'black',
            paddingLeft: 16,
            fontWeight: '500',
            fontSize: 14,
          }}
        />
        <TextInput
          value={email}
          onChangeText={text => setEmail(text)}
          placeholder="test@gmail.com"
          keyboardType='email-address'
          placeholderTextColor={'gray'}
          style={{
            borderWidth: 1,
            height: 44,
            width: '90%',
            borderColor: 'black',
            marginBottom: 16,
            borderRadius: 14,
            color: 'black',
            paddingLeft: 16,
            fontWeight: '500',
            fontSize: 14,
          }}
        />
        <TextInput
          value={password}
          onChangeText={text => setPassword(text)}
          placeholder="re-enter password"
          secureTextEntry={true}
          placeholderTextColor={'gray'}
          style={{
            borderWidth: 1,
            height: 44,
            width: '90%',
            color: 'black',
            borderColor: 'black',
            marginBottom: 14,
            borderRadius: 14,
            paddingLeft: 16,
            fontWeight: '500',
          }}
        />

        <TextInput
          value={confirmpassword}
          onChangeText={text => setConfirmpassword(text)}
          placeholder="re-enter password"
          secureTextEntry={true}
          placeholderTextColor={'gray'}
          style={{
            borderWidth: 1,
            height: 44,
            width: '90%',
            color: 'black',
            borderColor: 'black',
            marginBottom: 4,
            borderRadius: 14,
            paddingLeft: 16,
            fontWeight: '500',
          }}
        />
        <Text
          onPress={() => navigation.navigate('signin')}
          style={{
            paddingTop: 0,
            marginLeft: 150,
            color: 'black',
            fontWeight: '500',
            fontSize: 14,
          }}>
          Have An Account
        </Text>
        <TouchableOpacity
          onPress={Signupbtnfn}
          style={{
            borderRadius: 15,
            backgroundColor: 'violet',
            justifyContent: 'center',
            alignItems: 'center',
            height: 32,
            width: 130,
            marginTop: 10,
          }}>
          <Text style={{color: 'black', fontWeight: '500'}}>sign up</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};
export default Signupscreen;
