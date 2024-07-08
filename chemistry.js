import react, {useState, useEffect} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Image,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import firestore from '@react-native-firebase/firestore';
import Video from 'react-native-video';
import {ChemistryQuestions} from './chemistryQuestions';
const Chemistry = ({navigation}, {item}) => {
  // const handleback = ()=>{
  //    return(
  //       navigation.goBack()
  //    )
  // }
  const [loading, setLoading] = useState(true);
  const [chemistryvideos, setChemistryvideos] = useState([]);
  // console.log(firebase);
  useEffect(() => {

    const subscriber = firestore()
      .collection('chemistryvideos')
      .onSnapshot(querySnapshot => {
        const chemistryvideos = [];
        // console.log(querySnapshot)
        querySnapshot?.forEach(
          documentSnapshot => {
            console.log(documentSnapshot);
            chemistryvideos.push({
              videoURL: documentSnapshot._data.videoURL,
              title: documentSnapshot._data.title,
              imageURL: documentSnapshot._data.imageURL,
            });
          },
          // (error)=>console.log(error)
        );

        setChemistryvideos(chemistryvideos);
        setLoading(false);
      });

    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, []);

  // console.log(dashboardvideos);

  if (loading) {
    return <ActivityIndicator />;
  }
  return (
    <View style={{flex: 1, backgroundColor: 'pink'}}>
      <View style={{flex: 0.2, backgroundColor: 'pink'}}>
        <View
          style={{
            flex: 0.2,
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialIcons
              name="keyboard-backspace"
              size={28}
              color="black"
              style={{marginLeft: 20, textAlign: 'center'}}
            />
          </TouchableOpacity>
          <AntDesign
            name="search1"
            size={22}
            color="black"
            style={{marginRight: 20, textAlign: 'center'}}
          />
        </View>

        <View
          style={{
            flex: 0.8,
            flexDirection: 'column',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontSize: 20,
              marginLeft: 20,
              color: 'black',
              fontWeight: '600',
              marginTop: 20,
              marginVertical: 10,
            }}>
            Chemistry
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              textAlign: 'center',
            }}>
            <MaterialCommunityIcons
              name="page-next"
              size={20}
              color="black"
              style={{marginLeft: '5%', marginTop: 10}}
            />
            <Text
              style={{
                fontSize: 16,
                color: 'black',
                marginTop: 8,
                marginLeft: 8,
                fontWeight: '500',
              }}>
              Chapters
            </Text>

            <Feather
              name="play-circle"
              size={20}
              color="black"
              style={{marginLeft: '5%', marginTop: 10}}
            />
            <Text
              style={{
                fontSize: 16,
                color: 'black',
                marginTop: 10,
                marginLeft: 8,
                fontWeight: '500',
              }}>
             {chemistryvideos.length} {chemistryvideos.length > 1 ? 'videos' : 'video'}
            </Text>
          </View>
        </View>
      </View>

      <View
        style={{
          flex: 0.8,
          backgroundColor: 'white',
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
        }}>
        <View
          style={{
            justifyContent: 'flex-start',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <MaterialCommunityIcons
            name="page-next"
            size={24}
            color="black"
            style={{marginLeft: '5%'}}
          />
          <Text
            style={{
              fontSize: 18,
              margin: 20,
              marginLeft: 10,
              color: 'black',
              fontWeight: '500',
            }}>
            Chapter 1
          </Text>
        </View>

        <View style={{flex: 0.58}}>
          <View
            style={{
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <Text
              style={{
                fontSize: 16,
                color: 'black',
                fontWeight: '600',
                width: '60%',
                marginLeft: 20,
              }}>
              Motion and measurement of Distances
            </Text>
            <Text
              onPress={() =>
                navigation.navigate('videoplayer', {chemistryvideos})
              }
              style={{
                fontSize: 14,
                color: 'gray',
                marginLeft: '17%',
                fontWeight: '500',
              }}>
             {chemistryvideos.length} {chemistryvideos.length > 1 ? 'videos' : 'video'}
            </Text>
            <MaterialCommunityIcons
              name="greater-than"
              size={16}
              color="gray"
              style={{marginRight: 16, textAlign: 'center'}}
            />
          </View>
          {/* <TouchableOpacity onPress={()=>navigation.navigate('videoplayer')}> */}
          <View
            style={{
              flex: 0.86,
              backgroundColor: 'red',
              flexDirection: 'column',
            }}>
            <FlatList
              horizontal
              separators
              showsHorizontalScrollIndicator={false}
              data={chemistryvideos}
              renderItem={({item}) => (
                <View
                  style={{
                    flexDirection: 'column',
                    backgroundColor: 'white',
                    flex: 1,
                  }}>
                  <View
                    style={{
                      height: 100,
                      flex: 0.9,
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginHorizontal: 10,
                      position: 'relative',
                    }}>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('videoplayer', {item})
                      }>
                     
                      <Image
                        style={{width: 240, height: 140}}
                        source={{uri: item.imageURL}}
                      />
                    </TouchableOpacity>

                    <View style={{position: 'absolute'}}>
                      <FontAwesome5
                        name="play-circle"
                        size={70}
                        color="gray"
                        style={{}}
                      />
                    </View>
                  </View>
                  <View
                    style={{
                      flex: 0.12,
                      backgroundColor: 'violet',
                      marginTop: 0,
                      justifyContent: 'center',
                      alignItems: 'flex-start',
                      marginBottom: 16,
                      backgroundColor: 'white',
                    }}>
                    <Text
                      style={{
                        color: 'black',
                        fontWeight: '600',
                        fontSize: 15,
                        marginLeft: 10,
                      }}>
                      {' '}
                      {item.title}
                    </Text>
                  </View>
                </View>
              )}
            />
          </View>
          <View
            style={{
              justifyContent: 'flex-start',
              flexDirection: 'row',
              alignItems: 'center',
              flex: 0.1,
            }}>
            <MaterialCommunityIcons
              name="page-next"
              size={24}
              color="black"
              style={{marginLeft: '5%'}}
            />
            <Text
              style={{
                fontSize: 18,
                margin: 0,
                marginLeft: 10,
                color: 'black',
                fontWeight: '500',
                marginTop: 0,
              }}>
              Chapter 2
            </Text>
          </View>

          <View
            style={{
              flex: 0.15,
              justifyContent: 'flex-start',
              alignItems: 'center',
              flexDirection: 'row',
              marginLeft: 4,
              marginTop: 20,
            }}>
           
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('quiz', {QuizData: ChemistryQuestions})
              }
              style={{
                borderWidth: 1,
                borderColor: 'red',
                backgroundColor: 'white',
                marginLeft: 18,
                width: '40%',
                borderRadius: 18,
                alignItems: 'center',
                justifyContent: 'center',
                height: 32,
                flexDirection: 'row',
              }}>
              <Foundation
                name="clipboard-pencil"
                size={16}
                color="red"
                style={{marginRight: 6, textAlign: 'center'}}
              />
              <Text style={{color: 'red', fontSize: 14, fontWeight: '500'}}>
                Start Practice
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{flex: 0.48}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              flex: 0.19,

            }}>
            <Text
              style={{
                marginLeft: 20,
                margin: 10,
                color: 'black',
                fontWeight: '500',
                fontSize: 16,
                width:'60%'
              }}>
              Light,Shadows and Reflection
            </Text>
            <Text
              style={{
                color: 'gray',
                fontWeight: '500',
                marginLeft: '10%',
                fontSize: 14,
              }}>
              {chemistryvideos.length} {chemistryvideos.length > 1 ? 'videos' : 'video'}
            </Text>
            <MaterialCommunityIcons
              name="greater-than"
              size={15}
              color="gray"
              style={{marginRight: 18, textAlign: 'center'}}
            />
          </View>

          <View style={{flex: 0.8}}>
            <FlatList
              horizontal
              flashScrollIndicators
              showsHorizontalScrollIndicator={false}
              inverted
              data={chemistryvideos}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() => navigation.navigate('videoplayer', {item})}>
                  <View
                    style={{
                      flexDirection: 'column',
                      backgroundColor: 'white',
                      flex: 1,
                    }}>
                    <View
                      style={{
                        height: 100,
                        flex: 0.8,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginHorizontal: 10,
                        position: 'relative',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      {/* <Video  source={{uri:item.videoURL}} style={{width:236,height:150,borderTopLeftRadius:8,
          borderTopRightRadius:8,marginTop:20}}/> */}
                      <Image
                        style={{width: 240, height: 144}}
                        source={{uri: item.imageURL}}
                      />
                      <View
                        style={{
                          position: 'absolute',
                          width: '100%',
                          height: '80%',
                          backgroundColor: 'rgba(0,0,0,0.7)',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <FontAwesome5
                          name="play-circle"
                          size={70}
                          color="gray"
                        />
                      </View>
                    </View>
                    <View
                      style={{
                        flex: 0.16,
                        marginTop: 0,
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start',
                        marginLeft: 10,
                        paddingBottom: 8,
                        backgroundColor: 'white',
                      }}>
                      <Text
                        style={{
                          color: 'black',
                          fontWeight: '700',
                          fontSize: 14,
                        }}>
                        {' '}
                        {item.title}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </View>
    </View>
  );
};
export default Chemistry;
