export const TextAction = (text_data) => {
    return{
        type : 'TEXTDATA',
        payload : text_data
    }
}

export const ApiAction = (product_data_list) => {
    return{
        type : 'PRODUCTDATA',
        payload : product_data_list
    }
}

export const ProfileAction = (profile_data) => {
    return {
        type : 'PROFILEDATA',
        payload : profile_data
    }
}