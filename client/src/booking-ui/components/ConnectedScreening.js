import Screening from "./Screening";
import { connect } from "react-redux";
import { actions, selectors } from "../../booking-domain";

const mapDispatchToProps = dispatch => {
    const handleSaveQuestionnaire = (responsesState) => {
        dispatch(actions.saveScreening(responsesState))
    }
    const onLoad = (id) => {
        dispatch(actions.getScreening(id))
    }
    return { onLoad, handleSaveQuestionnaire }
}

export const ConnectedScreening = connect(
    state => ({
        questionnaire: selectors.selectQuestionaire(state),
        isQuestionnaireLoading: selectors.selectIsQuestionnaireLoading(state),
        isCompleteScreeningFulfilled: selectors.selectIsCompleteScreeningFulfilled(state)
    }),
    mapDispatchToProps)(Screening)

export default ConnectedScreening;