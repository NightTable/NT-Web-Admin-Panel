// All information, source code contained in this document 
// is the property of StrynDev Solutions, LLC. It must not 
// be transmitted to others without the written consent of 
// StrynDev Solutions. It must be returned to StrynDev Solutions 
// when its authorized use is terminated.

import React from 'react';

import styles from './BiddingTableConfigSectionComp.module.css';
import TableIdentifierInnerSectionComp from './TableIdentifierInnerSectionComp/TableIdentifierInnerSectionComp';

const BiddingTableConfigSectionComp = (props) => {

    return (<div className={styles.biddingTableConfigSectionCompContainer}>
        <div className={styles.tableConfigRowContainer}>
            <span>Floor</span>
        </div>
        <TableIdentifierInnerSectionComp
            tableIdentifierData={props.bidObject.tableIdentifiers}></TableIdentifierInnerSectionComp>
    </div>)
}

export default BiddingTableConfigSectionComp;