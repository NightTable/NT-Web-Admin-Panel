// All information, source code contained in this document 
// is the property of StrynDev Solutions, LLC. It must not 
// be transmitted to others without the written consent of 
// StrynDev Solutions. It must be returned to StrynDev Solutions 
// when its authorized use is terminated.

import React from 'react';

import styles from './ReservationChildHorizComp.module.css';

const ReservationChildHorizComp = (props) => (<div className={styles.reservationChildHorizCompContainer}>
        <div className={styles.reservationBlockChildContainer}>
            <span>{props.tableConfigData.tableType}</span>
        </div>
        <div className={styles.reservationBlockChildContainer}>
            <span>{props.tableConfigData.tableSize}</span>
        </div>
    </div>);

export default ReservationChildHorizComp;