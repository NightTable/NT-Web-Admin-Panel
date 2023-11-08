// All information, source code contained in this document 
// is the property of StrynDev Solutions, LLC. It must not 
// be transmitted to others without the written consent of 
// StrynDev Solutions. It must be returned to StrynDev Solutions 
// when its authorized use is terminated.

import React from 'react';
import RevenueInfoDynamicDataComp from './RevenueInfoDynamicDataComp/RevenueInfoDynamicDataComp';

import styles from './UpperBasicRevenueInfoSectionComp.module.css';

const UpperBasicRevenueInfoSectionComp = (props) => (<div className={styles.upperBasicRevenueInfoSectionCompContainer}>
        <RevenueInfoDynamicDataComp
            isProfitCut={false} />
        <RevenueInfoDynamicDataComp
            isProfitCut />
    </div>);

export default UpperBasicRevenueInfoSectionComp;