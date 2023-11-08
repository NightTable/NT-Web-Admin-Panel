// All information, source code contained in this document 
// is the property of StrynDev Solutions, LLC. It must not 
// be transmitted to others without the written consent of 
// StrynDev Solutions. It must be returned to StrynDev Solutions 
// when its authorized use is terminated.

import React, { useState } from 'react';

import styles from './ExpandableBiddingHorizComp.module.css';

import rightArrowGraphic from '../../../../../assets/rightexpandarrow.svg';
import downArrowGraphic from '../../../../../assets/downarrowright.svg';
import BidderChildHorizComp from './BidderChildHorizComp/BidderChildHorizComp';

const ExpandableBiddingHorizComp = (props) => {

    const [ bidComponentSelected, setBidComponentSelected ] = useState(false);

    const localIdentifierObject = props.identifierObject;
    const childBiddersData = localIdentifierObject.previousBidders;

    let dynamicContainerHeight = null;

    if (bidComponentSelected) {

        dynamicContainerHeight = `${(localIdentifierObject.previousBidders.length * 2.8) + 2.5}rem`;

    } else {

        dynamicContainerHeight = '2.8rem';
    }

    const expandableBiddingHorizCompStyle = {
        display: 'flex',
        width: '97%',
        height: dynamicContainerHeight,
        marginBottom: '0.2rem',
        flexDirection: 'column',
        alignItems: 'center',
        color: '#c3195d'
    };

    const handleParentBidInformationClick = () => {

        setBidComponentSelected((state) => !state);
    };

    return (<div 
        style={expandableBiddingHorizCompStyle}>
        <div
            onClick={handleParentBidInformationClick} 
            className={
              bidComponentSelected ? styles.parentBidInformationRowContainerSelected : styles.parentBidInformationRowContainer}>
            <div className={styles.expandableBiddingHorizCompBlockContainer}>
                <span>{localIdentifierObject.identifierAbbrev}</span>
                {localIdentifierObject.previousBidders.length > 1 ? <img
                    className={styles.arrowGraphicStyle}
                    src={ bidComponentSelected ? downArrowGraphic : rightArrowGraphic}
                     /> : null }
            </div>
            <div className={styles.expandableBiddingHorizCompBlockContainer}>
                <span>{localIdentifierObject.bidder}</span>
            </div>
            <div className={styles.expandableBiddingHorizCompBlockContainer}>
                <span>${localIdentifierObject.currentBidAmount}</span>
            </div>
            <div className={styles.expandableBiddingHorizCompBlockContainer}>
                <span>{localIdentifierObject.numBids}</span>
            </div>
            <div className={styles.expandableBiddingHorizCompBlockContainer}>
                <span>{localIdentifierObject.tableType === null ? '-' : localIdentifierObject.tableType}</span>
            </div>
            <div className={styles.expandableBiddingHorizCompBlockContainer}>
                <span>{localIdentifierObject.date}</span>
            </div>
        </div>
        <div className={styles.bidderChildListContainer}>
            {bidComponentSelected && childBiddersData.map((bidder, index) => (
                <BidderChildHorizComp
                    bidderData={bidder}
                    key={index} />
            ))}
        </div>
    </div>);
};

export default ExpandableBiddingHorizComp;