// Dashboard.js
import React, { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { getOwnerById, propertyDataFetch } from "../services/Owner";

export function TempView() {
  const id = sessionStorage.getItem("owner-id");

  const [details, setDetails] = useState([]);
  const [profileowner, setProfileOwner] = useState({
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
      const propertydata = await propertyDataFetch(id);
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
      <div className="left">
        <div className="heading">
          <h2>Owner Info</h2>
          <hr></hr>
        </div>
        <div>
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
      </div>
      <div className="middle">
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
    </div>
  );
}
