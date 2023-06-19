// All information, source code contained in this document 
// is the property of StrynDev Solutions, LLC. It must not 
// be transmitted to others without the written consent of 
// StrynDev Solutions. It must be returned to StrynDev Solutions 
// when its authorized use is terminated.

import React from 'react';

import styles from './LowerButtonContainerComp.module.css';

const LowerButtonContainerComp = (props) => {

    return (<div className={styles.lowerButtonContainerCompContainer}>
        <button onClick={props.onLowerButtonContainerCancelClick} className={styles.cancelButtonStyle}>
            <span>cancel</span>
        </button>
        <button className={styles.continueButtonStyle}>
            <span>continue</span>
        </button>
    </div>)
}

export default LowerButtonContainerComp;