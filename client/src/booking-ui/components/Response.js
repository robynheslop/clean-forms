import React, { useEffect, useRef, useState } from 'react';
import { findIndex, propEq } from "ramda";
import PropTypes from 'prop-types'
import { Fab, Checkbox, FormControlLabel } from '@material-ui/core';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

function Response({ responses, handleSaveResponse }) {
    const isFirstRun = useRef(true);
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
        setCheckedState(newState)
    };

    useEffect(() => {
        if (isFirstRun.current) {
            isFirstRun.current = false;
            return;
        }
        handleSaveResponse(checkedState)
    }, [checkedState])

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
            {/* <Fab
                disabled={(fabButtonState === false) ? true : false }
                size="small"
                color="secondary"
                aria-label="edit"
                onClick={() => {
                    setFabButtonState(false)
                    handleSaveResponse(checkedState)
                }}
            >
                <CheckCircleOutlineIcon />
            </Fab> */}
        </div>
    )
}

Response.propTypes = {
    responses: PropTypes.arrayOf(PropTypes.object),
    handleSaveResponse: PropTypes.func,
}

Response.defaultProps = {
    handleSaveResponse: () => { }
}

export default Response;