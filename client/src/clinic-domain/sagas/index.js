import { all, takeEvery } from 'redux-saga/effects';
import logInSaga from './logInSaga';
import logOutSaga from './logOutSaga';

export default [
    logOutSaga,
    logInSaga
]

// export default function* () {
//     yield all([
//       takeEvery(logInSaga),
//       takeEvery(logOutSaga)
//     ])
// }