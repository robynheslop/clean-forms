import { put, takeEvery } from 'redux-saga/effects';
import events from "../events";

function* clinicLogOut() {
    yield put(events.reset());
}

export default function* logOutSaga() {
    yield takeEvery("app-domain/LOGGED_OUT", clinicLogOut)
}
