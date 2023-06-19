// All information, source code contained in this document 
// is the property of StrynDev Solutions, LLC. It must not 
// be transmitted to others without the written consent of 
// StrynDev Solutions. It must be returned to StrynDev Solutions 
// when its authorized use is terminated.

import React from 'react';

import styles from './RequestHorizComp.module.css'
const RequestHorizComp = (props) => {

    return (<div className={styles.requestHorizCompContainer}>
        <div className={styles.requestHorizSectionContainer}>
            <span>{props.requestObj.id}</span>
        </div>
        <div className={styles.requestHorizSectionContainer}>
            <span>{props.requestObj.organizer}</span>
        </div>
        <div className={styles.requestHorizSectionContainer}>
            <span>{props.requestObj.tableType}</span>
        </div>
        <div className={styles.requestHorizSectionContainer}>
            <span>{props.requestObj.requestType}</span>
        </div>
        <div className={styles.requestHorizSectionContainer}>
            <span className={styles.redText}>{props.requestObj.taken}</span>
        </div>
        <div className={styles.requestHorizSectionContainer}>
            <span className={styles.greenText}>{props.requestObj.available}</span>
        </div>
        <div className={styles.requestHorizSectionContainer}>
            <span>{props.requestObj.size}</span>
        </div>
        <div className={styles.requestHorizSectionContainer}>
            <span className={styles.purpleText}>${props.requestObj.price}</span>
        </div>
    </div>)
}

export default RequestHorizComp;

