import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image } from "react-native";
import { Swipeable } from "react-native-gesture-handler";

const ScreenHeight = Dimensions.get("window").height;
const ScreenWidth = Dimensions.get("window").width;

export default function WordItem({ id, wordValue, meaningValue, checked, onCheck, onRemove }) {
   const EyeOff = require("../assets/images/EyeOff.png");
   const EyeOn = require("../assets/images/EyeOn.png");

   const rightSwipe = () => {
      return (
         <View style={styles.DeleteArea}>
            <Text style={styles.DeleteText}>Delete</Text>
         </View>
      );
   };

   return (
      <Swipeable  
      renderRightActions={rightSwipe} 
      onSwipeableRightOpen={onRemove(id)}
      >
         <View style={styles.container}>
            <Text style={styles.wordText}>{!checked ? wordValue : meaningValue}</Text>

            <TouchableOpacity style={styles.EyesArea} onPressOut={onCheck(id)}>
               {!checked ? <Image style={styles.EyeImage} source={EyeOff} resizeMode="contain" /> 
               : <Image style={styles.EyeImage} source={EyeOn} resizeMode="contain" />}
            </TouchableOpacity>
         </View>
      </Swipeable>
   );
}

//스타일
const styles = StyleSheet.create({
   container: {
      flexDirection: "row",
      backgroundColor: "#F3F3F3",
      borderWidth: 1,
      borderRadius: 15,
      borderColor: "#484848",
      paddingLeft: 30,
      height: 60,
      width: ScreenWidth / 1.25,
      alignItems: "center",
      justifyContent: "space-between",
      marginTop: 8,
      marginBottom: 8,
   },

   //단어
   wordText: {
      marginBottom: 2,
      fontFamily: "꺾깎체",
      fontSize: 20,
      color: "#484848",
   },

   //눈아이콘
   EyesArea: {
      //backgroundColor : 'pink',
      marginRight: 16,
      height: 44,
      width: 44,
      alignItems: "center",
      justifyContent: "center",
   },
   EyeImage: {
      height: 30,
      width: 32,
   },

   //삭제스와이프
   DeleteArea: {
      flex: 1,
      flexDirection: "column",
      alignItems: "flex-end",
      backgroundColor: "#FF5D5D",
      height: 60,
      width: ScreenWidth / 1.25,
      borderRadius: 15,
      marginTop: 8,
      alignContent: "center",
      justifyContent: "center",
      padding: 8,
   },
   DeleteText: {
      marginRight: 8,
      color: "white",
      fontSize: 16,
      fontFamily: "Roboto_Bold",
      ...Platform.select({
         ios: {
            shadowColor: "#484848",
            shadowOpacity: 0.6,
            shadowRadius: 1.5,
            shadowOffset: {
               height: 2,
               width: 1,
            },
         },
      }),
   },
});
