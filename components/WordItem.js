import React from 'react';
import {View , Text, StyleSheet, TouchableOpacity, Dimensions, Image} from 'react-native';

const ScreenHeight = Dimensions.get('window').height;
const ScreenWidth = Dimensions.get('window').width;

export default function WordItem({id, wordValue, meaningValue,checked, onCheck}){

  let EyeOff = require('../assets/images/EyeOff.png');
  let EyeOn = require('../assets/images/EyeOn.png');
  return(
    <View style = {styles.container}>
      <Text style={styles.wordText}>{!checked? wordValue:meaningValue}</Text>
      <TouchableOpacity style={styles.EyesArea} onPressOut={onCheck(id)} >
        {!checked? 
        <Image style={styles.EyeImage} source = {EyeOff} resizeMode = 'contain'/>
        :<Image style={styles.EyeImage} source = {EyeOn} resizeMode = 'contain'/>}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container : {
    flex : 1,
    flexDirection : 'row',
    backgroundColor : '#F3F3F3',
    borderWidth : 1,
    borderRadius : 15,
    borderColor : '#484848',
    paddingLeft : 30,
    height : 60,
    width : ScreenWidth/1.25,
    alignItems : 'center',
    justifyContent:'space-between',
    margin : 8,
  },

  //단어
  wordText : {
    marginBottom : 2,
    fontFamily : '꺾깎체',
    fontSize : 20,
    color : '#484848',
  },

  //눈아이콘
  EyesArea : {
    //backgroundColor : 'pink',
    marginRight : 16,
    height: 44, 
    width: 44,
    alignItems : 'center',
    justifyContent : 'center'
  },
  EyeImage : {
    height: 30, 
    width: 32,
  }

});