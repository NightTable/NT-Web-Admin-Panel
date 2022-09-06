// All information, source code contained in this document 
// is the property of StrynDev Solutions, LLC. It must not 
// be transmitted to others without the written consent of 
// StrynDev Solutions. It must be returned to StrynDev Solutions 
// when its authorized use is terminated.

import React from 'react';

import styles from './RevenueHorizDataComp.module.css';

const RevenueHorizDataComp = (props) => {

    return (<div className={styles.revenueHorizDataCompContainer}>
        <div className={styles.innerLeftSideContainer}>
            <div className={styles.revenueHorizDataContainer}>
                <span>{props.day}</span>
            </div>
            <div className={styles.revenueHorizDataContainer}>
                <span>{props.revenue}</span>
            </div>
            <div className={styles.revenueHorizDataContainer}>
                <span>{props.numTransactions}</span>
            </div>
        </div>
    </div>)
}

export default RevenueHorizDataComp;