import React, { useRef, useState } from 'react';
import { isAuthenticated } from "../lib";
import { useTokenContext } from "../lib/GlobalState";
import { Redirect } from "react-router-dom";

export function SignUp(props) {
    const clinicNameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();

    const [_, dispatch] = useTokenContext();
    const [isLoggedIn, setIsLoggedIn] = useState(isAuthenticated());

    const handleFormSubmit = event => {
        event.preventDefault();
        event.stopPropagation();
        const params = new URLSearchParams()
        params.append('clinicname', clinicNameRef.current.value);
        params.append('email', emailRef.current.value);
        params.append('password', passwordRef.current.value);

        fetch("/api/signup", {
            method: "POST",
            body: params
        }).then(body => body.json())
            .then(data => {
                dispatch({
                    type: "setToken",
                    token: data.token
                })
                setIsLoggedIn(true);
            })
            .catch(error => console.error(error))
    }

    return (
        isLoggedIn ? <Redirect to={{ pathname: "/", state: { from: props.location } }} /> :
            <div>
                <h2>Sign Up</h2>
                <form onSubmit={handleFormSubmit}>
                    <div>
                        <label>Clinic Name: </label>
                        <input type="text" name="clinicName" pattern=".{2,20}" ref={clinicNameRef} required />
                    </div>
                    <div>
                        <label>Email: </label>
                        <input type="text" name="email" pattern=".{2,20}" ref={emailRef} required />
                    </div>
                    <div>
                        <label>Password: </label>
                        <input type="password" name="password" ref={passwordRef} required />
                    </div>
                    <div>
                        <input type="submit" value="Sign Up" />
                    </div>
                </form>
            </div>
    )
}

export default SignUp;
