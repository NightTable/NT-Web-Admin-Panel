// All information, source code contained in this document 
// is the property of StrynDev Solutions, LLC. It must not 
// be transmitted to others without the written consent of 
// StrynDev Solutions. It must be returned to StrynDev Solutions 
// when its authorized use is terminated.

import React from 'react';

import styles from './TableConfigRequestListComp.module.css';
import TableConfigHorizComp from './TableConfigurationsRequestListComp/TableConfigHorizComp';
const TableConfigRequestListComp = (props) => {


    return (<div className={styles.tableConfigRequestListCompContainer}>
        {props.configRequests.map((tableReq, index) => (
            <TableConfigHorizComp
                key={index}
                requestObj={tableReq}></TableConfigHorizComp>
        ))}
    </div>)
}

export default TableConfigRequestListComp;