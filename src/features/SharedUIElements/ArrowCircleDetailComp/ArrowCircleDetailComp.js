// All information, source code contained in this document 
// is the property of StrynDev Solutions, LLC. It must not 
// be transmitted to others without the written consent of 
// StrynDev Solutions. It must be returned to StrynDev Solutions 
// when its authorized use is terminated.

import React from 'react';
import styles from './ArrowCircleDetailComp.module.css';

import rightArrowPic from '../../../assets/rightarrowpurple.svg';

const ArrowCircleDetailComp = (props) => (<div className={styles.arrowCircleDetailContainer}>
        <img className={styles.arrowImageStyle} src={rightArrowPic} />
    </div>);

export default ArrowCircleDetailComp;