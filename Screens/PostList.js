import React from "react";
import { Text, View } from "react-native";
import { FlashList } from "@shopify/flash-list";


const randerItem = ({item}) => {
    return (
        <View style={{flex: 1,backgroundColor: 'white',borderRadius: 5,marginBottom : 10}}>
            <View style={{flex: 1,minHeight: 50}}>
                <Text style={{fontSize : 14,fontFamily: 'Montserrat-Bold',margin: 5,color: 'black'}}>{item.title}</Text>
                <Text style={{fontSize : 12,fontFamily: 'Montserrat-Bold',margin: 5,fontWeight: '500',color: 'black'}}>{item.description}</Text>
            </View>
        </View>
    )
}

const PostList = ({Post_data}) => {
    return (
        <View style={{flex: 1,width : '100%',height: '70%',minHeight: 2}}>
            <FlashList
                data={Post_data}
                estimatedItemSize={200}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => item.id.toString()}
                renderItem={randerItem}
            />
        </View>
    )
}

export default PostList;