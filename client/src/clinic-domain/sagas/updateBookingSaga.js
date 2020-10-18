import { put, takeEvery } from 'redux-saga/effects';
import actions from "../actions";

function* updateBookingStatusSaga({ payload: {status, _id} }) {
    console.log(_id)
    yield put(actions.updateBookingStatus({_id, status}))
}

export function* updateBookingSaga() {
    yield takeEvery("booking-domain/COMPLETE_SCREENING/fulfilled", updateBookingStatusSaga)
}
