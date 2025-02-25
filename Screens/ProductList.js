import React, { useEffect, useState, useRef } from "react";
import { FlashList } from "@shopify/flash-list";
import { Text, View, TouchableOpacity, RefreshControl } from "react-native";
import FastImage from "react-native-fast-image";
import Collapsible from "react-native-collapsible";

const ProductList = ({ApiDetails,modal_pop_up,ApiData,refresh,refresh_list}) => {
        
    const onEndReachedCalledDuringMomentum = useRef(true);

    // const [value,setValue] = useState({
    //     is_collapsed : true,
    //     selected_index : '',
    // })

    // const {is_collapsed,selected_index} = value;
// console.log(temp_data);
    // console.log(modal_visible);
    // const toogleExpand = (index) => {
    //     setValue(prevState => ({...prevState,selected_index : index,is_collapsed : false }));
    //     // if (selected_index !== '' && selected_index == index) {
    //     //     setValue(prevState => ({...prevState,selected_index : index,is_collapsed : !is_collapsed }));
    //     // }else {
    //     //     setValue(prevState => ({...prevState,selected_index : index,is_collapsed : false }));
    //     // }onPress={()=>{toogleExpand(index)}}
    // }

    const loadData = () => {
        ApiData()
    }

    const renderItem = ({item,index}) => {

        return (
                    <View style={{flex: 1,marginBottom : 5}}> 
                        <TouchableOpacity onPress={() => {modal_pop_up(item)}} style={{flex:1,minHeight: 70,flexDirection:'row',backgroundColor: 'white',borderRadius: 10}} activeOpacity={0.7}>
                            <View style={{alignItems: 'center',justifyContent: 'center',margin: 8}}>
                                <View style={{height: 70,width: 70}}>
                                    <FastImage style={{width: '100%',height: '100%'}} source={{uri : item.thumbImage}} resizeMode={FastImage.resizeMode.center} />
                                </View>
                            </View>
                            <View style={{flex: 1,margin: 5}}>
                                <View style={{flex: 1,flexDirection: 'row'}}>
                                    <View style={{flex: 0.7,justifyContent: 'center'}}>
                                        <Text style={{fontFamily : 'Montserrat-Bold',fontSize : 15,textAlign: 'left',margin: 3,color: 'black'}} >{item.title}</Text>
                                    </View>
                                    <View style={{flex: 0.3,justifyContent: 'center'}}>
                                        <Text style={{fontFamily : 'Montserrat-Bold',fontSize : 13,textAlign: 'right',margin: 3,color: 'black'}}>{item.brand}</Text>
                                    </View>
                                </View>
                                <View style={{flex: 1,flexDirection: 'row'}}>
                                    <View style={{flex: 0.7,justifyContent: 'center'}}>
                                        <Text style={{fontFamily : 'Montserrat-Bold',fontSize : 13,textAlign: 'left',margin: 3,color: 'black'}}>{item.category}</Text>
                                    </View>
                                    <View style={{flex: 0.3,justifyContent: 'center'}}>
                                        <Text style={{fontFamily : 'Montserrat-Bold',fontSize : 13,textAlign: 'right',margin: 3,color: 'black'}}>$ {item.price}</Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                        {/* <Collapsible collapsed={selected_index !== '' && selected_index == index ? is_collapsed : true }>
                            <View style={{flex: 1,borderWidth: 1,borderRadius: 5,margin: 5}}>
                            <Text style={{fontSize: 12,margin: 3}}>{item.body}</Text>
                            </View>
                        </Collapsible>  */}
                    </View>            
                )
    }

    return (
        <View style= {{flex:1,width : '100%',height: '70%',minHeight : 2}}>
            <FlashList
                data={ApiDetails}
                estimatedItemSize={91}
                onEndReached = {() => {                                                                                                                      
                if(!onEndReachedCalledDuringMomentum.current)
                {                                                    
                    loadData();
                    onEndReachedCalledDuringMomentum.current = true;                                                    
                }
                }}
                onEndReachedThreshold={0.01}      
                onMomentumScrollBegin={() => { onEndReachedCalledDuringMomentum.current = false;}}  
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => item.key}
                renderItem={renderItem}
                refreshControl={
                    <RefreshControl
                        refreshing={refresh}
                        onRefresh={refresh_list}
                    />
                }
                // extraData={[is_collapsed,selected_index]}
            />
        </View>
    )
    
}

export default ProductList;