// All information, source code contained in this document 
// is the property of StrynDev Solutions, LLC. It must not 
// be transmitted to others without the written consent of 
// StrynDev Solutions. It must be returned to StrynDev Solutions 
// when its authorized use is terminated.

import { INCREMENT_COUNTER } from "../actions/main";

const initialState = {
    buttonCounter: 1,
    tableRequests: []
}

export const mainReducer =  (state = initialState, action) => {

    switch (action.type) {

        case INCREMENT_COUNTER:

            return {
                ...state,
                buttonCounter: state.buttonCounter + 1
            };

        default:

            return state;
    }


};