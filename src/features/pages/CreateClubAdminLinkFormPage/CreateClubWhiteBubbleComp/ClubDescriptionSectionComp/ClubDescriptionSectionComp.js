// All information, source code contained in this document 
// is the property of StrynDev Solutions, LLC. It must not 
// be transmitted to others without the written consent of 
// StrynDev Solutions. It must be returned to StrynDev Solutions 
// when its authorized use is terminated.

import React from 'react';

import styles from './ClubDescriptionSectionComp.module.css';

const ClubDescriptionSectionComp = (props) => {

    return (<div className={styles.clubDescriptionSectionCompContainer}>
        <div className={styles.createClubAccountRowContainer}>
            <span className={styles.createClubAdminTextHeadingStyle}>Create Club Admin Account</span>
        </div>
        <div className={styles.createClubAccountDescriptionContainer}>
            <span className={styles.clubHeadingDescriptionTextStyle}>
                Thank you for choosing NightTable! Please enter in the required 
                information so that we can create an account for you. Once
                created, you can login at www.admin.nighttable.co to
                view information about your club.
            </span>
        </div>
        <div className={styles.clubLabelRowContainer}>
            <span>club: </span>
        </div>
        <div className={styles.innerClubInfoBoxContainer}>
            <div className={styles.innerInfoRowContainer}>
                <span className={styles.labelTextStyle}>name:</span>
                <span className={styles.valueTextStyle}>bijou</span>
            </div>
            <div className={styles.innerInfoRowContainer}>
                <span className={styles.labelTextStyle}>address:</span>
                <span className={styles.valueTextStyle}>34 Path Street, Boston, MA</span>
            </div>
        </div>
    </div>)
}

export default ClubDescriptionSectionComp;