import { put, takeEvery } from 'redux-saga/effects';
import actions from "../actions";

function* sendScreeningEmail(payload) {
    yield put(actions.sendScreening(payload));
}

export function* screeningEmailSaga() {
    yield takeEvery('clinic-domain/CREATE_BOOKING/fulfilled', sendScreeningEmail)
}
