// All information, source code contained in this document 
// is the property of StrynDev Solutions, LLC. It must not 
// be transmitted to others without the written consent of 
// StrynDev Solutions. It must be returned to StrynDev Solutions 
// when its authorized use is terminated.

import React from 'react';

import styles from './LoginScreenLayout.module.css';
import whiteCurveSmallPic from '../assets/whitecurvesmall.png';

const LoginScreenLayout = (props) => {

    return (<div className={styles.screenContainer}>
        <div className={styles.innerScreenContainer}>
            <div className={styles.purpleHeader}>
                <p className={styles.headerText}>NightTable Admin</p>
            </div>
            <div className={styles.purpleAuthBox}>
                <div className={styles.formBox}>
                    <div className={styles.innerFormInputContainer}>
                        <p className={styles.formLabel}>username</p>
                        <input className={styles.formInput}></input>
                        <span className={styles.formLabel}>password</span>
                        <input type="password" className={styles.formInput}></input>
                    </div>
                </div>
                <div className={styles.issueBox}>
                    <div className={styles.whiteCurveImageContainer}>
                            <img 
                                className={styles.whiteCurveImage} 
                                src={whiteCurveSmallPic}></img>
                    </div>
                    <button className={styles.reportIssueButton}>Report an issue</button>
                </div>
            </div>
            <div className={styles.lowerButtonContainer}>
                <button className={styles.loginButton}>login</button>
                <button className={styles.passwordButton}>Forgot password?</button>
            </div>
        </div>
    </div>)

};

export default LoginScreenLayout;