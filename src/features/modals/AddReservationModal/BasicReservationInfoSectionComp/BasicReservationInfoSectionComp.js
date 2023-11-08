// All information, source code contained in this document 
// is the property of StrynDev Solutions, LLC. It must not 
// be transmitted to others without the written consent of 
// StrynDev Solutions. It must be returned to StrynDev Solutions 
// when its authorized use is terminated.

import React from 'react';

import styles from './BasicReservationInfoSectionComp.module.css';

const BasicReservationInfoSectionComp = (props) => (<div className={styles.basicReservationInfoSectionCompContainer}>
        <div className={styles.reservationInfoRowContainer}>
            <span className={styles.reservationBasicInfoTextStyle}>Reservation Organizer Name: </span>
            <input className={styles.basicReservationInputStyle} />
        </div>
        <div className={styles.reservationInfoRowContainer}>
            <span className={styles.reservationBasicInfoTextStyle}>Reservation Organizer Email: </span>
            <input className={styles.basicReservationInputStyle} />
        </div>
        <div className={styles.reservationInfoRowContainer}>
            <span className={styles.reservationBasicInfoTextStyle}>Reservation Organizer Phone: </span>
            <input className={styles.basicReservationInputStyle} />
        </div>
    </div>);

export default BasicReservationInfoSectionComp;