// All information, source code contained in this document 
// is the property of StrynDev Solutions, LLC. It must not 
// be transmitted to others without the written consent of 
// StrynDev Solutions. It must be returned to StrynDev Solutions 
// when its authorized use is terminated.

import React , { useState } from 'react';

import styles from './ReservationExpandableHorizComp.module.css';
import ReservationChildHorizComp from './ReservationChildHorizComp/ReservationChildHorizComp';

import downArrowGraphic from '../../../../assets/downarrowright.svg';
import rightArrowGraphic from '../../../../assets/rightexpandarrow.svg';

import ArrowCircleDetailComp from '../../../SharedUIElements/ArrowCircleDetailComp/ArrowCircleDetailComp';


const ReservationExpandableHorizComp = (props) => {


    const [ componentExpanded, setComponentExpanded ] = useState(false);
    
    const tableConfigurationData = props.reservationItem.tableConfigurations; 

    
    let dynamicHeightValue = null;
    const numTableConfigurations = props.reservationItem.tableConfigurations.length;

    if (componentExpanded) {
        dynamicHeightValue = `${3 + (numTableConfigurations * 2.6)}rem`;
    } else {
        dynamicHeightValue = '2.8rem';
    }

    const reservationExpandedHorizCompStyle = {
        display: 'flex',
        width: '99.5%',
        color: '#c3195d',
        height: dynamicHeightValue,
        flexDirection: 'column',
        overflow: 'hidden'
    }

    const handleReservationParentClick = () => {

        setComponentExpanded((state) => !state);
    }

    return (<div style={reservationExpandedHorizCompStyle}>
        <div 
            onClick={handleReservationParentClick} 
            className={
                componentExpanded ? styles.reservationParentHorizContainer : styles.reservationParentHorizContainerNotSelected}>
            <div className={styles.reservationBlockInfoContainer}>
                <span className={styles.idTextStyle}>{props.reservationItem.id}</span>
                 { tableConfigurationData.length !== 0 ? <img 
                    className={styles.arrowGraphicStyle}
                    src={componentExpanded ? downArrowGraphic : rightArrowGraphic}>
                </img> : null}
            </div>
            <div className={styles.reservationBlockInfoContainer}>
                <span>{props.reservationItem.tableOrganizer}</span>
            </div>
            <div className={styles.reservationBlockInfoContainer}>
                <span>{tableConfigurationData.length}</span>
            </div>
            <div className={styles.reservationBlockInfoContainer}>
                <span>{props.reservationItem.tableSize === null ? '-' : props.reservationItem.tableSize}</span>
            </div>
            <div className={styles.reservationBlockInfoContainer}>
                <span>{props.reservationItem.tableType === null ? '-' : props.reservationItem.tableType}</span>
            </div>
            <div className={styles.reservationBlockInfoContainer}>
                <span>{props.reservationItem.reservationDate}</span>
                {componentExpanded && <ArrowCircleDetailComp></ArrowCircleDetailComp>}
            </div>
        </div>
        {componentExpanded ? tableConfigurationData.map((tableConfiguration, index) => (
            <ReservationChildHorizComp
                key={index}
                tableConfigData={tableConfiguration}></ReservationChildHorizComp>
        )) : null}
    </div>)
}

export default ReservationExpandableHorizComp;