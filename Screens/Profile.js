import React, { useEffect, useState } from "react";
import {  StyleSheet, Text, View , ScrollView, TouchableOpacity, Platform} from "react-native";
import {AuthContext} from "../Navigation/Navigator";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FastImage from "react-native-fast-image";
import ImagePicker from 'react-native-image-crop-picker';
import {PERMISSIONS, requestMultiple} from 'react-native-permissions';
import { showMessage } from "react-native-flash-message";
import { base_url } from "../Apiurl";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { ProfileAction } from "../action";
import _ from "lodash";

const SettingScreen =  () => {

    const dispatch = useDispatch();

    const ProfileDetails = useSelector((state) => state.ProfileReducer.profiledata);

    const OsVer = Platform.constants['Release'];

    const [value,setValue] = useState ({
        client_data : {},
        update_img : ''
    })

    const {client_data,update_img} = value;

    const { logOut } = React.useContext(AuthContext);

    const deletedata = async () => {
        
        await AsyncStorage.removeItem('user_id');
        await AsyncStorage.removeItem('user_data');

        dispatch(ProfileAction())
        logOut();
    }

    const open_gallery =  () => {

        const options = {
            includeBase64 : true,
            cropping : true,
            mediaType : 'photo',
            height : 300,
            width: 300
        }

        ImagePicker.openPicker(options).then(response => {
            let img_data = {
                Files : `data:${response.mime};base64,${response.data}`,
                FilesExtension : response.mime
            }

           let postConfig = {
                headers: {                                        
                    'accesstoken': ProfileDetails.client_token,                                
                }
            };

            if (response.mime === 'image/png' || response.mime === 'image/jpg' || response.mime === 'image/jpeg') 
            {
                axios.post(base_url+'insertClientProfileImage',img_data,postConfig).then(async (resp) => {

                    if (resp.data.Status) 
                    {   
                        let save_img = resp.data.RecordSet
                        // setValue(prevState=> ({...prevState,update_img : save_img}));

                        let record_set = {
                            client_name : ProfileDetails.client_name,
                            client_id : ProfileDetails.client_id,
                            client_img : save_img,
                            client_token : ProfileDetails.client_token
                        }
                        
                        dispatch(ProfileAction(record_set))

                        await AsyncStorage.setItem('user_data',JSON.stringify(record_set));
                        showMessage({
                            message: "image Upload Successfully...!",
                            type: "success",
                            autoHide: true
                        })
                    } 
                    else {
                        showMessage({
                            message: "Something Went Wrong...",
                            type: 'danger',
                            autoHide: true
                        })
                    }
                }).catch((err) => {
                    console.log(err);
                        showMessage({
                            message: "Something Went Wrong...",
                            type: 'danger',
                            autoHide: true
                        })
                })    
            } else {
                showMessage({
                    message : "Upload Valid Image File..!",
                    type: "danger",
                    autoHide: true
                })
            }

        }).catch((err) => {
            showMessage({
                message:"User cancelled image selection" ,
                type: "info",
                autoHide: true
            })
        })  
    }
    
    const select_photos = () => {
        if (OsVer >= 13) {
            requestMultiple([PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,PERMISSIONS.ANDROID.CAMERA]).then((resp) => {
                if (resp[PERMISSIONS.ANDROID.READ_MEDIA_IMAGES] && resp[PERMISSIONS.ANDROID.CAMERA] === 'granted') {
                    open_gallery();
                } else {
                    showMessage({
                        message : "Please allow Permission.!!",
                        type: "danger",
                        autoHide : true
                    });
                    return false;
                }
            })
            
        } else {
            requestMultiple([PERMISSIONS.ANDROID.CAMERA,PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE]).then((resp) => {
                if (resp[PERMISSIONS.ANDROID.CAMERA] && resp[PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE] && resp[PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE]=== 'granted') {
                    open_gallery();    
                } else {
                    showMessage({
                        message : "Please allow Permission.!!",
                        type: "danger",
                        autoHide : true
                    });
                    return false;
                }
            })
        }
    }

    return(
        <ScrollView style={{flex: 1}}>
            <View style={{flex: 1,alignItems : 'center',justifyContent : 'center'}}>
                { !_.isEmpty(ProfileDetails) ? 
                    (
                        <View style={{flex: 1,margin: 10,alignItems: 'center'}}>
                            <TouchableOpacity style={{flex: 1,marginTop: 20}} onPress={select_photos}>
                                <View style={{height: 100,width: 100}}>
                                    <FastImage source={{uri :  ProfileDetails.client_img }} style={{width: '100%',height: '100%',borderRadius: 50}} resizeMode={FastImage.resizeMode.center}/> 
                                </View>
                            </TouchableOpacity>
                            <View style={{flex : 1,marginTop: 20}}>
                                <Text style={{fontFamily : 'Montserrat-Bold',fontSize : 13,textAlign: 'right',margin: 3,color: 'black'}}>{ProfileDetails.client_id}</Text>
                            </View>
                            <View style={{flex : 1,marginTop: 20}}>
                                <Text style={{fontFamily : 'Montserrat-Bold',fontSize : 13,textAlign: 'right',margin: 3,color: 'black'}}>{ProfileDetails.client_name}</Text>
                            </View>
                        
                        </View>
                    ) : null
                }
                <View style={{flex: 1,marginTop: 20,marginBottom : 10}}>
                    <TouchableOpacity style={styles.btn} onPress={deletedata}>
                        <Text style={{fontSize: 20, fontWeight: 'bold',color: 'black'}}>Log Out</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    btn: {
        height: 50,
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f08080',
        borderRadius: 10,
    },
})

export default SettingScreen;