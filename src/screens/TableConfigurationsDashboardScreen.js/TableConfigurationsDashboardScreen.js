// All information, source code contained in this document 
// is the property of StrynDev Solutions, LLC. It must not 
// be transmitted to others without the written consent of 
// StrynDev Solutions. It must be returned to StrynDev Solutions 
// when its authorized use is terminated.

import React from 'react';
import styles from './TableConfigurationsDashboardScreen.module.css';
import TableConfigRequestListComp from '../../features/TableConfigurationsDashboardScreen/TableConfigRequestListComp';
const TableConfigurationsDashboardScreen = (props) => {
    let tableConfigRequests = [
        {
            tableType: "floor",
            people: 12,
            price: 200
        },
        {
            tableType: "standing",
            people: 4,
            price: 500
        },
        {
            tableType: "dj",
            people: 10,
            price: 500
        }
    ]

    return (
    <div className={styles.tableConfigDashboardContainer}>
        <div className={styles.tableConfigInnerContainer}>
            <span>Table Price Configurations</span>

            <div className={styles.tableConfigHeader}>
                <div className={styles.tableConfigLabelContainer}>
                    <span className={styles.tableConfigLabelText}>Name (Type)</span>
                </div>
                <div className={styles.tableConfigLabelMiddleContainer}>
                    <span className={styles.tableConfigLabelText}>price</span>
                </div>
                <div className={styles.tableConfigLabelEndContainer}>
                    <span className={styles.tableConfigLabelText}># of people</span>
                </div>


             </div>
             <TableConfigRequestListComp
                configRequests={tableConfigRequests}>
            </TableConfigRequestListComp>
        </div>
        <div className={styles.addTableConfigButtonContainer}>
                <button onClick={props.onTableConfigButtonPress} className={styles.addTableConfigButtonStyle}>Add Table</button>
        </div>

    </div>)
}

export default TableConfigurationsDashboardScreen;