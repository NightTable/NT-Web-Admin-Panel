// All information, source code contained in this document 
// is the property of StrynDev Solutions, LLC. It must not 
// be transmitted to others without the written consent of 
// StrynDev Solutions. It must be returned to StrynDev Solutions 
// when its authorized use is terminated.

import React, { useState } from 'react';

import styles from './DashboardLayoutComp.module.css';

import { Link, Routes, Route } from 'react-router-dom';
import TableConfigurationsDashboardScreen from '../../screens/TableConfigurationsDashboardScreen.js/TableConfigurationsDashboardScreen';
import ClubsDashboardScreen from '../../screens/ClubsDashboardScreen/ClubsDashboardScreen';
import EventsDashboardScreen from '../../screens/EventsDashboardScreen/EventsDashboardScreen';
import ActiveTablesDashboardScreen from '../../screens/ActiveTablesDashboardScreen/ActiveTablesDashboardScreen';
import PollingTablesDashboardScreen from '../../screens/PollingTablesDashboardScreen/PollingTablesDashboardScreen';
import TransactionHistoryOverviewScreen from '../../screens/TransactionHistoryOverviewScreen/TransactionHistoryOverviewScreen';
import BlackBackdrop from '../BlackBackdrop/BlackBackdrop';
import SettingsDashboardScreen from '../../screens/SettingsDashboardScreen/SettingsDashboardScreen';
import ReservationsDetailScreen from '../../screens/ReservationsDetailScreen/ReservationsDetailScreen';
import ReservationsDashboardScreen from '../../screens/ReservationsDashboardScreen/ReservationsDashboardScreen';
import RepresentativesDashboardScreen from '../../screens/RepresentativesDashboardScreen/RepresentativesDashboardScreen';
import MenuItemsDashboardScreen from '../../screens/MenuItemsDashboardScreen/MenuItemsDashboardScreen';
import BiddingsOverviewScreen from '../../screens/BiddingsOverviewScreen/BiddingsOverviewScreen';
import RevenueStandingOverviewScreen from '../../screens/RevenueStandingOverviewScreen/RevenueStandingOverviewScreen';

const DashboardLayoutComp = (props) => {

    const [ addEventModalShown, setAddEventModalShown ] = useState(false);
    const [ addTableConfigModalShown, setAddTableConfigModalShown ] = useState(false);
    const [ reviewReservationModalShown, setReviewReservationModalShown ] = useState(false);

    const [ deleteMenuItemModalShown, setDeleteMenuItemModalShown ] = useState(false);


    const [ addReservationModalShown, setAddReservationModalShown ] = useState(false);

    const showEventModal = addEventModalShown;
    const showTableConfigModal = addTableConfigModalShown;

    const handleBackDropCancelActionEventModal = () => {

        setAddEventModalShown(false);
    }

    const handleBackDropCancelActionTableConfigModal = () => {

        setAddTableConfigModalShown(false);
    }

    const handleBackDropCancelActionReviewReservationModal = () => {

        console.log("You are cancelling the backdrop modal functionality here");
    }

    const handleBackDropCancelActionAddReservationModal = () => {

        setAddReservationModalShown(false);
    };

    const handleBackDropCancelDeleteMenuItemModal = () => {

        setDeleteMenuItemModalShown(false);
    }


    const handleAddEventButtonPress = () => {

        setAddEventModalShown(true);
    }

    const handleDeleteMenuItemPress = () => {

        setDeleteMenuItemModalShown(true);
    }

    const handleAddTableConfigModal = () => {
        setAddTableConfigModalShown(true);

    }

    const handleAddReservationButtonPress = () => {
        
        setAddReservationModalShown((state) => !state);

    }


    return (
        <div className={styles.screenContainer}>
            { showEventModal ? <BlackBackdrop
                showAddEventModal={showEventModal}
                onGeneralCancelAction={handleBackDropCancelActionEventModal}></BlackBackdrop> : null }
            { showTableConfigModal ? <BlackBackdrop
                showAddTableConfigModal={showTableConfigModal}
                onGeneralCancelAction={handleBackDropCancelActionTableConfigModal}></BlackBackdrop> : null }
            { reviewReservationModalShown ? <BlackBackdrop
                showReviewReservationModal={reviewReservationModalShown}
                    onGeneralCancelAction={handleBackDropCancelActionReviewReservationModal} ></BlackBackdrop> : null }
            { addReservationModalShown ? <BlackBackdrop
                showAddReservationModal={addReservationModalShown}
                onGeneralCancelAction={handleBackDropCancelActionAddReservationModal}></BlackBackdrop> : null }
            { deleteMenuItemModalShown ? <BlackBackdrop
                showDeleteMenuItemModal={deleteMenuItemModalShown}
                onGeneralCancelAction={handleBackDropCancelDeleteMenuItemModal}></BlackBackdrop> : null }
            <div className={styles.purpleHeader}>
                <p className={styles.headerText}>NightTable Admin</p>
            </div>
            <div className={styles.mainContainer}>
                <div className={styles.purpleNavColumn}>
                    <div className={styles.expandablePurpleNavColumnStyle}>
                        <Link to="/dashboard/clubs" style={{textDecoration: 'none'}}>
                            <div className={styles.navItemContainer}>
                                <span className={styles.navLabelStyling}>Clubs</span>
                            </div>
                        </Link>
                        <Link to="/dashboard/tableconfigs" style={{textDecoration: 'none'}}>
                            <div className={styles.navItemContainer}>
                                <span className={styles.navLabelStyling}>Table configurations</span>
                            </div>
                        </Link>
                        <Link to="/dashboard/activegroupings" style={{textDecoration: 'none'}}>
                            <div className={styles.navItemContainer}>
                                <span className={styles.navLabelStyling}>Active Table Groupings</span>
                            </div>
                        </Link>
                        <Link to="/dashboard/settings" style={{textDecoration: 'none'}}>
                            <div className={styles.navItemContainer}>
                                <span className={styles.navLabelStyling}>Settings</span>
                            </div>
                        </Link>
                        <Link to="/dashboard/events" style={{textDecoration: 'none'}}>
                            <div className={styles.navItemContainer}>
                                <span className={styles.navLabelStyling}>Events</span>
                            </div>
                        </Link>
                        <Link to="/dashboard/transhistory" style={{textDecoration: 'none'}}>
                            <div className={styles.navItemContainer}>
                                <span className={styles.navLabelStyling}>Transaction History</span>
                            </div>
                        </Link>
                        <Link to="/dashboard/openrequests" style={{textDecoration: 'none'}}>
                            <div className={styles.navItemContainer}>
                                <span className={styles.navLabelStyling}>Open Requests</span>
                            </div>
                        </Link>
                        <Link to="/dashboard/reservations" style={{textDecoration: 'none'}}>
                            <div className={styles.navItemContainer}>
                                <span className={styles.navLabelStyling}>Reservations</span>
                            </div>
                        </Link>
                        <Link to="/dashboard/representatives" style={{textDecoration: 'none'}}>
                            <div className={styles.navItemContainer}>
                                <span className={styles.navLabelStyling}>Representatives</span>
                            </div>
                        </Link>
                        <Link to="/dashboard/menuitems" style={{textDecoration: 'none'}}>
                            <div className={styles.navItemContainer}>
                                <span className={styles.navLabelStyling}>Menu Items</span>
                            </div>
                        </Link>
                        <Link to="/dashboard/biddings" style={{textDecoration: 'none'}}>
                            <div className={styles.navItemContainer}>
                                <span className={styles.navLabelStyling}>Biddings</span>
                            </div>
                        </Link>
                        <Link to="/dashboard/revenuestandings" style={{textDecoration: 'none'}}>
                            <div className={styles.navItemContainer}>
                                <span className={styles.navLabelStyling}>Revenue Standings</span>
                            </div>
                        </Link>
                    </div>
                </div>
                <div className={styles.bodyColumn}>
                    <Routes>
                        <Route path="tableconfigs" element={<TableConfigurationsDashboardScreen onTableConfigButtonPress={handleAddTableConfigModal}></TableConfigurationsDashboardScreen>}></Route>
                        <Route path="clubs" element={<ClubsDashboardScreen></ClubsDashboardScreen>}></Route>
                        <Route path="events" element={<EventsDashboardScreen onAddEventButtonPress={handleAddEventButtonPress}></EventsDashboardScreen>}></Route>
                        <Route path="activegroupings" element={<ActiveTablesDashboardScreen></ActiveTablesDashboardScreen>} />
                        <Route path="openrequests" element={<PollingTablesDashboardScreen></PollingTablesDashboardScreen>} />
                        <Route path="transhistory" element={<TransactionHistoryOverviewScreen></TransactionHistoryOverviewScreen>} />
                        <Route path="settings" element={<SettingsDashboardScreen></SettingsDashboardScreen>} />
                        <Route path="reservations" element={<ReservationsDashboardScreen
                                                                onAddReservationButtonPress={handleAddReservationButtonPress}></ReservationsDashboardScreen>} />
                        <Route path="representatives" element={<RepresentativesDashboardScreen></RepresentativesDashboardScreen>} />
                        <Route path="menuitems" element={<MenuItemsDashboardScreen
                                                            onOuterDeleteMenuItemPress={handleDeleteMenuItemPress}></MenuItemsDashboardScreen>} />
                        <Route path="biddings" element={<BiddingsOverviewScreen></BiddingsOverviewScreen>} />
                        <Route path="revenuestandings" element={<RevenueStandingOverviewScreen></RevenueStandingOverviewScreen>} />
                    </Routes>
                </div>
            </div>
        </div>
    )
}

export default DashboardLayoutComp;