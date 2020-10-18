import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { reducer as appDomainReducer } from './app-domain';
import { reducer as clinicDomainReducer } from './clinic-domain';
import { reducer as questionnaireDomainReducer } from './questionnaire-domain';
import { reducer as bookingDomainReducer } from './booking-domain';
import createSagaMiddleware from 'redux-saga';
import rootSagas from './sagas';

const sagaMiddleware = createSagaMiddleware()
const reducer = {
    appDomain: appDomainReducer,
    clinicDomain: clinicDomainReducer,
    questionnaireDomain: questionnaireDomainReducer,
    bookingDomain: bookingDomainReducer
}

const store = configureStore({
    reducer,
    middleware: [sagaMiddleware, ...getDefaultMiddleware()]
})

sagaMiddleware.run(rootSagas);

export default store;