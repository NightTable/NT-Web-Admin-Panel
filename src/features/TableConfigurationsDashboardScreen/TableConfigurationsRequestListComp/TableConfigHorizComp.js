// All information, source code contained in this document 
// is the property of StrynDev Solutions, LLC. It must not 
// be transmitted to others without the written consent of 
// StrynDev Solutions. It must be returned to StrynDev Solutions 
// when its authorized use is terminated.

import React from 'react';
import Pencil from '../../../assets/pencilpick.png';
import XPic from '../../../assets/xpic.png';
import styles from './TableConfigHorizComp.module.css';


const TableConfigHorizComp = (props) => (
    <div className={styles.requestHorizCompContainer}>
        <div className={styles.requestHorizSectionContainer}>
            <span>{props.requestObj.tableType}</span>
        </div>
        <div className={styles.requestHorizSectionMiddleContainer}>
            <span>${props.requestObj.price}</span>
        </div>
        <div className={styles.requestHorizSectionEndContainer}>
            <div className={styles.buttonContainer}>
                <span className={styles.textStyle}>{props.requestObj.people}</span>
                <img className={styles.imageStyle} src={Pencil} />
                <img className={styles.imageStyle} src={XPic} />
            </div>
        </div>
    </div>);



export default TableConfigHorizComp;

