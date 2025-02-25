const ProfileReducer = (state = '',action) => {
    switch (action.type) {
        case 'PROFILEDATA':
            return {
                ...state,
                profiledata : action.payload
            };
            default:
                return state;
    }
}
export default ProfileReducer;