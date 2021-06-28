import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { StyleSheet, Text, View , Platform, TouchableOpacity, Dimensions, SafeAreaView } from 'react-native';
import * as Font from 'expo-font';
import WordList from './components/WordList';

//전역 변수
const ScreenHeight = Dimensions.get('window').height;
const ScreenWidth = Dimensions.get('window').width;

export default class App extends React.Component{
  state = {
    fontsLoaded: false,
  };
  async loadFonts() { 
    await Font.loadAsync({
      // Load a font `폰트이름` from a static resource
      //로보토 블랙 이태릭
      Roboto_Black_Italic: require('./assets/fonts/Roboto-BlackItalic.ttf'),
      //로보토 블랙
      Roboto_Black : require('./assets/fonts/Roboto-Black.ttf'),
    });
    this.setState({ fontsLoaded: true });
  }
  componentDidMount() {
    this.loadFonts();
  }

  render(){
  
    if( this.state.fontsLoaded){
      return (
        <SafeAreaView style={styles.container}>
          <View style={styles.TitleArea}>
            <Text style={styles.TitleText}> HelloWord </Text>
          </View>
          <StatusBar style="auto" />
          <View style={styles.StartArea} > 
            <TouchableOpacity style={styles.StartBTN} activeOpacity ={0.7}>
              <Text style = {styles.StartText}>START</Text>
            </TouchableOpacity>
          </View>

          <View style = {styles.AddArea}>
            <TouchableOpacity>
              <Text style = {styles.AddText}>+Add New</Text>
            </TouchableOpacity>
          </View>

          <View style = {styles.ListArea}>
            <WordList />
          </View>
        </SafeAreaView>
        
      );
    }else{
      return null;
    }
  }


}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    //justifyContent: 'center',
  },
  //HelloWord
  TitleArea : {
    flex: 0.4,
    //backgroundColor: '#999999',
    alignItems: 'center',
    justifyContent: 'center',
  },
  TitleText : {
    fontFamily : 'Roboto_Black_Italic',
    fontSize: 45,
    color : '#484848',
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
      android: {
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,
        elevation: 11,
      },
    }),
  },

  //START Button
  StartArea : {
    height : ScreenHeight*0.12,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: "#484848",
    shadowOpacity: 0.4,
    shadowRadius: 4,
    shadowOffset: {
      height: 7,
    },
    elevation: 7,
  },
  StartBTN : {
    flex : 1,
    width : ScreenWidth,
    backgroundColor : '#474C68',
    alignItems : 'center',
    justifyContent : 'center'
  },
  StartText : {
    fontFamily : 'Roboto_Black',
    fontSize : 22,
    color : '#fff'
  },

  //Add Button
  AddArea : {
    height : ScreenHeight*0.1,
    //backgroundColor: '#999999',
    justifyContent : 'center',
  },
  AddBtn : {
  },
  AddText : {
    fontFamily : 'Roboto_Black',
    fontSize : 15,
    color : '#7189FF'
  },

  //WordList
  ListArea : {
    flex : 1,
    backgroundColor : 'green'
  }
  
});
