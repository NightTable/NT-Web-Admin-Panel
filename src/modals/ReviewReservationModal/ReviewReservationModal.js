// All information, source code contained in this document 
// is the property of StrynDev Solutions, LLC. It must not 
// be transmitted to others without the written consent of 
// StrynDev Solutions. It must be returned to StrynDev Solutions 
// when its authorized use is terminated.

import React from 'react';
import BasicReservationInfoSectionComp from '../../features/modals/ReviewReservationModal/BasicReservationInfoSectionComp/BasicReservationInfoSectionComp';

import styles from './ReviewReservationModal.module.css';

import LeftArrowCircleDetailComp from '../../features/SharedUIElements/LeftArrowCircleDetailComp/LeftArrowCircleDetailComp';
import TableInformationSectionComp from '../../features/modals/ReviewReservationModal/TableInformationSectionComp/TableInformationSectionComp';
import PriceTaxSectionInfoComp from '../../features/modals/ReviewReservationModal/PriceTaxSectionInfoComp/PriceTaxSectionInfoComp';
import StripePaymentSectionComp from '../../features/modals/ReviewReservationModal/StripePaymentSectionComp/StripePaymentSectionComp';
import LowerButtonSectionComp from '../../features/modals/ReviewReservationModal/LowerButtonSectionComp/LowerButtonSectionComp';

const ReviewReservationModal = (props) => (<div className={styles.reviewReservationModalContainer}>
        <div className={styles.upperReviewReservationHeaderContainer}>
            <span style={{marginLeft: '0.8rem'}}>Review Reservation</span>
        </div>
        <div className={styles.lowerReviewReservationBodyContainer}>
            <div className={styles.backButtonRowContainer}>
                <LeftArrowCircleDetailComp />
                <span className={styles.backLabelTextStyle}>back</span>
            </div>
            <BasicReservationInfoSectionComp />
            <TableInformationSectionComp />
            <PriceTaxSectionInfoComp />
            <StripePaymentSectionComp />
            <LowerButtonSectionComp />
        </div> 
    </div>);

export default ReviewReservationModal;