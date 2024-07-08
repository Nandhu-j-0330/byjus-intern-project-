import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect } from 'react';
import {Dimensions} from 'react-native';
import {
  Text,
  Image,
  View,
  TouchableOpacity,
  StyleSheet,
  TouchableOpacityComponent,
  FlatList,
  ScrollView,
} from 'react-native';
const image1 = require('./assets/images/profile2.png');
const image2 = require('./assets/images/learn2.jpg');
const image3 = require('./assets/images/learn5.png');

const profiletext = [
  {
    key: 1,
    profiletxt:
      'We have amazing videos that can help you understanding the concepts much easily',
    profileImage: image1,
    title: 'Watch Videos To Learn',
  },
  {
    key: 2,
    profiletxt1:
      'A one-stop destination for daily learning in design, research, and product.',
    title: 'Watch Videos To Learn',
    profileImage: image2,
  },
  {
    key: 3,
    profiletxt2:
      'We have amazing videos that can help you understanding the concepts much easily',
    title: 'Watch Videos To Learn',
    profileImage: image3,
  },
];

const {height, width} = Dimensions.get('window');
const Welcomepage = ({navigation, item}) => {

  useEffect(() => {
    const validateUserAvailable = async ()=>{
     const user =  await AsyncStorage.getItem("uid")
     if(user){
      navigation.navigate("Dashboard",{screen:'LandingScreen'})
     }
    }
    validateUserAvailable()
  }, []);

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 0.65, backgroundColor: 'blue', paddingRight: 0}}>
        <FlatList
          pagingEnabled
          horizontal
          keyExtractor={item => item.key}
          data={profiletext}
          renderItem={item => (
            <View
              style={{
                width: width / 1,
                textAlign: 'center',
                justifyContent: 'flex-start',
                paddingRight: 0,
              }}>
              <Image
                source={item.item.profileImage}
                style={{width: width / 1, height: height / 1.6}}
              />
            </View>
          )}
        />
      </View>
      <View
        style={{
          // flex: 0.03,
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 10,
        }}>
        <Text style={{color: 'black', fontSize: 26}}>
          Watch Videos To Learn
        </Text>
      </View>
      <View style={{flex: 0.2, width: width}}>
        <FlatList
          horizontal
          pagingEnabled
          // persistentScrollbar={true}
          keyExtractor={item => item.key}
          data={profiletext}
          renderItem={item => (
            <View
              style={{
                width: width,
                textAlign: 'center',
                margin: 4,
                justifyContent: 'center',
              }}>
              <Text style={styles.flatListtxt}>{item.item.profiletxt}</Text>
              <Text style={styles.flatListtxt}>{item.item.profiletxt1}</Text>
              <Text style={styles.flatListtxt}>{item.item.profiletxt2}</Text>
            </View>
          )}
        />
      </View>

      <View style={{flex: 0.17}}>
        <TouchableOpacity
          onPress={() => navigation.navigate('signin')}
          style={styles.Nextbtn}>
          <Text style={{color: 'white'}}> Next </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Nextbtn: {
    backgroundColor: 'rgba(140,44,141,255)',
    borderRadius: 18,
    marginTop: '12%',
    width: '36%',
    height: 42,
    justifyContent: 'center',
    alignItems: 'center',
    margin: '34%',
  },
  flatListtxt: {
    fontSize: 16,
    color: 'black',
    fontWeight: '500',
    marginLeft: 2,
    width: width / 1.2,
    textAlign: 'left',
  },
});
export default Welcomepage;
