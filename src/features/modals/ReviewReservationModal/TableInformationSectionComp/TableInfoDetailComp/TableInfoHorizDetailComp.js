// All information, source code contained in this document 
// is the property of StrynDev Solutions, LLC. It must not 
// be transmitted to others without the written consent of 
// StrynDev Solutions. It must be returned to StrynDev Solutions 
// when its authorized use is terminated.

import React from 'react';

import styles from './TableInfoHorizDetailComp.module.css';

const TableInfoHorizDetailComp = (props) => (<div className={styles.tableInfoHorizDetailCompContainer}>
        <div className={styles.tableInfoDivisionContainer}>
            <span>{props.type}</span>
        </div>
        <div className={styles.tableInfoDivisionContainer}>
            <span>fits {props.recommendedCapacity}</span>
        </div>
        <div className={styles.tableInfoDivisionContainer}>
            <span>${props.price}</span>
        </div>
        <div className={styles.tableInfoDivisionContainer}>
            <span>{props.qty}x</span>
        </div>
    </div>);

export default TableInfoHorizDetailComp;