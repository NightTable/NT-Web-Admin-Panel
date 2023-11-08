// All information, source code contained in this document 
// is the property of StrynDev Solutions, LLC. It must not 
// be transmitted to others without the written consent of 
// StrynDev Solutions. It must be returned to StrynDev Solutions 
// when its authorized use is terminated.

import React from 'react';
import ReservationsInnerInfoContainer from '../../features/ReservationsDashboardScreen/ReservationsInnerInfoContainer/ReservationsInnerInfoContainer';

import styles from './ReservationsDashboardScreen.module.css';

const ReservationsDashboardScreen = (props) => {

    const dummyReservationData = [
        {
            id: '30dkd',
            tableOrganizer: 'amanda may',
            numReservedTables: 3,
            tableConfigurations: [
                {
                    tableType: 'floor',
                    tableSize: 13
                },
                {
                    tableType: 'standing',
                    tableSize: 8
                },
                {
                    tableType: 'dj',
                    tableSize: 3
                }
            ],
            tableType: null,
            tableSize: null,
            reservationDate: 'fri 1-14-22',
            isMultiConfigured: true
        },
        {
            id: 'j0klsi0',
            tableOrganizer: 'jack smith',
            numReservedTables: 1,
            tableConfigurations: [],
            isMultiConfigured: false,
            tableType: 'floor',
            reservationDate: 'fri 1-17-22',
            tableSize: 3
        }
    ];

    return (<div className={styles.reservationsDashboardScreenContainer}>
        <div className={styles.upperHeaderLabelContainer}>
            <span className={styles.welcomeBackText}>Welcome back, Daniel!</span>
        </div>
        <div className={styles.clubIdentifierRowContainer}>
            <div className={styles.clubIdentifierSectionContainer}>
                <span className={styles.clubIdTextStyle}>3948jhhrjej</span>
                <div className={styles.clubReadOnlyContainer}>
                    <span>the grand</span>
                </div>
            </div>
        </div>
        <div className={styles.reservationUpperDateSectionRowContainer}>
            <div className={styles.reservationHeaderTextContainer}>
                <span className={styles.reservationMainText}>Reservations</span>
            </div>
            <div className={styles.dateButtonContainer}>
                <button className={styles.dateButtonStyle}>
                    <span className={styles.dateLabelTextStyle}>Date: </span>
                    <span className={styles.dateValueTextStyle}>fri 1-14-22</span>
                </button>
            </div>
        </div>
        <ReservationsInnerInfoContainer
            onLocalAddReservationButtonPress={props.onAddReservationButtonPress}
            reservationData={dummyReservationData} />
    </div>);
};

export default ReservationsDashboardScreen;

