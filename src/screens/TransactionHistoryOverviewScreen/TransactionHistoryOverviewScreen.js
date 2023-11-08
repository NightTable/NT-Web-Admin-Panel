// All information, source code contained in this document 
// is the property of StrynDev Solutions, LLC. It must not 
// be transmitted to others without the written consent of 
// StrynDev Solutions. It must be returned to StrynDev Solutions 
// when its authorized use is terminated.

import React from 'react';
import styles from './TransactionHistoryOverviewScreen.module.css';

import TransactionElementHorizBubbleComp from '../../features/TransactionHistoryOverviewScreen/TransactionElementHorizBubbleComp/TransactionElementHorizBubbleComp';

const TransactionHistoryOverviewScreen = (props) => {

    const dummyTransactionData = [
        {
            id: 'h280ihd',
            isSelected: true,
            isNTMCustomer: true,
            customer: 'Janelle May',
            amount: 200,
            tablesPurchased: 8,
            type: 'reservation',
            date: '12:39 PM fri 1-14-22',
            action: 'p'
        },
        {
            id: 'h280ihd',
            isSelected: false,
            isNTMCustomer: false,
            customer: 'Jake Smith',
            amount: 374,
            tablesPurchased: '-',
            type: 'reservation',
            date: '8:39 PM fri 1-13-22',
            action: 'p'
        },
        {
            id: 'h280ihd',
            isSelected: false,
            isNTMCustomer: false,
            customer: 'John Nydam',
            amount: 200,
            tablesPurchased: '-',
            type: 'menu',
            date: '12:39 PM fri 1-14-22',
            action: 'p'
        }
    ];


    return (<div className={styles.transactionHistoryOverviewScreenContainer}>
        <div className={styles.topWelcomeHeaderContainer}>
            <span className={styles.upperWelcomeTextStyle}> Welcome back, Daniel</span>
        </div>
        <div className={styles.middleHeaderContainer}>
            <div className={styles.leftSideMiddleHeaderContainer}>
                <span>Transaction History</span>
            </div>
            <div className={styles.rightSideMiddleHeaderContainer}>
                <div className={styles.firstRightMiddleRowContainer}>
                    <span className={styles.filterTextStyle}>filters:</span>
                    <button className={styles.filterButtonStyle}>refund</button>
                    <button className={styles.filterButtonStyle}>purchase</button>
                </div>
                <div className={styles.secondRightMiddleRowContainer}>
                    <button className={styles.filterButtonSelectedStyle}> reservation </button>
                    <button className={styles.filterButtonStyle}> NTM Payment</button>
                    <button className={styles.filterButtonStyle}> menu </button>
                </div>
            </div>
        </div>
        <div className={styles.listCategoryHeaderContainer}>
            <div className={styles.categoryHeadingContainer}>
                <span>id</span>
            </div>
            <div className={styles.categoryHeadingContainer}>
                <span>customer</span>
            </div>
            <div className={styles.categoryHeadingContainer}>
                <span>amount</span>
            </div>
            <div className={styles.categoryHeadingContainer}>
                <span>tables purchased</span>
            </div>
            <div className={styles.categoryHeadingContainer}>
                <span>type</span>
            </div>
            <div className={styles.categoryHeadingContainer}>
                <span>date</span>
            </div>
            <div className={styles.categoryHeadingContainer}>
                <span>action</span>
            </div>
        </div>
        <div className={styles.transactionListBodyContainer}>
            {dummyTransactionData.map((transaction, index) => (
                <TransactionElementHorizBubbleComp
                    key={index}
                    transactionData={transaction} />
            ))}
        </div>
    </div>);
};

export default TransactionHistoryOverviewScreen;