// All information, source code contained in this document 
// is the property of StrynDev Solutions, LLC. It must not 
// be transmitted to others without the written consent of 
// StrynDev Solutions. It must be returned to StrynDev Solutions 
// when its authorized use is terminated.

import React from 'react';

import styles from './LowerButtonSectionComp.module.css';

const LowerButtonSectionComp = (props) => {

    return (<div className={styles.lowerButtonSectionCompContainer}>
        <button className={styles.reviewReservationCancelButtonStyle}>cancel</button>
        <button className={styles.reviewReservationSubmitPaymentButtonStyle}>submit payment</button>
    </div>)
}

export default LowerButtonSectionComp;