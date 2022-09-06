// All information, source code contained in this document 
// is the property of StrynDev Solutions, LLC. It must not 
// be transmitted to others without the written consent of 
// StrynDev Solutions. It must be returned to StrynDev Solutions 
// when its authorized use is terminated.

import React from 'react';
import BasicReservationInfoSectionComp from '../../components/modals/ReviewReservationModal/BasicReservationInfoSectionComp/BasicReservationInfoSectionComp';

import styles from './ReviewReservationModal.module.css';

import LeftArrowCircleDetailComp from '../../components/SharedUIElements/LeftArrowCircleDetailComp/LeftArrowCircleDetailComp';
import TableInformationSectionComp from '../../components/modals/ReviewReservationModal/TableInformationSectionComp/TableInformationSectionComp';
import PriceTaxSectionInfoComp from '../../components/modals/ReviewReservationModal/PriceTaxSectionInfoComp/PriceTaxSectionInfoComp';
import StripePaymentSectionComp from '../../components/modals/ReviewReservationModal/StripePaymentSectionComp/StripePaymentSectionComp';
import LowerButtonSectionComp from '../../components/modals/ReviewReservationModal/LowerButtonSectionComp/LowerButtonSectionComp';

const ReviewReservationModal = (props) => {

    return (<div className={styles.reviewReservationModalContainer}>
        <div className={styles.upperReviewReservationHeaderContainer}>
            <span style={{marginLeft: '0.8rem'}}>Review Reservation</span>
        </div>
        <div className={styles.lowerReviewReservationBodyContainer}>
            <div className={styles.backButtonRowContainer}>
                <LeftArrowCircleDetailComp></LeftArrowCircleDetailComp>
                <span className={styles.backLabelTextStyle}>back</span>
            </div>
            <BasicReservationInfoSectionComp></BasicReservationInfoSectionComp>
            <TableInformationSectionComp></TableInformationSectionComp>
            <PriceTaxSectionInfoComp></PriceTaxSectionInfoComp>
            <StripePaymentSectionComp></StripePaymentSectionComp>
            <LowerButtonSectionComp></LowerButtonSectionComp>
        </div> 
    </div>)
}

export default ReviewReservationModal;