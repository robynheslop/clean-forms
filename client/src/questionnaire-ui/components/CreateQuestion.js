import React from "react";
import PropTypes from "prop-types";
import { Paper } from "@material-ui/core";

export function CreateQuestion({createQuestion}) {

    const handleButtonClick = () => {
        createQuestion()
    }
    
    return (
        <Paper>
            <button onClick={() => handleButtonClick}></button>
        </Paper>
    )
}

CreateQuestion.propTypes = {
    createQuestion: PropTypes.func,
    isCreateQuestionPending: PropTypes.bool
}

CreateQuestion.defaultProps = {
    createQuestion: () => {},
    isCreateQuestionPending: false
}

export default CreateQuestion;