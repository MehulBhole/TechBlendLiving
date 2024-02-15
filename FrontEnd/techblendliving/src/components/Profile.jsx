import { Button, Form } from "react-bootstrap";
import { FaUser } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import { fetchById } from "../services/User";
import { useNavigate } from "react-router-dom";
import "../Css/Profile.css";
import { getOwnerById } from "../services/Owner";
import { getServiceById } from "../services/ServiceProvider";

export function Profile() {
  const navigate = useNavigate();
  const [userdata, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    phoneNo: "",
    city: "",
  });

  // State variables for editable fields
  const [editMode, setEditMode] = useState(false);
  const [editedUserData, setEditedUserData] = useState({ ...userdata });

  useEffect(() => {
    populateData();
  }, []);

  async function populateData() {
    try {

      if(sessionStorage.getItem("owner-id")!=null){
        const id = sessionStorage.getItem("owner-id");
        const response = await getOwnerById(id);
      setUserData(response.data);
      }
      
      if(sessionStorage.getItem("service-id")!=null){
        const id = sessionStorage.getItem("service-id");
        const response = await getServiceById(id);
      setUserData(response.data);
      }
      if(sessionStorage.getItem("id")!=null){
        const id = sessionStorage.getItem("id");
        const response = await fetchById(id);
        setUserData(response.data);
      }
      
      
    } catch (error) {
      console.log(error);
    }
  }

  const handleEdit = () => {
    setEditMode(true);
    setEditedUserData({ ...userdata });
  };

  const handleCancelEdit = () => {
    setEditMode(false);
  };

  const handleSave = () => {
    setUserData({ ...editedUserData });
    setEditMode(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUserData({ ...editedUserData, [name]: value });
  };

  return (
    <div className="profile-container">
      <div className="card-header">
        <h2>Profile</h2>
        <hr />
      </div>
      <div className="card-body">
        <div className="user-data">
          <div className="user-icon">
            <FaUser size={90} />
          </div>
          {editMode ? (
            <Form>
              <Form.Group controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={editedUserData.name}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={editedUserData.email}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="formPhoneNo">
                <Form.Label>Phone No</Form.Label>
                <Form.Control
                  type="text"
                  name="phoneNo"
                  value={editedUserData.phoneNo}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="formCity">
                <Form.Label>City</Form.Label>
                <Form.Control
                  type="text"
                  name="city"
                  value={editedUserData.city}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <div className="edit-buttons">
                <Button variant="primary" onClick={handleSave}>
                  Save
                </Button>{" "}
                <Button variant="secondary" onClick={handleCancelEdit}>
                  Cancel
                </Button>
              </div>
            </Form>
          ) : (
            <>
              <div className="user-details">
                <b>Name:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {userdata.name}</b>
              </div>
              <div className="user-details">
                <b>Email: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{userdata.email}</b>
              </div>
              <div className="user-details">
                <b>City: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {userdata.city} </b>
              </div>
              <div className="user-details">
                <b>Phone No: {userdata.phoneNo}</b>
              </div>
              <Button variant="primary" className="button-edit-profile" onClick={handleEdit}>
                Edit Profile
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
