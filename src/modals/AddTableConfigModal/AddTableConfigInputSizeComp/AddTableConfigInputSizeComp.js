// All information, source code contained in this document 
// is the property of StrynDev Solutions, LLC. It must not 
// be transmitted to others without the written consent of 
// StrynDev Solutions. It must be returned to StrynDev Solutions 
// when its authorized use is terminated.

import React from 'react';
import styles from './AddTableConfigInputSizeComp.module.css';
import checkmark from '../../../../src/assets/checkmark.png'

const AddTableConfigInputSizeComp = (props) => {

    return (<div className={styles.mainTableConfigInputCompContainer}>
        <span className={styles.labelInputStyle}>{props.labelName}</span>
        <input className={styles.mainTableConfigInputElementStyle}>
        </input>
            {props.showButton ? <img className={styles.checkmarkSpecs} src={checkmark}/>: null}
    </div>)
}

export default AddTableConfigInputSizeComp;