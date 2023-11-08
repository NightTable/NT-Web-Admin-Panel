// All information, source code contained in this document 
// is the property of StrynDev Solutions, LLC. It must not 
// be transmitted to others without the written consent of 
// StrynDev Solutions. It must be returned to StrynDev Solutions 
// when its authorized use is terminated.

import React from 'react';

import styles from './ActiveTableRequestListComp.module.css';
import RequestHorizComp from './ActiveTableRequestListComp/RequestHorizComp';

const ActiveTableRequestListComp = (props) => (<div className={styles.activeTableRequestListCompContainer}>
        {props.tableRequests.map((tableReq, index) => (
            <RequestHorizComp
                key={index}
                requestObj={tableReq} />
        ))}
    </div>);

export default ActiveTableRequestListComp;