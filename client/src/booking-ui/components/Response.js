import React, { useState } from 'react';
import { findIndex, propEq } from "ramda";
import PropTypes from 'prop-types'
import { Fab, Checkbox, FormControlLabel } from '@material-ui/core';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';


function Response({ responses, handleSaveResponse }) {
    const [checkedState, setCheckedState] = useState(
        responses.map(({ id: responseId }) => {
            return { id: responseId, checked: false }
        })
    );

    const handleChecked = (event) => {
        const checked = event.target.checked;
        const responseId = event.target.id;
        const index = findIndex(propEq("id", responseId))(checkedState);
        const newState = [
            ...checkedState.slice(0, index),
            { ...checkedState[index], checked: checked },
            ...checkedState.slice(index + 1)
        ]
        console.log(newState)
        setCheckedState(newState)
    };

    return (
        <div>
            {responses.map(({ id, responseText }) => {
                return <FormControlLabel
                    key={id}
                    control={
                        <Checkbox
                            id={id}
                            checked={checkedState[(findIndex(propEq("id", id))(checkedState))].checked}
                            onChange={handleChecked}
                            name={responseText} />}
                    label={responseText}

                    
                />
            })}
            <Fab 
                color="secondary" 
                aria-label="save"
                size="small"
                color="secondary"
                onClick={() => {
                    handleSaveResponse(checkedState)
                }}
                >
                <CheckCircleOutlineIcon />
            </Fab>
        </div>
    )
}

Response.propTypes = {
    responses: PropTypes.arrayOf(PropTypes.object),
    handleSaveResponse: PropTypes.func,
}

Response.defaultProps = {
    responses: {},
    handleSaveResponse: () => {}
}

export default Response;