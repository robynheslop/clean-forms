import { put, takeEvery } from 'redux-saga/effects';
import actions from '../actions';

function* loadQuestionnaire({payload: {questionnaire}}) {
    console.log('questionnaire',questionnaire)
    yield put(actions.getQuestionnaire(questionnaire));
}

export function* loadScreeningSaga() {
    yield takeEvery('booking-domain/GET_SCREENING/fulfilled', loadQuestionnaire)
}
