import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import axios from "axios";
import _ from 'lodash';
import PostList from "./PostList";

const Post = () => {

    let [value,setValue] = useState({
        Post_data : []
    })

    const {Post_data} = value;
    
    const PostData = () => {
        axios.get('https://dummyjson.com/posts?skip=0&limit=5','','').then((resp) => {

        let Post_data_list = [];

            if (resp.status == 200) 
                {
                    if (!_.isEmpty(resp.data)) 
                    {
                        // console.log(resp.data);
                        if (resp.data.posts && resp.data.posts.length > 0) 
                        {
                            // console.log(resp.data.posts);
                            resp.data.posts.forEach((item) => {
                                let Postdata = {
                                    id : item.id,
                                    title : item.title,
                                    description : item.body,
                                }
                                Post_data_list.push(Postdata);
                            })
                            setValue(prevState => ({...prevState,Post_data : Post_data_list}));
                        }
                    }
                }
        }).catch((err) => {})  
    }
    // console.log(Post_data_list);
    // console.log(Post_data);

    useEffect (() => {
        PostData();
    },[])

    return (
        <View style={styles.container}>
            {Post_data && Post_data.length > 0 ?
            (<PostList Post_data={Post_data}/>) : null
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 10,
        justifyContent: 'center',
        alignItems : 'center'
    },
})

export default Post;