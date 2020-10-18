import React, { useEffect } from 'react';
import PropTypes from "prop-types";
import queryString from 'query-string';
import { Paper, FormGroup, FormControlLabel, FormLabel, Button, FormControl, Checkbox } from '@material-ui/core';

export function Screening({location, onLoad, onSave, screeningId, questionnaire}) {

    useEffect(() => {
        const {pathname} = (location);
        const id = (pathname.split('/'))[2];
        onLoad(id);
    }, [])

    const handleChange = () => {

    }

    const handleSave = () => {
        onSave(screeningId)
    }

    return (
        <Paper>
            {questionnaire ? 
            
            <form >
                <h3>{questionnaire.preText ? questionnaire.preText : undefined}</h3>

                {questionnaire.questions.map(({ queryText, id, respones }) => {
                    return <FormControl >
                        <FormLabel >{queryText}</FormLabel>
                        <FormGroup>
                            {respones.map(({ id, responseText }) => {
                                return <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={id}
                                            onChange={handleChange}
                                            name={responseText} />}
                                    label={responseText}
                                />
                            })}
                        </FormGroup>
                    </FormControl>
                })
                }
                <h3>{questionnaire.postText ? questionnaire.postText : undefined}</h3>
                <Button
                    onClick={handleSave}
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
    onSave: PropTypes.func,
    onLoad: PropTypes.func,
}


Screening.defaultProps = {

}

export default Screening