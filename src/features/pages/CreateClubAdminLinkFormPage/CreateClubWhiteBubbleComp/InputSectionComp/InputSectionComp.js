// All information, source code contained in this document 
// is the property of StrynDev Solutions, LLC. It must not 
// be transmitted to others without the written consent of 
// StrynDev Solutions. It must be returned to StrynDev Solutions 
// when its authorized use is terminated.

import React from 'react';
import InputDetailHorizComp from './InputDetailHorizComp/InputDetailHorizComp';

import styles from './InputSectionComp.module.css';

const InputSectionComp = (props) => (<div className={styles.inputSectionCompContainer}>
        <InputDetailHorizComp
            labelInfoOne='first name'
            labelInfoTwo='last name' />
        <InputDetailHorizComp
            labelInfoOne='username'
            labelInfoTwo='password' />
        <InputDetailHorizComp
            labelInfoOne='phone number'
            labelInfoTwo='email' />
        <div className={styles.buttonRowContainer}>
            <button className={styles.createAccountButtonStyle}>
                <span>Create account</span>
            </button>
        </div>
    </div>);

export default InputSectionComp;