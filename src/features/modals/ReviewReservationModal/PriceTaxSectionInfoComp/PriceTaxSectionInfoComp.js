// All information, source code contained in this document 
// is the property of StrynDev Solutions, LLC. It must not 
// be transmitted to others without the written consent of 
// StrynDev Solutions. It must be returned to StrynDev Solutions 
// when its authorized use is terminated.

import React from 'react';

import styles from './PriceTaxSectionInfoComp.module.css';

const PriceTaxSectionInfoComp = (props) => (<div className={styles.priceTaxSectionInfoCompContainer}>
        <div className={styles.priceDivisionRowContainer}>
            <span className={styles.priceInfoLabelStyle}>Subtotal: </span>
            <span className={styles.priceInfoValueStyle}>$353</span>
        </div>
        <div className={styles.priceDivisionRowContainer}>
            <span className={styles.priceInfoLabelStyle}>Tax:</span>
            <span className={styles.priceInfoValueStyle}>$22.06</span>
        </div>
        <div className={styles.priceDivisionTotalInfoRowContainer}>
            <span className={styles.priceInfoTotalLabelStyle}>Total: </span>
            <span className={styles.priceInfoTotalValueStyle}>$375.06</span>
        </div>
    </div>);

export default PriceTaxSectionInfoComp;