// All information, source code contained in this document 
// is the property of StrynDev Solutions, LLC. It must not 
// be transmitted to others without the written consent of 
// StrynDev Solutions. It must be returned to StrynDev Solutions 
// when its authorized use is terminated.

import React from 'react';
import InnerWhiteTableDetailComp from './InnerWhiteTableDetailComp/InnerWhiteTableDetailComp';

import styles from './TableDateSelectionInfoComp.module.css';

const TableDateSelectionInfoComp = (props) => {

    return (<div className={styles.tableDateSelectionInfoCompContainer}>
        <div className={styles.tableHeaderRowContainer}>
            <span className={styles.tableHeaderTextLabelStyle}>Tables: </span>
        </div>
        <div className={styles.tableBlockRowContainer}>
            <InnerWhiteTableDetailComp></InnerWhiteTableDetailComp>
            <div className={styles.addTableButtonRowContainer}>
                <button className={styles.addTableButtonStyle}>add table +</button>
            </div>
            <div className={styles.selectDateRowContainer}>
                <span className={styles.selectDateLabelStyle}>Select Date: </span>
                <button className={styles.selectDateButtonStyle}>
                    <span>fri 1-14-22</span>
                </button>
            </div>
        </div>
    </div>)
}

export default TableDateSelectionInfoComp;