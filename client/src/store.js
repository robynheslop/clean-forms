import { configureStore } from "@reduxjs/toolkit";
import { reducer as appDomainReducer } from "./app-domain";
import { reducer as clinicDomainReducer } from "./clinic-domain"

export default configureStore({
    reducer: {
        appDomain: appDomainReducer,
        clinicDomain: clinicDomainReducer
    }
})