import { put, select, takeEvery } from 'redux-saga/effects';
import actions from "../actions";
import selectors from '../selectors';

function* screeningEmail(payload) {
    const { clientName, email, date, screeningId } = payload.meta.arg;
    const { clinicName, phone } = yield select(selectors.selectActiveClinic)
    console.log('clinicName, phone ', clinicName, phone )
    yield put(actions.sendScreening({ clinicName, phone, clientName, email, date, screeningId }));
}

export function* screeningEmailSaga() {
    yield takeEvery('clinic-domain/CREATE_BOOKING/fulfilled', screeningEmail);
}
