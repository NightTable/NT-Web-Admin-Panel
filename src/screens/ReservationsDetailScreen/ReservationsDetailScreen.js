// All information, source code contained in this document 
// is the property of StrynDev Solutions, LLC. It must not 
// be transmitted to others without the written consent of 
// StrynDev Solutions. It must be returned to StrynDev Solutions 
// when its authorized use is terminated.

import React from 'react';
import ReservationDetailWhiteBubbleComp from './ReservationDetailWhiteBubbleComp/ReservationDetailWhiteBubbleComp';

import styles from './ReservationsDetailScreen.module.css';

const ReservationsDetailScreen = (props) => {

    return (<div className={styles.reservationsDetailScreenContainer}>
        <div className={styles.upperHeaderRowContainer}>
            <span className={styles.welcomeBackText}>Welcome back, Daniel!</span>
        </div>
        <div className={styles.readOnlySelectedClubRowContainer}>
            <div className={styles.infoReadOnlyContainer}>
                <span className={styles.clubIdTextStyle}>38ejdhd8djdh</span>
                <button className={styles.selectedClubButtonStyle}>
                    <span>the grand</span>
                </button>
            </div>
        </div>
        <div className={styles.reservationDetailRowLabelContainer}>
            <span className={styles.reservationDetailTextStyle}>
                Reservation Detail:
            </span>
        </div>
        <ReservationDetailWhiteBubbleComp></ReservationDetailWhiteBubbleComp>

    </div>)
}

export default ReservationsDetailScreen;