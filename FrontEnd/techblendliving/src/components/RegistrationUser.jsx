import React, { useState } from "react";
import "../Css/RegistrationUser.css";
import { sendUserData } from "../services/User";
import { useNavigate } from "react-router-dom";

export function RegistrationUser() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    phoneNo: "",
    city: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });

    // Validate input on each change
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
      case "city":
        newErrors.city = value.trim() === "" ? "City is required" : "";
        break;
      default:
        break;
    }

    setErrors(newErrors);
  };

  const validateForm = () => {
    // Validate all fields
    const newErrors = { ...errors };
    let valid = true;

    Object.keys(userData).forEach((fieldName) => {
      validateField(fieldName, userData[fieldName]);
      if (newErrors[fieldName] !== "") {
        valid = false;
      }
    });

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const response = await sendUserData(userData);
        if (response.data.status) {
          navigate(`/login-user`);
        } else {
          alert("Already Registered!!");
        }
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="userContainer">
      <div className="Reg-container">
        <h1>User Registration</h1>
        <br />
        <h5>
          <a href="/registrationowner">Register as tenant ?</a>
        </h5>
        <br />
        <form onSubmit={handleSubmit}>
          <br />
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={userData.name}
            onChange={handleChange}
            required
          />
          {errors.name && <p className="error">{errors.name}</p>}

          <label>Email ID</label>
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            required
          />
          {errors.email && <p className="error">{errors.email}</p>}

          <label>Password</label>
          <input
            type="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
            required
          />
          {errors.password && <p className="error">{errors.password}</p>}

          <label>Phone Number</label>
          <input
            type="text"
            name="phoneNo"
            value={userData.phoneNo}
            onChange={handleChange}
            required
          />
          {errors.phoneNo && <p className="error">{errors.phoneNo}</p>}

          <label htmlFor="city">City</label>
          <input
            type="text"
            name="city"
            value={userData.city}
            onChange={handleChange}
            required
          />
          {errors.city && <p className="error">{errors.city}</p>}

          <center>
            <button className="nxtbtn" type="submit">
              Next
            </button>
          </center>
        </form>
        <div className="or-separator">
          <br />
          <hr />
          <center>OR</center>
          <br />
        </div>
        <div className="login-options">
          <a href="#" className="login-google">
            <p>Register with Google</p>
            <img
              src="https://img.icons8.com/?size=48&id=17949&format=png"
              alt="Google Icon"
            />
          </a>
        </div>
      </div>
      <div className="Foot">
        <center>
          <p>
            New here ? <a href="#">Sign Up</a>
          </p>
        </center>
      </div>
    </div>
  );
}
