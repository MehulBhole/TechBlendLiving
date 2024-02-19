import React, { useEffect, useState } from "react";
import { FaFacebookMessenger, FaUser } from "react-icons/fa";
import { getOwnerById, propertyDataFetch } from "../services/Owner";
import { Button, Container, Row, Table } from "react-bootstrap";
import { fetchChatById, fetchChatReceiverById, messagesReceived, sendChatData } from "../services/Chat";
import { fetchById } from "../services/User";
import { useNavigate } from "react-router-dom";
import { NavigationBar } from "./NavigationBar";

export function TempView() {
  const ownerId = sessionStorage.getItem("owner-id");
   const navigate = useNavigate();
  const [details, setDetails] = useState([]);
  const [userData, setUserData] = useState([]);
  const [showChatWindow, setShowChatWindow] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [profileOwner, setProfileOwner] = useState({
    name: "",
    email: "",
    password: "", 
    phoneNo: "",
    city: "",
  });
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const ownerResponse = await getOwnerById(ownerId);
        setProfileOwner(ownerResponse.data);

        const propertyDataResponse = await propertyDataFetch(ownerId);
        setDetails(propertyDataResponse.data);

        const chatsResponse = await messagesReceived(ownerId);
        const uniqueSendersArray = Array.from(
          new Set(chatsResponse.data.map((message) => message.senderId))
        );

        const userDataPromises = uniqueSendersArray.map(async (senderId) => {
          const userDataResponse = await fetchById(senderId);
          return userDataResponse.data;
        });

        const userDataArray = await Promise.all(userDataPromises);
        setUserData(userDataArray);

        const messagesPromises = uniqueSendersArray.map(async (userId) => {
          const chatFetch = await fetchChatById(ownerId, userId);
          const replyChat = await fetchChatReceiverById(userId, ownerId);
          return [...chatFetch.data, ...replyChat.data];

        });

        const allMessages = await Promise.all(messagesPromises);
        const combinedMessages = allMessages.flat();
        setMessages(combinedMessages);
        console.log(messages);
        
        const id="mehul";

      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, [ownerId]);

  const toggleChatWindow = () => {
    setShowChatWindow(!showChatWindow);
  };

  const handleSendMessage = async () => {
    if (newMessage.trim() !== "") {
      const receiverId = sessionStorage.getItem("user-id");

      const messageObject = {
        senderId: ownerId,
        receiverId: receiverId,
        message: newMessage,
        senderName: profileOwner.name
      };

      setNewMessage("");

      try {
        const response = await sendChatData(messageObject);
        setMessages(prevMessages => [...prevMessages, messageObject]);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleUserSelect = async (userId) => {
    try {
      const chatFetch = await fetchChatById(ownerId, userId);
      setMessages(chatFetch.data);
      sessionStorage.setItem("user-id", userId);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
    <NavigationBar></NavigationBar>
    <div className="maindiv">
       
      <div className="left">
        <div className="heading">
          <h2>Profile</h2>
          <hr />
        </div>
        <div>
          <div className="usericon">
            <FaUser size={90} />
          </div>
          <div className="userdiv">
            <b>Name:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {profileOwner.name}</b>
          </div>
          <div className="userdiv">
            <b>Email: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{profileOwner.email}</b>
          </div>
          <div className="userdiv">
            <b>City: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {profileOwner.city} </b>
          </div>
          <div className="userdiv">
            <b>Phone No: {profileOwner.phoneNo}</b>
          </div>
          <Button variant="success" className="nxtbtn" onClick={()=>{
          navigate(`/private`);
        }}>Back</Button>
        </div>
      </div>

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

      <div className="right">
        <center><h2>Messages</h2></center>
        <Container className="containerHost">
          <Row>
            <Table striped bordered hover style={{ textAlign: "center" }}>
              <thead>
                <tr>
                  <th>User Name</th>
                  <th>Email </th>
                  <th>Contact No</th>
                  <th>Messages</th>
                </tr>
              </thead>
              <tbody>
                {userData.map((user, index) => (
                  <tr key={index} onClick={() => handleUserSelect(user.id)}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.phoneNo}</td>
                    <td>
                      <div className="floating-chat-icon" onClick={toggleChatWindow}>
                        <FaFacebookMessenger size="20px" />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Row>
        </Container>
      </div>
      
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
    </div>
    </>
  );
}


