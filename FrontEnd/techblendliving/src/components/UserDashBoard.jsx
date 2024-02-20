import { Button, Pagination } from "react-bootstrap";
import { FaUser } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import {
  fetchAllProperties,
  fetchById,
  getSearchProperty,
} from "../services/User";
import { useNavigate } from "react-router-dom";
import { NavigationBar } from "./NavigationBar";
import "../Css/UserDashBoard.css"

export function UserDashBoard() {
  const navigate = useNavigate();
  const [search, setSearch] = useState({ city: "" });
  const [priceFilter, setPriceFilter] = useState("");
  const [propertyData, setPropertyData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const propertiesPerPage = 2; // Number of properties to display per page
  const [userdata, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    phoneNo: "",
    city: "",
  });
  async function populateData() {
    try {
      const id = sessionStorage.getItem("id");
      const response = await fetchById(id);
      const properties = await fetchAllProperties();
      setPropertyData(properties.data);
      setUserData(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  const handleGoBack = () => {
    navigate(-1); // Navigate back one step in the history stack
  };

  const handleSearch = (e) => {
    setSearch({ ...search, [e.target.name]: e.target.value });
    filterProperties(priceFilter, e.target.value);
  };

  const handlePriceFilterChange = (e) => {
    const price = e.target.value;
    setPriceFilter(price);
    filterProperties(price, search.city);
  };

  const filterProperties = async (price, city) => {
    try {
      const response = await getSearchProperty(city);
      let filteredProperties = response.data;

      // Apply price filter if set
      if (price !== "") {
        filteredProperties = filteredProperties.filter(
          (property) => property.rent <= parseInt(price)
        );
      }

      setPropertyData(filteredProperties);
    } catch (error) {
      console.log(error);
    }
  };
  const clearFilters = () => {
    setPriceFilter("");
    setSearch({ city: "" });
    populateData();
  };

  useEffect(() => {
    populateData();
  }, []);

  // Calculate indexes for properties to display on the current page
  const indexOfLastProperty = currentPage * propertiesPerPage;
  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
  const currentProperties = propertyData.slice(
    indexOfFirstProperty,
    indexOfLastProperty
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <NavigationBar></NavigationBar>
      <div className="userview">

        <Button className="backbtn" variant="btn btn-outline-success" onClick={handleGoBack}>
          Back
        </Button>
        {/* Left section */}
        <div className="leftuser">
          {/* User Info */}
          <div className="heading">
            <h2>User Info</h2>
            <hr />
          </div>
          <div className="userData">
            <div className="usericon">
              <FaUser size={90} />
            </div>
            {userdata && (
              <div className="userdiv">
                <b>
                  Name:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
                  {userdata.name}
                </b>
              </div>
            )}
            {userdata && (
              <div className="userdiv">
                <b>
                  Email: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  {userdata.email}
                </b>
              </div>
            )}
            {userdata && (
              <div className="userdiv">
                <b>
                  City:
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
                  {userdata.city}{" "}
                </b>
              </div>
            )}
            {userdata && (
              <div className="userdiv">
                <b>Phone No: {userdata.phoneNo}</b>
              </div>
            )}
            <br />
            <Button variant="success" onClick={() => navigate(`/profile`)}>
              View
            </Button>
          </div>
        </div>

        {/* Middle section */}
        <div className="middleuser">
          {/* Search box */}
          <div className="sort-with-price">
            {/* <div className="price-filter"> */}
            &nbsp;	&nbsp;	&nbsp;	&nbsp;	&nbsp;<label 
              htmlFor="">Sort with price :  </label>
              <input
                className="sort-with-price-input"
                type="number"
                placeholder="Max Price"
                value={priceFilter}
                onChange={handlePriceFilterChange}
              />
              {priceFilter && (
                <Button className="clear-btn" onClick={clearFilters}>
                  Clear Price Filter
                </Button>
              )}
            {/* </div> */}

            <div className="search-for-city">
            &nbsp;	&nbsp;	&nbsp;	&nbsp;	&nbsp; <label htmlFor="">Search with city :</label>
              <input
              className="search-for-city-input"
                type="text"
                placeholder="Search for city"
                name="city"
                onChange={handleSearch}
                value={search.city}
              />
            </div>
          </div>
          <hr />

          {/* Search Result */}
          <div className="searchResult">
            <div className="corouselparent">
              <div className="parentRow">
                <table className="table">
                  <thead>
                    <tr>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentProperties.map((property, index) => (
                      <React.Fragment key={index}>
                        <tr>
                          <center>
                            <td>
                              <img
                                className="imageLayout"
                                src={`http://localhost:9090/fetchImageById/${property.id}`}
                                alt="Property"
                                height="200"
                                width="500"
                                onClick={() => {
                                  sessionStorage.setItem('property-id', property.id);

                                  navigate(`privateuser/detailedPropertyView`)
                                }}
                              />
                            </td>
                          </center>
                        </tr>
                        <tr>
                          <center>
                            <td>
                              <b>Type: </b>
                              {property.rentalType} <b> Rent: </b>
                              {property.rent} <b>FurnishedStatus:</b>{" "}
                              {property.furnished} <b>Add:</b> {property.address}{" "}
                            </td>
                          </center>
                        </tr>
                        <hr />
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Pagination */}
          <Pagination>
            {Array.from({
              length: Math.ceil(propertyData.length / propertiesPerPage),
            }).map((_, index) => (
              <Pagination.Item
                key={index}
                active={index + 1 === currentPage}
                onClick={() => paginate(index + 1)}
              >
                {index + 1}
              </Pagination.Item>
            ))}
          </Pagination>
        </div>

      </div>
    </>
  );
}
