


import React from 'react';

import styles from './AddEventModal.module.css';
import EventInputComp from './EventInputComp/EventInputComp';

const AddEventModal = (props) => (<div className={styles.addEventModalContainer}>
        <div className={styles.upperHeaderContainer}>
            <span className={styles.addEventLabelContainer}>Add an event</span>
        </div>
        <div className={styles.mainBodyContainer}>
            <EventInputComp
                labelName='name' />
            <div className={styles.photoLabelStyle}>
                <span className={styles.labelInputStyle}>photo:</span>
                <button className={styles.choosePhotoButtonStyle}>choose photo</button>
            </div>
            <EventInputComp
                labelName='date' />
            <EventInputComp
                labelName='time' />
            <EventInputComp
                labelName='tickets' />
        </div>
        <div className={styles.lowerButtonRowContainer}>
            <button onClick={props.onCancelButtonClick} className={styles.cancelButtonStyle}>
                cancel
            </button> 
            <button className={styles.addButtonStyle}>
                add
            </button>
        </div>
    </div>);

export default AddEventModal;