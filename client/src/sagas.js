import { fork } from 'redux-saga/effects'; 
import { logInClinicSaga, logOutClinicSaga } from './clinic-domain/sagas';
import { logInQuestionnaireSaga, logOutQuestionnaireSaga} from "./questionnaire-domain/sagas"

export default function* rootSagas() {
    yield fork (logInClinicSaga)
    yield fork (logOutClinicSaga)  
    yield fork (logInQuestionnaireSaga)
    yield fork (logOutQuestionnaireSaga)  
} 