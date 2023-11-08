// All information, source code contained in this document 
// is the property of StrynDev Solutions, LLC. It must not 
// be transmitted to others without the written consent of 
// StrynDev Solutions. It must be returned to StrynDev Solutions 
// when its authorized use is terminated.

import React from 'react';
import styles from './LeftArrowCircleDetailComp.module.css';

import rightArrowPic from '../../../assets/rightarrowpurple.svg';

const LeftArrowCircleDetailComp = (props) => (<div className={styles.leftArrowCircleDetailContainer}>
        <img className={styles.leftArrowImageStyle} src={rightArrowPic} />
    </div>);

export default LeftArrowCircleDetailComp;