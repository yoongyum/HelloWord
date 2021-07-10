import React, { useState } from "react";
import AppLoading from "expo-app-loading";
import { Asset } from "expo-asset";
import Navi from "./components/Navi";

export default class App extends React.Component {
    state = {
        isReady: false,
    };

    render() {
        if (!this.state.isReady && !this.state.fontsLoaded) {
            return <AppLoading startAsync={this._cacheResourcesAsync} onFinish={() => this.setState({ isReady: true })} onError={console.warn} />;
        } else {
            return <Navi />;
        }
    }

    //이미지 불러오기
    async _cacheResourcesAsync() {
        const images = [require("./assets/images/EyeOff.png"), require("./assets/images/EyeOn.png"), require("./assets/images/Camera.png"), require("./assets/images/Pick.png")];

        const cacheImages = images.map(image => {
            return Asset.fromModule(image).downloadAsync();
        });

        return Promise.all(cacheImages);
    }
}
