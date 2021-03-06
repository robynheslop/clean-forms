import { put, takeEvery } from 'redux-saga/effects';
import actions from "../actions";

function* createBookingDocument(payload) {
    const screeningId = payload.payload;
    const { clinic, clientName, email, phone, date } = payload.meta.arg;
    yield put(actions.createBooking({ clinic, clientName, email, phone, date, screeningId }));
}

export function* newBookingSaga() {
    yield takeEvery('clinic-domain/CREATE_SCREENING/fulfilled', createBookingDocument)
}
