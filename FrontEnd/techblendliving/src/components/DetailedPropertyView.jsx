import { Button, Container, Pagination, Row, Table } from "react-bootstrap";
import { FaUser } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import { fetchById, getPropertyById } from "../services/User";
import { useNavigate } from "react-router-dom";
import "../Css/DetailedProperty.css";
import { servicesDataFetch, servicesDataFetchByCity } from "../services/ServiceProvider";

export function DetailedPropertyView() {
  const navigate = useNavigate();
  const [propertyData, setPropertyData] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const propertiesPerPage = 1; // Display one property per page
  const [details, setDetails] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  async function populateData() {
    try {
      const id = sessionStorage.getItem("id");
      const response = await fetchById(id);
      const propertyId = sessionStorage.getItem("property-id");
      const property = await getPropertyById(propertyId);
      setPropertyData(property.data);
      const propertydata = await servicesDataFetchByCity(property.data.address); // Access propertyData.address after it's set
      setDetails(propertydata.data);
    } catch (error) {
      console.log(error);
    }
  }

  const handleGoBack = () => {
    navigate(`/userview`);
  };
  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      setMessages([...messages, { text: newMessage, sender: "user" }]);
      setNewMessage("");
      // Here you can implement logic to send the message to the server or other users
    }
  };

  useEffect(() => {
    populateData();
  }, []);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="userview">
      <Button className="backbtn" onClick={handleGoBack}>
        Back
      </Button>

      <div className="middleuser">
        <div className="detailsResult">
          <div className="parentRow">
            <table className="tableForProperty">
              <tbody>
                <tr>
                  <td colSpan="2">
                    <img
                      className="imageLayout"
                      src={`http://localhost:9090/fetchImageById/${propertyData.id}`}
                      alt="Property"
                    />
                  </td>
                </tr>
                <tr>
                  <td colSpan="2">
                    <h2>{propertyData.title}</h2>
                  </td>
                </tr>
                <tr>
                  <td>
                    <b>Type:</b> {propertyData.rentalType}
                  </td>
                  <td>
                    <b>Rent:</b> {propertyData.rent}
                  </td>
                </tr>
                <tr>
                  <td>
                    <b>Furnished Status:</b> {propertyData.furnished}
                  </td>
                  <td>
                    <b>Address:</b> {propertyData.address}
                  </td>
                </tr>
                <tr>
                  <td>
                    <b>Owner:</b> {propertyData.name}
                  </td>
                  <td>
                    <b>Email:</b> {propertyData.email}
                  </td>
                </tr>
                <tr>
                  <td colSpan="2">
                    <b>Contact No:</b> {propertyData.phoneNo}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="rightUser">
        <center><h2>Properties</h2></center>
        <Container className="containerHost">
          <Row>
            <Table style={{ textAlign: "center" }}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Contact Details</th>
                  <th>Service Name</th>
                  <th>City</th>
                  <th>Pin Code</th>
                  <th>Description</th>
                  <th>Rating</th>
                </tr>
              </thead>
              <tbody>
                {details.map(d =>
                  <tr key={d.id}> {/* Ensure each row has a unique key */}
                    <td>{d.name}</td>
                    <td>{d.email}</td>
                    <td>{d.phoneNumber}</td>
                    <td>{d.serviceName}</td>
                    <td>{d.city}</td>
                    <td>{d.pinCode}</td>
                    <td>{d.description}</td>
                    <td>{d.Remarks}</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Row>
        </Container>
      </div>
      <div className="chatWindow">
        <h3>Chat</h3>
        <div className="messageContainer">
          {messages.map((message, index) => (
            <div key={index} className={`message ${message.sender}`}>
              {message.text}
            </div>
          ))}
        </div>
        <input
          type="text"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <Button onClick={handleSendMessage}>Send</Button>
      </div>
    </div>
  );
}
