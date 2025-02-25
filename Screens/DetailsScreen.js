import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import { Text, View, StyleSheet,TouchableOpacity } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

const DetailsScreen = () => {

    const [value,setValue] = useState({
            disable : true,
            time : 60
    });

    const {disable,time} = value;

    const getData = async () => {
        // try {
        //     const value = await AsyncStorage.getItem('Details');

        //     let pref_data = JSON.parse(value);
            
        //     if (pref_data) {
        //         setItem(pref_data)
        //     }

        // } catch (error) {
            
        // }
        // if (time) {

            let counter = 60;
            setInterval(function () {                
                if(counter > 0)
                {
                    counter--;

                    setValue(prevState => ({...prevState,time:counter}));
                }
                else
                {
                    setValue(prevState => ({...prevState,disable : false}));
                }
                
        }, 1000);
        // }
                
    }

    useFocusEffect(
        React.useCallback(() => {
            getData();
        }, [])
    );

    return(
        <View style={styles.container}>
            <View style={{justifyContent: 'center',alignItems: 'center',marginTop: 10}}>
                <Text style={{fontSize: 20,fontWeight: 'bold', color: 'black'}}>Details</Text>
            </View>
            <View style={styles.box}> 
                {/* <Text>{name}</Text> */}
                <TouchableOpacity disabled = {disable} style={{borderWidth:1,borderRadius:5,height:30,width:100,alignItems:'center',justifyContent:'center'}}>
                    <Text>link</Text>
                </TouchableOpacity>
                <Text style={{color: 'black',fontSize: 20}}>{value.time}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 10,
    },
    box: {        
        margin: 20,
        marginTop: 30,
    },
})

export default DetailsScreen;