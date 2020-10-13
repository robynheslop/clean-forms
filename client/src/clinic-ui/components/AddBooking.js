import React, { useRef } from "react";
import PropTypes from "prop-types";

function AddBooking({ addBooking, activeClinic }) {
    const clientNameRef = useRef();
    const emailRef = useRef();
    const dateRef = useRef();
    const phoneRef = useRef();

    const { id } = activeClinic;

    const handleFormSubmit = event => {
        event.preventDefault();
        event.stopPropagation();
        addBooking({
            clinic: id,
            name: clientNameRef.current.value,
            phone: phoneRef.current.value,
            email: emailRef.current.value,
            date: dateRef.current.value,
        })
        clientNameRef.current.value = "";
        emailRef.current.value = "";
        dateRef.current.value = "";
        phoneRef.current.value = "";
    }

    return (
        <div>
            <h2>Add A New Booking</h2>
            <form onSubmit={handleFormSubmit}>
                <div>
                    <label>Client Name: </label>
                    <input type="text" name="clientName" ref={clientNameRef} required />
                </div>
                <div>
                    <label>Client Phone Number: </label>
                    <input type="number" name="phone" ref={phoneRef} required />
                </div>
                <div>
                    <label>Client Email: </label>
                    <input type="email" name="clientEmail" ref={emailRef} required />
                </div>
                <div>
                    <label>Booking Date: </label>
                    <input type="date" name="date" ref={dateRef} required />
                </div>
                <div>
                    <input type="submit" value="Add Booking" />
                </div>
            </form>
        </div>
    )
}

AddBooking.propTypes = {
    addBooking: PropTypes.func,
    isAddingBookingPending: PropTypes.bool,
    clinicId: PropTypes.string
}

AddBooking.defaultProps = {
    addBooking: () => {},
    isAddingBookingPending: false,
    clinicId: undefined
}

export default AddBooking;