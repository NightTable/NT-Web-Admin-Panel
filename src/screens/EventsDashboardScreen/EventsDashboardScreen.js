// All information, source code contained in this document 
// is the property of StrynDev Solutions, LLC. It must not 
// be transmitted to others without the written consent of 
// StrynDev Solutions. It must be returned to StrynDev Solutions 
// when its authorized use is terminated.

import React from 'react';

import styles from './EventsDashboardScreen.module.css';

import EventBubbleHorizComp from '../../components/EventsDashboardScreen/EventBubbleHorizComp';
import sampleNightClubPic from '../../assets/randomnightclubpic.jpeg';

const EventsDashboardScreen = (props) => {


    let dummyEventArray = [
        {
            name: "bijou",
            image: sampleNightClubPic,
            date: "fri-1-14-2022",
            time: "10:00 PM - 2:00AM",
            ticketLink: "http://www.link.com"
        },
        {
            name: "marsh",
            image: sampleNightClubPic,
            date: "fri-1-17-2022",
            time: "10:00 PM - 2:00AM",
            ticketLink: "http://www.link.com"
        },
        {
            name: "high up",
            image: sampleNightClubPic,
            date: "fri-1-20-2022",
            time: "10:00 PM - 2:00AM",
            ticketLink: "http://www.link.com"
        },
    ]


    return (
        <div className={styles.eventsDashboardScreenContainer}>
            <div className={styles.upperHeaderRowContainer}>
                <span className={styles.welcomeBackText}>Welcome back, Daniel</span>
            </div>
            <div className={styles.eventHeaderTitleContainer}>
                <span className={styles.eventLabelText}>Events</span>
            </div>
            <div className={styles.categoryLabelsContainer}>
                <div className={styles.nameLabelContainer}>
                    <span>Name</span>
                </div>
                <div className={styles.photoLabelContainer}>
                    <span>Photo</span>
                </div>
                <div className={styles.dateLabelContainer}>
                    <span>Date</span>
                </div>
                <div className={styles.timeLabelContainer}>
                    <span>Time</span>
                </div>  
                <div className={styles.ticketLabelContainer}>
                    <span className={styles.ticketsSpanText}>Tickets</span>
                </div>
            </div>
            <div className={styles.eventListContainer}>
                {dummyEventArray.map((eventElement, index) => (
                    <EventBubbleHorizComp
                    key={index}
                    name={eventElement.name}
                    image={eventElement.image}
                    date={eventElement.date}
                    time={eventElement.time}
                    ticketLink={eventElement.ticketLink}></EventBubbleHorizComp>
                ))}
            </div>
            <div className={styles.addEventButtonContainer}>
                <button onClick={props.onAddEventButtonPress} className={styles.addEventButtonStyle}>Add event</button>
            </div>
        </div>
    )
}

export default EventsDashboardScreen;