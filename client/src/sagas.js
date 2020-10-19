import { fork } from 'redux-saga/effects'; 
import { loadScreeningSaga, gradeScreeningSaga, updateScreeningSaga } from './booking-domain/sagas'
import { logInClinicSaga, logOutClinicSaga, updateBookingSaga } from './clinic-domain/sagas';
import { logInQuestionnaireSaga, logOutQuestionnaireSaga} from "./questionnaire-domain/sagas"

export default function* rootSagas() {
    yield fork (logInClinicSaga)
    yield fork (logOutClinicSaga)  
    yield fork (logInQuestionnaireSaga)
    yield fork (logOutQuestionnaireSaga)  
    yield fork (loadScreeningSaga)  
    yield fork (gradeScreeningSaga)  
    yield fork (updateScreeningSaga)  
    yield fork (updateBookingSaga)  
} 