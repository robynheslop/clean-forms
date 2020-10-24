import { put, takeEvery } from 'redux-saga/effects';
import actions from "../actions";

function* createBookingDocument(payload) {
    console.log('payload', payload)
    yield put(actions.createBooking(payload));
}

export function* newBookingSaga() {
    yield takeEvery('clinic-domain/CREATE_SCREENING/fulfilled', createBookingDocument)
}
