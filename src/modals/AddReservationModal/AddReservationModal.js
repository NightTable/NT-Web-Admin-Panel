// All information, source code contained in this document 
// is the property of StrynDev Solutions, LLC. It must not 
// be transmitted to others without the written consent of 
// StrynDev Solutions. It must be returned to StrynDev Solutions 
// when its authorized use is terminated.

import React from 'react';

import styles from './AddReservationModal.module.css';

import BasicReservationInfoSectionComp from '../../features/modals/AddReservationModal/BasicReservationInfoSectionComp/BasicReservationInfoSectionComp';
import TableDateSelectionInfoComp from '../../features/modals/AddReservationModal/TableDateSelectionInfoComp/TableDateSelectionInfoComp';
import LowerButtonContainerComp from '../../features/modals/AddReservationModal/LowerButtonContainerComp/LowerButtonContainerComp';

const AddReservationModal = (props) => (<div className={styles.addReservationModalContainer}>
        <div className={styles.reservationUpperHeaderContainer}>
            <span className={styles.addNewReservationLabelContainer}>Add new reservation</span>
        </div>
        <div className={styles.reservationLowerContainer}>
            <BasicReservationInfoSectionComp />
            <TableDateSelectionInfoComp />
            <LowerButtonContainerComp
                onLowerButtonContainerCancelClick={props.onCancelButtonClick} />
        </div>
    </div>);

export default AddReservationModal;