// All information, source code contained in this document 
// is the property of StrynDev Solutions, LLC. It must not 
// be transmitted to others without the written consent of 
// StrynDev Solutions. It must be returned to StrynDev Solutions 
// when its authorized use is terminated.

import React from 'react';
import BiddingTableConfigSectionComp from '../../features/BiddingsOverviewScreen/BiddingTableConfigSectionComp/BiddingTableConfigSectionComp';

import styles from './BiddingsOverviewScreen.module.css';

const BiddingsOverviewScreen = (props) => {

    const dummyBiddingDataInfo = [
        {
            tableConfigType: 'floor',
            tableIdentifiers: [
                {
                    identifierAbbrev: 'F4',
                    bidder: 'amanda may',
                    currentBidAmount: 500,
                    numBids: 3,
                    tableType: 'floor',
                    date: 'fri 1-14-22',
                    previousBidders: [
                        {
                            name: 'jake sulley',
                            bidAmount: 359
                        },
                        {
                            name: 'miranda smith',
                            bidAmount: 210
                        }
                    ]
                },
                {
                    identifierAbbrev: 'F5',
                    bidder: 'jack smith',
                    currentBidAmount: 800,
                    numBids: 1,
                    tableType: 'floor',
                    date: 'fri 1-14-22',
                    previousBidders: []
                }
            ]
        }
    ];

    return (<div className={styles.biddingsOverviewScreenContainer}>
        <div className={styles.biddingsUpperHeaderContainer}>
            <div className={styles.topWelcomeHeaderContainer}>
                <span className={styles.upperWelcomeTextStyle}> Welcome back, Daniel</span>
            </div>
            <div className={styles.clubInfoRowContainer}>
                <div className={styles.clubReadOnlyContainer}>
                    <span className={styles.clubIdTextStyle}>39kdj3rhmdk</span>
                    <div className={styles.whiteClubTextContainer}>
                        <span>the grand</span>
                    </div>
                </div>
            </div>
            <div className={styles.dateInfoRowContainer}>
                <div className={styles.dateBoxContainer}>
                    <div className={styles.dateWhiteDivisionBox}>
                        <span className={styles.dateLabelTextStyle}>Date: </span>
                        <span className={styles.dateValueLabelTextStyle}>fri 1-14-22</span>
                    </div>
                </div>
            </div>
        </div>
        <div className={styles.biddingsMiddleContainer}>
            <div className={styles.biddingSectionHeaderRowContainer}>
                <span>Biddings</span>
            </div>
            <div className={styles.createEditIdentifierRowContainer}>
                <div className={styles.createEditIdentifierBlockContainer}>
                    <button className={styles.createEditIdentifierButtonStyle}>
                        <span>create/edit identifiers</span>
                    </button>
                </div>
            </div>
            <div className={styles.outerBiddingListContainer}>
                <div className={styles.expandableBiddingListContainer}>
                    {dummyBiddingDataInfo.map((bidInfo, index) => (
                        <BiddingTableConfigSectionComp
                            bidObject={bidInfo}
                            key={index} />
                    ))}
                </div>
            </div>
        </div>
        <div className={styles.biddingsLowerContainer}>
            <button className={styles.addUpdateBidButtonStyle}>
                <span>add/update bids</span>
            </button>
        </div>
    </div>);
};

export default BiddingsOverviewScreen;