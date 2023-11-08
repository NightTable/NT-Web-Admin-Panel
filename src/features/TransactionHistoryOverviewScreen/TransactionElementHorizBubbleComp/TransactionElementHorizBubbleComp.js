// All information, source code contained in this document 
// is the property of StrynDev Solutions, LLC. It must not 
// be transmitted to others without the written consent of 
// StrynDev Solutions. It must be returned to StrynDev Solutions 
// when its authorized use is terminated.

import React from 'react';

import styles from './TransactionElementHorizBubbleComp.module.css';
import NTIdentifierCircleComp from '../../SharedUIElements/NTIdentifierCircleComp/NTIdentifierCircleComp';
import ArrowCircleDetailComp from '../../SharedUIElements/ArrowCircleDetailComp/ArrowCircleDetailComp';

const TransactionElementHorizBubbleComp = (props) => (<div className={ props.transactionData.isSelected ? styles.transactionElementContainerSelected : styles.transactionElementContainer}>
        <div className={styles.transactionElementHeadingContainer}>
            {props.transactionData.id}
        </div>
        <div className={styles.transactionElementHeadingContainer}>
           <span>{props.transactionData.customer}</span> 
           { props.transactionData.isNTMCustomer ? <NTIdentifierCircleComp /> : null }
        </div>
        <div className={styles.transactionElementHeadingContainer}>
            ${props.transactionData.amount}
        </div>
        <div className={styles.transactionElementHeadingContainer}>
            {props.transactionData.tablesPurchased}
        </div>
        <div className={styles.transactionElementHeadingContainer}>
            {props.transactionData.type}
        </div>
        <div className={styles.transactionElementHeadingContainer}>
            {props.transactionData.date}
        </div>
        <div className={styles.transactionElementHeadingContainer}>
            <span>{props.transactionData.action}</span>
           {props.transactionData.isSelected ? <ArrowCircleDetailComp /> : null }
        </div>
    </div>);

export default TransactionElementHorizBubbleComp;