// All information, source code contained in this document 
// is the property of StrynDev Solutions, LLC. It must not 
// be transmitted to others without the written consent of 
// StrynDev Solutions. It must be returned to StrynDev Solutions 
// when its authorized use is terminated.

import React from 'react';
import SettingsWhiteBubbleComp from '../../features/SettingsDashboardScreen/SettingsWhiteBubbleComp/SettingsWhiteBubbleComp';

import styles from './SettingsDashboardScreen.module.css';

const SettingsDashboardScreen = (props) => {


    return (<div className={styles.settingsDashboardScreenContainer}>
        <div className={styles.upperHeaderRowContainer}>
            <span className={styles.welcomeBackText}>Welcome back, Daniel</span>
        </div>
        <div className={styles.settingsOverviewRowLabelContainer}>
            <div className={styles.settingsLabelContainer}>
                <span className={styles.settingsLabelTextStyle}>Settings</span>
            </div>
            <div className={styles.reportIssueButtonContainer}>
                <button className={styles.reportIssueButtonStyle}>
                    <span>Report an issue</span>
                </button>
            </div>
        </div>
        <SettingsWhiteBubbleComp></SettingsWhiteBubbleComp>
    </div>)
}

export default SettingsDashboardScreen;