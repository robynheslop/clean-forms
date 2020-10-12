import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { reducer as appDomainReducer } from "./app-domain";
import { reducer as clinicDomainReducer } from "./clinic-domain"
import createSagaMiddleware from 'redux-saga';
import { sagas, logOutSagas } from "./clinic-domain/sagas"

const sagaMiddleware = createSagaMiddleware()
const reducer = {
    appDomain: appDomainReducer,
    clinicDomain: clinicDomainReducer
}

const store = configureStore({
    reducer,
    middleware: [sagaMiddleware, ...getDefaultMiddleware()]
})

sagaMiddleware.run(logOutSagas);

export default store;