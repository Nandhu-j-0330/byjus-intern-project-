import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  TextBase,
  Image,
  Dimensions,
  Alert
} from 'react-native';
import Loginpage from './signin';
import Welcomepage from './profile';
import Logout from './Logout';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import Video from 'react-native-video';
import firestore from '@react-native-firebase/firestore';

import {ref, set} from 'firebase/database';
import storage from '@react-native-firebase/storage';
import {Utils} from '@react-native-firebase/app';
import {useNavigation} from '@react-navigation/native';
import {createThumbnail} from 'react-native-create-thumbnail';
import Editprofile from './editprofile';

const physicsvideo = require('./assets/videos/physics.mp4');
const sciencevideo = require('./assets/videos/science.mp4');
const mathsvideo = require('./assets/videos/maths.mp4');
const biologyvideo = require('./assets/videos/biology.mp4');
const biologyvideo1 = require('./assets/videos/maths.mp4');

const videos = [
  {
    key: 1,
    name: 'Byju Yabez',
    video_url: physicsvideo,
    description: 'Better than a thousand days of...',
  },
  {
    key: 2,
    name: 'Byju Raveendran',
    video_url: sciencevideo,
    description: 'Teaching is more than impart... ',
  },
  {
    key: 3,
    name: 'Byju Ansha',
    video_url: mathsvideo,
    description: ' “  one teacher can change the... ',
  },
  {
    key: 4,
    name: 'Byju Kalai',
    video_url: biologyvideo1,
    description: ' he can never tell where his.."',
  },
  {
    key: 5,
    name: 'Byju Anwar',
    video_url: biologyvideo,
    description: ' he can never tell where his.."',
  },
];
const {height,width} = Dimensions.get('window');
const Drawer = createDrawerNavigator();
const Drawernavigator = navigation => {
  const reference = storage().ref('black-t-shirt-sm.png');
  return (
    <>
      <Drawer.Navigator
      initialRouteName="LandingScreen"
      screenOptions={{header: () => null}}>
      <Drawer.Screen name="LandingScreen" component={Dashboard1} />
      <Drawer.Screen name="Profile" component={Editprofile} />
      <Drawer.Screen name="Logout" component={Logout} />

   
    </Drawer.Navigator>
    
    </>
  
  );
};



const Dashboard1 = ({navigation}) => {
  const {height, width} = Dimensions.get('window');

  const [loading, setLoading] = useState(true);
  const [uploadvideo1, setUploadvideo1] = useState([]);
  const [sampleImage, setSampleImage] = useState([]);
  // const [videoURL, setVideoURL] = useState([])
  const Opendrawer = () => {
    return navigation.openDrawer();
  };
  //const navigation = useNavigation();
  //console.log(firebase);

  // testing 1
  const getSampleImage = async () => {
    const imageRefs = await storage().ref('images').listAll();
    const urls = await Promise.all(
      imageRefs.items.map(ref => ref.getDownloadURL()),
    );
    const promiseArray = []
    urls.map(async url => {
      promiseArray.push(generateThumbnail(url))
      // return {videoUrl: url, thumbnailUrl: data.path};
    });
    const urldata = await Promise.all(promiseArray)
    const allUrls = urldata.map((data, index)=>{
      return {thumbnailUrl: data.path, videoURL: urls[index]};
    })
    console.log(allUrls, urls, 'allUrls');
    setSampleImage(allUrls);
  };
  // testing 1

  const generateThumbnail = url => {
    return createThumbnail({
      url: url,
      timeStamp: 10000,
      format: 'png',
    });
  };

  useEffect(() => {
    const subscriber = firestore()
      .collection('uploadvideo1')
      .onSnapshot(querySnapshot => {
        const uploadvideo1 = [];
        querySnapshot?.forEach(
          documentSnapshot => {
            // console.log(documentSnapshot);
            // uploadvideo1.push({
            //   videoURL: documentSnapshot._data.videoURL,
            //   imageURL: documentSnapshot._data.imageURL,
            //   key: documentSnapshot._data.key,
            //   // title:documentSnapshot._data.title,
            // });
          },
          // (error)=>console.log(error)
        );
        setUploadvideo1(uploadvideo1);

        // testing 2

        setUploadvideo1(uploadvideo1);
        // testing 2

        // (error)=>console.log(error)

        setLoading(false);
      });

    getSampleImage();
    // Unsubscribe from events when no longer in use
    return () => subscriber();

  }, []); // testing 3

  {
    sampleImage.length != 0 &&
      sampleImage.map((url, index) =>
        uploadvideo1.push({
          videoURL: url.videoURL,
          imageURL: url.thumbnailUrl,
          key: index,
        }),
      );
  }
  // testing 3

  // console.log(dashboardvideos);

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <ScrollView style={{marginVertical: 0, flex: 1.2}}>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <View
          style={{
            flex: 0.08,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: width,
            paddingRight:12
          }}>
          <Text style={{paddingLeft: 10}} onPress={Opendrawer}>
            <Feather
              name="menu"
              size={25}
              color="black"
              style={{marginLeft: 20}}
            />{' '}
          </Text>
          <Text
            style={{
              fontSize: 24,
              color: 'rgba(140,44,141,255)',
              fontWeight: '700',
            }}>
            {' '}
            BYJU'S{' '}
          </Text>

          <TouchableOpacity
            onPress={() => navigation.navigate('uploadfiles')}
            style={{alignItems:'flex-end'}}>
            <Octicons name="plus" size={30} color="black"  />
          </TouchableOpacity>
        </View>

        <View
          style={{backgroundColor: 'white', justifyContent: 'space-evenly'}}>
          <Text
            style={{
              fontSize: 18,
              color: 'black',
              fontWeight: '600',
              paddingTop: 6,
              marginLeft: 10,
            }}>
            ALL Subjects
          </Text>
        </View>

        <View
          style={{flexDirection: 'row', flex: 0.17, backgroundColor: 'yellow'}}>
          <View
            style={{
              backgroundColor: 'white',
              flex: 0.5,
              flexDirection: 'column',
              justifyContent: 'space-evenly',
            }}>
            <TouchableOpacity
              onPress={() => navigation.navigate('maths')}
              style={{
                backgroundColor: 'skyblue',
                justifyContent: 'center',
                alignItems: 'center',
                width: '85%',
                height: 44,
                marginLeft: '10%',
                borderRadius: 6,
              }}>
              <Text style={{fontSize: 14, color: 'black', fontWeight: '500'}}>
                Mathematics
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('chemistry')}
              style={{
                backgroundColor: 'orange',
                justifyContent: 'center',
                alignItems: 'center',
                width: '85%',
                height: 44,
                marginLeft: '10%',
                borderRadius: 6,
                marginTop: 8,
              }}>
              <Text style={{fontSize: 14, color: 'black', fontWeight: '500'}}>
                Chemistry
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              backgroundColor: 'white',
              flex: 0.5,
              flexDirection: 'column',
              justifyContent: 'space-evenly',
              paddingTop: 4,
              alignItems: 'center',
            }}>
            <TouchableOpacity
              style={{
                backgroundColor: 'pink',
                justifyContent: 'center',
                alignItems: 'center',
                width: '85%',
                height: 44,
                marginRight: '10%',
                marginLeft: '5%',
                borderRadius: 6,
              }}
              onPress={() => navigation.navigate('physics')}>
              <Text style={{fontSize: 14, color: 'black', fontWeight: '500'}}>
                Physics
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('biology')}
              style={{
                backgroundColor: 'lightgreen',
                justifyContent: 'center',
                alignItems: 'center',
                width: '85%',
                height: 44,
                marginRight: '10%',
                marginLeft: '5%',
                marginTop: 12,
                borderRadius: 6,
              }}>
              <Text style={{fontSize: 14, color: 'black', fontWeight: '500'}}>
                Biology
              </Text>
            </TouchableOpacity>
            <View></View>
          </View>
        </View>

        <View style={{flex: 0.3, backgroundColor: 'white'}}>
          <Text
            style={{
              margin: 8,
              marginLeft: 10,
              fontSize: 18,
              color: '#2c2648',
              fontWeight: '600',
            }}>
            BYJU'S Classes
          </Text>
          <View
            style={{
              flex: 0.97,
              backgroundColor: '#2c2648',
              marginLeft: 10,
              marginRight: 10,
              borderRadius: 6,
            }}>
            <Text
              style={{
                marginTop: 18,
                marginLeft: 18,
                fontSize: 16,
                fontWeight: '600',
                color: 'white',
              }}>
              BYJU'S Classes
            </Text>
            <Text
              style={{
                margin: 10,
                width: '46%',
                marginLeft: 18,
                fontSize: 14,
                color: 'white',
                fontWeight: '600',
              }}>
              Online tuitions by india's best teachers
            </Text>
            <TouchableOpacity
              style={{
                width: '40%',
                height: 30,
                backgroundColor: 'white',
                marginLeft: 16,
                borderRadius: 15,
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 0,
                marginBottom: 8,
              }}>
              <Text style={{color: '#2c2648', fontSize: 14, fontWeight: '700'}}>
                Book a Free Trial
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            backgroundColor: 'white',
            marginTop: 4,
            flex: 0.035,
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <Text
            style={{
              fontSize: 18,
              color: 'black',
              fontWeight: '600',
              marginLeft: 20,
            }}>
            BYJU'S Corner
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: 'black',
              marginRight: 0,
              marginLeft: '43%',
              fontWeight: '500',
            }}>
            View all
          </Text>
          <MaterialCommunityIcons
            name="greater-than"
            size={16}
            color="black"
            style={{marginRight: 14}}
          />
        </View>
        <View style={{flex: 0.3, backgroundColor: 'white', marginTop: 10}}>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.key}
            data={videos}
            renderItem={props => videoscroll({...props, navigation})}
          />
        </View>

        <View style={{flex: 1, flexDirection: 'column', marginTop: 6}}>
          <Text
            style={{
              fontSize: 18,
              color: 'black',
              fontWeight: '600',
              marginLeft: 20,
              fontWeight: '500',
              marginBottom: 10,
            }}>
            Uploaded Videos
          </Text>
          <FlatList
            horizontal
            separators
            showsHorizontalScrollIndicator={false}
            data={uploadvideo1}
            renderItem={props => flatlistvideo({...props, navigation})}
          />
        </View>
      </View>
    </ScrollView>
  );
};
const flatlistvideo = ({item, navigation}) => {
  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1, marginHorizontal: 10}}>
        <TouchableOpacity
          onPress={() => navigation.navigate('videoplayer', {item})}>
          {/* <Video source={{uri:item.videoURL}} style={{width:236,height:100,borderTopLeftRadius:8,borderTopRightRadius:8
         ,marginTop:20}}/> */}
          <Image
            style={{
              width: 240,
              height: 120,
              borderTopLeftRadius: 6,
              borderTopRightRadius: 6,
            }}
            source={{uri: item.imageURL}}
          />
          <Text style={{fontSize: 21, color: 'black'}}>{item.title}</Text>
        </TouchableOpacity>
      </View>

      {/* <View style={{flex:0.12,backgroundColor:'violet',marginTop:0,justifyContent:'center',alignItems:'flex-start',marginBottom:16,backgroundColor:'white'}}>
         <Text style={{color:'black',fontWeight:'600',fontSize:15,marginLeft:10}}>hello </Text> */}
      {/* </View> */}
    </View>
  );
};
const videoscroll = ({item, navigation}) => {
  return (
    // <View style={{flex:0.8,backgroundColor:'white',width:240,height:150}}>
    <View style={{backgroundColor: 'white'}}>
      <View style={{flex: 0.68}}>
        <TouchableOpacity onPress={() => navigation.navigate('maths')}>
          <Video
            source={item.video_url}
            style={{
              marginLeft: 10,
              marginBottom: 10,
              width: 240,
              height: 124,
              borderTopLeftRadius: 6,
              borderTopRightRadius: 6,
            }}></Video>
        </TouchableOpacity>
      </View>
      <View style={{flex: 0.28, marginTop: 0}}>
        <Text
          style={{
            marginLeft: 50,
            color: 'black',
            fontSize: 18,
            fontWeight: '600',
          }}>
          {item.name}
        </Text>
        <Text
          style={{
            width: 240,
            paddingLeft: 50,
            fontSize: 12,
            color: 'black',
            fontWeight: '500',
            marginTop: 0,
            marginBottom: 10,
          }}>
          {item.description}
        </Text>
      </View>
    </View>
  );
};
export default Drawernavigator;
