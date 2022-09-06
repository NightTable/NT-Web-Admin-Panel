// All information, source code contained in this document 
// is the property of StrynDev Solutions, LLC. It must not 
// be transmitted to others without the written consent of 
// StrynDev Solutions. It must be returned to StrynDev Solutions 
// when its authorized use is terminated.

import React from 'react';

import styles from './ChildMenuItemSizeComp.module.css';

const ChildMenuItemSizeComp = (props) => {

    return (<div className={styles.childMenuItemSizeCompContainer}>
        <div className={styles.childMenuItemSizeBlockContainer}>
            <span>{props.childData.sizeName}</span>
        </div>
        <div className={styles.childMenuItemSizeBlockContainer}>
            <span>${props.childData.price}</span>
        </div>
    </div>)
}

export default ChildMenuItemSizeComp;