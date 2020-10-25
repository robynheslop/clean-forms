import React, { useEffect, useState } from 'react';
import PropTypes from "prop-types";
import { findIndex, propEq } from "ramda";
import { makeStyles } from '@material-ui/core/styles';
import { Paper, FormGroup, FormLabel, Button, FormControl } from '@material-ui/core';
import Responses from './Response';


const useStyles = makeStyles({
    root: {
        width: '66%',
        margin: "0 auto",
        marginTop: '50px',
        padding: "2em 0em",
        justifyContent: "center"
    },
    h1: {
        fontFamily: 'Poiret One',
        fontSize: '75px',
        padding: '30px'
    },
})

export function Screening({
    location,
    onLoad,
    isCompleteScreeningFulfilled,
    isCompleteScreeningRejected,
    handleSaveQuestionnaire,
    screeningId,
    questionnaire }) {
    const classes = useStyles()
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
        const { pathname } = (location);
        const id = (pathname.split('/'))[2];
        handleSaveQuestionnaire(id, responsesState)
    }

    return (
        <Paper className={classes.root}>
            <h1 className={classes.h1}>CLEAN FORMS</h1>

            {isCompleteScreeningFulfilled ?

                <div>
                    <h2>Thank You.</h2>

                    <p>Your questionnaire has been submitted for review.</p>
                    <p>If there are any issues with your responses, the clinic will be in touch with you regarding further steps.</p>
                </div>

                :

                isCompleteScreeningRejected ?
                    <div>
                        <h2>ERROR!</h2>

                        <p>There is a problem submitting your responses.</p>
                        <p>Please contact the clinic regarding further steps.</p>
                    </div>
                    :

                    (questionnaire?.id !== undefined) ?
                        <form >
                            <h2>{questionnaire.title}</h2>
                            <h3>{questionnaire.preText ? questionnaire.preText : undefined}</h3>

                            <br></br>
                            <h4>Please select your answer to each queston, click the red tick button to confirm.
                        Once all questions are confirmed, then you can submit.</h4>

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

                        :
                        <div>
                            <h2>ERROR</h2>
                            <p>We are unable to access your questionnaire right now. Please contact the clinic for further help.</p>
                        </div>
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
    isCompleteScreeningFulfilled: PropTypes.bool,
    isCompleteScreeningRejected: PropTypes.bool
}

Screening.defaultProps = {
    onLoad: () => { },
    isCompleteScreeningFulfilled: false,
    isCompleteScreeningRejected: false
}

export default Screening