import { put, select, takeEvery } from 'redux-saga/effects';
import { actions, selectors } from "../index";

function* sendUpdatedScreeningSaga() {
    const id = yield select(selectors.selectScreeningId);
    const responses = yield select(selectors.selectScreeningResponses);
    const status = yield select(selectors.selectScreeningStatus);
    console.log('id', id)
    yield put(actions.completeScreening({id, responses, status}))
}

export function* updateScreeningSaga() {
    yield takeEvery('booking-domain/SET_STATUS', sendUpdatedScreeningSaga)
}
