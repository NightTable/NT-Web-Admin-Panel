// All information, source code contained in this document 
// is the property of StrynDev Solutions, LLC. It must not 
// be transmitted to others without the written consent of 
// StrynDev Solutions. It must be returned to StrynDev Solutions 
// when its authorized use is terminated.

import React from 'react';

import styles from './PaginationButtonSectionComp.module.css';

import rightPurpleArrowGraphic from '../../../assets/rightarrowpurple.svg';

const PaginationButtonSectionComp = (props) => (<div className={styles.paginationButtonSectionCompContainer}>
        <button className={styles.leftWhitePageArrowButtonStyle}>
            <img style={{height: '80%', transform: 'rotate(180deg)'}} src={rightPurpleArrowGraphic} />
        </button>
        <span className={styles.pageLabelTextStyle}>0</span>
        <button className={styles.whitePageArrowButtonStyle}>
            <img style={{height: '80%'}} src={rightPurpleArrowGraphic} />
        </button>
    </div>);

export default PaginationButtonSectionComp;