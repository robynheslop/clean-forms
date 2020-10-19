import { put, takeEvery } from 'redux-saga/effects';
import actions from "../actions";

function* updateBookingStatusSaga({ payload: {status, _id} }) {
    console.log('id, status', _id, status)
    yield put(actions.updateBookingStatus({_id, status}))
}

export function* updateBookingSaga() {
    yield takeEvery("booking-domain/COMPLETE_SCREENING/fulfilled", updateBookingStatusSaga)
}
