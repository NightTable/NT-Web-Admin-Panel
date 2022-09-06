// All information, source code contained in this document 
// is the property of StrynDev Solutions, LLC. It must not 
// be transmitted to others without the written consent of 
// StrynDev Solutions. It must be returned to StrynDev Solutions 
// when its authorized use is terminated.

import React from 'react';
import DummyComponent from './components/DummyComponent';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';

import { Routes, Route} from "react-router-dom";

import {mainReducer} from './store/reducers/main';
import LoginScreenLayout from './layouts/LoginScreenLayout';
import DashboardLayoutComp from './layouts/DashboardLayoutComp/DashboardLayoutComp';
import CreateClubAdminLinkFormPage from './pages/CreateClubAdminLinkFormPage/CreateClubAdminLinkFormPage';
const rootReducer = combineReducers({
  main: mainReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

function App() {

  const baseUrl = process.env.REACT_APP_API_URL;

  console.log(baseUrl);


  return (
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<LoginScreenLayout></LoginScreenLayout>}></Route>
        <Route path="/dashboard/*" element={<DashboardLayoutComp></DashboardLayoutComp>}></Route>
        <Route path="/createclubadmin" element={<CreateClubAdminLinkFormPage></CreateClubAdminLinkFormPage>}></Route>
      </Routes>
    </Provider>
  );
}

export default App;
