// All information, source code contained in this document 
// is the property of StrynDev Solutions, LLC. It must not 
// be transmitted to others without the written consent of 
// StrynDev Solutions. It must be returned to StrynDev Solutions 
// when its authorized use is terminated.

import React, { useState } from 'react';

import styles from './SettingsWhiteBubbleComp.module.css';

import pencilImageGraphic from '../../../assets/pencilpick.png';
import redXPic from '../../../assets/redXPic.png';
import greenCheckMark from '../../../assets/greencheckmark.png';

const SettingsWhiteBubbleComp = (props) => {

    const [ stripeSetupLinked, setStripeSetupLinked ] = useState(false);

    const handleStripeSetup = () => {

        console.log("You just clicked on the stripe setup handler");
        setStripeSetupLinked((state) => !state);
    }

    return (<div className={styles.settingsWhiteBubbleCompContainer}>
        <div className={styles.outerMiddleRowInfoContainer}>
            <div className={styles.personalInformationColumn}>
                <div className={styles.personalInformationHeaderRowContainer}>
                    <span className={styles.personalInformationTextLabel}>Personal Information</span>
                    <button className={styles.outerEditButtonStyle}>
                        <span className={styles.editTextLabel}>edit</span>
                        <img className={styles.pencilImageGraphicStyle} src={pencilImageGraphic}>
                        </img>
                    </button>
                </div>
                <div className={styles.personalInformationBodyContainer}>
                    <div className={styles.generalInputContainer}>
                        <span className={styles.inputPromptTextLabel}>Name: </span>
                        <span className={styles.inputValueTextLabel}>Daniel Skylar</span>
                    </div>
                    <div className={styles.generalInputContainer}>
                        <span className={styles.inputPromptTextLabel}>Email: </span>
                        <span className={styles.inputValueTextLabel}>danielskylar@email.com</span>
                    </div>
                    <div className={styles.generalInputContainer}>
                        <span className={styles.inputPromptTextLabel}>Phone Number: </span>
                        <span className={styles.inputValueTextLabel}>(383) 293-4983</span>
                    </div>
                </div>
            </div>
            <div className={styles.clubInformationColumn}>
                <div className={styles.clubInformationHeaderRowContainer}>
                    <span className={styles.clubInformationTextLabel}>Club Information</span>
                    <button className={styles.outerEditButtonStyle}>
                        <span className={styles.editTextLabel}>edit</span>
                        <img className={styles.pencilImageGraphicStyle} src={pencilImageGraphic}>
                        </img>
                    </button>
                </div>
                <div className={styles.clubInformationBodyContainer}>
                    <div className={styles.generalInputContainer}>
                        <span className={styles.inputPromptTextLabel}>Name: </span>
                        <span className={styles.inputValueTextLabel}>The Grand</span>
                    </div>
                    <div className={styles.generalInputContainer}>
                        <span className={styles.inputPromptTextLabel}>Address: </span>
                        <span className={styles.inputValueTextLabel}>572 Boylston Road</span>
                    </div>
                    <div className={styles.generalInputContainer}>
                        <span className={styles.inputPromptTextLabel}>City: </span>
                        <span className={styles.inputValueTextLabel}>Boston</span>
                    </div>
                    <div className={styles.outerStateZipInputContainer}>
                        <div className={styles.leftStateInputContainer}>
                            <span className={styles.inputPromptTextLabel}>State: </span>
                            <span className={styles.inputValueTextLabel}>MA</span>
                        </div>
                        <div className={styles.rightZipInputContainer}>
                            <span className={styles.inputPromptTextLabel}>Zip: </span>
                            <span className={styles.inputValueTextLabel}>02481</span>
                        </div>
                    </div>
                    <div className={styles.generalInputContainer}>
                        <span className={styles.inputPromptTextLabel}>Website </span>
                        <span className={styles.inputValueTextLabel}>www.thegrand.com</span>
                    </div>
                    <div className={styles.generalInputContainer}>
                        <span className={styles.inputPromptTextLabel}>Phone Number: </span>
                        <span className={styles.inputValueTextLabel}>(650) 333-4994</span>
                    </div>
                    <div className={styles.generalInputContainer}>
                        <span className={styles.inputPromptTextLabel}>Photos: </span>
                        <button className={styles.editPhotoButtonStyle}>
                            <span>edit photos</span>
                        </button>
                    </div>
                    <div className={styles.generalInputContainer}>
                        <span className={styles.inputPromptTextLabel}>Stripe Account Number: </span>
                        <button onClick={handleStripeSetup} className={ stripeSetupLinked ? styles.stripeStatusButtonLabelStyleSelected : styles.stripeStatusButtonLabelStyle }>
                            <img className={styles.statusIconGraphicStyle} src={stripeSetupLinked ? greenCheckMark : redXPic}></img>
                            <span className={styles.linkLabelStyle}>{stripeSetupLinked ? "linked" : "not setup"}</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>)
}

export default SettingsWhiteBubbleComp;