import React, { createContext, useMemo, useReducer } from "react";
import Splash from "../Screens/SplashScreen";
import Login from "../Screens/LoginScreen";
import BottomTab from "../Screens/BottomNavigator";
import Register from "../Screens/RegisterScreen";
import Details from "../Screens/DetailsScreen";
import CreateStory from "../Screens/CreateStory";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createNativeStackNavigator();

export const AuthContext = createContext();

const Navigator = () => {

    const [state, dispatch] = useReducer(
        (prevState, action) => {
          switch (action.type) {
            case 'RESTORE_TOKEN':
                return {
                    ...prevState,
                    userToken: action.mydata,
                    isLoading: false,
                };
            case 'LOG_IN':
                return {
                    ...prevState,                
                    userToken: action.mydata,
                    isLoading : false,                
                };
            case 'LOG_OUT':
                return {
                    ...prevState,                
                    userToken: null,
                    isLoading : false,
                };
            // case 'NAME':
            //     return{
            //         ...prevState,
            //         username: action.mydata,
            //     }
          }
        },
        {
           isLoading: true,
           userToken: null,
        //    username: '',
        }
    );

    const authContext = useMemo(() => ({
        logIn : async (data) => {                    
            dispatch({ type: 'LOG_IN', mydata: data });
        },
        logOut : () => dispatch({ type: 'LOG_OUT' }),
        // userName : (data) => {
            
        //     dispatch({ type : 'NAME', mydata : data });
        // },
        }), []
    );
    // console.log(state.username);
        
    const get_data = async () => {

        const user_id = await AsyncStorage.getItem('user_id');

        setTimeout(() => {
            dispatch({ type: 'RESTORE_TOKEN', mydata: user_id });    
        }, 2000);    
    }

    React.useEffect(() => {    
        get_data(); 
    }, []);

    return (
                <AuthContext.Provider value={{logIn : authContext.logIn,logOut : authContext.logOut,userName : authContext.userName,username : state.username}} >
                    <NavigationContainer>
                        <Stack.Navigator initialRouteName={Splash}>      
                                
                            {
                                state.isLoading ?
                                (
                                    <Stack.Screen name="Splash" component={Splash} options={{headerShown : false}}/>
                                ) : 
                                (                        
                                    state.userToken ? (<>                                        
                                        <Stack.Screen name="BottomTab" component={BottomTab} options={{headerShown : false}}/>
                                        <Stack.Screen name="Details" component={Details} options={{headerShown : false}}/>
                                        <Stack.Screen name="CreateStory" component={CreateStory} options={{headerShown : false}} />
                                        </>) : 
                                    (<>
                                        <Stack.Screen name="Login" component={Login} options={{headerShown : false}}/>
                                        <Stack.Screen name="Register" component={Register} options={{headerShown : false}}/>
                                    </>)
                                )
                            }
                        </Stack.Navigator>
                    </NavigationContainer>
                </AuthContext.Provider>
            );
}

export default Navigator;

