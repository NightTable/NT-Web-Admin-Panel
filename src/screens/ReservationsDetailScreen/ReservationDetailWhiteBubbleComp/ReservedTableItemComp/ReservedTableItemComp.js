// All information, source code contained in this document 
// is the property of StrynDev Solutions, LLC. It must not 
// be transmitted to others without the written consent of 
// StrynDev Solutions. It must be returned to StrynDev Solutions 
// when its authorized use is terminated.

import React from 'react';
import styles from './ReservedTableItemComp.module.css';

const ReservedTableItemComp = (props) => {

    return (<div className={styles.reservedTableItemCompContainer}>
        <div className={styles.infoDetailContainer}>
            <span>{props.tableType}</span>
        </div>
        <div className={styles.infoDetailContainer}>
            <span>fits {props.size}</span>
        </div>
        <div className={styles.infoDetailContainer}>
            <span>${props.price}</span>
        </div>
        <div className={styles.infoDetailContainer}>
            <span>{props.qty}x</span>
        </div>
    </div>)
}

export default ReservedTableItemComp;