import { useEffect, useState } from "react";
import { Button, Container, Row, Table } from "react-bootstrap";
import "../Css/Host.css";
import { FetchApprovalDetails, FetchApprovalDetailsForServiceProvider, HostApprovalById, HostApprovalServiceById, HostRejectionById, HostRejectionServiceById } from "../services/HostApproval";
import { useNavigate } from "react-router-dom";
import { NavigationBar } from "./NavigationBar";
export function Host() {

  const navigate = useNavigate();
  const [owner, setOwner] = useState([]);
  const [service, setServiceProvider] = useState([]);

  async function populateAdmindata() {
    try {
      const serviceProvider = await FetchApprovalDetailsForServiceProvider();
      setServiceProvider(serviceProvider.data);
      const response = await FetchApprovalDetails();
      console.log(response);
      setOwner(response.data);

    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async (id) => {
    try {
      const response = await HostRejectionById(id);
      populateAdmindata()
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }
  const handleDeleteService = async (id) => {
    try {
      const response = await HostRejectionServiceById(id);
      populateAdmindata()
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }
  const handleApprove = async (id) => {
    try {

      const response = await HostApprovalById(id);
      populateAdmindata()
      console.log(response);

    } catch (error) {
      console.log(error);
    }
  }
  const handleApproveService = async (id) => {
    try {

      const response = await HostApprovalServiceById(id);
      populateAdmindata()
      console.log(response);

    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    populateAdmindata()
  }, [])

  return (
    <>
      <NavigationBar></NavigationBar>
      <body className="main-body">

      <button className="feedback-btn" width="30px" onClick={() => {
                  navigate(`/fetchFeedbackDetails`);
                }}>Show Feedback's</button>
        <div className="host">


          <div className="OwnerApproval">
            <center><h2>Owner Approval</h2></center>
            <Container className="containerHost">
              <Row>
                <table className="table"  >
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone No</th>
                      <th>Pancard Number</th>
                      <th>Address</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {owner.map(d =>
                      <tr>
                        <td>{d.name}</td>
                        <td>{d.email}</td>
                        <td>{d.phoneNo}</td>
                        <td>{d.panNumber}</td>
                        <td>{d.address}</td>

                        <td>
                          <Button style={{ marginLeft: 1 + 'em' }} variant="danger" onClick={() => {
                            handleDelete(d.id)
                          }}>Reject</Button>
                          <Button style={{ marginLeft: 1 + 'em' }} variant="success" onClick={() => {
                            handleApprove(d.id)
                          }}>Approve</Button>
                        </td>
                        <td>{d.Remarks}</td>
                        <td></td>
                      </tr>
                    )}
                  </tbody>
                </table>
                
              </Row>
            </Container>
          </div>
          <div className="serviceApproval">
            <center><h2>Service Provider Approval</h2></center>
            <Container className="containerHost">
              <Row>
                <table className="table"  >
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone No</th>
                      <th>Pancard Number</th>
                      <th>Address</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {service.map(d =>
                      <tr>
                        <td>{d.name}</td>
                        <td>{d.email}</td>
                        <td>{d.phoneNo}</td>
                        <td>{d.panNumber}</td>
                        <td>{d.city}</td>

                        <td>
                          <Button style={{ marginLeft: 1 + 'em' }} variant="danger" onClick={() => {
                            handleDeleteService(d.id)
                          }}>Reject</Button>
                          <Button style={{ marginLeft: 1 + 'em' }} variant="success" onClick={() => {
                            handleApproveService(d.id)
                          }}>Approve</Button>
                        </td>
                        <td>{d.Remarks}</td>
                        <td></td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </Row>
            </Container>
          </div>

        </div>
      </body>
    </>
  );
}