import { put, takeEvery } from 'redux-saga/effects';
import { } from "../actions"

function* clinicLogOut() {
    console.log("hit clinic domain")
    yield put({ type: 'clinic-domain/LOGGED_OUT' })
}

export function* logOutSaga() {
    console.log("logout saga hit");
    yield takeEvery("app-domain/LOGGED_OUT", clinicLogOut)
}
