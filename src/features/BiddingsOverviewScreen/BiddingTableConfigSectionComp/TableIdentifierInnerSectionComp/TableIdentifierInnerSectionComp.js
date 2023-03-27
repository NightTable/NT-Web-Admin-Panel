// All information, source code contained in this document 
// is the property of StrynDev Solutions, LLC. It must not 
// be transmitted to others without the written consent of 
// StrynDev Solutions. It must be returned to StrynDev Solutions 
// when its authorized use is terminated.

import React from 'react';
import ExpandableBiddingHorizComp from './ExpandableBiddingHorizComp/ExpandableBiddingHorizComp';

import styles from './TableIdentifierInnerSectionComp.module.css';

const TableIdentifierInnerSectionComp = (props) => {

    const localTableIdentifiers = props.tableIdentifierData; 

    return (<div className={styles.tableIdentifierInnerSectionCompContainer}>
        <div className={styles.tableIdentifierCategoryRowContainer}>
            <div className={styles.tableIdentifierCategoryBlockContainer}>
                <span>table identifier</span>
            </div>
            <div className={styles.tableIdentifierCategoryBlockContainer}>
                <span>bidder</span>
            </div>
            <div className={styles.tableIdentifierCategoryBlockContainer}>
                <span>current bid amount</span>
            </div>
            <div className={styles.tableIdentifierCategoryBlockContainer}>
                <span># bids</span>
            </div>
            <div className={styles.tableIdentifierCategoryBlockContainer}>
                <span>table type</span>
            </div>
            <div className={styles.tableIdentifierCategoryBlockContainer}>
                <span>date</span>
            </div>
        </div>
        {localTableIdentifiers.map((tableIdentifier, index) => (
            <ExpandableBiddingHorizComp
                identifierObject={tableIdentifier}
                key={index}></ExpandableBiddingHorizComp>
        ))}
    </div>)
}

export default TableIdentifierInnerSectionComp;