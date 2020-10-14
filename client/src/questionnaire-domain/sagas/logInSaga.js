import { put, takeEvery } from 'redux-saga/effects';
import actions from "../actions";

function * notifiyClinicLogIn({payload: {userId}}) {
   yield put(actions.loadQuestionnaires({owner:userId}))
}

export default function * logInSaga() {
   yield takeEvery("app-domain/LOG_IN/fulfilled", notifiyClinicLogIn)
}
