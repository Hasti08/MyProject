import React, { useEffect, useState } from "react";
import { Text, View , StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { ProfileAction } from "../action";

const SplashScreen = ({navigation}) => {

    const dispatch = useDispatch();

    // useEffect(()=>{
    //     setTimeout(function () {
    //         navigation.navigate('Login');
    //     }, 2000);
    // },[])

    const getData = async () => {
        const value = await AsyncStorage.getItem('user_data');

        const profiledata = JSON.parse(value);
        dispatch(ProfileAction(profiledata))
    }

    useEffect (() => {
        getData();
    },[])

    return(
        <View style={styles.container}>
            <Text style={{fontSize: 30,color: 'black',fontWeight: 'bold'}}>Demo</Text>
        </View>
    );

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffc0cb',
    }
});

export default SplashScreen;