// All information, source code contained in this document 
// is the property of StrynDev Solutions, LLC. It must not 
// be transmitted to others without the written consent of 
// StrynDev Solutions. It must be returned to StrynDev Solutions 
// when its authorized use is terminated.

import React from 'react';
import SizeSectionComp from '../../features/modals/DeleteMenuItemModal/SizeSectionComp/SizeSectionComp';

import styles from './DeleteMenuItemModal.module.css';

const DeleteMenuItemModal = (props) => (<div className={styles.deleteMenuItemModalContainer}>
        <div className={styles.deleteMenuItemTitleContainer}>
            <span style={{color: '#c3195d', marginLeft: '1rem'}}>Delete Menu Item</span>
        </div>
        <div className={styles.questionPromptRowContainer}>
            <span style={{color: '#c3195d'}}>Are you sure you want to delete the following menu item?</span>
        </div>
        <div className={styles.descriptionInfoRowContainer}>
            <span className={styles.labelStyle}>Category: </span>
            <span className={styles.valueStyle}>Wine</span>
        </div>
        <div className={styles.descriptionInfoRowContainer}>
            <span className={styles.labelStyle}>Name:</span>
            <span className={styles.valueStyle}>Champaigne</span>
        </div>
        <SizeSectionComp />
        <div className={styles.buttonRowContainer}>
            <button onClick={props.onLocalCancelDeleteMenuItemAction} style={{marginRight: '4rem'}} className={styles.lowerButtonStyle}>
                <span>no</span>
            </button>
            <button className={styles.lowerButtonStyle}>
                <span style={{color: 'orange'}}>yes</span>
            </button>
        </div>
    </div>);

export default DeleteMenuItemModal;

