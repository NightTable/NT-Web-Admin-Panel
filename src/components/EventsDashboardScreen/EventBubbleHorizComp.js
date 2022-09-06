// All information, source code contained in this document 
// is the property of StrynDev Solutions, LLC. It must not 
// be transmitted to others without the written consent of 
// StrynDev Solutions. It must be returned to StrynDev Solutions 
// when its authorized use is terminated.

import React from 'react';

import styles from './EventBubbleHorizComp.module.css';
import sampleNightClubPic from '../../assets/randomnightclubpic.jpeg';

import Pencil from '../../assets/pencilpick.png'
import XPic from '../../assets/xpic.png'

const EventBubbleHorizComp = (props) => {

    return (<div className={styles.eventBubbleHorizContainerComp}>
        <div className={styles.eventHorizNameContainer}>
            <span>{props.name}</span>
        </div>
        <div className={styles.eventHorizPhotoContainer}>
            <img src={props.image} className={styles.sampleNightClubImageStyle}></img>
        </div>
        <div className={styles.eventHorizDateContainer}>
            <span>{props.date}</span>
        </div>
        <div className={styles.eventHorizTimeContainer}>
            <span>{props.time}</span>
        </div>
        <div className={styles.eventHorizTicketsContainer}>
            <div className={styles.ticketTextContainer}>
                <span>{props.ticketLink}</span>
            </div>
            <div className={styles.buttonContainer}>
                <img className={styles.imageEditIcon} src={Pencil}></img>
                <img className={styles.imageEditIcon} src={XPic}></img>
            </div>
        </div>      
    </div>)
}

export default EventBubbleHorizComp;