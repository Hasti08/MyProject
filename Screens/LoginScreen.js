import React, {useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Input } from 'react-native-elements';
import { showMessage } from "react-native-flash-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {AuthContext} from "../Navigation/Navigator";
import axios from "axios";
import { base_url } from "../Apiurl";
import _ from 'lodash';
import { useDispatch } from "react-redux";
import { ProfileAction } from "../action";

const LoginScreen = ({navigation}) => {

    const dispatch = useDispatch();

    const { logIn } = React.useContext(AuthContext);

    const [value,setValue] = useState({
        user_name : '',
        password : '',
        btn_title : 'Login',
        btn_disable : false
    }) 

    const {user_name,password,btn_title,btn_disable} = value;
    
    const handleChange = name => value => {
        setValue(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const [passwordVisibility, setPasswordVisibility] = useState(true);
    const [icon, setIcon] = useState('eye-outline');

    const handlePasswordVisibility = () => {
        if (icon === 'eye-outline') {
            setIcon('eye-off-outline');
            setPasswordVisibility(!passwordVisibility);
        } else if (icon === 'eye-off-outline') {
            setIcon('eye-outline');
            setPasswordVisibility(!passwordVisibility);
        }
    };

    const getDetails = () => {
        let user_data       = user_name;
        let password_data   = password.trim();
    
        // number validation 
        if(!user_data)
        {
            showMessage({
                message: "Please Enter Your User Name.!!",                
                type: "danger",
                autoHide : true
            });
            
            return false;
        }

        if (!password_data) 
        {
            showMessage({
                message : "Please Enter Your Password.!!",
                type: "danger",
                autoHide : true
            });

            return false;
        }

        // if (number_data.length < 10) {
        //     showMessage({
        //         message : "Please Enter Valid Number",
        //         type: "danger",
        //         autoHide : true
        //     });
            
        //     return false;
        // }
        // if (isNaN(number_data)) {
        //     showMessage({
        //         message : "Please Enter Only Number",
        //         type: "danger",
        //         autoHide : true
        //     });
        //     return false;
        // }

        // password validation 
        
        // if (password_data.length < 8) {
        //     showMessage({
        //         message : "Please Enter Minimum 8 Characters",
        //         type: "danger",
        //         autoHide : true
        //     });

        //     return false;
        // }
        
        // if (number_data !== '9876543210' || password_data !== '12345678') {
        //     showMessage({
        //         message: "Please Enter Valid Mobile Number Or Password..!!",                
        //         type: "danger",
        //         autoHide : true
        //     });
        //     return false;
        // } 
        
        // await AsyncStorage.setItem('user_id',"1");

        // logIn("1");


        let client_data = {
            user : user_data,
            password : password_data,
            AType : "CLIENT"
        }
        setValue(prevState => ({...prevState,btn_title : 'Please Wait..',btn_disable : true}));
        
        axios.post(base_url+'ClientLogin',client_data,'').then(async (resp) => {
            if (resp.data.Status) 
            {
                if (!_.isEmpty(resp.data.RecordSet)) 
                {
                    let record_set = {
                        client_name : resp.data.RecordSet.Name,
                        client_id : resp.data.RecordSet.ClientId,
                        client_img : resp.data.RecordSet.ProfileImage,
                        client_token : resp.data.RecordSet.Token
                    }
                    
                    await AsyncStorage.setItem('user_id',resp.data.RecordSet.ClientId);
                    await AsyncStorage.setItem('user_data',JSON.stringify(record_set));

                    dispatch(ProfileAction(record_set))

                    logIn(resp.data.RecordSet.ClientId);

                    setValue(prevState => ({...prevState,btn_title : 'Login',btn_disable : false}));
                } else {
                    showMessage({
                        message : resp.data.Message,
                        type :"danger",
                        autoHide : true
                    });
                    setValue(prevState => ({...prevState,btn_title : 'Login',btn_disable : false}));
                }
            } else {
                showMessage({
                    message: resp.data.Message? resp.data.Message : "Please Check Data & Try Again.",
                    type: "danger",
                    autoHide : true
                });
                setValue(prevState => ({...prevState,btn_title : 'Login',btn_disable : false}));
            }
        }).catch((err) => {
                if (err) {
                    showMessage({
                        message: "Something Went Wrong.",
                        type: "danger",
                        autoHide : true
                    });
                setValue(prevState => ({...prevState,btn_title : 'Login',btn_disable : false}));
                }
        })
        
    }

    return(
        <View style={styles.container}>
            <View style={{marginTop: 40}}>
                <Text style={{fontSize: 30, fontWeight: 'bold',color: 'black'}}>Login</Text>
                    <View style={{margin: 4}} />
                <Text style={{fontSize: 15, fontWeight: '500'}}>Please login to continue using this application</Text>
            </View>
            <View style={styles.box}>
                <View style={{marginBottom: 15}}>
                    <Text style={{fontSize: 18, fontWeight: '500',color: 'black'}}>User Name</Text>
                </View>
                <View style={styles.input}>
                    <Input
                        placeholder='Enter Your Name'
                        name="user_name"
                        value={user_name}
                        onChangeText={handleChange('user_name')}
                    />
                </View>
                <View style={{marginBottom: 15}}>
                    <Text style={{fontSize: 18, fontWeight: '500',color: 'black'}}>Password</Text>
                </View>
                <View style={styles.input}>
                    <Input
                        name="password"
                        placeholder="Enter Your Password"
                        value={password}
                        secureTextEntry={passwordVisibility}
                        autoCorrect={false}
                        onChangeText={handleChange('password')}                    
                    />              
                        <TouchableOpacity style={{marginTop: -63,marginLeft: '90%'}} onPress={handlePasswordVisibility}>
                            <Ionicons name={passwordVisibility ? 'eye-off-outline': 'eye-outline'} size={25} color={"#8b0000"}/>
                        </TouchableOpacity>
                </View> 
            </View>
            <View style={{alignItems: 'center',margin: 15}}>
                <View style={{marginStart: '60%'}}> 
                    <TouchableOpacity>
                        <Text style={{fontWeight: '500',color: '#8b0000'}}>Forgot Password?</Text>
                    </TouchableOpacity>
                </View>
                    <TouchableOpacity style={styles.btn} onPress={getDetails} disabled={btn_disable}>    
                        <Text style={{fontSize: 20, fontWeight: 'bold',color: 'black'}}>{btn_title}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                        <Text style={{fontWeight: '500',color: 'black'}}>You don't have an account? <Text style={{fontWeight: '500',color: '#8b0000'}}> SignUp Now!</Text></Text>
                    </TouchableOpacity>
            </View>
        </View>
        );
}

const styles = StyleSheet.create({
    btn: {
        height: 50,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 20,
        backgroundColor: '#f08080',
        borderRadius: 10,
    },
    container: {
        flex: 1,
        margin: 15
    },
    input: {
        borderRadius: 10,
        height: 50,
        width : '100%',
        marginBottom: 20,
        backgroundColor: 'white',
        borderWidth: 1,
    },
    box: {
        marginTop: 80,
       margin:20
    },
});

export default LoginScreen;