import { StyleSheet, Dimensions ,Text, View, Image, Animated, TouchableWithoutFeedback } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import FastImage from "react-native-fast-image";
import { PageIndicator } from 'react-native-page-indicator';
import uuid from 'react-native-uuid';


const Status = () => {

    const width = Dimensions.get('window').width;
    const height = Dimensions.get('window').height;
    const scrollX = useRef(new Animated.Value(0)).current;
    const currentpage = useRef(Animated.divide(scrollX,width)).current;
    const [coordinate, setCoordinate] = useState([])
    const ref = useRef(0);
    // const img_id = useRef();
    
    const image_data = [
        {
            id : 1,
            img : require('../assets/images/nature.png')
        },
        {
            id : 2,
            img : require('../assets/images/tree.png')
        },
        {
            id: 3,
            img : require('../assets/images/flower.png')
        },
        {
            id: 4,
            img : require('../assets/images/fall.png')
        },
        {
            id: 5,
            img : require('../assets/images/sky.png')
        }
    ]

    const indicator_width = Math.ceil(width / image_data.length)

    global.img_index = 1;

    useEffect(() => {

        let img_interval = setInterval(() => {      
            
            global.img_index = global.img_index + 1;  

                ref.current.scrollTo({
                    x: coordinate[global.img_index],
                    y: 0,
                    animated: true,
                }); 

                if (global.img_index == image_data.length) 
                {
                    global.img_index = 0
                }  
                   
        }, 2000);  

        return(() => {
            clearInterval(img_interval)
        })
    },[])
    
    const handlePress = (e,index) => {

        let touchPoint = Math.ceil(e.nativeEvent.locationX)
        global.img_index = index;
        
        if(touchPoint <= 70)
        {
            ref.current.scrollTo({x: coordinate[global.img_index - 1]})
        }
        else if(touchPoint >= Math.ceil(width-70))
        {
            ref.current.scrollTo({x: coordinate[global.img_index + 1]})
        }
    }

  return (
    <View style={{flex : 1}}>
       <Animated.ScrollView  
            ref={ref}
            horizontal={true}
            pagingEnabled={true}
            showsHorizontalScrollIndicator={false} 
            scrollEnabled={false}
            onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
                useNativeDriver: true,
            })}>
            {
                image_data.map((item, index) => (

                <TouchableWithoutFeedback 
                    key={uuid.v4()} 
                    onLayout={(event) => {
                        const layout = event.nativeEvent.layout;
                        coordinate[item.id] = layout.x;
                    }} 
                    onHoverIn={()=>console.log('hover in')}
                    onHoverOut={()=>console.log('hover out')}
                    onPressIn={()=>console.log('Press in')}
                    onPressOut={()=>console.log('press out')}
                    onPress={(e) => handlePress(e,item.id)} 
                >
                    <View style={{flex: 1,justifyContent: 'center',alignItems: 'center'}} >
                        <View style={[{ width, height }]}>
                            <FastImage source={item.img} style={{width: "100%", height: "100%"}} resizeMode="contain" />
                        </View>
                    </View>
                </TouchableWithoutFeedback>
                ))
            }
       </Animated.ScrollView>
       <View style={styles.indicator}>
            <PageIndicator 
                count={image_data.length} 
                current={currentpage}
                variant='train'
                duration={500}
                size={4}
                dashSize={indicator_width}
                color={'#8b0000'}
            />
       </View>
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
    }
});

export default Status