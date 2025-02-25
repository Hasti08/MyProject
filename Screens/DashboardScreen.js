import React,{useContext, useState} from "react";
import { StyleSheet, Text, TouchableOpacity, View  } from "react-native";
import { AuthContext } from "../Navigation/Navigator";
import { Input } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import {TextAction} from  '../action/index';

const Dashboard = ({navigation}) => {

     const userDetails = useSelector((state) => state.TextReducer.text);

    // console.log(userDetails);
    const dispatch = useDispatch();

    // const {userName,username} = useContext(AuthContext);

    const [value,setValue] = useState ({
        f_name : '',
        user_age : '',
        user_number : '',
        user_email : '',
        user_address : '',
    })

    const {f_name,user_age,user_number,user_email,user_address} = value;

    const handleChange = name => value => {
        setValue(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const UserData = () => {
        
        let userData = {
            name : f_name,
            age : user_age,
            number : user_number,
            email : user_email,
            address : user_address,
        }

        let user_data = [userData];

        dispatch(TextAction(user_data))

        // userName(name);
        // navigation.navigate('Details')
    }

    return(
        <View style={styles.container}>
            <View style={styles.input}>
                <Input
                    name='f_name'
                    placeholder="Enter Name"
                    onChangeText={handleChange('f_name')}
                />
           </View>
           <View style={styles.input}>
                <Input
                    name='user_address'
                    placeholder="Enter Your Address"
                    onChangeText={handleChange('user_address')}
                />
           </View>
           <View style={styles.input}>
                <Input
                    name='user_number'
                    placeholder="Enter Your Number"
                    onChangeText={handleChange('user_number')}
                />
           </View>
           <View style={styles.input}>
                <Input
                    name='user_email'
                    placeholder="Enter Your Email"
                    onChangeText={handleChange('user_email')}
                />
           </View>
           <View style={styles.input}>
                <Input
                    name='user_age'
                    placeholder="Enter Your Age"
                    onChangeText={handleChange('user_age')}
                />
           </View>
           <View>
                <TouchableOpacity style={styles.btn} onPress={UserData}>
                    <Text style={{fontSize: 20, fontWeight: 'bold',color: 'black'}}>Submit</Text>
                </TouchableOpacity>
           </View>
           <View>
                <Text>{userDetails?userDetails.name: ''}</Text>
              <Text>{userDetails? userDetails.age: ''}</Text>
           </View>
        </View>
    );
}

    
const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 10,
        justifyContent: 'center',
        alignItems : 'center'
    },
    input: {
        borderRadius: 10,
        height: 50,
        width : '100%',
        marginBottom: 20,
        backgroundColor: 'white',
        borderWidth: 1,
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

export default Dashboard;