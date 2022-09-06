// All information, source code contained in this document 
// is the property of StrynDev Solutions, LLC. It must not 
// be transmitted to others without the written consent of 
// StrynDev Solutions. It must be returned to StrynDev Solutions 
// when its authorized use is terminated.

import React from 'react';

import styles from './CreateClubAdminLinkFormPage.module.css';

import CreateClubWhiteBubbleComp from '../../components/pages/CreateClubAdminLinkFormPage/CreateClubWhiteBubbleComp/CreateClubWhiteBubbleComp';

const CreateClubAdminLinkFormPage = (props) => {

    return (<div className={styles.createClubAdminLinkFormPageContainer}>
        <div className={styles.nightTableAdminHeaderRowContainer}>
            <span className={styles.nightTableAdminTextStyle}>NightTable Admin</span>
        </div>
        <div className={styles.outerLowerSpaceContainer}>
            <CreateClubWhiteBubbleComp></CreateClubWhiteBubbleComp>
        </div>
    </div>)
}

export default CreateClubAdminLinkFormPage;