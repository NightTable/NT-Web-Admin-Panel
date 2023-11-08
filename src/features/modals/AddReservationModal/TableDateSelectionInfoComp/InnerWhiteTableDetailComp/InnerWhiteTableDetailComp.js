// All information, source code contained in this document 
// is the property of StrynDev Solutions, LLC. It must not 
// be transmitted to others without the written consent of 
// StrynDev Solutions. It must be returned to StrynDev Solutions 
// when its authorized use is terminated.

import React from 'react';

import styles from './InnerWhiteTableDetailComp.module.css';

import greenCheckmarkGraphic from '../../../../../assets/greencheckmark.png';

const InnerWhiteTableDetailComp = (props) => (<div className={styles.innerWhiteTableDetailCompContainer}>
        <div className={styles.inputRowContainer}>
            <span className={styles.inputLabelTextStyle}>type: </span>
            <button className={styles.selectButtonStyle}>
                <span>select</span>
            </button>
        </div>
        <div className={styles.inputRowContainer}>
            <span className={styles.inputLabelTextStyle}>size:</span>
            <span className={styles.labelValueStyleText}>9</span>
        </div>
        <div className={styles.inputRowContainer}>
            <span className={styles.inputLabelTextStyle}>price: </span>
            <span className={styles.labelValueStyleText}>$12.99</span>
        </div>
        <div className={styles.inputRowSpaceBetweenContainer}>
            <div className={styles.quantityButtonInnerContainer}>
                <span className={styles.inputLabelTextStyle}>qty</span>
                <button className={styles.quantityButtonStyle}>
                    <span>1</span>
                </button>
            </div>
            <div className={styles.greenCheckmarkContainer}>
                <img 
                    src={greenCheckmarkGraphic}
                    className={styles.greenCheckmarkImage} />
            </div>
        </div>
    </div>);

export default InnerWhiteTableDetailComp;