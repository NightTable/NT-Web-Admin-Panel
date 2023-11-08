// All information, source code contained in this document 
// is the property of StrynDev Solutions, LLC. It must not 
// be transmitted to others without the written consent of 
// StrynDev Solutions. It must be returned to StrynDev Solutions 
// when its authorized use is terminated.

import React from 'react';

import styles from './RepresentativeItemHorizComp.module.css';

import pencilPicGraphic from '../../../assets/pencilpick.png';
import xPicGraphic from '../../../assets/xpic.png';

const RepresentativeItemHorizComp = (props) => (<div className={styles.representativeItemHorizCompContainer}>
        <div className={styles.representativeItemBlockContainer}>
            <span className={styles.representativeItemTextLabelStyle}>{props.name}</span>
        </div>
        <div className={styles.representativeItemBlockContainer}>
            <span className={styles.representativeItemTextLabelStyle}>{props.username}</span>
        </div>
        <div className={styles.representativeItemBlockContainer}>
            <span className={styles.representativeItemTextLabelStyle}>{props.role}</span>
        </div>
        <div className={styles.representativeItemBlockContainer}>
            <span className={styles.representativeItemTextLabelStyle}>{props.completedTransactions}</span>
        </div>
        <div className={styles.representativeButtonItemBlockContainer}>
            <div className={styles.outerButtonContainerStyle}>
                <img className={styles.buttonIconGraphicStyle} src={pencilPicGraphic} />
                <img className={styles.buttonIconGraphicStyle}  src={xPicGraphic} />
            </div>
        </div>
    </div>);

export default RepresentativeItemHorizComp;