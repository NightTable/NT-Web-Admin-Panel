// All information, source code contained in this document 
// is the property of StrynDev Solutions, LLC. It must not 
// be transmitted to others without the written consent of 
// StrynDev Solutions. It must be returned to StrynDev Solutions 
// when its authorized use is terminated.

import React from 'react';
import RepresentativeItemHorizComp from '../../features/RepresentativesDashboardScreen/RepresentativeItemHorizComp/RepresentativeItemHorizComp';

import styles from './RepresentativesDashboardScreen.module.css';

const RepresentativesDashboardScreen = (props) => {

    const dummyRepresentativeData = [
        {
            name: 'Daniel Skylar',
            username: 'danielskylar',
            role: 'management',
            completedTransactions: 2
        },
        {
            name: 'Daniel Skylar',
            username: 'danielskylar',
            role: 'management',
            completedTransactions: 2
        }
    ];

    return (<div className={styles.representativesDashboardScreenContainer}>
        <div className={styles.upperRepresentativeScreenContainer}>
            <div className={styles.upperWelcomeTextRowContainer}>
                <span className={styles.welcomeBackText}>Welcome back, Daniel</span>
            </div>
        </div>
        <div className={styles.middleRepresentativeScreenContainer}>
            <div className={styles.expandableMiddleRepresentativeScreenContainer}>
                <div className={styles.representativeRowHeaderContainer}>
                    <div className={styles.representativeLabelBlockContainer}>
                        <span className={styles.representativeHeaderText}>Representatives</span>
                    </div>
                </div>
                <div className={styles.representativeCategoryLabelRowContainer}>
                    <div className={styles.representativeCategoryBlockContainer}>
                        <span className={styles.representativeLabelTextStyle}>name</span>
                    </div>
                    <div className={styles.representativeCategoryBlockContainer}>
                        <span className={styles.representativeLabelTextStyle}>username</span>
                    </div>
                    <div className={styles.representativeCategoryBlockContainer}>
                        <span className={styles.representativeLabelTextStyle}>role</span>
                    </div>
                    <div className={styles.representativeCategoryBlockContainer}>
                        <span className={styles.representativeLabelTextStyle}>completed transactions</span>
                    </div>
                    <div className={styles.representativeCategoryBlockContainer} />
                </div>
                <div className={styles.representativeItemListContainer}>
                    {dummyRepresentativeData.map((representative, index) => (
                        <RepresentativeItemHorizComp
                            key={index}
                            name={representative.name}
                            username={representative.username}
                            role={representative.role}
                            completedTransactions={representative.completedTransactions} />
                    ))}
                </div>
            </div>
        </div>
        <div className={styles.lowerRepresentativeScreenContainer}>
            <button className={styles.addRepresentativeButtonStyle}>
                <span className={styles.addNewRepresentativeTextStyle}>Add new representative</span>
            </button>
        </div>
    </div>);
};

export default RepresentativesDashboardScreen;