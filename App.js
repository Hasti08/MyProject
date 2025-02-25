import React, { useEffect } from "react";
import Navigator from "./Navigation/Navigator";
import FlashMessage from "react-native-flash-message";
import 'react-native-gesture-handler';
import { MMKV } from 'react-native-mmkv'


export const storage = new MMKV();

function App () {
     
    return (<>
                <Navigator/>
                <FlashMessage position="top" duration={5000} />
            </>);
}

export default App;