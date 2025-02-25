import { combineReducers } from "redux";
import TextReducer from "./TextReducer";
import ApiReducer from "./ApiReducer";
import ProfileReducer from "./ProfileReducer";

const rootReducer = combineReducers({
    TextReducer,  
    ApiReducer,  
    ProfileReducer
})

export default rootReducer;