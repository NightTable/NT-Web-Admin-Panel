// All information, source code contained in this document 
// is the property of StrynDev Solutions, LLC. It must not 
// be transmitted to others without the written consent of 
// StrynDev Solutions. It must be returned to StrynDev Solutions 
// when its authorized use is terminated.

import React from 'react';

import styles from './LowerRevenueDataSectionComp.module.css';
import RevenueHorizDataComp from './RevenueHorizDataComp/RevenueHorizDataComp';

const LowerRevenueDataSectionComp = (props) => {

    const dummyRevenueDataPoints = [
        {
            day: 'fri 1-15-22',
            revenue: 'MA',
            numTransactions: 160
        },
        {
            day: 'thurs 1-15-22',
            revenue: 'FL',
            numTransactions: 50
        },
        {
            day: 'wed 1-13-22',
            revenue: 'NV',
            numTransactions: 20
        }
    ];

    return (<div className={styles.lowerRevenueDataSectionCompContainer}>
        <div className={styles.outerLowerCategoryRowHeaderContainer}>
            <div className={styles.leftSideMenuCategoryContainer}>
                <div className={styles.categoryNameDividerContainer}>
                    <span>Day</span>
                </div>
                <div className={styles.categoryNameDividerContainer}>
                    <span>Revenue</span>
                </div>
                <div className={styles.categoryNameDividerContainer}>
                    <span># Transactions</span>
                </div>
            </div>
            <div className={styles.rightSideMenuCategoryContainer}>
                <button className={styles.filledInPurpleButtonStyle}>
                    <span>by day</span>
                </button>
                <button className={styles.whiteButtonStyle}>
                    <span>by month</span>
                </button>
                <button className={styles.whiteButtonStyle}>
                    <span>by year</span>
                </button>
            </div>
        </div>
        {dummyRevenueDataPoints.map((revenueDataPoint, index) => (

            <RevenueHorizDataComp
                key={index}
                day={revenueDataPoint.day}
                revenue={revenueDataPoint.revenue}
                numTransactions={revenueDataPoint.numTransactions} />
        ))}
    </div>);
};

export default LowerRevenueDataSectionComp;