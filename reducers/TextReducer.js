const TextReducer = (state = '', action) => {
    switch (action.type) {
        case 'TEXTDATA':
            return{
                ...state,
                text: action.payload
            };
            default :
                return state;
    }
}

export default TextReducer;