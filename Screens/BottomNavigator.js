import React, { useEffect } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import ProfileScreen from "./Profile";
import ListScreen from "./ListScreen";
import Dashboard from "./DashboardScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import DrawerMenu from "./DrawerMenu";
import { createDrawerNavigator } from '@react-navigation/drawer';
import Post from "./Post";
import FastImage from "react-native-fast-image";
import { useSelector } from "react-redux";
import _ from "lodash";
import { WithLocalSvg } from 'react-native-svg/css';
import Status from "./Status";


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function DashboardStack () {
    return(
        <Stack.Navigator screenOptions={{headerTitle : 'Dashboard'}}>
            <Stack.Screen name="Dashboard" component={Dashboard}/>
        </Stack.Navigator>
    )
}

function ProfileStack () {
    return(
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="ProfileScreen" component={ProfileScreen}/>
        </Stack.Navigator>
    )
}

function ListStack () {
    return(
        <Stack.Navigator screenOptions={{headerTitle : 'List'}}>
            <Stack.Screen name="ListScreen" component={ListScreen}/>
        </Stack.Navigator>
    )
}

function PostStack () {
    return (
        <Stack.Navigator >
            <Stack.Screen name="Post" component={Post}/>
        </Stack.Navigator>
    )
}
function StatusStack () {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Status" component={Status} />
        </Stack.Navigator>
    )
}

// const DrawerData = ({navigation}) => {

//     return (
//                 <Drawer.Navigator screenOptions={{ 
//                     drawerStyle: {
//                         backgroundColor : '#f8f8ff',
//                         width : 270,
//                     }
//                 }}
//                 drawerContent={props => <DrawerMenu {...props}/>}>
//                     <Drawer.Screen name="Settings" component={SettingStack} />
//                 </Drawer.Navigator>
//             )
// }

const BottomNavigator = () => {

    const ProfileDetails = useSelector((state) => state.ProfileReducer.profiledata);

    return(
        <Tab.Navigator 
        initialRouteName="Home"
        screenOptions={({route}) => ({
            headerShown : false,
            tabBarActiveTintColor : '#8b0000',
            tabBarInactiveTintColor : '#808080',
            tabBarStyle : {
                backgroundColor : '#fffff0',
                height : 70,
                borderRadius : 20,
                marginVertical :5,
            },
            tabBarLabelStyle: {
                fontFamily : 'Montserrat-Bold',
                fontSize: 14,
                marginVertical : 5
            },
            // tabBarIcon : ({focused}) => {
            //     let icon;
            //     if (route.name === 'DashboardStack') {
            //         icon = focused
            //         ? 'home'
            //         : 'home-outline';
            //     // } else if (route.name === 'ProfileStack') {
            //     //     icon = focused
            //     //     ? 'profile_person'
            //     //     : 'profile_person';
            //     // } else if (route.name === 'ListStack') {
            //     //     icon = focused
            //     //     ? 'settings'
            //     //     : 'settings-outline';
            //     } else if (route.name === 'PostStack') {
            //         icon = focused
            //         ? 'menu'
            //         : 'menu-outline';
            //     }
            //     return (<>
            //         <Ionicons name={icon} size={30} color={ focused ? '#8b0000' : '#808080'}/>
            //         </>);
            // }
        })}>
            <Tab.Screen name="DashboardStack" 
                component={DashboardStack} 
                options={{
                    tabBarLabel : 'Dashboard',
                    title : 'Dashboard',
                    tabBarIcon : ({focused}) => (
                        <WithLocalSvg asset={require('../assets/images/house-chimney.svg')} width="70%" height="70%" fill={focused ? '#8b0000' : '#808080'}/>
                    )
                }}/>
                <Tab.Screen name="StatusStack"
                component={StatusStack}
                options={{
                    tabBarLabel : 'Status',
                    title : 'Status',
                    tabBarIcon : ({focused}) => (
                        <WithLocalSvg asset={require('../assets/images/images.svg')}  width="70%" height="70%" fill={focused ? '#8b0000' : '#808080'}/>
                    )
                }}/>
            <Tab.Screen name="PostStack"
                component={PostStack}
                options={{
                    tabBarLabel : 'Post',
                    title : 'Post',
                    tabBarIcon : ({focused}) => (
                        <WithLocalSvg asset={require('../assets/images/list-ul.svg')} width="70%" height="70%" fill={focused ? '#8b0000' : '#808080'}/>
                    )
            }}/>
            <Tab.Screen name="ListStack" 
                component={ListStack} 
                options={{
                    tabBarLabel : 'List',
                    title : 'List',
                    tabBarIcon : ({focused}) => (
                        <WithLocalSvg asset={require('../assets/images/gear.svg')} width="70%" height="70%" fill={focused ? '#8b0000' : '#808080'}/>
                    )
                }}/>
            <Tab.Screen name="ProfileStack" 
                component={ProfileStack} 
                options={{
                    tabBarLabel : 'Profile',
                    title : 'Profile',
                tabBarIcon : () => (<>
                        { 
                        !_.isEmpty(ProfileDetails) ? 
                            (
                                <FastImage source={{uri :  ProfileDetails.client_img }} style={{width: '80%',height: '80%',borderRadius: 40}} resizeMode={FastImage.resizeMode.center}/>
                            ) : null 
                        }
                    </>)
                }}/>
        </Tab.Navigator>
        
    );
}

const styles = StyleSheet.create({
    
});

export default BottomNavigator;