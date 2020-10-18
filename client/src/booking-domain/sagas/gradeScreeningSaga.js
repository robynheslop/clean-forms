import { put, takeEvery } from 'redux-saga/effects';
import actions from '../actions';

function* gradeScreeningResponsesSaga({ payload }) {
    console.log('payload',payload);
    
    
    
    
    
    // yield put();
}

export function* gradeScreeningSaga() {
    yield takeEvery('booking-domain/SAVE_SCREENING', gradeScreeningResponsesSaga)
}
