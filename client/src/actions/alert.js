import { SET_ALERT, REMOVE_ALERT } from "./types";
import {v4 as uuidv4} from 'uuid';

// Time of the alert message display 
const TIME_OUT = 4000; 

export const  setAlert = (msg, alertType)=> dispatch => {
    // Create the id for the alert 
    const id = uuidv4(); 

    //dispatch the action 
    dispatch({
        type: SET_ALERT,
        payload: {msg,alertType,id}
    }); 

    setTimeout(()=>dispatch({type: REMOVE_ALERT,payload: id}), TIME_OUT); 

}; 