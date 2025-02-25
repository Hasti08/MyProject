import { StyleSheet,Text, View, NativeModules, TouchableOpacity, ScrollView, StatusBar, Platform, SafeAreaView } from 'react-native'
import React, { useCallback } from 'react'
import InstaStory from 'react-native-insta-story';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useFocusEffect } from '@react-navigation/native';

const {StatusBarManager}    =   NativeModules;
const STATUSBAR_HEIGHT      =   StatusBarManager.HEIGHT;

const Status = ({navigation}) => {

    const data = [
        {
            user_id: 1,
            user_img_type : 'local',
            user_image: require('../assets/images/man.png'),
            user_name: 'Hasti',
            stories: [
                
                {
                    story_id: 1,
                    story_image: require('../assets/images/nature.png'),
                    img_type : 'local',
                    data_type: 'image',
                    swipeText: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
                },
                {
                    story_id: 2,
                    data_type: 'custom',
                    storyBackgroundColor : '#ffa07a',
                    customText : 'Lorem Ipsum'
                },
                {
                    story_id: 3,
                    img_type : 'local',
                    data_type: 'image',
                    story_image: require('../assets/images/sky.png'),
                },
                {
                    story_id: 4,
                    img_type: 'local',
                    data_type: 'image',
                    story_image: require('../assets/images/tree.png')
                },
                {
                    story_id: 5,
                    img_type: 'local',
                    data_type : 'video',
                    story_image: require('../assets/videos/video.mp4')
                },
                
            ],
        },
        {
            user_id: 2,
            user_img_type : 'local',
            user_image: require('../assets/images/boy.png'),
            user_name: 'User',
            stories: [
                {
                    story_id: 1,
                    img_type : 'local',
                    data_type: 'image',
                    story_image: require('../assets/images/tree.png'),
                },
                {
                    story_id: 2,
                    img_type : 'local',
                    data_type: 'image',
                    story_image: require('../assets/images/flower.png'),
                },
                {
                    story_id: 1,
                    img_type: 'local',
                    data_type: 'image',
                    story_image: require('../assets/images/sky.png')
                },
            ],
        },
        {
            user_id: 3,
            user_img_type: 'local',
            user_image: require('../assets/images/man1.png'),
            user_name: 'Admin',
            stories: [
                {
                    story_id: 1,
                    img_type: 'local',
                    data_type: 'image',
                    story_image: require('../assets/images/tree.png')
                },
                {
                    story_id: 2,
                    img_type: 'local',
                    data_type: 'image',
                    story_image: require('../assets/images/nature.png')
                },
                {
                    story_id: 3,
                    img_type: 'local',
                    data_type: 'image',
                    story_image: require('../assets/images/sky.png')
                },
            ]
        },
        {
            user_id: 3,
            user_img_type: 'local',
            user_image: require('../assets/images/boy.png'),
            user_name: 'InstaUser',
            stories: [
                {
                    story_id: 1,
                    img_type: 'local',
                    data_type: 'image',
                    story_image: require('../assets/images/tree.png')
                },
                {
                    story_id: 2,
                    img_type: 'local',
                    data_type: 'image',
                    story_image: require('../assets/images/flower.png')
                },
                {
                    story_id: 3,
                    img_type: 'local',
                    data_type: 'image',
                    story_image: require('../assets/images/sky.png')
                },
            ]
        }
    ];

    useFocusEffect(
        useCallback(() => {
          StatusBar.setBarStyle("dark-content");
          Platform.OS === 'android' && StatusBar.setBackgroundColor('transparent');
          StatusBar.setTranslucent(true);
        }, []),
      );
    
  return (
    <View style={{flex : 1}}>
        <View style={styles.statusbarblock}></View>
        <SafeAreaView style={{flex: 1}}>
            <ScrollView style={{flex: 1}}>
                <View style={{flex: 1,flexDirection: 'row'}}>
                    <View style={{flex: 0.8}}>
                        <InstaStory
                            data={data}
                            duration={10}
                            avatarTextStyle={{fontFamily: 'Montserrat-Bold',fontSize: 12}}
                            renderCloseComponent={({ item, onPress }) => (
                                <TouchableOpacity style={{ flexDirection: 'row' }} onPress={onPress}>
                                    <Ionicons name='close-circle-outline' color='white' size={25}/>
                                </TouchableOpacity>
                            )}
                            storyContainerStyle={{backgroundColor: '#646464'}}
                        />
                    </View> 
                    <View style={{flex: 0.2,alignItems: 'center',justifyContent: 'center'}}>
                        <TouchableOpacity style={{height: 62,width: 62,borderRadius: 32,borderWidth: 2,justifyContent: 'center',alignItems:'center',borderColor: 'red'}} 
                                onPress={() => navigation.navigate('CreateStory')}>
                            <Ionicons name='add' color='black' size={40}/>
                        </TouchableOpacity>
                        <Text style={{fontSize: 13,fontWeight: 'bold',marginTop: 4}}>Create</Text>
                    </View> 
                </View>
            </ScrollView>
        </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
    indicator: {
        left: 5,
        right: 5,
        top: 10,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
    },
    statusbarblock : {        
        marginTop: STATUSBAR_HEIGHT,         
    },
});

export default Status