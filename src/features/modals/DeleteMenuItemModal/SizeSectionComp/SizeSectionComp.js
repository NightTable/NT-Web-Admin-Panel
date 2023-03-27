// All information, source code contained in this document 
// is the property of StrynDev Solutions, LLC. It must not 
// be transmitted to others without the written consent of 
// StrynDev Solutions. It must be returned to StrynDev Solutions 
// when its authorized use is terminated.

import React from 'react';
import SizeHorizComp from './SizeHorizComp/SizeHorizComp';

import styles from './SizeSectionComp.module.css';

const SizeSectionComp = (props) => {

    const dummySizeInfoData = [
        {
            size: "small",
            price: 250
        },
        {
            size: "medium",
            price: 300
        },
        {
            size: "large",
            price: 400
        }
    ];



    return (<div className={styles.sizeSectionCompContainer}>
        <div className={styles.sizeHeadingRowContainer}>
            <span>Sizes:</span>
        </div>
        <div className={styles.sizeSectionListContainer}>
            {
                dummySizeInfoData.map((sizeInfo, index) => (
                    <SizeHorizComp
                        key={index}
                        size={sizeInfo.size}
                        price={sizeInfo.price}></SizeHorizComp>
                ))
            }
        </div>
    </div>)
}

export default SizeSectionComp;