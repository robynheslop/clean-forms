import { put, takeEvery } from 'redux-saga/effects';
import actions from "../actions";

function* updateBookingStatusSaga({ payload: { status } }) {

    console.log('status', status)
    yield put(actions.updateBookingStatus())
}

export function* updateBookingSaga() {
    yield takeEvery("booking-domain/COMPLETE_SCREENING", updateBookingStatusSaga(payload))
}
