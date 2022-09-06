// All information, source code contained in this document 
// is the property of StrynDev Solutions, LLC. It must not 
// be transmitted to others without the written consent of 
// StrynDev Solutions. It must be returned to StrynDev Solutions 
// when its authorized use is terminated.


import React from 'react';

import styles from './BlackBackdrop.module.css';

import AddEventModal from '../../modals/AddEventModal/AddEventModal';

import AddTableConfigModal from '../../modals/AddTableConfigModal/AddTableConfigModal'
import ReviewReservationModal from '../../modals/ReviewReservationModal/ReviewReservationModal';
import AddReservationModal from '../../modals/AddReservationModal/AddReservationModal';
import DeleteMenuItemModal from '../../modals/DeleteMenuItemModal/DeleteMenuItemModal';

const BlackBackdrop = (props) => {


    return (<div className={styles.blackBackdropContainer}>
        { props.showAddEventModal ? <AddEventModal onCancelButtonClick={props.onGeneralCancelAction}></AddEventModal> : null}
        { props.showAddTableConfigModal ? <AddTableConfigModal onCancelButtonClick={props.onGeneralCancelAction}></AddTableConfigModal>:null}
        { props.showReviewReservationModal ? <ReviewReservationModal></ReviewReservationModal> : null }
        { props.showAddReservationModal ? <AddReservationModal onCancelButtonClick={props.onGeneralCancelAction}></AddReservationModal> : null }
        { props.showDeleteMenuItemModal ? <DeleteMenuItemModal onLocalCancelDeleteMenuItemAction={props.onGeneralCancelAction}></DeleteMenuItemModal> : null}
    </div>)
}

export default BlackBackdrop;

