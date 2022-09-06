// All information, source code contained in this document 
// is the property of StrynDev Solutions, LLC. It must not 
// be transmitted to others without the written consent of 
// StrynDev Solutions. It must be returned to StrynDev Solutions 
// when its authorized use is terminated.


import React from 'react';

import styles from './AddEventModal.module.css';
import EventInputComp from './EventInputComp/EventInputComp';

const AddEventModal = (props) => {

    return (<div className={styles.addEventModalContainer}>
        <div className={styles.upperHeaderContainer}>
            <span className={styles.addEventLabelContainer}>Add an event</span>
        </div>
        <div className={styles.mainBodyContainer}>
            <EventInputComp
                labelName="name"></EventInputComp>
            <div className={styles.photoLabelStyle}>
                <span className={styles.labelInputStyle}>photo:</span>
                <button className={styles.choosePhotoButtonStyle}>choose photo</button>
            </div>
            <EventInputComp
                labelName="date"></EventInputComp>
            <EventInputComp
                labelName="time"></EventInputComp>
            <EventInputComp
                labelName="tickets"></EventInputComp>
        </div>
        <div className={styles.lowerButtonRowContainer}>
            <button onClick={props.onCancelButtonClick} className={styles.cancelButtonStyle}>
                cancel
            </button> 
            <button className={styles.addButtonStyle}>
                add
            </button>
        </div>
    </div>)
}

export default AddEventModal;