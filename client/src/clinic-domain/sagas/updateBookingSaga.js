import { put, takeEvery } from 'redux-saga/effects';
import actions from "../actions";
import { selectors as bookingSelectors } from "../../booking-domain";


function* updateBookingStatusSaga({ payload: {_id} }) {

    const status = yield select(bookingSelectors.selectScreeningStatus)
    console.log('id, status', _id, status)
    yield put(actions.updateBookingStatus({_id, status}))
}

export function* updateBookingSaga() {
    yield takeEvery("booking-domain/COMPLETE_SCREENING/fulfilled", updateBookingStatusSaga)
}
