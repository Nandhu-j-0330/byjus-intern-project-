import React, {useRef, useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  TextBase,
  Dimensions,
  Modal,
  Alert,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

const {height, width} = Dimensions.get('window');

const Quizpage = ({navigation, item, data, route}) => {
  const {QuizData} = route?.params || [];
  const [currentIndex, setCurrentindex] = useState(0);
  const [question, setQuestion] = useState(QuizData);

  const [modalVisible, setModalVisible] = useState(false);
  const listRef = useRef();

  const Onselectedoption = (index, x) => {
    const Tempdata = question;
    Tempdata.map((item, ind) => {
      if (index == ind) {
        item.marked = x;
      }
    });
    let temp = [];
    Tempdata.map(item => {
      temp.push(item);
    });
    setQuestion(temp);
  };

  const updateQuestion = index => {
    setCurrentindex(index);
    listRef.current.scrollToIndex({
      animated: true,
      index: index,
      // index:currentindex
    });
  };
  const getTextscore = () => {
    marks = 0;
    question.map(item => {
      if (item.marked == item.correct) {
        marks = marks + 5;
      }
    });
    return marks;
  };

  const Resetbtn = index => {
    const Tempdata = question;
    Tempdata.map((item, ind) => {
      item.marked = -1;
    });
    let temp = [];
    Tempdata.map(item => {
      temp.push(item);
    });
    setQuestion(temp);
  };

  return (
    <View
      style={{flex: 1, justifyContent: 'flex-end', backgroundColor: 'white'}}>
      <View
        style={{
          flex: 0.09,
          backgroundColor: 'white',
          flexDirection: 'row',
          justifyContent: 'space-between',
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

        <TouchableOpacity
          onPress={() => {
            setModalVisible(true);
          }}
          style={{
            borderWidth: 1.5,
            backgroundColor: 'white',
            borderColor: 'rgba(140,44,140,255)',
            marginRight: 20,
            width: 80,
            height: 30,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 20,
          }}>
          <Text
            style={{
              color: 'rgba(140,44,140,255)',
              fontSize: 14,
              fontWeight: '700',
            }}>
            submit
          </Text>
        </TouchableOpacity>
      </View>

      {/* submit check */}
      <View style={{flex: 0.9, backgroundColor: 'white'}}>
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
          }}>
          <Text
            style={{
              margin: 4,
              marginLeft: 20,
              color: 'black',
              fontWeight: '600',
              fontSize: 16,
            }}>
            No Of Questions :{' '}
            {' ' + (currentIndex + 1) + ' / ' + QuizData.length}
          </Text>
          <TouchableOpacity
            onPress={() => {
              Resetbtn();
              listRef.current.scrollToIndex({animated: true, index: 0});
            }}
            style={{justifyContent: 'center', marginRight: 34}}>
            <Text
              style={{
                color: 'purple',
                // 'rgba(140,44,140,255)'
                fontSize: 16,
                fontWeight: '700',
              }}>
              Reset
            </Text>
          </TouchableOpacity>
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            // Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View
            style={{
              flex: 1,
              backgroundColor: 'rgba(0,0,0,.5)',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                backgroundColor: 'white',
                height: '25%',
                width: '84%',
                borderRadius: 8,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontSize: 34,
                  color: 'purple',
                  fontWeight: '600',
                  marginTop: 6,
                  marginBottom: 8,
                }}>
                Test Score
              </Text>
              <Text
                style={{
                  fontSize: 40,
                  color: 'black',
                  fontWeight: '600',
                  color: 'green',
                  marginBottom: 16,
                }}>
                {getTextscore()}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
                style={{
                  borderWidth: 1.4,
                  elevation: 2,
                  // backgroundColor:'rgba(0,0,0,0.02)',
                  marginTop: 0,
                  width: '28%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderColor: 'purple',
                  borderLeftColor: 'blue',
                  borderRadius: 6,
                  height: '12%',
                }}>
                <Text style={{color: 'black', fontWeight: '600', fontSize: 14}}>
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <FlatList
          ref={listRef}
          data={question}
          onScroll={e => {
            //scroll view
            const x = Math.ceil(e.nativeEvent.contentOffset.x / width);
            // setCurrentindex((Number(x) + 1));
          }}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          renderItem={({item, index, data}) => {
            return (
              <Renderqns
                data={item}
                parentRef={listRef}
                currentIndex={currentIndex}
                updateQuestion={updateQuestion}
                QuizData={QuizData}
                Selectedoption={x => {
                  Onselectedoption(index, x);
                }}
              />
            );
          }}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
          marginBottom: 26,
          backgroundColor: 'white',
        }}>
        <TouchableOpacity
          onPress={() => {
            console.log(currentIndex);
            // console.log(QuizData.question.length)
            // console.log(data.question.length)
            console.log(currentIndex);
            if (currentIndex > 0) {
              updateQuestion(Number(currentIndex) - 1);
            }
          }}
          style={{
            height: 60,
            width: 66,
            borderWidth: 1,
            borderColor: 'purple',
            backgroundColor: 'white',
            borderRadius: 60,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <FontAwesome6
            name="arrow-left-long"
            size={30}
            color="black"
            style={{}}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            console.log(currentIndex);
            console.log(listRef.current);
            if (currentIndex < QuizData.length - 1) {
              updateQuestion(Number(currentIndex) + 1);
            }
            console.log('index' + currentIndex);
          }}
          style={{
            height: 60,
            width: 66,
            borderWidth: 1,
            borderColor: 'purple',
            backgroundColor: 'white',
            borderRadius: 60,
            marginLeft: '0%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <FontAwesome6
            name="arrow-right-long"
            size={30}
            color="black"
            style={{}}
          />
        </TouchableOpacity>
      </View>

      {/* <View style={{marginTop: 30}}></View> */}
    </View>
  );
};

const Renderqns = ({
  item,
  data,
  Selectedoption,
  parentRef,
  currentIndex,
  updateQuestion,
  QuizData,
}) => {
  // const [currentIndex, setCurrentindex] = useState(1);
  const [question, setQuestion] = useState(QuizData);

  const listRef = useRef();

  return (
    <View
      style={{
        width: width,
        marginRight: 0,
        marginLeft: 2,
        justifyContent: 'center',
        padding: 2,
        marginTop: 4,
      }}>
      <Text
        style={{
          fontSize: 20,
          color: 'black',
          fontWeight: '600',
          marginLeft: 18,
          width: '94%',
        }}>
        {'Ques :  ' + data.question}
      </Text>
      {/* <Text>{data.options}</Text> */}
      <FlatList
        data={data.options}
        ref={listRef}
        renderItem={({item, index}) => {
          return (
            <View style={{}}>
              <TouchableOpacity
                onPress={() => Selectedoption(index + 1)}
                style={{
                  marginTop: 30,
                  marginLeft: 10,
                  marginRight: 10,
                  borderWidth: 1,
                  borderColor: 'purple',
                  elevation: 3,
                  width: '90%',
                  height: 52,
                  backgroundColor:
                    data.marked == index + 1
                      ? data.correct == index + 1
                        ? 'green'
                        : 'red'
                      : 'white',
                  borderRadius: 8,
                  alignItems: 'center',
                  textAlign: 'left',
                  paddingLeft: 30,
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    color: data.marked == index + 1 ? 'black' : 'purple',
                    fontWeight: '600',
                    marginRight: 20,
                  }}>
                  {index == 0
                    ? 'A'
                    : index == 1
                    ? 'B'
                    : index == 2
                    ? 'C'
                    : index == 3
                    ? 'D'
                    : 'E'}
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: '600',
                    width: '80%',
                    color: 'black',
                  }}>
                  {item}
                </Text>
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </View>
  );
};
export default Quizpage;
