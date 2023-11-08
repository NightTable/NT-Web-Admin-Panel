// All information, source code contained in this document 
// is the property of StrynDev Solutions, LLC. It must not 
// be transmitted to others without the written consent of 
// StrynDev Solutions. It must be returned to StrynDev Solutions 
// when its authorized use is terminated.

import React from 'react';
import TableInfoHorizDetailComp from './TableInfoDetailComp/TableInfoHorizDetailComp';

import styles from './TableInformationSectionComp.module.css';

const TableInformationSectionComp = (props) => {

    const dummyTableInformation = [
        {
            type: 'floor', 
            recommendedCapacity: 8,
            price: 103,
            qty: 2
        },
        {
            type: 'floor',
            recommendedCapacity: 13,
            price: 200,
            qty: 5
        },
        {
            type: 'standing',
            recommendedCapacity: 5,
            price: 50,
            qty: 1
        }
    ];

    return (<div className={styles.tableInformationSectionCompContainer}>
        <div className={styles.tableLabelRowContainer}>
            <span style={{marginLeft: '1rem'}}>Tables:</span>
        </div>
        {dummyTableInformation.map((tableInfo) => (
            <TableInfoHorizDetailComp
                type={tableInfo.type}
                recommendedCapacity={tableInfo.recommendedCapacity}
                price={tableInfo.price}
                qty={tableInfo.qty} />
        ))}

    </div>);
};

export default TableInformationSectionComp;