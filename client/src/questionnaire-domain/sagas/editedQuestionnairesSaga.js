import { put, takeEvery } from 'redux-saga/effects';
import actions from "../actions";

function * reloadQuestionnaires({payload: {owner}}) {
   yield put(actions.loadQuestionnaires({owner}))
}

export function * editedQuestionnaireSaga() {
   yield takeEvery("questionnaire-domain/SAVE_QUESTIONNAIRE/fulfilled", reloadQuestionnaires)
}
