import { configureStore } from "@reduxjs/toolkit";
import { reducer as appDomainReducer } from "./app-domain";

export default configureStore({
    reducer: {
        appDomain: appDomainReducer
    }
})