import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

function Form2() {
    const [formData, setFormData] = useState({
        from: '',
        to: '',
        days: '',
        food: []
    });

    const toggleFoodSelection = (food) => {
        setFormData(prevState => ({
            ...prevState,
            food: prevState.food.includes(food) ? prevState.food.filter(f => f !== food) : [...prevState.food, food]
        }));
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(formData);
        // ... handle form submission
    }

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="Where From"
                variant="outlined"
                name="from"
                value={formData.from}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Where To"
                variant="outlined"
                name="to"
                value={formData.to}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Number of days"
                variant="outlined"
                name="days"
                type="number"
                value={formData.days}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
            />
            <Box mt={2}>
                Food:
                <Button variant={formData.food.includes('Japanese') ? "contained" : "outlined"} color="primary" onClick={() => toggleFoodSelection('Japanese')}>Japanese</Button>
                <Button variant={formData.food.includes('Italian') ? "contained" : "outlined"} color="primary" onClick={() => toggleFoodSelection('Italian')}>Italian</Button>
                {/* ... add more buttons as needed */}
            </Box>
            <Box mt={2}>
                <Button type="submit" variant="contained" color="primary">Submit</Button>
            </Box>
        </form>
    );
}

export default Form2;