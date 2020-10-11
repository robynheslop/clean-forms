import React from 'react';
import { components } from "../../clinic-ui";

const { ListClinics } = components;

export function Home() {

    return(
        <div>
            <h1>Home Page</h1>
            <div>
                <ListClinics />
            </div>
            <div>
                {/* Send Forms */}
            </div>
            <div>
                {/* Review Data */}
            </div>
        </div>
    )
}

export default Home;
