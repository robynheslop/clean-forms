import { put, takeEvery } from 'redux-saga/effects';
import actions from "../actions";

function* screeningEmail(payload) {
    const { clinic, clientName, email, phone, date, screeningId } = payload.meta.arg;
    yield put(actions.sendScreening({ clinic, clientName, email, phone, date, screeningId }));
}

export function* screeningEmailSaga() {
    console.log('hit email saga');
    yield takeEvery('clinic-domain/CREATE_BOOKING/fulfilled', screeningEmail);
}
