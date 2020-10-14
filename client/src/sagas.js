import clinicDomainSagas from './clinic-domain/sagas';
import questionnaireDomainSagas from "./questionnaire-domain/sagas"

export default [...clinicDomainSagas, ...questionnaireDomainSagas]