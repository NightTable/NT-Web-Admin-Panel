// All information, source code contained in this document 
// is the property of StrynDev Solutions, LLC. It must not 
// be transmitted to others without the written consent of 
// StrynDev Solutions. It must be returned to StrynDev Solutions 
// when its authorized use is terminated.

import React from 'react';
import MenuCategorySectionComp from '../../features/MenuItemsDashboardScreen/MenuCategorySectionComp/MenuCategorySectionComp';

import styles from './MenuItemsDashboardScreen.module.css';

const MenuItemsDashboardScreen = (props) => {

    const dummyMainCategoryItems = [
        {
            categoryName: 'wine',
            items: [
                {
                    itemName: 'champaigne bottle',
                    sizes: [
                        {
                            sizeName: 'small',
                            price: 89
                        }, 
                        {
                            sizeName: 'medium',
                            price: 100
                        },
                        {
                            sizeName: 'large',
                            price: 900
                        },
                        {
                            sizeName: 'testlarge',
                            price: 1200
                        }
                    ],
                    multiSized: true
                },
                {
                    itemName: 'sample wine brand',
                    sizes: [],
                    multiSized: false
                }
            ],
        },
        {
            categoryName: 'beer',
            items: []
        }
    ];

    return (<div className={styles.menuItemsDashboardScreenContainer}>
        <div className={styles.upperOuterSectionContainer}>
            <div className={styles.topWelcomeHeaderContainer}>
                <span className={styles.upperWelcomeTextStyle}> Welcome back, Daniel</span>
            </div>
            <div className={styles.editMenuCategoriesRowContainer}>
                <div className={styles.menuItemLabelContainer}>
                    <span className={styles.menuItemsLabelStyle}>Menu Items</span>
                </div>
                <div className={styles.editMenuCategoryButtonContainer}>
                    <button className={styles.editMenuCategoriesButtonStyle}>edit menu categories</button>
                </div>
            </div>
        </div>
        <div className={styles.middleOuterSectionContainer}>
            <div className={styles.expandableMiddleSectionContainer}>
                {dummyMainCategoryItems.map((outerEntry, index) => (
                    <MenuCategorySectionComp
                        key={index}
                        categoryEntry={outerEntry}></MenuCategorySectionComp>
                ))}
            </div>
        </div>
        <div className={styles.lowerOuterSectionContainer}>
            <div className={styles.rowButtonContainer}>
                <div className={styles.buttonBlockContainer}>
                    <button className={styles.purpleWhiteButtonStyle}>
                        <span>add menu item</span>
                    </button>
                </div>
                <div className={styles.buttonBlockContainer}>
                    <button className={styles.purpleWhiteButtonStyle}>
                        <span>add menu category</span>
                    </button>
                </div>
                <div className={styles.buttonBlockContainer}>
                    <button className={styles.editMenuItemButtonStyle}>
                        <span>edit menu item</span>
                    </button>
                </div>
            </div>
            <div className={styles.rowButtonContainer}>
                <div className={styles.buttonBlockContainer}>
                    <button onClick={props.onOuterDeleteMenuItemPress} className={styles.deleteMenuItemButtonStyle}>
                        <span>delete menu item</span>
                    </button>
                </div>
                <div className={styles.buttonBlockContainer}></div>
                <div className={styles.buttonBlockContainer}></div>
            </div>
        </div>
    </div>)
}

export default MenuItemsDashboardScreen;