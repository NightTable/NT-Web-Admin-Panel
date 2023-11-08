// All information, source code contained in this document 
// is the property of StrynDev Solutions, LLC. It must not 
// be transmitted to others without the written consent of 
// StrynDev Solutions. It must be returned to StrynDev Solutions 
// when its authorized use is terminated.


import React from 'react';

import styles from './AddTableConfigModal.module.css';
import AddTableConfigInputComp from './AddTableConfigInputComp/AddTableConfigInputComp';
import AddTableConfigInputSizeComp from './AddTableConfigInputSizeComp/AddTableConfigInputSizeComp';

const AddTableConfigModal = (props) => (<div className={styles.addTableConfigModalContainer}>
        <div className={styles.upperHeaderContainer}>
            <span className={styles.addTableConfigLabelContainer}>Add a table configuration</span>
        </div>
        <div className={styles.mainBodyContainer}>
            <AddTableConfigInputComp
                labelName='type:' />
            <div className={styles.sizeLabelStyle}>
                <span className={styles.labelInputStyle}>sizes:</span>
            </div>
            <div className={styles.priceSizeContainer}>
                <AddTableConfigInputSizeComp
                    labelName='price: '
                    showButton={false} />
                <AddTableConfigInputSizeComp
                    labelName='size: '
                    showButton />
            </div>
            <AddTableConfigInputComp
                labelName='max # of tables:' />
        </div>
        <div className={styles.lowerButtonRowContainer}>
            <button onClick={props.onCancelButtonClick} className={styles.cancelButtonStyle}>
                cancel
            </button> 
            <button className={styles.addButtonStyle}>
                add
            </button>
        </div>
    </div>);

export default AddTableConfigModal;