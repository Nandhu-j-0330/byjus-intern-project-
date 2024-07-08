// import React,{useState,useEffect} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  FlatList,
  Share,
  ImageBackground,
} from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
// import {firebase} from './firebase/firebase'
import firestore from '@react-native-firebase/firestore';
import Video from 'react-native-video';
import {useEffect, useState,Component} from 'react';


const Videoplayer = ({navigation, route}) => {
  const {item} = route?.params || {};
  const [loading, setLoading] = useState(true);
  const [dashboardvideos, setDashboardvideos] = useState([]);
  // console.log(firebase);
  const shareOptions = {
    title: 'Byjus',
    message: item.videoURL, // Note that according to the documentation at least one of "message" or "url" fields is required
    url: item.videoURL,
    subject: 'Byjus'
  };
  onSharePress = () => Share.share(shareOptions);
  useEffect(() => {
    const subscriber = firestore()
      .collection('dashboardvideos')
      .onSnapshot(querySnapshot => {
        const dashboardvideos = [];
        // console.log(querySnapshot)
        querySnapshot?.forEach(
          documentSnapshot => {
            console.log(documentSnapshot);
            dashboardvideos.push({
              imageURL: documentSnapshot._data.imageURL,
              title: documentSnapshot._data.title,
            });
          },
          // (error)=>console.log(error)
        );

        setDashboardvideos(dashboardvideos);
        setLoading(false);
      });

    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, []);

  

  if (loading) {
    return <ActivityIndicator />;
  }
  return (
    <View style={{flex: 1}}>
      <View
        style={{
          flex: 0.32,
          position: 'relative',
          backgroundColor: 'rgba(0,0,0,0.1)',
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 10,
            position: 'relative',
          }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialIcons
              name="keyboard-backspace"
              size={28}
              color="white"
              style={{marginLeft: 20, textAlign: 'center'}}
            />
          </TouchableOpacity>
          <Feather
            name="settings"
            size={20}
            color="white"
            style={{marginRight: 20}}
          />
        </View>

        <View sytle={{width: '110%', height: '100%', position: 'relative'}}>
          <Video
            controls={true}
            resizeMode="contain"
            source={{uri: item.videoURL}}
            style={{
              width: '100%',
              height: '100%',
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
              marginTop: 0,
              marginBottom: 10,
            }}
          />
        </View>
      </View>
      <View
        style={{
          flex: 0.68,
          backgroundColor: 'white',
          backgroundColor: 'white',
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
        }}>
        <View style={{padding: 20}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text
              style={{fontSize: 12, color: 'darkviolet', fontWeight: '500'}}>
              An Introduction to motion
            </Text>
            <TouchableOpacity 
            onPress={this.onSharePress}
            >
            <EvilIcons
              name="share-google"
              size={28}
              color="black"
              style={{}}
            /></TouchableOpacity>
            {/* <MaterialIcons name="save-alt" size={24} color="black" style={{}} /> */}
          </View>
          <Text style={{color:'black',fontSize:18,textAlign:'left'}}>{dashboardvideos.length} {dashboardvideos.length > 1 ? 'Videos' : 'Video'}</Text>

          <Text
            style={{
              width: '54%',
              fontSize: 14,
              color: 'black',
              fontWeight: '500',
              marginTop:10,
              marginBottom:10
            }}>
            Motion and measurements of Distances
          </Text>

          <FlatList
            data={dashboardvideos}
            renderItem={({item}) => (
              <View
                style={{
                  height: 100,
                  flex: 1,
                  alignItems: 'flex-start',
                  justifyContent: 'flex-start',
                  flexDirection: 'row',
                }}>
                {/* <Image source={{uri:item.imageURL}} style={{width:20,height:26,}}/> */}
                <Image
                  style={{width: 86, height: 40}}
                  source={{uri: item.imageURL}}
                />
                <Text
                  style={{
                    flex: 0.84,
                    paddingLeft: 10,
                    color: 'black',
                    fontWeight: '500',
                  }}>
                  {' '}
                  {item.title}
                </Text>
                <View style={{}}>
                  <Text style={{fontSize: 16, color: 'black'}}>
                    {item.time}
                  </Text>
                </View>
              </View>
            )}
          />
        </View>
      </View>
    </View>
  );
};
export default Videoplayer;
