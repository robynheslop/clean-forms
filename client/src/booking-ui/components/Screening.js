import React, { useEffect, useState } from 'react';
import PropTypes from "prop-types";
import { makeStyles } from '@material-ui/core/styles';
import { Paper, CircularProgress, FormGroup, FormLabel, Button, FormControl } from '@material-ui/core';
import Responses from './Response';


const useStyles = makeStyles({
    root: {
        width: '66%',
        maxWidth: '1400px',
        margin: "0 auto",
        marginTop: '50px',
        padding: "2em 5em",
        justifyContent: "center"
    },
    h1: {
        fontFamily: 'Poiret One',
        fontSize: '75px',
        padding: '30px'
    },
    button: {
        backgroundColor: '#be294f',
        padding: "15px 25px",
        boxShadow: 'none',
        color: 'white',
        margin: '15px',
    },
})

export function Screening({ location, onLoad, isQuestionnaireLoading, isLoadingScreeningRejected, isCompleteScreeningFulfilled, isCompleteScreeningRejected, handleSaveQuestionnaire, questionnaire }) {

    const classes = useStyles()
    const [responsesState, setResponsesState] = useState([]);
    useEffect(() => {
        const { pathname } = (location);
        const id = (pathname.split('/'))[2];
        onLoad(id);
    }, [])

    const handleSaveResponse = (id, checkedState) => {
        const index = responsesState.findIndex(response => response[id] !== undefined)
        console.log(index)
        if (index !== -1) {
            setResponsesState([
                ...responsesState.slice(0, index),
                { ...responsesState[index], [id]: checkedState },
                ...responsesState.slice(index + 1)
            ])
        } else {
            setResponsesState([
                ...responsesState, { ...responsesState[index], [id]: checkedState }
            ])
        }
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
            {
                isQuestionnaireLoading ?
                    <div className={classes.progress} >
                        <CircularProgress color="secondary" />
                    </div>

                    :
                    
                    isCompleteScreeningFulfilled ?

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

                            (questionnaire?.id === undefined) || isLoadingScreeningRejected ?
                                <div>
                                    <h2>ERROR</h2>
                                    <p>There is a problem fetching your questionnaire information right now. Please contact the clinic directly for further help.</p>
                                </div>

                                :

                                <form >
                                    <h2>{questionnaire.title}</h2>
                                    <h3>{questionnaire.preText ? questionnaire.preText : undefined}</h3>

                                    {questionnaire.questions.map(({ queryText, id, responses }) => {
                                        return <div key={id}>
                                            <FormControl
                                            color="secondary"
                                            >
                                                <FormLabel
                                                color="secondary"
                                                 >{queryText}</FormLabel>
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
                                        className={classes.button}
                                        type="submit"
                                        onClick={handleSubmit}
                                    >Submit</Button>
                                </form>

            }
        </Paper >
    )
}

Screening.propTypes = {
    questionnaire: PropTypes.object,
    handleSaveResponse: PropTypes.func,
    handleSaveQuestionnaire: PropTypes.func,
    onLoad: PropTypes.func,
    isQuestionnaireLoading: PropTypes.bool,
    isLoadingScreeningRejected: PropTypes.bool,
    isCompleteScreeningFulfilled: PropTypes.bool,
    isCompleteScreeningRejected: PropTypes.bool
}

Screening.defaultProps = {
    onLoad: () => { },
    isQuestionnaireLoading: false,
    isLoadingScreeningRejected: false,
    isCompleteScreeningFulfilled: false,
    isCompleteScreeningRejected: false
}

export default Screening