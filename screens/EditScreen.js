import React ,{useState} from 'react';
import {LogBox, SafeAreaView, StyleSheet, Text, View ,TouchableOpacity, TextInput,Dimensions, KeyboardAvoidingView} from 'react-native';
import { StatusBar } from 'expo-status-bar';

//전역변수
const ScreenHeight = Dimensions.get('window').height;
const ScreenWidth = Dimensions.get('window').width;
const BarPaddingValue = 30;


LogBox.ignoreLogs([
 'Non-serializable values were found in the navigation state',
]);

export default function EditScreen ({navigation, route}){
  const [newWord, setWord] = useState('');
  const [newMean,setMean] = useState('');
  const vocaInputHandler = newWord=>{
    setWord(newWord);
  };
  const vocaInputHandler2 = newMean=>{
    setMean(newMean);
  };
  const addVocaHandler = ()=>{
    if(newWord !== '' && newMean !=''){
      route.params.addVoca(newWord,newMean);
      setWord('');
      setMean('');
      navigation.goBack()
    }else{
      alert('빈칸을 채워주세요')
    }
  };
  return(
    <SafeAreaView style ={styles.container}>
      <StatusBar style="auto" />

      <View style={styles.TopBar}>
        <TouchableOpacity style={styles.Button} onPress={()=>navigation.goBack()}>
          <Text style={styles.BTNtext}>Back</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.Button} onPress={addVocaHandler} >
          <Text style={styles.BTNtext}>Save</Text>
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <View style={styles.container2}>
          <Text style = {styles.Subject}>WORD</Text>
          <TextInput style={styles.InputArea}
            placeholder={'Please write the word'}
            onChangeText={vocaInputHandler}
            value = {newWord}
            />
        </View>

        <View style={styles.container2}>
          <Text style = {styles.Subject}>MEANING</Text>
          <TextInput style={styles.InputArea}
            placeholder={'Write the meaning of the word'}
            onChangeText={vocaInputHandler2}
            value = {newMean}
            />
        </View>
      </KeyboardAvoidingView>


    </SafeAreaView>
  );


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f3f3',
    alignItems: 'center',
    //justifyContent: 'center',
  },
  TopBar : {
    width : '100%',
    height : ScreenHeight/14.5,
    //backgroundColor : 'gray',
    flexDirection : 'row',
    justifyContent: 'space-between',
    alignItems : 'center',
    marginBottom : 5,
    paddingLeft : BarPaddingValue,
    paddingRight : BarPaddingValue,
  },
  Button : {
    //backgroundColor :'pink',
    alignItems : 'center',
    justifyContent:'center',
    width : ScreenWidth/6,
    height : ScreenHeight/30,
    borderWidth : 1.2,
    borderColor : '#7189FF',
    borderRadius : 20,
  },
  BTNtext : {
    color : '#7189FF',
    fontSize : 16,
    fontFamily : 'Roboto_Bold'
  },
  container2 : {
    flex : 1,
    alignItems : 'center',
    
    //backgroundColor : 'orange'
  },
  Subject : {
    color : '#484848',
    fontSize : 20,
    fontFamily : 'Roboto_Black_Italic',
    marginBottom : 3,
  },
  InputArea : {
    width : ScreenWidth*0.9,
    height : '70%',
    backgroundColor : 'white',
    borderWidth : 1,
    borderColor : '#484848',
    borderRadius : 22,
    textAlign : 'center',
    fontSize : 15,
    justifyContent : 'center',
    fontFamily : 'NotoSan_medium'
  }
  




})