import { SET_ALERT, REMOVE_ALERT } from "./types";
import {v4 as uuidv4} from 'uuid';

// Time of the alert message display 
const TIME_OUT = 2000; 

export const  setAlert = (msg, alertType)=> dispatch => {
    const id = uuidv4(); 
    dispatch({
        type: SET_ALERT,
        payload: {msg,alertType,id}
    }); 

    setTimeout(()=>dispatch({type: REMOVE_ALERT,payload: id}), TIME_OUT); 

}; 