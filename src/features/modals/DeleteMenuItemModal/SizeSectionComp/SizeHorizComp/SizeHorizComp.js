// All information, source code contained in this document 
// is the property of StrynDev Solutions, LLC. It must not 
// be transmitted to others without the written consent of 
// StrynDev Solutions. It must be returned to StrynDev Solutions 
// when its authorized use is terminated.

import React from 'react';

import styles from './SizeHorizComp.module.css';

const SizeHorizComp = (props) => (<div className={styles.sizeHorizCompContainer}>
        <div className={styles.textDividerStyle}>
            <span>{props.size}</span>
        </div>
        <div className={styles.textDividerStyle}>
            <span>${props.price}</span>
        </div>
    </div>);

export default SizeHorizComp;