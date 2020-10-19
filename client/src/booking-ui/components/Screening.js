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

export function Screening({ location, onLoad, handleSaveQuestionnaire, screeningId, questionnaire }) {
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
        handleSaveQuestionnaire(responsesState)
    }

    return (
        <Paper className={classes.root}>
            <h1 className={classes.h1}>CLEAN FORMS</h1>
            {(questionnaire?.id !== undefined) ?
                <form >
                    <h2>{questionnaire.title}</h2>
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