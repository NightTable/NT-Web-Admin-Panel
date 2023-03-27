// All information, source code contained in this document 
// is the property of StrynDev Solutions, LLC. It must not 
// be transmitted to others without the written consent of 
// StrynDev Solutions. It must be returned to StrynDev Solutions 
// when its authorized use is terminated.

export const INCREMENT_COUNTER = "increment-counter";

export const incrementButtonAction = () => {

    return (dispatch) => {


        dispatch({
            type: INCREMENT_COUNTER
        });
    }


};