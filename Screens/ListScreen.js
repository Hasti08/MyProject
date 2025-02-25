import React, { useEffect,useState } from "react";
import { StyleSheet, Text, View, Dimensions, ActivityIndicator,Platform } from "react-native";
import axios from "axios";
import _ from 'lodash';
import ProductList from "./ProductList";
import Modal from "react-native-modal";
import { TouchableOpacity } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ApiAction } from "../action/index";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "react-native-elements";
import uuid from 'react-native-uuid';

let ScreenWidth = Dimensions.get("screen").width;
let ScreenHeight = Dimensions.get("screen").height;

const ProfileScreen = () => {

    const ApiDetails = useSelector((state) => state.ApiReducer.apiData);

    const dispatch = useDispatch();

    let [value,setValue] = useState({
        product_data : [],
        modal_visible : false,
        product_desc : '',
        loading : true,
        search : '',
        temp_data : [],
        refresh : false
    })

    const {product_data,modal_visible,product_desc,loading,search,temp_data,refresh} = value;

    const handleChange = name => value => {
        setValue(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const modal_pop_up = (selected_item) => {
        setValue(prevState => ({...prevState,modal_visible : true , product_desc :selected_item.body }));
    }

    const close_modal = () => {
        setValue(prevState => ({...prevState,modal_visible : false}));
    }

    function capitalizeFirstLetter(array) {
        return array.charAt(0).toUpperCase() + array.slice(1);
    }

    const searchData = () => {
        if (search) {
            const searchItem = _.filter(temp_data, { title : search });
            dispatch(ApiAction(searchItem))
            
        } else {
            dispatch(ApiAction(temp_data))
        }
    }

    const refresh_list = () => {
        ApiData();
    }

    const ApiData = () => {

        let dataLength = ApiDetails ? ApiDetails.length : 0;
        
        axios.get('https://dummyjson.com/products?skip='+dataLength+'&limit=15','','').then((resp) => {

            let product_data_list = [];

            if(resp.status == 200)
            {
                if(!_.isEmpty(resp.data))                    
                {
                    if(resp.data.products && resp.data.products.length > 0)
                    {
                        resp.data.products.forEach((item)=>{
                            let product_datas = {
                                key : uuid.v4() ,
                                id : item.id,
                                title : capitalizeFirstLetter(item.title),
                                brand : item.brand,
                                price : item.price,
                                category : item.category,
                                thumbImage : item.thumbnail,
                                body : item.description
                            }

                            product_data_list.push(product_datas);

                        })
                            setValue(prevState => ({...prevState,loading : false}));

                            let product_data_list_asc =_.orderBy(product_data_list,['title'],['desc']);

                            let all_data  = ApiDetails && ApiDetails.length > 0? ApiDetails.concat(product_data_list_asc) : product_data_list_asc

                            dispatch(ApiAction(all_data))

                            setValue(prevState => ({...prevState,temp_data : all_data}));
                    }
                }
            }
        }).catch((error) => {})  
    }          

    useEffect (() => {
        ApiData();                                                            
    },[])
    
    return(<>
        <View style={styles.container}>
            <View style={{height: 40,flexDirection: 'row',width: '100%',borderWidth: 1,borderColor: '#d0ced4',marginBottom: 3,borderRadius: 5}}>
                <View style={{flex: 0.8,alignItems: 'center',justifyContent: 'center'}}>
                    <Input 
                        name="search"
                        value={search}
                        placeholder="Search"
                        inputContainerStyle={styles.inputcontainer}
                        inputStyle={styles.input}
                        containerStyle={styles.containertext}
                        renderErrorMessage={false}
                        onChangeText={handleChange('search')}
                        />
                </View>
                <View style={{flex: 0.2,justifyContent: 'center',alignItems : 'flex-end',margin: 5}}>
                    <TouchableOpacity onPress={searchData} >
                        <Ionicons name="search" size={30}/>
                    </TouchableOpacity>
                </View>
            </View>
            {   loading ?
                    <View style={{flex : 1, justifyContent: 'center',alignItems: 'center'}}>
                        <ActivityIndicator size="large" color="#8b0000" />
                    </View> :
                (   ApiDetails && ApiDetails.length > 0 ?
                    (
                        <ProductList ApiDetails={ApiDetails} modal_pop_up={modal_pop_up} ApiData={ApiData} refresh_list={refresh_list} refresh={refresh}/> 
                    ) : null
                )
            }
        </View>
        <Modal 
            isVisible={modal_visible} 
            deviceWidth={ScreenWidth}
            deviceHeight={ScreenHeight}
            useNativeDriver={true} 
            animationInTiming={300}                                        
            backdropColor={'#222222'}
            backdropOpacity={0.7}     
            backdropTransitionOutTiming={0}    
            hideModalContentWhileAnimating           
            style={{margin: 0,justifyContent: 'center', alignItems:'center'}}                        
            animationIn={"fadeIn"}  
            animationOut={"fadeOut"}                                                                      
            statusBarTranslucent
            onBackdropPress={close_modal}
        >
            <View style={{height: 250,width: 350, alignItems: 'center',backgroundColor: 'white',borderRadius: 10}}>
                <View style={{marginTop: 50,margin: 20}}>
                    <Text>{product_desc}</Text>
                </View>
                <View style={{alignItems: 'center',justifyContent: 'flex-end',height: 50,width: 50}}>
                    <TouchableOpacity onPress={close_modal} style={styles.btn}>
                        <Ionicons name="close" size={15}/>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 10,
        // justifyContent: 'center',
        // alignItems : 'center',
        
    },
    btn : { 
        borderRadius: 10,
        width: 20,
        height: 20,
        backgroundColor: '#f08080',
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputcontainer: {
        borderWidth:0,
        height:35,
        borderRadius:7,
        marginTop:0,
        marginBottom:0,
        borderBottomWidth: 0       
    },    
    input : {
        fontFamily:"Montserrat-Regular",        
        fontSize:13,
        marginBottom:0,
        marginLeft:Platform.OS === 'ios'? 10 : 5,        
    },
    containertext:{
        margin:0,
        padding:0,      
        paddingHorizontal:3, //for left and right padding                
    },
})

export default ProfileScreen;