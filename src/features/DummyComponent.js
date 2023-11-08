// All information, source code contained in this document 
// is the property of StrynDev Solutions, LLC. It must not 
// be transmitted to others without the written consent of 
// StrynDev Solutions. It must be returned to StrynDev Solutions 
// when its authorized use is terminated.

import React, {useState} from 'react';

import { useDispatch, useSelector } from 'react-redux';

import * as mainActions from '../store/actions/main';

const DummyComponent = (props) => {

    const dispatch = useDispatch();

    const [counter, setCounter] = useState(0);

    const buttonValue = useSelector(state => state.main.buttonCounter);


    const handleButtonPress = () => {

        dispatch(mainActions.incrementButtonAction());

    };

    const handleLocalStatePress = () => {

        setCounter((state) => state + 1);
    };


    return (<div>
        <h1>This is a dummy component</h1>
        <div onClick={handleButtonPress} style={{backgroundColor: 'green'}}>
            <p> Press me</p>
        </div>
        <p>{buttonValue}</p>
        <button onClick={handleLocalStatePress}> Click here to locally press</button>
        <p>{counter}</p>
    </div>);
};

export default DummyComponent;