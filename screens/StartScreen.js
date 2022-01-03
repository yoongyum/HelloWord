import React, { useState, useRef } from "react";
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, Dimensions, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Swipeable } from "react-native-gesture-handler";

//전역변수
const ScreenHeight = Dimensions.get("window").height;
const ScreenWidth = Dimensions.get("window").width;
const BarPaddingValue = 20;

export default function StartScreen({ navigation, route }) {
    const [number, setnumber] = useState(1); //카운터
    const [visible, setvisible] = useState(false); //단어 뜻 체크
    const swipeableRef = useRef(null);
    const vocas = route.params.vocas;
    //NextButton
    const NextWord = () => {
        if (number == vocas.length) alert("시험을 종료합니다."), navigation.goBack();
        else {
            setnumber(preNum => preNum + 1);
            closeSwipeable(); //스와이프 자동닫힘
            setvisible(false); //다음 단어로 넘어가면 초기화
        }
    };

    //뜻보기
    const showMean = () => {
        setvisible(!visible); //true<->
    };
    //스와이프영역
    const rightSwipe = () => {
        return (
            <View style={styles.SwipeArea}>
                <Text style={styles.SwipeText}>Go Next</Text>
            </View>
        );
    };
    const closeSwipeable = () => {
        swipeableRef.current.close();
    };
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="auto" />

            <View style={styles.TopBar}>
                <TouchableOpacity style={styles.Button} onPress={() => navigation.goBack()}>
                    <Text style={styles.BTNtext}>Back</Text>
                </TouchableOpacity>

                <Text style={styles.counterText}>
                    {number} / {vocas.length}
                </Text>

                <TouchableOpacity style={styles.Button} onPress={NextWord}>
                    <Text style={styles.BTNtext}>Next</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.container2}>
                {visible ? (
                    vocas[number - 1].meanImage !== null ? (
                        <Image source={{ uri: vocas[number - 1].meanImage }} style={styles.InputImage} resizeMode="contain" />
                    ) : (
                        <Text style={styles.Text}>{vocas[number - 1].meaningValue}</Text>
                    )
                ) : vocas[number - 1].wordImage !== null ? (
                    <Image source={{ uri: vocas[number - 1].wordImage }} style={styles.InputImage} resizeMode="contain" />
                ) : (
                    <Text style={styles.Text}>{vocas[number - 1].wordValue}</Text>
                )}
            </View>
            <View style={styles.container2}>
                <Swipeable ref={swipeableRef} renderRightActions={rightSwipe} onSwipeableRightOpen={NextWord}>
                    <TouchableOpacity style={styles.MeanArea} activeOpacity={1} onPressIn={showMean} onPressOut={showMean}>
                        <Text style={styles.text}>{"Touch here to check the answer\n이곳을 눌러 답을 확인하세요\n\n오른쪽으로 밀면 다음단어로 넘어갑니다."}</Text>
                    </TouchableOpacity>
                </Swipeable>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    TopBar: {
        width: "100%",
        height: ScreenHeight / 14.5,
        //backgroundColor : 'gray',
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingLeft: BarPaddingValue,
        paddingRight: BarPaddingValue,
    },
    Button: {
        //backgroundColor :'pink',
        alignItems: "center",
        justifyContent: "center",
        width: ScreenWidth / 6,
        height: ScreenHeight / 30,
        borderWidth: 1.2,
        borderColor: "#484848",
        borderRadius: 20,
    },
    BTNtext: {
        color: "#484848",
        fontSize: 16,
        fontFamily: "Roboto_Bold",
    },
    container2: {
        flex: 1,
        backgroundColor: "white",
        borderTopColor: "black",
        borderTopWidth: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    Text: {
        color: "black",
        fontSize: 25,
        fontFamily: "Roboto_Bold",
    },
    MeanArea: {
        width: ScreenWidth,
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
    },
    text: {
        marginTop: 20,
        fontSize: 13,
        fontFamily: "NotoSan_light",
        color: "#484848",
        textAlign: "center",
    },
    counterText: {
        fontSize: 20,
        fontFamily: "Roboto_Black_Italic",
        color: "#484848",
    },
    SwipeArea: {
        flex: 0.3,
        backgroundColor: "black",
        justifyContent: "center",
        alignItems: "flex-start",
    },
    SwipeText: {
        color: "#FFF",
        fontSize: 16,
        fontFamily: "NotoSan_light",
        marginLeft: 20,
    },
    InputImage: {
        width: "100%",
        height: "100%",
    },
});
