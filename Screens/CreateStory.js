import { ActivityIndicator, Dimensions, NativeModules, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useRef, useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import ColorPicker from 'react-native-wheel-color-picker';
import Modal from "react-native-modal";
import { storage } from '../App';
import { useFocusEffect } from "@react-navigation/native";
import { Input } from "react-native-elements";
import Slider from '@react-native-community/slider';

let ScreenWidth = Dimensions.get("screen").width;
let ScreenHeight = Dimensions.get("screen").height;

const {StatusBarManager}    =   NativeModules;
const STATUSBAR_HEIGHT      =   StatusBarManager.HEIGHT;

const CreateStory = ({navigation}) => {

    const ref = useRef(0);

    let [value,setValue] = useState ({
        currentColor : '#FFFFFF',
        modal_visible: false,
        enter_text : '',
        font_modal : false,
        text_size : 12,
        type_size : 12
    })

    const {currentColor,modal_visible,enter_text,font_modal,text_size,type_size} = value;

    const handleChange = name => value => {
        setValue(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    useFocusEffect(
        React.useCallback(() => {
            
            const change_color = storage.getString('set_color')
            const changeText = storage.getNumber('set_text')

            setValue(prevState => ({...prevState,currentColor: change_color ? change_color : '#FFFFFF',
                type_size : changeText ? changeText : type_size,
                text_size : changeText ? changeText : text_size}));
        }, [])
    );

    const onColorChange = (color) => {
        storage.set('set_color', color )
        setValue(prevState => ({...prevState,currentColor: color}));
    };

    const modal_pop_up = () => {
        setValue(prevState => ({...prevState,modal_visible : true }));
    }

    const close_modal = () => {
        setValue(prevState => ({...prevState,modal_visible : false}));
    }

    const text_modal = () => {
        setValue(prevState => ({...prevState,font_modal : true }));
    }
    const text_modal_close = () => {
        setValue(prevState => ({...prevState,font_modal : false}));
    }

    const change_text = (font) => {
        setValue(prevState => ({...prevState,text_size : font}))
    }
    
    const apply_btn = () => {
        storage.set('set_text', text_size)
        setValue(prevState => ({...prevState,type_size : text_size,font_modal: false}))
    }

    // useEffect(() => {

    // let a = [5,10,15,20,25];
    // let b = [10,20,30,40];
    // let c = [];
    // // [15,30,45,60,25]

    // a.map((item,index) => {

    //     let xyz = b[index] ? item + b[index] : item;
    //     c.push(xyz);
        
    // })

    // console.log(c);

    // let d = []
    // a.map((item) => {
    //     if(typeof item == "number")
    //     {
    //         b.push(item)
            
    //     }
    //     else{
    //         d.push(item)
    //     }
    // })
    // b.sort((x,y) => x - y)
    // d.sort()
    // let e = [...b,...d]
    // console.log(e);
    
    // let b = [10,11,15,7,4,6,8];
    // let c = [...a,...b];

    // let d = c.filter((key,index) => c.indexOf(key) == index)
    // // let z = []
    // // c.map((item) => {
    // //     if (!d.includes(item)) {
    // //         z.push(item)
    // //     }
    // // })
    // // console.log(d);
    
    // // for (let x = 0; x < a.length; x++) {

    // //     let z = a[x] * 5;
        
    // //     b.push(z);
    // // }
    // // console.log(d);

    // console.log(d.sort((x,y) => x-y));
    
    // }, []);

  return (<>           
        <View style={{flex:1}} >
            <View style={styles.statusbarblock}></View>
            <SafeAreaView style={{flex: 1}}>
                <View style={{flex: 0.12,backgroundColor: 'white'}}>
                    <View style={{flex: 0.3,flexDirection: 'row',margin: 5}}>
                        <View style={{flex: 0.9,justifyContent: 'center',marginLeft: 5}}>
                            <Text style={{fontFamily: 'Montserrat-Bold',fontSize: 15,color: 'black'}}>Create Story</Text>
                        </View>
                        <View style={{flex: 0.1,justifyContent: 'flex-start',alignItems: 'flex-end'}}>
                            <TouchableOpacity onPress={() => navigation.navigate('Status')} style={{height:30,width: 30,borderRadius: 15,justifyContent: 'center',alignItems: 'center',}}>
                                <Ionicons name="close-circle-outline" size={30} color={'black'}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{flex: 0.7,flexDirection: 'row',}}>
                        <View style={{flex: 0.2}}>
                            <TouchableOpacity style={{flex: 1,alignItems: 'center',justifyContent: 'center'}} 
                                onPress={modal_pop_up} activeOpacity={0.7}>
                                <Ionicons name='color-palette-outline' size={25} color={'#8b0000'}/>
                                <Text style={{fontFamily: 'Montserrat-Bold',fontSize: 14}}>Color</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{flex: 0.2}}>
                            <TouchableOpacity style={{flex: 1,justifyContent: 'center',alignItems: 'center',}}
                                onPress={text_modal}  activeOpacity={0.7}>
                                <Ionicons name='text' size={25} color={'#8b0000'}/>
                                <Text style={{fontFamily: 'Montserrat-Bold'}}>Text</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={{flex: 0.88,backgroundColor: currentColor}}>
                    <View style={{flex: 0.78,justifyContent: 'center',alignItems: 'center'}}>
                        <Input
                            value={enter_text}
                            name='enter_text'
                            onChangeText={handleChange('enter_text')}
                            placeholder='Tap To Type'
                            inputStyle={{justifyContent: 'center',textAlign: 'center',alignItems: 'center',width: '100%',height: 400}}
                            inputContainerStyle={{borderWidth:0,borderBottomWidth:0}}
                            style={{textAlignVertical: 'center',fontSize: type_size}}
                            multiline
                        />
                    </View>
                </View>
            </SafeAreaView>
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
            <View  style={{height: 350,width: 350,backgroundColor: 'white',borderRadius: 10,}}>
                <View style={{flex: 0.1,justifyContent:'center',alignItems:'flex-end',marginEnd: 8,marginTop: 5}}>
                    <TouchableOpacity onPress={close_modal} style={{height:30,width: 30,borderRadius: 15,backgroundColor: '#f08080',justifyContent: 'center',alignItems: 'center',}}>
                        <Ionicons name="close" size={20}/>
                    </TouchableOpacity>
                </View>
                <View style={{flex: 0.9,justifyContent: 'center',margin:5}}>
                    <ColorPicker
                        ref={ref => { this.picker = ref }}
                        color={currentColor}
                        swatchesOnly={false}
                        onColorChangeComplete={(color) => onColorChange(color)}
                        thumbSize={30}
                        sliderSize={30}
                        noSnap={true}
                        row={false}
                        swatchesLast={false}
                        swatches={false}
                        discrete={false}
                        wheelLodingIndicator={<ActivityIndicator size={40} />}
                        sliderLodingIndicator={<ActivityIndicator size={20} />}
                        useNativeDriver={false}
                        useNativeLayout={false}
                    />
                </View>
            </View>
        </Modal>
        <Modal
            isVisible={font_modal} 
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
            onBackdropPress={text_modal_close}>
            <View  style={{height: 200,width: 350,backgroundColor: 'white',borderRadius: 10,}}>
                <View style={{flex: 0.15,flexDirection: 'row'}}>
                    <View style={{flex: 1,alignItems: 'flex-start',justifyContent: 'center',marginLeft: 10}}>
                        <Text style={{fontFamily: 'Montserrat-Bold',fontSize: 14,color: 'black'}}>Change Font Size</Text>
                    </View>
                    <View style={{flex: 1,alignItems: 'flex-end',justifyContent: 'center',marginTop: 3}}>
                        <TouchableOpacity onPress={text_modal_close} style={{height:20,width: 20,borderRadius: 10,backgroundColor: '#f08080',justifyContent: 'center',alignItems: 'center',marginRight: 5}}>
                            <Ionicons name="close" size={12}/>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{flex: 0.85}}>
                    <View style={{flex: 1,margin: 5}}>
                        <View style={{flex: 0.4,justifyContent: 'center',alignItems: 'center'}}>
                            <Text style={{color: '#000000',fontSize: text_size,fontFamily: 'Montserrat-Regular'}}>
                                Lorem Ipsum 
                            </Text>
                        </View>
                        <View style={{flex: 0.4,alignItems: 'center',flexDirection: 'row',justifyContent: 'center'}}>
                            <View style={{justifyContent: 'center',alignItems: 'center'}}>
                                <Text style={{color: '#000000',fontSize: 14}}>A</Text>
                            </View>
                            <View style={{justifyContent: 'center',alignItems: 'center'}}>
                                <Slider
                                    value={text_size}
                                    onValueChange={(font) => change_text(font)}
                                    style={{width: 300, height: 40}}
                                    minimumValue={12}
                                    maximumValue={25}
                                    step={1}
                                    maximumTrackTintColor="#000000"
                                />
                            </View>
                            <View style={{justifyContent: 'center',alignItems: 'center'}}>
                                <Text style={{color: '#000000',fontSize: 18}}>A</Text>
                            </View>
                        </View>
                        <View style={{flex: 0.2,justifyContent: 'center',alignItems: 'center'}}>
                            <TouchableOpacity style={{height: 30,width: '100%',backgroundColor: '#f08080',borderRadius: 8,justifyContent: 'center',alignItems: 'center'}}
                                onPress={apply_btn}>
                                <Text style={{fontFamily: 'Montserrat-Bold',fontSize: 14,color: 'black'}}> Apply </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    </>)
}

export default CreateStory

const styles = StyleSheet.create({
    colorPicker: { 
        flex: 1,
        width: 300, 
        height: 500, 
        borderRadius: 10, 
        marginBottom: 20, 
    },
    statusbarblock : {        
        marginTop: STATUSBAR_HEIGHT,         
    },
})