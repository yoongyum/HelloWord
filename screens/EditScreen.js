import React, { useEffect, useState } from "react";
import { LogBox, SafeAreaView, StyleSheet, Text, View, TouchableOpacity, TextInput, Dimensions, KeyboardAvoidingView, Platform, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";

//전역변수
const ScreenHeight = Dimensions.get("window").height;
const ScreenWidth = Dimensions.get("window").width;
const BarPaddingValue = 20;

LogBox.ignoreLogs(["Non-serializable values were found in the navigation state"]);

export default function EditScreen({ navigation, route }) {
    const [newWord, setWord] = useState("");
    const [newMean, setMean] = useState("");
    const [wordImage, setWordImage] = useState(null);
    const [meanImage, setMeanImage] = useState(null);

    const vocaInputHandler = newWord => {
        setWord(newWord);
    };
    const vocaInputHandler2 = newMean => {
        setMean(newMean);
    };
    const addVocaHandler = () => {
        if ((newWord !== "" || wordImage !== null) && (newMean != "" || meanImage !== null)) {
            route.params.addVoca(newWord, newMean);
            setWord("");
            setMean("");
            navigation.goBack();
        } else {
            alert("빈칸을 채워주세요");
        }
    };

    const PickImage = async type => {
        let result = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (result.granted === false) {
            alert("앨범의 접근권한이 없습니다. \n설정에 가셔서 바꿔주세요.");
            return;
        }
        const { cancelled, uri } = await ImagePicker.launchImageLibraryAsync({
            aspect: [4, 3],
            allowsEditing: true,
        });
        if (!cancelled) {
            type == "A" ? setWordImage(uri) : setMeanImage(uri);
        }
    };
    const TakeImage = async type => {
        //await Permissions.askAsync(Permissions.CAMERA);

        const { cancelled, uri } = await ImagePicker.launchCameraAsync({
            aspect: [4, 3],
            allowsEditing: true,
        });
        if (!cancelled) {
            type == "A" ? setWordImage(uri) : setMeanImage(uri);
        }
    };

    const Camera = require("../assets/images/Camera.png");
    const Picker = require("../assets/images/Pick.png");

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="auto" />

            <View style={styles.TopBar}>
                <TouchableOpacity style={styles.Button} onPress={() => navigation.goBack()}>
                    <Text style={styles.BTNtext}>Back</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.Button} onPress={addVocaHandler}>
                    <Text style={styles.BTNtext}>Save</Text>
                </TouchableOpacity>
            </View>

            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
                <View style={styles.container2}>
                    <View style={styles.container3}>
                        <Text style={{ flex: 0.3 }}></Text>
                        <Text style={styles.Subject}>WORD</Text>
                        <View style={styles.container4}>
                            <TouchableOpacity style={styles.cameraBtn} onPress={() => PickImage("A")}>
                                <Image style={styles.pickerImage} source={Picker} resizeMode="contain" />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.cameraBtn} onPress={() => TakeImage("B")}>
                                <Image style={styles.cameraImage} source={Camera} resizeMode="contain" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.InputArea}>
                        {wordImage == null ? (
                            <TextInput style={styles.InputText} placeholder={"Please write the word"} onChangeText={vocaInputHandler} value={newWord} />
                        ) : (
                            <Image source={{ uri: wordImage }} style={styles.InputImage} resizeMode="contain" />
                        )}
                    </View>
                </View>

                <View style={styles.container2}>
                    <View style={styles.container3}>
                        <Text style={{ flex: 0.3 }}></Text>
                        <Text style={styles.Subject}>MEANING</Text>
                        <View style={styles.container4}>
                            <TouchableOpacity style={styles.cameraBtn} onPress={PickImage}>
                                <Image style={styles.pickerImage} source={Picker} resizeMode="contain" />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.cameraBtn} onPress={TakeImage}>
                                <Image style={styles.cameraImage} source={Camera} resizeMode="contain" />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.InputArea}>
                        {meanImage == null ? (
                            <TextInput style={styles.InputText} placeholder={"Write the meaning of the word"} onChangeText={vocaInputHandler2} value={newMean} />
                        ) : (
                            <Image source={{ uri: meanImage }} style={styles.InputImage} resizeMode="contain" />
                        )}
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f3f3f3",
        alignItems: "center",
        //justifyContent: 'center',
    },
    TopBar: {
        width: "100%",
        height: ScreenHeight / 14.5,
        //backgroundColor : 'gray',
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 5,
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
        borderColor: "#7189FF",
        borderRadius: 20,
    },
    BTNtext: {
        color: "#7189FF",
        fontSize: 16,
        fontFamily: "Roboto_Bold",
    },
    container2: {
        flex: 0.5,
        height: ScreenHeight * 0.4,
        alignItems: "center",
        //backgroundColor: "pink",
    },
    Subject: {
        flex: 0.3,
        color: "#484848",
        textAlign: "center",
        fontSize: 20,
        fontFamily: "Roboto_Black_Italic",
        marginBottom: 3,
        //backgroundColor: "cyan",
    },
    InputArea: {
        width: ScreenWidth * 0.9,
        height: "70%",
        backgroundColor: "white",
        borderWidth: 1,
        borderColor: "#484848",
        borderRadius: 22,
        alignItems: "center",
        justifyContent: "center",
    },
    InputText: {
        width: "80%",
        height: "70%",
        //backgroundColor: "pink",
        textAlign: "center",
        fontSize: 15,
        fontFamily: "NotoSan_medium",
    },
    InputImage: {
        width: "100%",
        height: "100%",
    },
    container3: {
        width: ScreenWidth,
        //backgroundColor: "yellow",
        flexDirection: "row",
        //alignItems: "flex-end",
        justifyContent: "space-between",
    },
    container4: {
        flex: 0.3,
        flexDirection: "row",
        //backgroundColor: "cyan",
        alignContent: "center",
        marginBottom: 3,
    },
    cameraBtn: {
        flexDirection: "column",
        alignSelf: "center",
        marginLeft: 10,
    },
    cameraImage: {
        width: 30,
        height: 30,
    },
    pickerImage: {
        width: 25,
        height: 25,
    },
});
