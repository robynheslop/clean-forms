import React from "react";
import PropTypes from "prop-types";
import { Paper } from "@material-ui/core";

export function ManageQuestionnaires() {
    return (
        <Paper>
            <button onClick={() => handleButtonClick}></button>
        </Paper>
    )
}

ManageQuestionnaires.propTypes = {
    deleteQuestionnaire: PropTypes.func,
    updateQuestionnaire: PropTypes.func,
    questionnaires: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string,
        clientname: PropTypes.string,
        status: PropTypes.string,
        date: PropTypes.string,
    })),
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

ManageQuestionnaires.defaultProps = {
    deleteQuestionnaire: ()=>{},
    updateQuestionnaire: ()=>{},
    questionnaires: [],
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

export default ManageQuestionnaires;