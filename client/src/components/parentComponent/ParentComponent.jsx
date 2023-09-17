// ParentComponent.jsx
import React, { useState } from 'react';
import Form from "../form/Form";
import Plan from '../plan/Plan';

function ParentComponent() {
    const [plan, setPlan] = useState(null);

    const handlePlanSubmission = (data) => {
        setPlan(data);
    };

    return (
        <div>
            {plan ? <Plan plan={plan} /> : <Form onSubmitPlan={handlePlanSubmission} />}
        </div>
    );
}

export default ParentComponent;
