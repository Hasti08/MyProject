import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { CheckBox, Input } from "react-native-elements";
import { showMessage } from "react-native-flash-message";
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

const RegisterScreen = ({navigation}) => {

    const [value,setValue] = useState({
        name : '',
        number : '',
        email : '',
        address : '',
        gender : 'Male',
        terms : false
    }) 

    const {name,number,email,address,gender,terms} = value;
    
    var radio_props = [
        {label: 'Male   ', value: 'Male' },
        {label: 'Female', value: 'Female' }
    ];

    const handleChange = name => value => {
        setValue(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
        
    const showDetails = async () => {
        let name_data = name;
        let number_data = number;
        let email_data = email;
        let address_data = address;
        let gender_data = gender;        
        let terms_data = terms;

        // name validaton
        if(!name_data)
        {
            showMessage({
                message: "Please Enter Your Name",                
                type: "danger",
                autoHide : true
            });
            
            return false;
        }

        // number validation
        if(number_data == 0)
        {
            showMessage({
                message: "Please Enter Mobile Number",                
                type: "danger",
                autoHide : true
            });
            
            return false;
        }
        if (number_data.length < 10) {
            showMessage({
                message : "Please Enter Valid Number",
                type: "danger",
                autoHide : true
            });
            
            return false;
        }
        if (isNaN(number_data)) {
            showMessage({
                message : "Please Enter Only Number",
                type: "danger",
                autoHide : true
            });
            return false;
        }

        // email validation
        if(!email_data)
        {
            showMessage({
                message: "Please Enter Your Email ID",                
                type: "danger",
                autoHide : true
            });
            
            return false;
        }
        if(!/\S+@\S+\.\S+/.test(email_data))
        {
            showMessage({
                message: "Please Enter Valid Email ID",                
                type: "danger",
                autoHide : true
            });
            
            return false;
        }
        
        // address validation
        if(!address_data)
        {
            showMessage({
                message: "Please Enter Your Address",                
                type: "danger",
                autoHide : true
            });
            
            return false;
        }
        
        // gender validation
        if(!gender_data)
        {
            showMessage({
                message: "Please Select Your Gender",                
                type: "danger",
                autoHide : true
            });
            
            return false;
        }

        // terms validation
        if(!terms_data)
        {
            showMessage({
                message: "Please Check Terms & Conditions",                
                type: "danger",
                autoHide : true
            });
            
            return false;
        }

        try {

            let Data = {
                name : name_data,
                number : number_data, 
                email : email_data,
                address : address_data,
                gender : gender_data
            }

            const jsonValue = JSON.stringify(Data);
            await AsyncStorage.setItem('Details',jsonValue);

            navigation.navigate('Details');

        } catch (error) {            
        }
    }

    const checkboxtest = () => {
        setValue (prevState => ({...prevState, terms : !terms}));
    }

    return(
        <View style={styles.container}>
            <View style={{justifyContent: 'center',alignItems: 'center',marginTop: 10}}>
                <Text style={{fontSize: 20,fontWeight: 'bold', color: 'black'}}>Register Form</Text>
            </View>
            <View style={styles.box}>
                <View style={{marginBottom: 10}}>
                    <Text style={{fontSize: 15, fontWeight: '500',color: 'black'}}>Name</Text>
                </View>
                <View style={styles.input}>
                    <Input
                        placeholder='Enter Your Name'
                        name="name"
                        value={name}
                        onChangeText={handleChange('name')}
                        inputContainerStyle={{borderWidth:0,borderBottomWidth:0}}
                    />
                </View>
                <View style={{marginBottom: 10}}>
                    <Text style={{fontSize: 15, fontWeight: '500',color: 'black'}}>Mobile Number</Text>
                </View>
                <View style={styles.input}>
                    <Input
                        placeholder='Enter Your Mobile Number'
                        name="number"
                        value={number}
                        keyboardType="numeric"
                        onChangeText={handleChange('number')}
                        maxLength={10}
                        inputContainerStyle={{borderWidth:0,borderBottomWidth:0}}
                    />
                </View>
                <View style={{marginBottom: 10}}>
                    <Text style={{fontSize: 15, fontWeight: '500',color: 'black'}}>Email</Text>
                </View>
                <View style={styles.input}>
                    <Input
                        placeholder='Enter Your Email ID'
                        name="email"
                        value={email}
                        onChangeText={handleChange('email')}
                        inputContainerStyle={{borderWidth:0,borderBottomWidth:0}}
                    />
                </View>
                <View style={{marginBottom: 10}}>
                    <Text style={{fontSize: 15, fontWeight: '500',color: 'black'}}>Address</Text>
                </View>
                <View style={styles.txtcontainer}>
                    <Input 
                        name = 'address'
                        value={address}
                        onChangeText={handleChange('address')}
                        multiline
                        style={{height:50,}}
                        inputContainerStyle={{borderWidth:0,borderBottomWidth:0}}
                        placeholder="Enter Your Address"
                    />
                </View>
                <View style={{marginBottom: 8}}>
                    <Text style={{fontSize: 15, fontWeight: '500',color: 'black'}}>Gender</Text>
                </View>
                <View style={styles.radiobtn}>
                    <RadioForm
                        radio_props={radio_props}
                        initial={0}
                        onPress={(value) => {
                            setValue(prevState => ({...prevState, gender : value}));
                        }}
                        formHorizontal={true}
                        animation={true}
                    />
                </View>
                <View style={{flexDirection: 'row',marginBottom: 10}}>
                    <CheckBox
                        checked={terms}
                        checkedColor="green"
                        onPress={checkboxtest}
                    />
                    <Text style={{fontSize: 15, fontWeight: '500',color: 'black',marginTop: 15,marginLeft: -15}} 
                            onPress={checkboxtest}>Terms & Conditions</Text>
                </View>
                <View style={{marginBottom: 20}}>
                    <TouchableOpacity style={styles.btn} onPress={showDetails}>
                        <Text style={{fontSize: 20, fontWeight: 'bold',color: 'black'}}>Get Details</Text>
                    </TouchableOpacity>
                </View>
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
    input: {
        borderRadius: 10,
        height: 50,
        width : '100%',
        marginBottom: 15,
        backgroundColor: 'white',
        borderWidth: 1,
    },
    txtarea: {
        height: 80,
        fontSize: 15,
        textAlignVertical: 'top', 
    },
    txtcontainer: {
        height: 80,
        padding: 5,
        backgroundColor: 'white',
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 15
    },
    radiobtn: {
        alignItems: 'flex-start',
        marginBottom: 10,
    },
    btn: {
        height: 50,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f08080',
        borderRadius: 10,
    }
});

export default RegisterScreen;