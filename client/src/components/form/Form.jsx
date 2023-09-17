import React, { useState, useContext } from "react";  // <-- Added useContext here
import { TextField, Button, Box, Typography } from "@mui/material";
import LocationContext from "../../contexts/LocationContext";  // <-- Adjust the path based on your folder structure
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./form.css";;


function Form() {
  const navigate = useNavigate();
  const { locationData, setLocationData } = useContext(LocationContext); // Use the context

  // Use form data from the context, or default to initial state
  const initialFormData = locationData.formData || {
    from: "",
    to: "",
    days: "",
    food: [],
    hobbies: [],
    places: [],
    other: "",
  };

  const [formData, setFormData] = useState(initialFormData);

  const toggleSelection = (field, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [field]: prevState[field].includes(value)
        ? prevState[field].filter((item) => item !== value)
        : [...prevState[field], value],
    }));
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // Update formData in the context
    setLocationData({ ...locationData, formData: formData });
  
    try {
      // Making the API call
      const response = await axios.get(`http://localhost:4000/api/${formData.from}/${formData.to}/`);
      console.log(response);
      // On successful API call, update the serverResponse in the context
      setLocationData({ ...locationData, formData: formData, serverResponse: response.data });
  
      // Navigate to /result after successful API call and context update
      navigate('/result');
    } catch (error) {
      console.error("Error fetching data from server:", error);
    }
  };


  return (
    <>
      <div className="container-form">
        <h1>Plan your Epic Trip</h1>
      </div>
      <div className="container-form">
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
            <Typography
              sx={{ fontFamily: '"Poppins", sans-serif', marginBottom: "5px" }}
            >
              Food:
            </Typography>
            {[
              "Japanese",
              "Chinese",
              "American",
              "Italian",
              "Mediterranean",
            ].map((food) => (
              <Button
                variant={
                  formData.food.includes(food) ? "contained" : "outlined"
                }
                color="primary"
                onClick={() => toggleSelection("food", food)}
                key={food}
                sx={{
                  borderRadius: "14px",
                  color: formData.food.includes(food) ? "white" : "#281e41",
                  backgroundColor: formData.food.includes(food)
                    ? "#281e41"
                    : "white",
                  padding: "10px 20px",
                  textDecoration: "none",
                  border: formData.food.includes(food) ? "none" : "solid",
                  fontSize: "1rem",
                  fontWeight: "lighter",
                  fontFamily: '"Poppins", sans-serif',
                  marginRight: "10px",
                  "&:last-child": {
                    marginRight: "0",
                  },
                }}
              >
                {food}
              </Button>
            ))}
          </Box>
          <Box mt={2}>
            <Typography
              sx={{ fontFamily: '"Poppins", sans-serif', marginBottom: "5px" }}
            >
              Hobbies:
            </Typography>
            {["Sight-seeing", "Hiking", "Reading", "Sport"].map((hobby) => (
              <Button
                variant={
                  formData.hobbies.includes(hobby) ? "contained" : "outlined"
                }
                color="primary"
                onClick={() => toggleSelection("hobbies", hobby)}
                key={hobby}
                sx={{
                  borderRadius: "14px",
                  color: formData.hobbies.includes(hobby) ? "white" : "#281e41",
                  backgroundColor: formData.hobbies.includes(hobby)
                    ? "#281e41"
                    : "white",
                  padding: "10px 20px",
                  textDecoration: "none",
                  border: formData.hobbies.includes(hobby) ? "none" : "solid",
                  fontSize: "1rem",
                  fontWeight: "lighter",
                  fontFamily: '"Poppins", sans-serif',
                  marginRight: "10px",
                  "&:last-child": {
                    marginRight: "0",
                  },
                }}
              >
                {hobby}
              </Button>
            ))}
          </Box>
          <Box mt={2}>
            <Typography
              sx={{ fontFamily: '"Poppins", sans-serif', marginBottom: "5px" }}
            >
              Places:
            </Typography>
            {[
              "Museums",
              "Theatre",
              "Beach",
              "Hidden Gems",
              "Must-see Attractions",
            ].map((place) => (
              <Button
                variant={
                  formData.places.includes(place) ? "contained" : "outlined"
                }
                color="primary"
                onClick={() => toggleSelection("places", place)}
                key={place}
                sx={{
                  borderRadius: "14px",
                  color: formData.places.includes(place) ? "white" : "#281e41",
                  backgroundColor: formData.places.includes(place)
                    ? "#281e41"
                    : "white",
                  padding: "10px 20px",
                  textDecoration: "none",
                  border: formData.places.includes(place) ? "none" : "solid",
                  fontSize: "1rem",
                  fontWeight: "lighter",
                  fontFamily: '"Poppins", sans-serif',
                  marginRight: "10px",
                  "&:last-child": {
                    marginRight: "0",
                  },
                }}
              >
                {place}
              </Button>
            ))}
          </Box>
          <Box mt={2}>
            <TextField
              label="What else would you want us to take into consideration? (Optional)"
              variant="outlined"
              name="other"
              value={formData.other}
              onChange={handleInputChange}
              fullWidth
            />
          </Box>
          <Box mt={2}>
            <Button
              className="btn"
              type="submit"
              variant="contained"
              color="primary"
              sx={{
                borderRadius: "14px",
                color: "white",
                backgroundColor: "#281e41",
                padding: "10px 20px",
                textDecoration: "none",
                border: "none",
                fontSize: "1rem",
                fontWeight: "lighter",
                fontFamily: '"Poppins", sans-serif',
                marginRight: "10px",
                marginBottom: "30px",
                "&:last-child": {
                  marginRight: "0",
                },
                marginTop: "20px",
              }}
            >
              Let the magic begin
            </Button>
          </Box>
        </form>
      </div>
    </>
  );
}

export default Form;
