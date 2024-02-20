import { useEffect, useState } from "react";
import { FetchFeedbackDetails } from "../services/HostApproval";
import { NavigationBar } from "./NavigationBar";
import { Table } from "react-bootstrap";



export function Feedback() {

  const [details, setDetails] = useState([]);
  async function populateFeedbackdata() {
    try {
      const response = await FetchFeedbackDetails();
      console.log("Feedbacks", response);
      setDetails(response.data);

    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    populateFeedbackdata()
  }, [])

  return (
    <>
      <NavigationBar></NavigationBar>
      <Table striped bordered hover className="table" style={{
        textAlign: "center", width: "70%", marginTop: "15px",marginLeft:"15%"
        // display: "flex", alignItems: "center", justifyContent: "center"
      }}  >
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone No</th>
            <th>Subject</th>
            <th>Message</th>
          </tr>
        </thead>

        <tbody>
          {details.map(d =>
            <tr>
              <td>{d.name}</td>
              <td>{d.email}</td>
              <td>{d.phonenumber}</td>
              <td>{d.subject}</td>
              <td>{d.message}</td>
              <td></td>
            </tr>
          )}
        </tbody>
      </Table>
    </>

  );
}