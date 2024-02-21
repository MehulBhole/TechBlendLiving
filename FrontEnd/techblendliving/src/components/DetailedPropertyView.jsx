import { Button, Container, Row, Table } from "react-bootstrap";
import { FaFacebookMessenger, FaUser } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import { fetchById, getPropertyById } from "../services/User";
import { useNavigate } from "react-router-dom";
import "../Css/DetailedProperty.css";
import { servicesDataFetchByCity } from "../services/ServiceProvider";
import { fetchChatById, fetchChatReceiverById, sendChatData } from "../services/Chat";
import { NavigationBar } from "./NavigationBar";

export function DetailedPropertyView() {
  
  const navigate = useNavigate();
  const [propertyData, setPropertyData] = useState({});
  const [user,setUser] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const propertiesPerPage = 1; // Display one property per page
  const [details, setDetails] = useState([]);
  const [messages, setMessages] = useState([]);
  const [showChatWindow, setShowChatWindow] = useState(false); // State to manage chat window visibility
  const [newMessage, setNewMessage] = useState("");
  
  async function populateData() {
    try {
      const id = sessionStorage.getItem("id");
      console.log(id);
      const response = await fetchById(id);
      setUser(response.data);
      console.log(user);
      const propertyId = sessionStorage.getItem("property-id");
      const property = await getPropertyById(propertyId);
      setPropertyData(property.data);
      console.log(property.data);
      const propertydata = await servicesDataFetchByCity(property.data.address); 
      setDetails(propertydata.data);
      const receiverId = property.data.ownerOriginalId;
      console.log(receiverId);
      // const chatFetch = await fetchChatById(id, receiverId);
      // setMessages(chatFetch.data);
      // console.log(chatFetch.data);

      const chatFetch = await fetchChatById(id, receiverId);
      console.log(chatFetch.data)

      // Fetch chat data for the user's reply to the owner
      const replyChat = await fetchChatReceiverById(receiverId, id);
   console.log(replyChat.data)
      // Combine both chat data before updating the state
      const combinedMessages = [...chatFetch.data, ...replyChat.data];

      
      setMessages((prevMessages) => [...prevMessages, ...combinedMessages]);
      console.log(messages);
    } catch (error) {
      console.log(error);
    }
  }

  const handleGoBack = () => {
    navigate(-1);
  };
  const handleSendMessage = async () => {
    if (newMessage.trim() !== "") {
      const receiverIdo = propertyData.ownerOriginalId;
      const messageObject = {
        senderId: sessionStorage.getItem("id"),
        receiverId: receiverIdo,
        message: newMessage,
        senderName:user.name
      };
      // Append the new message to the messages state
      //const updatedMessages = [...messages, messageObject];
     
      setNewMessage(""); // Clear the input field
  
      try {
        // Send the updated messages to the server
        const response = await sendChatData(messageObject);
        populateData();
        console.log(response); // Log the response from the server
      } catch (error) {
        console.log(error); // Log any errors that occur during the request
      }
    }
  };

  const toggleChatWindow = () => {
    setShowChatWindow(!showChatWindow);
  };

  useEffect(() => {
    populateData();
    console.log(messages);
  }, []);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
    <NavigationBar></NavigationBar>
    <div className="userview">
      
      <Button className="backbtn"   variant="btn btn-outline-success" onClick={handleGoBack}>
        Back
      </Button>

      {/* Floating chat button */}
      

      {/* Chat window */}
      {showChatWindow && (
        <div className="chatWindow">
          <h3>Chat</h3>
          <div className="messageContainer">
            {messages.map((message, index) => (
              <div key={index} className={`message ${message.senderId}`}>
                <b>{message.senderName}</b>: {message.message}
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
      )}

      {/* Main content */}
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
            <div className="floating-chat-icon" onClick={toggleChatWindow}>
        <FaFacebookMessenger size="45px" />
      </div>
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
    </div>
    </>
  );
}
