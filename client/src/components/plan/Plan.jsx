import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Plan() {
    const [tripPlan, setTripPlan] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Update these values based on your form or some context
        const city1 = "NewYork";
        const city2 = "LosAngeles";
        const count = "7";
        const food = "Italian";
        const hobbies = "hiking";
        const places = "beaches,museums";
        const other = "historical sites";

        const url = `http://localhost:4000/api/${city1}/${city2}/${count}/${food}/${hobbies}/${places}/${other}`;

        axios.get(url)
            .then(response => {
                setTripPlan(response.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching trip plan:", err);
                setError("Failed to fetch trip plan.");
                setLoading(false);
            });
    }, []); // Empty dependency array means this useEffect runs once when the component mounts.

    return (
        <div>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {tripPlan && (
                <div>
                    <h3>Your Trip Plan:</h3>
                    <p>{tripPlan}</p>
                </div>
            )}
        </div>
    );
}

export default Plan;
