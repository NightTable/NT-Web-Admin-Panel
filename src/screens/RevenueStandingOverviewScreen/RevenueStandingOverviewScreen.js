// All information, source code contained in this document 
// is the property of StrynDev Solutions, LLC. It must not 
// be transmitted to others without the written consent of 
// StrynDev Solutions. It must be returned to StrynDev Solutions 
// when its authorized use is terminated.

import React from 'react';

import styles from './RevenueStandingOverviewScreen.module.css';

import UpperBasicRevenueInfoSectionComp from '../../features/RevenueStandingOverviewScreen/UpperBasicRevenueInfoSectionComp/UpperBasicRevenueInfoSectionComp';
import LowerRevenueDataSectionComp from '../../features/RevenueStandingOverviewScreen/LowerRevenueDataSectionComp/LowerRevenueDataSectionComp';
import PaginationButtonSectionComp from '../../features/RevenueStandingOverviewScreen/PaginationButtonSectionComp/PaginationButtonSectionComp';

const RevenueStandingOverviewScreen = (props) => {

    return (<div className={styles.revenueStandingOverviewScreenContainer}>
        <div className={styles.welcomeHeaderRowContainer}>
            <span className={styles.revenueStandingUpperWelcomeStyle}>Welcome back, John</span>
        </div>
        <div className={styles.clubSelectionRowContainer}>
            <button className={styles.whitePinkButtonStyle}>
                <span>overall revenue</span>
            </button>
            <span style={{marginRight: '0.5rem'}}>select club:</span>
            <button className={styles.whitePinkButtonStyle}>
                <span>the grand</span>
            </button>
        </div>
        <UpperBasicRevenueInfoSectionComp></UpperBasicRevenueInfoSectionComp>
        <LowerRevenueDataSectionComp></LowerRevenueDataSectionComp>
        <PaginationButtonSectionComp></PaginationButtonSectionComp>
    </div>)
}

export default RevenueStandingOverviewScreen;