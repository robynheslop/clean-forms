import React, { useEffect } from "react";
import PropTypes from "prop-types";
import ConnectedAddClinic from "./ConnectedAddClinic";

function ListClinics({ getAllClinics, clinics, userId }) {

    useEffect(() => {
        getAllClinics({ owner: userId });
    }, [getAllClinics]);

    console.log(clinics && clinics.length > 0)

    return (
        <div>
            {clinics ?
                <div>
                    <h2>Your Clinics: </h2>
                    {clinics.map(({ id, clinicname, email, phone }) =>
                        <div key={id}>
                            <p>Clinic Name: {clinicname}</p>
                            <p>Clinic Email: {email}</p>
                            <p>Clinic Phone: {phone}</p>
                        </div>
                    )}
                </div>
                :
                <div>
                    <p>You have no clinics, add some today.</p>
                </div>

            }
            <ConnectedAddClinic></ConnectedAddClinic>
        </div>
    )
}

ListClinics.propTypes = {
    getClinics: PropTypes.func,
    clinics: PropTypes.array,
    userId: PropTypes.string
}

ListClinics.defaultProps = {
    getClinics: () => { },
    clinics: [],
    userId: undefined
}

export default ListClinics;