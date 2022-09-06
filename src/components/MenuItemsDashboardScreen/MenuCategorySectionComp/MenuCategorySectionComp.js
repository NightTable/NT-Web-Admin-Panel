// All information, source code contained in this document 
// is the property of StrynDev Solutions, LLC. It must not 
// be transmitted to others without the written consent of 
// StrynDev Solutions. It must be returned to StrynDev Solutions 
// when its authorized use is terminated.

import React from 'react';
import ExpandableMenuItemComp from './ExpandableMenuItemComp/ExpandableMenuItemComp';

import styles from './MenuCategorySectionComp.module.css';

const MenuCategorySectionComp = (props) => {

    let menuCategoryObject = props.categoryEntry;

    const numItems = menuCategoryObject.items.length;

    let totalSubSizes = 0;

    menuCategoryObject.items.forEach((menuitem) => {

        let subSizeArray = menuitem.sizes.length;
        totalSubSizes += subSizeArray;
    });

    const menuCategoryContainerStyle = {
        display: 'flex',
        width: '95%',
        alignItems: 'center',
        flexDirection: 'column',
        minHeight: `${(totalSubSizes + numItems) * 2}rem`,
        marginBottom: '2rem',
        marginTop: '2rem',
        color: '#c3195d'
    };

    return (<div style={menuCategoryContainerStyle}>
        <div className={styles.categoryHeadingRowContainer}>
            <span className={styles.categoryHeaderLabelStyle}>{menuCategoryObject.categoryName}</span>
        </div>
        { menuCategoryObject.items.length > 0 ? <div className={styles.categoryItemRowContainer}>
            <div className={styles.categoryLabelContainer}>
                <span>item</span>
            </div>
            <div className={styles.categoryLabelContainer}>
                <span>sizes</span>
            </div>
            <div className={styles.categoryLabelContainer}>
                <span>price</span>
            </div>
        </div> : null }
        {menuCategoryObject.items.map((menuItem, index) => (
            <ExpandableMenuItemComp
                itemObj={menuItem}
                key={index}></ExpandableMenuItemComp>  
        ))}
    </div>)
}

export default MenuCategorySectionComp;