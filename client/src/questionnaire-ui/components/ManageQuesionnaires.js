import React from "react";
import PropTypes from "prop-types";
import { Paper } from "@material-ui/core";

export function CreateQuestionnaire() {
    return (
        <Paper>
            <button onClick={() => handleButtonClick}></button>
        </Paper>
    )
}

CreateQuestionnaire.propTypes = {
    createQuestionnaire: PropTypes.func,
    deleteQuestionnaire: PropTypes.func,
    updateQuestionnaire: PropTypes.func,
    questionnaires: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string,
        clientname: PropTypes.string,
        status: PropTypes.string,
        date: PropTypes.string,
    })),
    isCreateQuestionnairePending: PropTypes.bool,
    isCreateQuestionnaireSuccess: PropTypes.bool,
    isCreateQuestionnaireFailed: PropTypes.bool,
    isDeleteQuestionnairePending: PropTypes.bool,
    isDeleteQuestionnaireSuccess: PropTypes.bool,
    isDeleteQuestionnaireFailed: PropTypes.bool,
    isUpdateQuestionnairePending: PropTypes.bool,
    isUpdateQuestionnaireSuccess: PropTypes.bool,
    isUpdateQuestionnaireFailed: PropTypes.bool,
    isLoadQuestionnairePending: PropTypes.bool,
    isLoadQuestionnaireSuccess: PropTypes.bool,
    isLoadQuestionnaireFailed: PropTypes.bool,
}

CreateQuestionnaire.defaultProps = {
    createQuestionnaire: ()=>{},
    deleteQuestionnaire: ()=>{},
    updateQuestionnaire: ()=>{},
    questionnaires: [],
    isCreateQuestionnairePending: false,
    isCreateQuestionnaireSuccess: false,
    isCreateQuestionnaireFailed: false,
    isDeleteQuestionnairePending: false,
    isDeleteQuestionnaireSuccess: false,
    isDeleteQuestionnaireFailed: false,
    isUpdateQuestionnairePending: false,
    isUpdateQuestionnaireSuccess: false,
    isUpdateQuestionnaireFailed: false,
    isLoadQuestionnairePending: false,
    isLoadQuestionnaireSuccess: false,
    isLoadQuestionnaireFailed: false,
}

export default CreateQuestionnaire;