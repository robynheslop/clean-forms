import { put, select, takeEvery } from 'redux-saga/effects';
import { actions, selectors } from "../../booking-domain";
import isEqual from 'lodash.isequal';

function* gradeScreeningResponsesSaga({ payload: { responsesState } }) {
    const { questions } = yield select(selectors.selectQuestionaire)
    const formattedQuestions = questions.map(({ id, responses }) => {
        return {
            [id]: responses.map(response => {
                return { 
                    id: response.id, 
                    checked: response.isValidReponse
                }
            })

        }
    })
    if (isEqual(responsesState, formattedQuestions)) {
        yield put(actions.setScreeningStatus({status: 'passed'}));
    } else {
        yield put(actions.setScreeningStatus({status: 'failed'}));
    }
}

export function* gradeScreeningSaga() {
    yield takeEvery('booking-domain/SAVE_SCREENING', gradeScreeningResponsesSaga)
}
