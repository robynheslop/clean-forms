import { put, takeEvery } from 'redux-saga/effects';
import events from '../events';

function* notifyQuestionnaireLogOut() {
    yield put(events.reset());
}

export function* logOutSaga() {
    yield takeEvery('app-domain/LOGGED_OUT', notifyQuestionnaireLogOut)
}
