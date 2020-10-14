import React from "react";
import PropTypes from "prop-types";
import { Paper } from "@material-ui/core";

export function CreateQuestionnaire({createQuestionnaire, questions}) {

    const handleButtonClick = () => {
        console.log(questions)
        createQuestionnaire()
    }
    
    return (
        <Paper>
            <button onClick={() => handleButtonClick}></button>
        </Paper>
    )
}

CreateQuestionnaire.propTypes = {
    createQuestionnaire: PropTypes.func,
    isCreateQuestionnairePending: PropTypes.bool
}

CreateQuestionnaire.defaultProps = {
    createQuestionnaire: () => {},
    isCreateQuestionnairePending: false
}

export default CreateQuestionnaire;