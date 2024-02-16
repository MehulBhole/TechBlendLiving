import React, { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { getOwnerById, propertyDataFetch } from "../services/Owner";
import "../Css/TempView.css";
import { Button, Container, Row, Table } from "react-bootstrap";
import { messagesReceived } from "../services/Chat";

export function TempView() {
  const id = sessionStorage.getItem("owner-id");

  const [details, setDetails] = useState([]);
  const [uniqueSenders, setUniqueSenders] = useState([]);
  const [profileOwner, setProfileOwner] = useState({
    name: "",
    email: "",
    password: "",
    phoneNo: "",
    city: "",
  });

  async function populateData() {
    try {
      const response = await getOwnerById(id);
      setProfileOwner(response.data);
      const propertyData = await propertyDataFetch(id);
      setDetails(propertyData.data);
      const chatsResponse = await messagesReceived(id);
      const sendersSet = new Set();
      chatsResponse.data.forEach((message) => {
        sendersSet.add(message.senderId);
      });
      setUniqueSenders(Array.from(sendersSet));
      console.log(propertyData);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    populateData();
  }, []);

  return (
    <div className="maindiv">
      {/* Left Section */}
      <div className="left">
        <div className="heading">
          <h2>Owner Info</h2>
          <hr />
        </div>
        <div>
          <div className="usericon">
            <FaUser size={90} />
          </div>
          {profileOwner && (
            <div className="userdiv">
              <b>Name:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {profileOwner.name}</b>
            </div>
          )}
          {profileOwner && (
            <div className="userdiv">
              <b>Email: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{profileOwner.email}</b>
            </div>
          )}
          {profileOwner && (
            <div className="userdiv">
              <b>City: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {profileOwner.city} </b>
            </div>
          )}
          {profileOwner && (
            <div className="userdiv">
              <b>Phone No: {profileOwner.phoneNo}</b>
            </div>
          )}
        </div>
      </div>

      {/* Middle Section */}
      <div className="middletemp">
        <center><h3>Property Details</h3></center>
        <table className="table">
          <thead>
            <tr>
              <th>Rental Type</th>
              <th>Rent</th>
              <th>Furnished</th>
              <th>Address</th>
              <th>Image</th>
            </tr>
          </thead>
          <tbody>
            {details.map((property, index) => (
              <tr key={index}>
                <td>{property.rentalType}</td>
                <td>{property.rent}</td>
                <td>{property.furnished}</td>
                <td>{property.address}</td>
                <td><img src={`http://localhost:9090/fetchImageById/${property.id}`} alt="Property" height="100" width="100" /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Right Section */}
      <div className="right">
        <center><h2>Unique Senders</h2></center>
        <Container className="containerHost">
          <Row>
            <Table striped bordered hover style={{ textAlign: "center" }}>
              <thead>
                <tr>
                  <th>Sender ID</th>
                </tr>
              </thead>
              <tbody>
                {uniqueSenders.map((sender, index) => (
                  <tr key={index}>
                    <td>{sender}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Row>
        </Container>
      </div>
    </div>
  );
}
