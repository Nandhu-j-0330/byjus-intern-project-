import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  TextInput,
  View,
  Text,
  NativeModules,
  Image,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Button,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Dropdown } from 'react-native-element-dropdown';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';

const {height, width} = Dimensions.get('window');
const data = [
  { label: 'Male', value: 'Male' },
  { label: 'Female', value: 'Female' },
]
const Editprofile = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [mobilenumber, setMobilenumber] = useState('');
  const [address, setAddress] = useState('');
  const [gender, setGender] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);


  const isFocused = useIsFocused();

  useEffect(() => {
    const getUser = async () => {
      const uid = await AsyncStorage.getItem('uid');
      console.log(uid, 'uid');
      const user = await firestore().collection('profile').doc(uid).get();
      console.log(user.data(), 'userInfo');
      const {
        address = '',
        email,
        gender = '',
        mobilenumber = '',
        username = '',
      } = user.data();
      setMobilenumber(mobilenumber);
      setAddress(address);
      setGender(gender == 'Male'? 'Male' : gender == 'Female' ?'Female' : '');
      setEmail(email);
      setUsername(username);
    };
    if (isFocused) getUser();
  }, [isFocused]);

  const handleSave = async () => {
    const uid = await AsyncStorage.getItem('uid');
    firestore()
      .collection('profile')
      .doc(uid)
      .update({mobilenumber, address, gender})
      .then(() => {
        Alert.alert('Profile updated successfully...');
        setIsEditMode(false);
      })
      .catch(e => {
        Alert.alert(e.message);
      });
  };

  return (
    <KeyboardAvoidingView
      // behavior={Platform.OS === 'ios' ? padding : height}
      behavior="height"
      keyboardVerticalOffset={0}
      style={{flex: 1}}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{backgroundColor: 'white', flex: 1}}>
          <View
            style={{
              flex: 0.06,
              // alignItems: 'baseline',
              justifyContent: 'center',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity
              style={{alignItems: 'center', justifyContent: 'center'}}
              onPress={() => navigation.goBack()}>
              <MaterialIcons
                name="keyboard-backspace"
                size={24}
                color="black"
                style={{
                  marginLeft: 20,
                  textAlign: 'center',
                  backgroundColor: 'white',
                  borderRadius: 20,
                  padding: 6,
                }}
              />
            </TouchableOpacity>
            {/* <Button title='save' onPress={handleSave}></Button> */}
            <TouchableOpacity
              onPress={() => {
                if (!isEditMode) return setIsEditMode(true);
                handleSave();
              }}
              style={{
                marginRight: 20,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{color: 'violet', fontSize: 18, fontWeight: '500'}}>
                {isEditMode ? 'Save ' : 'Edit'}
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flex: 0.25,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              style={{
                height: 80,
                width: 80,
               borderColor:'gray',
               borderWidth:1,
                alignItems: 'center',
                borderRadius: 40,
              }}
              source={require('./assets/images/learn3.jpg')}></Image>
            <Text style={{marginTop: 20, fontSize: 24, color: '#BE7B72'}}>
              {username}
            </Text>
          </View>
          <View style={{flex: 0.6}}>
            <View
              style={{
                margin: 20,
                width: '90%',
                paddingLeft: 20,
                marginVertical: 30,
                marginBottom: 0,
              }}>
              <Text style={{color: 'gray', marginLeft: 1, fontSize: 14}}>
                Email ID
              </Text>
              <View style={Styles.txtinputwithicon}>
                <TextInput
                  onChangeText={text => setEmail(text)}
                  placeholder="Enter E-mail ID"
                  placeholderTextColor={'gray'}
                  editable={false}
                  value={email}
                  style={{
                    width: '100%',
                    color: 'gray',
                    fontSize: 18,
                  }}></TextInput>
                <MaterialIcons name="mark-email-read" size={20} color="black" />
              </View>
              <View
                style={{
                  height: 0.2,
                  borderWidth: 0.2,
                  borderColor: 'lightgray',
                }}></View>
            </View>
            <View
              style={{
                margin: 20,
                width: '90%',
                borderRadius: 6,
                paddingLeft: 20,
                marginVertical: 30,
                marginBottom: 0,
              }}>
              <Text style={{color: 'gray', marginLeft: 1, fontSize: 14}}>
                Mobile Number
              </Text>
              <View style={Styles.txtinputwithicon}>
                <TextInput
                  keyboardType="phone-pad"
                  onChangeText={text => setMobilenumber(text)}
                  placeholder=""
                  placeholderTextColor={'gray'}
                  editable={isEditMode}
                  value={mobilenumber}
                  style={{
                    width: '100%',
                    color: 'gray',
                    fontSize: 18,
                  }}></TextInput>
                <FontAwesome5 name="mobile" color="black" size={20} />
              </View>
              <View
                style={{
                  height: 0.2,
                  borderWidth: 0.2,
                  borderColor: 'lightgray',
                }}></View>
            </View>
            <View
              style={{
                margin: 20,
                width: '90%',
                borderRadius: 6,
                marginVertical: 30,
                paddingLeft: 20,
                marginBottom: 0,
              }}>
              <Text style={{color: 'gray', marginLeft: 1, fontSize: 14}}>
                Address
              </Text>
              <View style={Styles.txtinputwithicon}>
                <TextInput
                  onChangeText={text => setAddress(text)}
                  placeholder=""
                  placeholderTextColor={'gray'}
                  editable={isEditMode}
                  value={address}
                  style={{
                    width: '100%',
                    color: 'gray',
                    fontSize: 18,
                  }}></TextInput>
                <FontAwesome5 name="address-card" size={16} color="black" />
              </View>
              <View
                style={{
                  height: 0.2,
                  borderWidth: 0.2,
                  borderColor: 'lightgray',
                }}></View>
            </View>
            <View
              style={{
                margin: 20,
                width: '90%',
                borderRadius: 6,
                paddingLeft: 20,
                marginVertical: 30,
                marginBottom: 8,
              }}>
              {/* <Text style={{color: 'gray', marginLeft: 1, fontSize: 14}}>
                Gender
              </Text>
              <TextInput
                onChangeText={text => setGender(text)}
                placeholder=""
                placeholderTextColor={'gray'}
                editable={isEditMode}
                value={gender}
                style={{
                  width: '100%',
                  color: 'gray',
                  fontSize: 18,
                }}></TextInput> */}
                <Text style={{color: 'gray', marginLeft: 1, fontSize: 14}}>
               Gender
              </Text>

                <Dropdown
                value={gender}
                data={data}
                
                disable={!isEditMode}
                labelField="label"
                itemTextStyle={{color:'gray'}}
                valueField="value"
                selectedTextStyle={{color:'gray'}}
                selectedTextProps={{color:'black'}}
                placeholder={'Select Gender'}
                placeholderStyle={{color:'gray',fontSize:16}}
                // placeholderTextColor={}
                style={{color:'black',width:'94%',paddingLeft:10}}
                onChange={item => {
                  setGender(item.value)
                }}
                />
              <View style={Styles.txtinputwithicon}></View>
            </View>
            <View
              style={{
                height: 0.2,
                borderWidth: 0.2,
                borderColor: '#B4B4B8',
                marginTop: 18,
              }}></View>
              
          </View>

          <View style={{flex: 0.1, justifyContent: 'flex-end'}}>
            <Text style={{color: 'gray', textAlign: 'center', bottom: 10}}>
              Version 1.0.0
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const Styles = StyleSheet.create({
  txtinputwithicon: {
    flexDirection: 'row',
    width: '90%',
    alignItems: 'center',
  },
});
export default Editprofile;
