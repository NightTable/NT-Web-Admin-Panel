// All information, source code contained in this document 
// is the property of StrynDev Solutions, LLC. It must not 
// be transmitted to others without the written consent of 
// StrynDev Solutions. It must be returned to StrynDev Solutions 
// when its authorized use is terminated.

import React from 'react';
import styles from './EventInputComp.module.css';

const EventInputComp = (props) => {

    return (<div className={styles.mainEventInputCompContainer}>
        <span className={styles.labelInputStyle}>{props.labelName}</span>
        <input className={styles.mainEventInputElementStyle}>
        </input>
    </div>)
}

export default EventInputComp;