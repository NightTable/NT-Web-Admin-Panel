// All information, source code contained in this document 
// is the property of StrynDev Solutions, LLC. It must not 
// be transmitted to others without the written consent of 
// StrynDev Solutions. It must be returned to StrynDev Solutions 
// when its authorized use is terminated.

import React from 'react';

import styles from './InputDetailHorizComp.module.css';

const InputDetailHorizComp = (props) => (<div className={styles.inputDetailHorizCompContainer}>
        <div className={styles.innerInputRowContainer}>
            <label style={{fontSize: '0.9rem'}}>{props.labelInfoOne}:</label>
            <input className={styles.clubInfoInputStyle} />
        </div>
        <div className={styles.innerInputRowContainer}>
            <label style={{fontSize: '0.9rem'}}>{props.labelInfoTwo}:</label>
            <input
                type={props.labelInfoTwo === 'password' ? 'password' : 'text'}
                className={styles.clubInfoInputStyle} />
        </div>
    </div>);

export default InputDetailHorizComp;