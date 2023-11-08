// All information, source code contained in this document 
// is the property of StrynDev Solutions, LLC. It must not 
// be transmitted to others without the written consent of 
// StrynDev Solutions. It must be returned to StrynDev Solutions 
// when its authorized use is terminated.

import React from 'react';

import styles from './ActiveTablesDashboardScreen.module.css';

import ActiveTableRequestListComp from '../../features/ActiveTablesDashboardScreen/ActiveTableRequestListComp';

const ActiveTablesDashboardScreen = (props) => {

    const activeTableRequests = [
        {
            id: '3893ujh',
            organizer: 'Janelle May',
            tableType: 'floor',
            requestType: 'snpl',
            taken: 4,
            available: 8,
            size: 12,
            price: 200
        },
        {
            id: '393iji',
            organizer: 'Jack Smith',
            tableType: 'standing',
            requestType: 'pnsl',
            taken: 3,
            available: 1,
            size: 4,
            price: 500
        }
    ];

    return (<div className={styles.activeTablesDashboardContainer}>
        <div className={styles.activeTablesInnerContainer}>
            <span>Active Table Requests</span>

            <div className={styles.activeRequestsHeader}>
                <div className={styles.activeRequestLabelContainer}>
                    <span className={styles.activeTableRequestLabelText}>id</span>
                </div>
                <div className={styles.activeRequestLabelContainer}>
                    <span className={styles.activeTableRequestLabelText}>organizer</span>
                </div>
                <div className={styles.activeRequestLabelContainer}>
                    <span className={styles.activeTableRequestLabelText}>table type</span>
                </div>
                <div className={styles.activeRequestLabelContainer}>
                    <span className={styles.activeTableRequestLabelText}>request type</span>
                </div>
                <div className={styles.activeRequestLabelContainer}>
                    <span className={styles.activeTableRequestLabelText}>taken</span>
                </div>
                <div className={styles.activeRequestLabelContainer}>
                    <span className={styles.activeTableRequestLabelText}>available</span>
                </div>
                <div className={styles.activeRequestLabelContainer}>
                    <span className={styles.activeTableRequestLabelText}>size</span>
                </div>
                <div className={styles.activeRequestLabelContainer}>
                    <span className={styles.activeTableRequestLabelText}>price</span>
                </div>
             </div>
             <ActiveTableRequestListComp
                tableRequests={activeTableRequests} />
        </div>
    </div>);
};

export default ActiveTablesDashboardScreen;