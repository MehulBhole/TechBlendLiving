import React, { useEffect, useState } from "react";
import { Button, Container, Row, Table } from "react-bootstrap";
import "../Css/ServiceDashboard.css";
import { FaUser } from "react-icons/fa";
import { OwnerDeleteById, getOnwerById, getOwnerById, propertyDataFetch, sendDataOwner } from "../services/Owner";
import { useNavigate } from "react-router-dom";
import { getServiceById, sendDataServiceDetails, serviceDeleteById, servicesDataFetch } from "../services/ServiceProvider";

export function ServiceDashBoard() {
  const id = sessionStorage.getItem("service-id");
  const navigate = useNavigate();
  const [details, setDetails] = useState([]);
  const [formData, setFormData] = useState({
    serviceName: '',
    description: '',
    city: '',
    pinCode: '',
  });
  

  const handleChange = (e) => {
  
      setFormData({ ...formData, [e.target.name]: e.target.value });
 
  };

  const handleDelete = async (propertyid) => {
    try {
      const response = await serviceDeleteById(propertyid);
      populateData();
    } catch (error) {
      console.log(error);
    }
  }

  const handleSave = async (e) => {
    e.preventDefault();
    console.log(id);
    try {
   

      const response = await sendDataServiceDetails(id, formData);
      if (response.data.status) {
        alert("Service Added !!");
      }
      populateData();
    } catch (error) {
      console.log(error);
    }
  }

  const [profileowner, setProfileOwner] = useState({
    name: "",
    email: "",
    password: "",
    phoneNo: "",
    city: "",
  });

  async function populateData() {
    try {
      const response = await getServiceById(id);
      setProfileOwner(response.data);
      const propertydata = await servicesDataFetch(id);
      setDetails(propertydata.data);
      console.log(propertydata);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    populateData();
  }, []);

  return (
   
    <div className="maindiv">
     
    <div className="serviceleft">
    <div className="heading">
          <h2>Service Info</h2>
          <hr></hr>
        </div>
        <div >
        <div className="usericon">
  <FaUser size={90}></FaUser>
</div>


            {profileowner && (
              <div className="userdiv">
                <b>Name:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {profileowner.name}</b>
              </div>
            )}

            {profileowner && (
              <div className="userdiv">
                <b>Email: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{profileowner.email}</b>
              </div>
            )}

            {profileowner && (
              <div className="userdiv">
                <b>City: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {profileowner.city} </b>
              </div>
            )}

            {profileowner && (
              <div className="userdiv">
                <b>Phone No: {profileowner.phoneNo}</b>
              </div>
            )}
          </div>
          <Button variant="success" onClick={()=>{
            navigate(`/profile`)
          }}  >View</Button>
        
    </div>
    <div className="middle">
    <center> <h3>Service Details</h3></center>
   <hr></hr>
   <br></br>
      <section >
      
     
          <form onSubmit={handleSave}>
          <label htmlFor="rent">Service Name</label>
            <input type="text"  name="serviceName" onChange={handleChange} required />
            <label htmlFor="rent">Description</label>
            <input type="text"  name="description" onChange={handleChange} required />
           
            
            <label htmlFor="rent">City</label>
            <input type="text"  name="city" onChange={handleChange} required />
            <label htmlFor="rent">PinCode</label>
            <input type="text" name="pinCode" onChange={handleChange} required />


            {/* <div className="radiobutton">
              <label htmlFor="furnished">Furnished</label>
              <input type="radio" name="furnished" onChange={handleChange} value="Fully Furnished" /> Fully Furnished
              <input type="radio" name="furnished" onChange={handleChange} value="Semi-Furnished" /> Semi-Furnished
              <input type="radio" name="furnished"  onChange={handleChange} value="No" /> No
            </div> */}

            {/* <label>Address</label>
            <textarea
              className="txtarea"
              rows={4}
              name="address"
              onChange={handleChange}
              cols={10}
            /> */}

             {/* <label htmlFor="image1">Images</label>
            <input type="file" name="image1" accept="image/*"  onChange={handleChange}  /> */}

           
            <center>
              <button className="nxtbtn" type="submit">
                Save
              </button>
            </center>
          </form>
       
      </section>
    </div>
    <div className="right">
    <center><h2>Properties</h2></center>
         <Container className="containerHost">
            <Row>
            <Table striped bordered hover style={{textAlign:"center"}}>
      <thead>
        <tr>
          <th>Service Name</th>
          <th>City</th>
          <th>Pin Code</th>
          <th>Description</th>
          <th>Rating</th>
        </tr>
      </thead>
      <tbody>
         {details.map(d=>
        <tr>
          <td>{d.serviceName}</td>
          <td>{d.city}</td>
          <td>{d.pinCode}</td>
         
          <td>{d.description}</td>

          <td>
          <Button style={{marginLeft: 1 + 'em'}}variant="danger" onClick={()=>{
            handleDelete(d.id)
          }}>Delete</Button>
           {/* <Button style={{marginLeft: 1 + 'em'}}variant="success" onClick={()=>{
            // handleApprove(d.id)
          }}>Edit</Button> */}
          </td>
          <td>{d.Remarks}</td>
          <td></td>
        </tr>
       )}
      </tbody>
    </Table>
            </Row>
        </Container>
        <Button variant="success" className="nxtbtn" onClick={()=>{
          navigate(`/tempview`);
        }}>View</Button>
    </div>
    </div>
  
  );
}
