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
  async function populateData() {
    try {
      const id = sessionStorage.getItem("id");
      const response = await fetchById(id);
      
      const propertyId = sessionStorage.getItem("property-id");
      const property = await getPropertyById(propertyId);
      setPropertyData(property.data);
      console.log(propertyData.address)
      const propertydata = await servicesDataFetchByCity(propertyData.address);
      setDetails(propertydata.data);
      
    } catch (error) {
      console.log(error);
    }
  }

  const handleGoBack = () => {
    navigate(`/userview`);
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

        {/* Pagination */}
        {/* <Pagination>
          <Pagination.Item
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </Pagination.Item>
          <Pagination.Item
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === Math.ceil(propertyData.length / propertiesPerPage)}
          >
            Next
          </Pagination.Item>
        </Pagination> */}
      </div>
      <div className="rightUser">
      <center><h2>Properties</h2></center>
         <Container className="containerHost">
            <Row>
            <Table  style={{textAlign:"center"}}>
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

          
          {/* <Button style={{marginLeft: 1 + 'em'}}variant="danger" onClick={()=>{
           // handleDelete(d.id)
          }}>Delete</Button> */}
           {/* <Button style={{marginLeft: 1 + 'em'}}variant="success" onClick={()=>{
            // handleApprove(d.id)
          }}>Edit</Button> */}
          
          <td>{d.Remarks}</td>
         
        </tr>
       )}
      </tbody>
    </Table>
            </Row>
        </Container>
        {/* <Button variant="success" className="nxtbtn" onClick={()=>{
          navigate(`/tempview`);
        }}>View</Button> */}
      </div>

    </div>
  );
}
