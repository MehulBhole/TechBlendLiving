import React, { useState } from "react";
import { sendOwnerData } from "../services/Owner";
import "../Css/RegisterOwner.css";
import { useNavigate } from "react-router-dom";

export function RegistrationOwner() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNo: "",
    password: "",
    address: "",
    dob: "",
    panNumber: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    validateField(e.target.name, e.target.value);
  };

  const validateField = (fieldName, value) => {
    const newErrors = { ...errors };

    switch (fieldName) {
      case "name":
        newErrors.name = value.trim() === "" ? "Name is required" : "";
        break;
      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i;
        newErrors.email = emailRegex.test(value) ? "" : "Invalid email address";
        break;
      case "password":
        const passwordRegex =
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%?&])[A-Za-z\d@$!%?&]{6,}$/;
        newErrors.password = passwordRegex.test(value)
          ? ""
          : "Password must meet the specified criteria";
        break;
      case "phoneNo":
        const phoneRegex = /^[6-9]\d{9}$/;
        newErrors.phoneNo = phoneRegex.test(value.replace(/\D/g, ""))
          ? ""
          : "Invalid 10-digit phone number";
        break;
      case "panNumber":
        const panRegex = /[A-Z]{5}[0-9]{4}[A-Z]/;
        newErrors.panNumber = panRegex.test(value) ? "" : "Invalid PAN card number";
        break;
      default:
        break;
    }

    setErrors(newErrors);
  };

  const validateForm = () => {
    const newErrors = { ...errors };
    let isValid = true;

    Object.keys(formData).forEach((fieldName) => {
      validateField(fieldName, formData[fieldName]);
      if (newErrors[fieldName] !== "") {
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (1) {
      try {
        const response = await sendOwnerData(formData);
        console.log(response);
        if (!response.data.status) {
          alert("User Already Registered !!");
        } else {
          alert("Wait till Approval !!");
          navigate(`/`);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="ownercontainer">
      <div className="regowner-container">
        <h1>Owner Registration</h1>
        <br />
        <h5>
          <a href="/registrationuser">Register as Owner ?</a>
        </h5>
        <br />
        <form onSubmit={handleSubmit}>
          <label>Name</label>
          <input
            type="text"
            name="name"
            onChange={handleChange}
            required
          />
          {errors.name && <p className="error">{errors.name}</p>}

          <label>Email ID</label>
          <input
            type="email"
            name="email"
            onChange={handleChange}
            required
          />
          {errors.email && <p className="error">{errors.email}</p>}

          <label>Password</label>
          <input
            type="password"
            name="password"
            onChange={handleChange}
            required
          />
          {errors.password && <p className="error">{errors.password}</p>}

          <label>Phone Number</label>
          <input
            type="text"
            maxLength={10}
            minLength={10}
            name="phoneNo"
            onChange={handleChange}
            required
          />
          {errors.phoneNo && <p className="error">{errors.phoneNo}</p>}

          <label>Pancard Number</label>
          <input
            type="text"
            name="panNumber"
            maxLength={10}
            minLength={10}
            onChange={handleChange}
            required
          />
          {errors.panNumber && <p className="error">{errors.panNumber}</p>}

          <label>Date of Birth</label>
          <input type="date" name="dob"
          onChange={handleChange} required />

          <div className="form-group">
            <label>Personal Address</label>
            <textarea
              className="txtarea"
              rows={4}
              cols={10}
              onChange={handleChange}
              name="address"
            />
          </div>
          <center>
            <button className="nxtbtn" type="submit">
              Next
            </button>
          </center>
        </form>
      </div>
    </div>
  );
}