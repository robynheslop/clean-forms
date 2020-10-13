import { all, takeEvery } from 'redux-saga/effects';
import logInSaga from "./logInSaga";
import logOutSaga from "./logOutSaga";

export default [
    logInSaga,
    logOutSaga,
    
]

// export default function* () {
//     yield all([
//       takeEvery(logInSaga),
//       takeEvery(logOutSaga)
//     ])
// }