import React, { useEffect, useState } from 'react';
import PropTypes from "prop-types";
import { findIndex, propEq } from "ramda";
import { Paper, FormGroup, FormLabel, Button, FormControl } from '@material-ui/core';
import Responses from './Response';

export function Screening({ location, onLoad, handleSaveQuestionnaire, screeningId, questionnaire }) {

    const [responsesState, setResponsesState] = useState([]);

    useEffect(() => {
        const { pathname } = (location);
        const id = (pathname.split('/'))[2];
        onLoad(id);

    }, [])

    const handleSaveResponse = (id, checkedState) => {
        console.log('responsesState', responsesState)
        setResponsesState([...responsesState, { [id]: checkedState }])
    }

    const handleSubmit = event => {
        event.preventDefault();
        event.stopPropagation();
        handleSaveQuestionnaire(responsesState)
    }

    return (
        <Paper>
            {(questionnaire?.id !== undefined) ?
                <form >
                    <h1>{questionnaire.title}</h1>
                    <h3>{questionnaire.preText ? questionnaire.preText : undefined}</h3>

                    <br></br>
                    <h4>Please select your answer to each queston, click the red tick button to confirm. 
                        Once all questions are confirmed, then you can submit.</h4>
=
                    {questionnaire.questions.map(({ queryText, id, responses }) => {
                        return <div>
                            <FormControl key={id}>
                                <FormLabel >{queryText}</FormLabel>
                                <FormGroup>

                                    <Responses
                                        handleSaveResponse={(checkedState) => handleSaveResponse(id, checkedState)}
                                        {...{ responses }}
                                    ></Responses>
                                </FormGroup>
                            </FormControl>
                            <br></br>
                            <br></br>
                        </div>

                    })
                    }
                    <h3>{questionnaire.postText ? questionnaire.postText : undefined}</h3>
                    <Button
                        // className={classes.button}
                        type="submit"
                        onClick={handleSubmit}
                    >Submit</Button>
                </form>

                : <p>Broken Still</p>
            }
        </Paper >
    )
}

Screening.propTypes = {
    screeningId: PropTypes.string,
    questionnaire: PropTypes.object,
    handleSaveResponse: PropTypes.func,
    handleSaveQuestionnaire: PropTypes.func,
    onLoad: PropTypes.func,
}

Screening.defaultProps = {

}

export default Screening