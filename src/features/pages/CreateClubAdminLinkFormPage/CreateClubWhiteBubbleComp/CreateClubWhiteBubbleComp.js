// All information, source code contained in this document 
// is the property of StrynDev Solutions, LLC. It must not 
// be transmitted to others without the written consent of 
// StrynDev Solutions. It must be returned to StrynDev Solutions 
// when its authorized use is terminated.

import React from 'react';

import styles from './CreateClubWhiteBubbleComp.module.css';

import ClubDescriptionSectionComp from './ClubDescriptionSectionComp/ClubDescriptionSectionComp';
import InputSectionComp from './InputSectionComp/InputSectionComp';

const CreateClubWhiteBubbleComp = (props) => (<div className={styles.createClubWhiteBubbleCompContainer}>
        <ClubDescriptionSectionComp />
        <InputSectionComp />
    </div>);

export default CreateClubWhiteBubbleComp;