import { put, takeEvery } from 'redux-saga/effects';
import actions from "../actions";

function * notifiyQuestionnaireLogIn({payload: {userId}}) {
   yield put(actions.loadQuestionnaires({owner: userId}))
}

export function * logInSaga() {
   yield takeEvery("app-domain/LOG_IN/fulfilled", notifiyQuestionnaireLogIn)
}
