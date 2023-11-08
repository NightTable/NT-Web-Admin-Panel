// All information, source code contained in this document 
// is the property of StrynDev Solutions, LLC. It must not 
// be transmitted to others without the written consent of 
// StrynDev Solutions. It must be returned to StrynDev Solutions 
// when its authorized use is terminated.

import React from 'react';
import styles from './AddTableConfigInputComp.module.css';


const AddTableConfigInputComp = (props) => (<div className={styles.mainTableConfigInputCompContainer}>
        <span className={styles.labelInputStyle}>{props.labelName}</span>
        <input className={styles.mainTableConfigInputElementStyle} />
    </div>);

export default AddTableConfigInputComp;