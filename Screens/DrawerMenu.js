import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {AuthContext} from "../Navigation/Navigator";
import AsyncStorage from "@react-native-async-storage/async-storage";

const DrawerMenu = () => {

    const { logOut } = React.useContext(AuthContext);

    const deletedata = async () => {
        await AsyncStorage.removeItem('user_id');
        logOut();
    }

    return(
        <View style={styles.container}>
            <View style={{marginTop: 40,marginBottom: 30}}>
                <Image source={require('../image/image.png')} size={30}/>
            </View>
            <View style={{marginBottom : 10}}>
                <Text style={{fontSize: 20,color: 'black'}}>
                    Edit Profile
                </Text>
            </View>
            <View style={{marginBottom : 10}}>
                <Text style={{fontSize: 20,color: 'black'}}>
                    Change Password
                </Text>
            </View>
            <View style={{marginBottom : 10}}>
                <TouchableOpacity style={styles.btn} onPress={deletedata}>
                    <Text style={{fontSize: 20, fontWeight: 'bold',color: 'black'}}>Log Out</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 10,
        alignItems : 'center'
    },
    btn: {
        height: 50,
        width: 150,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 20,
        backgroundColor: '#f08080',
        borderRadius: 10,
    },
})

export default DrawerMenu;