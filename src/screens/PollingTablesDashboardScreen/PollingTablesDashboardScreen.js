// All information, source code contained in this document 
// is the property of StrynDev Solutions, LLC. It must not 
// be transmitted to others without the written consent of 
// StrynDev Solutions. It must be returned to StrynDev Solutions 
// when its authorized use is terminated.

import React from 'react';

import styles from './PollingTablesDashboardScreen.module.css';

import ActiveTableRequestListComp from '../../components/ActiveTablesDashboardScreen/ActiveTableRequestListComp';

const PollingTablesDashboardScreen = (props) => {

    let pollingTableRequests = [
        {
            id: '3893ujh',
            organizer: "Janelle May",
            tableType: "floor",
            requestType: "snpl",
            taken: 4,
            available: 8,
            size: 12,
            price: 200
        },
        {
            id: '393iji',
            organizer: "Jack Smith",
            tableType: "standing",
            requestType: "pnsl",
            taken: 3,
            available: 1,
            size: 4,
            price: 500
        }
    ]

    return (<div className={styles.pollingTablesDashboardContainer}>
        <div className={styles.pollingTablesInnerContainer}>
            <span>Polling Table Requests</span>

            <div className={styles.pollingRequestsHeader}>
                <div className={styles.pollingRequestLabelContainer}>
                    <span className={styles.pollingTableRequestLabelText}>id</span>
                </div>
                <div className={styles.pollingRequestLabelContainer}>
                    <span className={styles.pollingTableRequestLabelText}>organizer</span>
                </div>
                <div className={styles.pollingRequestLabelContainer}>
                    <span className={styles.pollingTableRequestLabelText}>table type</span>
                </div>
                <div className={styles.pollingRequestLabelContainer}>
                    <span className={styles.pollingTableRequestLabelText}>request type</span>
                </div>
                <div className={styles.pollingRequestLabelContainer}>
                    <span className={styles.pollingTableRequestLabelText}>taken</span>
                </div>
                <div className={styles.pollingRequestLabelContainer}>
                    <span className={styles.pollingTableRequestLabelText}>available</span>
                </div>
                <div className={styles.pollingRequestLabelContainer}>
                    <span className={styles.pollingTableRequestLabelText}>size</span>
                </div>
                <div className={styles.pollingRequestLabelContainer}>
                    <span className={styles.pollingTableRequestLabelText}>price</span>
                </div>
             </div>
             <ActiveTableRequestListComp
                tableRequests={pollingTableRequests}></ActiveTableRequestListComp>
        </div>
    </div>)
}

export default PollingTablesDashboardScreen;