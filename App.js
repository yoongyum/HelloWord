import React ,{useState,useEffect} from 'react';
import {FlatList,StyleSheet, Text, View ,TouchableOpacity, Dimensions, ScrollView, TextInput,StatusBar, Animated} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import 'react-native-gesture-handler';
import Modal from "react-native-modal";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ListInsert from './component/ListsInsert'
import EditScreen from './screen/EditScreen';
import ListScreen from './screen/ListScreen';
import StartScreen from './screen/StartScreen';

const ScreenHeight = Dimensions.get('window').height;  //화면 높이
const ScreenWidth = Dimensions.get('window').width;  //화면 너비
const ITEM_SIZE = ScreenWidth*0.3;

function HomeScreen ({navigation}){
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const [vocas , setVoca] = useState([]); //단어배열
  const [vocaLists, setVocaList] = useState([]);  //단어장배열
  const [newName,setName] = useState('')
  const [checked, setChecked] = useState(false);

  const shuffleArray=(inputArray)=>{  //리스트 무작위 셔플
    inputArray.sort(()=> Math.random() - 0.5);
  }
  const loadData = async()=>{
    try {
      let loadValue = await AsyncStorage.getItem('list');
      let loadListarray = await AsyncStorage.getItem('listArray');
      if(loadValue != null){
        let tmp = JSON.parse(loadValue)//데이터 파싱
        shuffleArray(tmp)//리스트 셔플
        setVoca(tmp)
      }
      if(loadListarray!=null){
        let tmp2 = JSON.parse(loadListarray)
        setVocaList(tmp2)
      }
    } catch (error) {
      alert(error)
    }
  }
  const ListStoreData = async(value)=>{
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('listArray',jsonValue)
    } catch (error) {
      alert(error)
    }
  }
  const popuphide=()=>{
    setChecked(false);
  }
  const popupOn=()=>{
    setChecked(true);
  }
  const vocaInputHandler=(newName)=>{
    setName(newName);
  }
  const addListHandler=()=>{
    if(newName !== ''){
      const Listarray = [...vocaLists,{ id : Math.random().toString(), name : newName, selected : true}];
      setVocaList(Listarray);
      setName('');
      setChecked(false);
      ListStoreData(Listarray);
    }else{
      alert('빈칸을 채워주세요')
    }
  }
  useEffect(() => {
    loadData();
  }, [vocaLists]);
  return (
    <View style={styles.container}>
      <StatusBar 
        animated = {true}
        //backgroundColor = "default"
        barStyle = "light-content"
      />
      <View style={styles.title_area}>
        <Text style={styles.text_a}>HelloWord</Text>
      </View>
      <Modal
        isVisible={checked}
        onChangeText={vocaInputHandler}
      >
        <View style ={styles.popup}>
          <TextInput 
            style ={styles.textIN_modalbtn}
            placeholder="단어장 이름을 적어주세요." 
            onChangeText={vocaInputHandler}
            value = {newName}
            //autoCorrect={false}
          >
          </TextInput>
        </View>
        <View style={styles.popup_btnarea}>
          <TouchableOpacity onPress={addListHandler}>
              <Text style={styles.text_modalbtn}>save</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={popuphide}>
              <Text style={styles.text_modalbtn}>cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <View style ={styles.btn_area}>
        <Animated.ScrollView 
        horizontal={true} 
        showsHorizontalScrollIndicator = {false} 
        snapToInterval = {ITEM_SIZE*1.1}
        bounces = {false}
        decelerationRate = {0}
        onScroll={Animated.event(
          [{nativeEvent : {contentOffset: { x:scrollX}}}],
          {useNativeDriver : true}
        )}
        scrollEventThrottle={16}
        >
          {vocaLists.map(Lists=>(
            <ListInsert navi={navigation} key = {Lists.id}{...Lists} />
          ))}
          <TouchableOpacity style={styles.btn_setting} onPressIn={popupOn}>
            <Text style={styles.text_add}>+</Text>
          </TouchableOpacity>
        </Animated.ScrollView>
      </View>
      <View style={{backgroundColor : '#3B3A3A'}}>
        <View>
          <TouchableOpacity style={styles.btn_RandonTest} activeOpacity ={0.9} onPressIn={()=>navigation.navigate('Start',{voca:vocas})}>
            <Text style={styles.text_RandonTest}>Random Test!</Text>
            <Text style = {{textAlign : 'center', color : '#4B20D6'}}>Touch here</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const Stack = createStackNavigator();

export default function App () {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="홈" component={HomeScreen} 
        options={
          {title : 'HOME',
          headerShown : null
        }}/>
        <Stack.Screen name="List" component={ListScreen} 
        options={{
          title : '단어장',
          headerShown : null
        }}/>
        <Stack.Screen name="Edit" component={EditScreen} 
        options={{
          title : 'EDIT',
          headerShown : null
          
        }}/>
        <Stack.Screen name="Start" component={StartScreen} 
        options={{
          title : 'START',
          headerShown : null
          
        }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  title_area :{
    flex :1,
    justifyContent : 'center',
    backgroundColor : '#3B3A3A',
  },
  text_a : {//Title or header
    //backgroundColor : 'green',
    fontSize : ScreenWidth*0.14,
    fontWeight : 'bold',
    color : 'white',
    textAlign : 'center',
  },
  text_add:{  //common text
    fontSize : 17,
    color : 'white',
    textAlign : 'center',
  },
  btn_area : {
    flex : 1,
    backgroundColor : '#3B3A3A',
    //alignItems : 'center',
    //justifyContent : 'center',
    borderBottomLeftRadius : 40,
  },
  btn_setting : {
    marginTop : 36,
    marginHorizontal : 10,
    borderWidth : 0.8,
    borderColor : 'white',
    justifyContent : 'center',
    borderRadius : 16,
    width : ITEM_SIZE*0.5,
    height : ITEM_SIZE*0.5,
  },
  btn_RandonTest : {
    width : '100%',
    height : ScreenHeight*0.23,
    backgroundColor : 'white',
    borderTopRightRadius : 70,
    //justifyContent : 'center'
  },
  text_RandonTest : {
    marginTop : '10%',
    textAlign : 'center',
    fontSize : ScreenWidth*0.12,
    fontWeight : 'bold',
    color : '#4B20D6',
    //textAlign : 'center',
  },
  bar_btn :{
    marginTop : 5,
    marginLeft : 10,
    marginRight : 10,
    color:'black',
    fontSize : 18,
    fontWeight : 'bold'
  },
  popup : {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 11,
    borderTopRightRadius: 11,
    borderBottomLeftRadius: 11,
    borderBottomRightRadius: 11,
    justifyContent : 'center',
    marginBottom : 20,
  },
  textIN_modalbtn : {    
    fontSize : 15,
    fontWeight : 'bold'
  },
  popup_btnarea : {
    flexDirection : 'row',
    justifyContent : 'space-between'
  },
  text_modalbtn : {
    color : '#0c72f7',
    fontSize : 25,
    marginLeft : 50,
    marginRight : 50,
  }

});
