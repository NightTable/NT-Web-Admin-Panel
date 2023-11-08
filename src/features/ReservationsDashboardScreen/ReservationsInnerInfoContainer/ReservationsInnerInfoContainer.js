// All information, source code contained in this document 
// is the property of StrynDev Solutions, LLC. It must not 
// be transmitted to others without the written consent of 
// StrynDev Solutions. It must be returned to StrynDev Solutions 
// when its authorized use is terminated.

import React from 'react';
import ReservationExpandableHorizComp from './ReservationExpandableHorizComp/ReservationExpandableHorizComp';

import styles from './ReservationsInnerInfoContainer.module.css';

const ReservationsInnerInfoContainer = (props) => {

    const localReservationData = props.reservationData;

    return (<div className={styles.reservationsInnerInfoContainer}>
        <div className={styles.categoryRowLabelContainer}>
            <div className={styles.headerSingleCategoryContainer}>
                <span>id</span>
            </div>
            <div className={styles.headerSingleCategoryContainer}>
                <span>table organizer</span>
            </div>
            <div className={styles.headerSingleCategoryContainer}>
                <span># reserved tables</span>
            </div>
            <div className={styles.headerSingleCategoryContainer}>
                <span>table type</span>
            </div>
            <div className={styles.headerSingleCategoryContainer}>
                <span>table size</span>
            </div>
            <div className={styles.headerSingleCategoryContainer}>
                <span>date</span>
            </div>
        </div>
        <div className={styles.reservationOuterListContainer}>
            <div className={styles.expandableReservationListContainer}>
                {localReservationData.map((reservationObj, index) => (
                    <ReservationExpandableHorizComp
                        key={index}
                       reservationItem={reservationObj}  />

                ))}
            </div>
        </div>
        <div className={styles.lowerReservationButtonContainer}>
            <button onClick={props.onLocalAddReservationButtonPress} className={styles.addReservationButtonStyle}>Add New Reservation</button>
        </div>
    </div>);
};

export default ReservationsInnerInfoContainer;