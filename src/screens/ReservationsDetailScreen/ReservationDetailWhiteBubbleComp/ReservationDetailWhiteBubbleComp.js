// All information, source code contained in this document 
// is the property of StrynDev Solutions, LLC. It must not 
// be transmitted to others without the written consent of 
// StrynDev Solutions. It must be returned to StrynDev Solutions 
// when its authorized use is terminated.

import React from 'react';
import LeftArrowCircleDetailComp from '../../../features/SharedUIElements/LeftArrowCircleDetailComp/LeftArrowCircleDetailComp';

import styles from './ReservationDetailWhiteBubbleComp.module.css';
import ReservedTableItemComp from './ReservedTableItemComp/ReservedTableItemComp';

const ReservationDetailWhiteBubbleComp = (props) => {

    const dummyReservationTableInformation = [
        {
            tableType: 'standing',
            size: 13,
            price: 340,
            qty: 1
        },
        {
            tableType: 'dj',
            size: 3,
            price: 600,
            qty: 1
        },
        {
            tableType: 'floor',
            size: 8,
            price: 600,
            qty: 1
        }
    ]

    return (<div className={styles.reservationDetailWhiteBubbleCompContainer}>
        <div className={styles.backButtonRowContainer}>
            <div className={styles.backButtonImageContainer}>
                <LeftArrowCircleDetailComp></LeftArrowCircleDetailComp>
            </div>
        </div>
        <div className={styles.middleRowReservationDetailBodyContainer}>
            <div className={styles.leftSideOrganizerInfoColumn}>
                <div className={styles.generalInputContainer}>
                    <span className={styles.generalLabelTextStyle}>id: </span>
                    <span className={styles.generalGreyTextValueStyle}>30dkd</span>
                </div>
                <div className={styles.generalInputContainer}>
                    <span className={styles.generalLabelTextStyle}>Reservation Organizer: </span>
                    <span className={styles.generalValueTextStyle}>amanda may</span>
                </div>
                <div className={styles.generalInputContainer}>
                    <span className={styles.generalLabelTextStyle}>Reservation Organizer Phone: </span>
                    <span className={styles.generalValueTextStyle}>(495) 349-333</span>
                </div>
                <div className={styles.generalInputContainer}>
                    <span className={styles.generalLabelTextStyle}> Number of Reserved Tables: </span>
                    <span className={styles.generalValueTextStyle}>3</span>
                </div>
                <div className={styles.reservedTableDetailListContainer}>
                    {dummyReservationTableInformation.map((reservationObject, index) => (
                        <ReservedTableItemComp
                            key={index}
                            tableType={reservationObject.tableType}
                            price={reservationObject.price}
                            size={reservationObject.size}
                            qty={reservationObject.qty}></ReservedTableItemComp>
                    ))}
                </div>
            </div>
            <div className={styles.rightSideReservationTransactionInfoColumn}>
                 <div className={styles.generalInputContainer}>
                    <span className={styles.generalLabelTextStyle}>Reservation Created:</span>
                    <span className={styles.generalValueTextStyle}>mon jan-12-22 8:03 PM</span>
                </div>
                <div className={styles.generalInputContainer}>
                    <span className={styles.generalLabelTextStyle}>Associated Transaction:</span>
                    <span className={styles.generalGreyUnderlinedValueStyle}>948kfd</span>
                </div>
            </div>
        </div>
        <div className={styles.lowerButtonContainer}>
            <button className={styles.cancelReservationButtonStyle}>
                cancel reservation
            </button>
            <button className={styles.editReservationButtonStyle}>
                edit reservation
            </button>
        </div>
    </div>)
} 

export default ReservationDetailWhiteBubbleComp;