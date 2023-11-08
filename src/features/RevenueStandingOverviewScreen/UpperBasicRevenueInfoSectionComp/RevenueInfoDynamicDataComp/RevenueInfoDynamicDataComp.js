// All information, source code contained in this document 
// is the property of StrynDev Solutions, LLC. It must not 
// be transmitted to others without the written consent of 
// StrynDev Solutions. It must be returned to StrynDev Solutions 
// when its authorized use is terminated.

import React from 'react';

import styles from './RevenueInfoDynamicDataComp.module.css';

const RevenueInfoDynamicDataComp = (props) => (<div className={styles.revenueInfoDynamicDataCompContainer}>
        <div className={styles.dataDisplayHeadingRowContainer}>
            <span className={styles.headingTextStyle}>The Grand Revenue Standings</span>
            {props.isProfitCut ? <><div className={styles.profitCutValueWhiteContainer}>
                <span>10%</span>
            </div>
            <span className={styles.profitCutHeadingTextStyle}>Profit Cut</span></>  : null }
        </div>
        <div className={styles.dataDisplayRowContainer}>
            <span className={styles.timeLabelTextStyle}>This week (starting 5-12-22):</span>
            <span className={styles.valueLabelTextStyle}>$23,039.32</span>
        </div>
        <div className={styles.dataDisplayRowContainer}>
            <span className={styles.timeLabelTextStyle}>This Month (may 2022):</span>
            <span className={styles.valueLabelTextStyle}>$60,034.10</span>
        </div>
        <div className={styles.dataDisplayRowContainer}>
            <span className={styles.timeLabelTextStyle}>This Year (2022):</span>
            <span className={styles.valueLabelTextStyle}>$360.034.10</span>
        </div>
    </div>);

export default RevenueInfoDynamicDataComp;