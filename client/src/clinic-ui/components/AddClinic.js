import React, { useRef } from 'react';
import PropTypes from 'prop-types';

function AddClinics({ addClinic, userId }) {
    const clinicNameRef = useRef();
    const emailRef = useRef();
    const phoneRef = useRef();

    const handleFormSubmit = event => {
        event.preventDefault();
        event.stopPropagation();
        console.log('submit', userId);
        addClinic({
            owner: userId,
            clinicname: clinicNameRef.current.value,
            email: emailRef.current.value,
            phone: phoneRef.current.value
        })
    }

    return (
        <div>
            <h2>Add A New Clinic</h2>
            <form onSubmit={handleFormSubmit}>
                <div>
                    <label>Clinic Name: </label>
                    <input type='text' name='clinicName' pattern='.{2,20}' ref={clinicNameRef} required />
                </div>
                <div>
                    <label>Email: </label>
                    <input type='email' name='email' ref={emailRef} required />
                </div>
                <div>
                    <label>Office Number: </label>
                    <input type='phone' name='phone' ref={phoneRef} required />
                </div>
                <div>
                    <input type='submit' value='Add Clinic' />
                </div>
            </form>
        </div>
    )
}

AddClinics.propTypes = {
    addClinic: PropTypes.func,
    isAddingClinicPending: PropTypes.bool,
    userId: PropTypes.string
}

AddClinics.defaultProps = {
    addClinic: () => { },
    isAddingClinicPending: false,
    userId: undefined
}

export default AddClinics;