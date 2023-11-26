/*
 * @file: index.js
 * @description: App Configration
 * @date: 3 April 2022
 * @author: Mohit
 * */

import React from 'react';
import {
    ToastsContainer,
    ToastsStore,
    ToastsContainerPosition
} from 'react-toasts';
import { PersistGate } from 'redux-persist/es/integration/react';
import "react-datepicker/dist/react-datepicker.css";
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';
import configureStore from './config';
import { createBrowserHistory } from 'history';
import { Auth } from './methods/auth';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Forgotpassword from './pages/Forgotpassword';
import Resetpassword from './pages/Resetpassword';
import Profile from './pages/Profile'
import Allusers from './pages/Allusers';
import Profiledetail from './pages/Allusers/Profiledetail'
import Roleslist from './pages/Roleslist'
import Appointments from './pages/Appointments'
import Translation from './pages/Translation';
import QuestionsTranslation from './pages/Translation/questionsTranslations';
import SignUp from './pages/Signup/index';
import Settings from './pages/Settings';
import HealthClinic from './pages/HealthClinic';
import CaseNotes from './pages/CaseNotes';
import Questions from './pages/Questions';
import CategoryType from './pages/CategoryType';
import Categories from './pages/Categories';
import PaymentPlans from './pages/PaymentPlans';
import AuditHistory from './pages/AuditHistory';
import ContentManagement from './pages/ContentManagement';
import Faq from './pages/Faq';
import Blog from './pages/BlogPage';
import Bloglisting from './pages/Bloglisting';
import BlogDetail from './pages/BlogDetail';
import CustomField from './pages/CustomField';

import './scss/main.scss';
import "react-pagination-js/dist/styles.css"; // import css
import LogoManagement from './pages/LogoManagement';
import AppointmentReminder from './pages/AppointmentReminder';

export const history = createBrowserHistory();
/************ store configration *********/
const { persistor, store } = configureStore(history);

export default () => {
    return (<>
        <Provider store={store}>
            <PersistGate loading={'loading ...'} persistor={persistor}>
                <ConnectedRouter history={history}>
                    <Router>
                        <Switch>
                            <Route exact={true} path="/dashboard" store={store} requireAuth={Auth} component={Dashboard} />
                            <Route exact={true} path="/logo-management" store={store} requireAuth={Auth} component={LogoManagement} />
                            <Route exact={true} path="/appointment-reminder" store={store} requireAuth={Auth} component={AppointmentReminder} />
                            <Route exact={true} path="/appointments" store={store} requireAuth={Auth} component={Appointments} />
                            <Route exact={true} path="/profiledetail/:id" store={store} requireAuth={Auth} component={Profiledetail} />
                            <Route exact={true} path="/rolelist" store={store} requireAuth={Auth} component={Roleslist} />
                            <Route exact={true} path="/allusers" store={store} requireAuth={Auth} component={Allusers} />
                            <Route exact={true} path="/paymentplans" store={store} requireAuth={Auth} component={PaymentPlans} />
                            <Route exact={true} path="/profile" store={store} requireAuth={Auth} component={Profile} />
                            <Route exact={true} path="/settings" store={store} requireAuth={Auth} component={Settings} />
                            <Route exact={true} path="/setting/:tab" store={store} requireAuth={Auth} component={Settings} />
                            <Route exact={true} path="/questions" store={store} requireAuth={Auth} component={Questions} />
                            <Route exact={true} path="/translation" store={store} requireAuth={Auth} component={Translation} />
                            <Route exact={true} path="/translation/questions" store={store} requireAuth={Auth} component={QuestionsTranslation} />
                            <Route exact={true} path="/translation/categorytype" store={store} requireAuth={Auth} component={CategoryType} />
                            <Route exact={true} path="/translation/contantmanagement" store={store} requireAuth={Auth} component={ContentManagement} />
                            <Route exact={true} path="/categorytype" store={store} requireAuth={Auth} component={CategoryType} />
                            <Route exact={true} path="/translation/healthclinic" store={store} requireAuth={Auth} component={HealthClinic} />
                            <Route exact={true} path="/healthclinic" store={store} requireAuth={Auth} component={HealthClinic} />
                            <Route exact={true} path="/audithistory" store={store} requireAuth={Auth} component={AuditHistory} />
                            <Route exact={true} path="/casenotes" store={store} requireAuth={Auth} component={CaseNotes} />
                            <Route exact={true} path="/contentmanagment" store={store} requireAuth={Auth} component={ContentManagement} />
                            <Route exact={true} path="/faq" store={store} requireAuth={Auth} component={Faq} />
                            <Route exact={true} path="/translation/faq" store={store} requireAuth={Auth} component={Faq} />
                            <Route exact={true} path="/blog" store={store} requireAuth={Auth} component={Blog} />
                            <Route exact={true} path="/translation/blog" store={store} requireAuth={Auth} component={Blog} />
                            <Route exact={true} path="/blogdetail/:id" store={store} requireAuth={Auth} component={BlogDetail} />
                            <Route exact={true} path="/translation/bloglisting" store={store} requireAuth={Auth} component={Bloglisting} />
                            <Route exact={true} path="/bloglisting" store={store} requireAuth={Auth} component={Bloglisting} />
                            <Route exact={true} path="/translation/categorytype/categories" store={store} requireAuth={Auth} component={Categories} />
                            <Route exact={true} path="/categorytype/categories" store={store} requireAuth={Auth} component={Categories} />
                            <Route exact={true} path="/login" store={store} requireAuth={Auth} component={Login} />
                            <Route exact={true} path="/forgotpassword" store={store} requireAuth={Auth} component={Forgotpassword} />
                            <Route exact={true} path="/resetpassword" store={store} requireAuth={Auth} component={Resetpassword} />
                            <Route exact={true} path="/register" store={store} requireAuth={Auth} component={SignUp} />
                            <Route exact={true} path="/casenote-fields" store={store} requireAuth={Auth} component={CustomField} />
                            <Route exact path="/">
                                <Redirect to="/login" />
                            </Route>
                        </Switch>
                    </Router>
                </ConnectedRouter>
            </PersistGate>
        </Provider>
        <div id="loader" className="loaderDiv d-none">
            <div>
                <img src="/assets/img/loader.gif" alt="logo" className="loaderlogo" />
            </div>
        </div>
        <ToastsContainer
            position={ToastsContainerPosition.TOP_RIGHT}
            store={ToastsStore}
        />
    </>
    );
};
