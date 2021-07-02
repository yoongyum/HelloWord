import React ,{useState} from 'react';
import {LogBox, SafeAreaView, StyleSheet, Text, View ,TouchableOpacity, TextInput,Dimensions, KeyboardAvoidingView} from 'react-native';
import { StatusBar } from 'expo-status-bar';

//전역변수
const ScreenHeight = Dimensions.get('window').height;
const ScreenWidth = Dimensions.get('window').width;
const BarPaddingValue = 30;

export default function StartScreen ({navigation, route}){


  return(
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.TopBar}>
        <TouchableOpacity style={styles.Button} onPress={()=>navigation.goBack()}>
          <Text style={styles.BTNtext}>Back</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.Button} >
          <Text style={styles.BTNtext}>Next</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.container2}>
        <Text style={styles.Text}>Apple</Text>
      </View>
      <View style={styles.container2}>
        <TouchableOpacity style={styles.MeanArea} activeOpacity={0.6}>
          <Text style={styles.text}>{'Touch here to check the answer\n이곳을 눌러 답을 확인하세요'}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )



}

const styles = StyleSheet.create({
  container : {
    flex : 1,
    backgroundColor : '#B4B4B4'
  },
  TopBar : {
    width : '100%',
    height : ScreenHeight/14.5,
    //backgroundColor : 'gray',
    flexDirection : 'row',
    justifyContent: 'space-between',
    alignItems : 'center',
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
    borderColor : '#484848',
    borderRadius : 20,
  },
  BTNtext : {
    color : '#484848',
    fontSize : 16,
    fontFamily : 'Roboto_Bold'
  },
  container2 : {
    flex : 1,
    borderTopColor : 'black',
    borderTopWidth : 1,
    alignItems : 'center',
    justifyContent : 'center'
  },
  Text : {
    color : 'black',
    fontSize : 25,
    fontFamily : 'Roboto_Bold'
  },
  MeanArea : {
    width : '100%',
    height : '100%',
    //backgroundColor : 'green',
    alignItems : 'center',
  },
  text : {
    marginTop : 20,
    fontSize : 13,
    fontFamily : 'NotoSan_light',
    color : '#484848',
    textAlign : 'center'
  }



})