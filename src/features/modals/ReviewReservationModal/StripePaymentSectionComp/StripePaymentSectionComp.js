// All information, source code contained in this document 
// is the property of StrynDev Solutions, LLC. It must not 
// be transmitted to others without the written consent of 
// StrynDev Solutions. It must be returned to StrynDev Solutions 
// when its authorized use is terminated.

import React from 'react';
import InnerPaymentBoxComp from './InnerPaymentBoxComp/InnerPaymentBoxComp';

import styles from './StripePaymentSectionComp.module.css';

const StripePaymentSectionComp = (props) => (<div className={styles.stripePaymentSectionCompContainer}>
        <div className={styles.paymentInformationRowHeading}>
            <span style={{marginLeft: '1rem'}}>Payment Information</span>
        </div>
        <InnerPaymentBoxComp />

    </div>);

export default StripePaymentSectionComp;