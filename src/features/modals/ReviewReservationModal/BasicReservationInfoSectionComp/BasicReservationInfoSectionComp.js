// All information, source code contained in this document 
// is the property of StrynDev Solutions, LLC. It must not 
// be transmitted to others without the written consent of 
// StrynDev Solutions. It must be returned to StrynDev Solutions 
// when its authorized use is terminated.

import React from 'react';

import styles from './BasicReservationInfoSectionComp.module.css';

const BasicReservationInfoSectionComp = (props) => (<div className={styles.basicReservationInfoSectionCompContainer}>
        <div className={styles.reviewReservationBasicInfoRowContainer}>
            <span className={styles.basicTextInfoStyle}>Reservation Organizer Name: </span>
            <span className={styles.basicTextValueStyle}>Amanda May</span>
        </div>
        <div className={styles.reviewReservationBasicInfoRowContainer}>
            <span className={styles.basicTextInfoStyle}>Reservation Organizer Email: </span>
            <span className={styles.basicTextValueStyle}>amandamay@gmail.com</span>
        </div>
        <div className={styles.reviewReservationBasicInfoRowContainer}>
            <span className={styles.basicTextInfoStyle}>Reservation Organizer Phone: </span>
            <span className={styles.basicTextValueStyle}>(584) 484-3333</span>
        </div>
    </div>);

export default BasicReservationInfoSectionComp;