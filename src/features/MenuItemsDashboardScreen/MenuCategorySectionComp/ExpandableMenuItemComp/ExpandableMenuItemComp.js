// All information, source code contained in this document 
// is the property of StrynDev Solutions, LLC. It must not 
// be transmitted to others without the written consent of 
// StrynDev Solutions. It must be returned to StrynDev Solutions 
// when its authorized use is terminated.

import React, { useState } from 'react';
import ChildMenuItemSizeComp from './ChildMenuItemSizeComp/ChildMenuItemSizeComp';

import styles from './ExpandableMenuItemComp.module.css';

import rightArrowGraphic from '../../../../assets/rightexpandarrow.svg';
import downArrowGraphic from '../../../../assets/downarrowright.svg';

const ExpandableMenuItemComp = (props) => {

    const [ itemClicked, setItemClicked ] = useState(false);

    const localMenuItemData = props.itemObj;

    const handleParentItemClick = () => {

        if (localMenuItemData.sizes == 0) {
            return;
        }

        setItemClicked((state) => !state);
    };

    let dynamicMinHeight = null;

    if (itemClicked) {
        dynamicMinHeight = `${2 + 2 * (localMenuItemData.sizes.length) + 2 * (0.5)}rem`;
    } else {
        dynamicMinHeight = '2rem';
    }

    const expandableMenuItemContainerStyle = {
        display: 'flex',
        minHeight: dynamicMinHeight,
        width: '100%',
        borderRadius: '0.3rem',
        flexDirection: 'column',
        marginTop: '0.1rem',
        alignItems: 'center',
        overflow: 'hidden',
        color: '#c3195d'
    };

    return (<div style={expandableMenuItemContainerStyle}>
        <div 
            onClick={handleParentItemClick} 
            className={
                itemClicked ? styles.parentItemHorizContainer : styles.parentItemHorizContainerNotSelected}>
            <div className={styles.expandableHorizItemBlockContainer}>
                <span>{localMenuItemData.itemName}</span>
                {localMenuItemData.sizes.length !== 0 ? <img 
                    className={styles.arrowGraphicStyle}
                    src={itemClicked ? downArrowGraphic : rightArrowGraphic} /> : null }
            </div>
            <div className={styles.expandableHorizItemBlockContainer}>
                <span>{localMenuItemData.sizes.length}</span>
            </div>
            <div className={styles.expandableHorizItemBlockContainer}>
                <span>-</span>
            </div>
        </div>
        {itemClicked ? <div className={styles.childHorizCompListContainer}>
            {localMenuItemData.sizes.map((sizeData, index) => (
                <ChildMenuItemSizeComp
                    childData={sizeData}
                    key={index} />
            ))}
        </div> : null }
    </div>);
};

export default ExpandableMenuItemComp;