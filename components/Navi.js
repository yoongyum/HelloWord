import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View, Platform, TouchableOpacity, Dimensions, SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import "react-native-gesture-handler";
import { useFonts } from "expo-font";
import uuid from "react-native-uuid";
import EditScreen from "../screens/EditScreen";
import StartScreen from "../screens/StartScreen";
import WordList from "./WordList";

//전역 변수
const ScreenHeight = Dimensions.get("window").height;
const ScreenWidth = Dimensions.get("window").width;

//홈화면
function HomeScreen({ navigation }) {
   const [vocas, setVoca] = useState([]);

   const addVoca = (word, meaning) => {
      const uid = uuid.v4();
      setVoca([...vocas, { id: uid, wordValue: word, meaningValue: meaning, checked: false }]);
   };
   const onCheck = (id) => (e) => {
      setVoca(vocas.map((voca) => (voca.id === id ? { ...voca, checked: !voca.checked } : voca)));
   };
   const onRemove = (id) => (e) => {
      const listR = vocas.filter((voca) => voca.id !== id);
      setVoca(listR);
   };
   const Test = () => {
      if (vocas.length > 0) {
         const clone = Object.assign([], vocas);
         clone.sort(() => Math.random() - Math.random());
         navigation.push("테스트", { vocas: clone });
      } else {
         alert("단어가 없습니다.");
      }
   };
   //폰트모음
   let [fontsLoaded] = useFonts({
      Roboto_Black_Italic: require("../assets/fonts/Roboto-BlackItalic.ttf"),
      Roboto_Black: require("../assets/fonts/Roboto-Black.ttf"),
      Roboto_Bold: require("../assets/fonts/Roboto-Bold.ttf"),
      꺾깎체: require("../assets/fonts/SLEIGothicTTF.ttf"),
      NotoSan_medium: require("../assets/fonts/NotoSansKR-Medium.otf"),
      NotoSan_light: require("../assets/fonts/NotoSansKR-Light.otf"),
   });
   if (fontsLoaded) {
      return (
         <SafeAreaView style={styles.container}>
            <View style={styles.TitleArea}>
               <Text style={styles.TitleText}> HelloWord </Text>
            </View>

            <StatusBar style="auto" />

            <View style={styles.StartArea}>
               <TouchableOpacity style={styles.StartBTN} activeOpacity={0.7} onPress={Test}>
                  <Text style={styles.StartText}>START</Text>
               </TouchableOpacity>
            </View>

            <View style={styles.ListArea}>
               {vocas.length == 0 ? <Text style={styles.ZeroText}>There are no more words{"\n"}단어를 추가해주세요</Text> : <WordList vocas={vocas} onCheck={onCheck} onRemove={onRemove} />}
            </View>

            <View style={styles.AddArea}>
               <TouchableOpacity style={styles.AddBtn} onPress={() => navigation.push("에딧", { ScreenHeight, addVoca })}>
                  <Text style={styles.AddText}>+Add New</Text>
               </TouchableOpacity>
            </View>
         </SafeAreaView>
      );
   } else {
      return null;
   }
}
const Stack = createStackNavigator();

//네비게이션
export default function Navi() {
   return (
      <NavigationContainer>
         <Stack.Navigator>
            <Stack.Screen name="홈" component={HomeScreen} options={{ title: "HOME", headerShown: null }} />
            <Stack.Screen name="에딧" component={EditScreen} options={{ title: "EDIT", headerShown: null }} />
            <Stack.Screen name="테스트" component={StartScreen} options={{ title: "START", headerShown: null }} />
         </Stack.Navigator>
      </NavigationContainer>
   );
}

/*
  
-----------    스타일   ---------------

*/
const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      //justifyContent: 'center',
   },
   //HelloWord
   TitleArea: {
      height: "25%",
      //backgroundColor : 'green',
      alignItems: "center",
      justifyContent: "center",
   },
   TitleText: {
      fontFamily: "Roboto_Black_Italic",
      fontSize: 45,
      color: "#484848",
      ...Platform.select({
         ios: {
            shadowColor: "#484848",
            shadowOpacity: 0.2,
            shadowRadius: 2.5,
            shadowOffset: {
               height: 15,
               width: 10,
            },
         },
      }),
   },

   //START Button
   StartArea: {
      height: ScreenHeight * 0.11,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 8,
      shadowColor: "#484848",
      shadowOpacity: 0.3,
      shadowRadius: 4,
      shadowOffset: {
         height: 7,
      },
      elevation: 7,
   },
   StartBTN: {
      flex: 1,
      width: ScreenWidth,
      backgroundColor: "#474C68",
      alignItems: "center",
      justifyContent: "center",
   },
   StartText: {
      fontFamily: "Roboto_Black",
      fontSize: 26,
      color: "#fff",
      shadowColor: "#484848",
      shadowOpacity: 1,
      shadowRadius: 3,
      shadowOffset: {
         height: 3,
         width: 1,
      },
   },
   ZeroText: {
      marginTop: 30,
      fontSize: 14,
      color: "#484848",
      fontFamily: "NotoSan_light",
      textAlign: "center",
   },
   //Add Button
   AddArea: {
      height: "8%",
      width: "100%",
      // backgroundColor: '#999999',
      justifyContent: "center",
      borderTopColor: "black",
      borderTopWidth: 0.5,
      alignItems: "center",
   },
   AddBtn: {
      height: 44,
      width: "80%",
      //backgroundColor: 'pink',
      justifyContent: "center",
      alignItems: "center",
   },
   AddText: {
      fontFamily: "Roboto_Black",
      fontSize: 17,
      color: "#7189FF",
   },

   //WordList
   ListArea: {
      flex: 1,
      width: "100%",
      alignItems: "center",
   },
});
