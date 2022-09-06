// All information, source code contained in this document 
// is the property of StrynDev Solutions, LLC. It must not 
// be transmitted to others without the written consent of 
// StrynDev Solutions. It must be returned to StrynDev Solutions 
// when its authorized use is terminated.

import React from 'react';

import styles from './BidderChildHorizComp.module.css';

const BidderChildHorizComp = (props) => {

    return (<div className={styles.bidderChildHorizCompContainer}>
        <div className={styles.bidderChildBlockContainerStyle}>
            <span>{props.bidderData.name}</span>
        </div>
        <div className={styles.bidderChildBlockContainerStyle}>
            <span>${props.bidderData.bidAmount}</span>
        </div>
        <div className={styles.bidderChildBlockContainerStyle}>
            <span>-</span>
        </div>
        <div className={styles.bidderChildBlockContainerStyle}>
            <span>-</span>
        </div>
        <div className={styles.bidderChildBlockContainerStyle}>
            <span>-</span>
        </div>
    </div>)
}

export default BidderChildHorizComp;