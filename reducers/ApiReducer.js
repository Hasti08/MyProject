const ApiReducer = (state = [],action) => {
    switch (action.type) {
        case 'PRODUCTDATA':
            return {
                ...state,
                apiData : action.payload
            };
        default:
            return state;
    }
}

export default ApiReducer;