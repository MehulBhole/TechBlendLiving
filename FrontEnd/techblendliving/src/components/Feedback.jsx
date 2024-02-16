import { useEffect, useState } from "react";
import { FetchFeedbackDetails } from "../services/HostApproval";



export function Feedback() {

    const [details, setDetails] = useState([]);
    async function populateFeedbackdata() {
        try {
          const response = await FetchFeedbackDetails();
          console.log("Feedbacks",response);
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
    <table className="table"  >
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
          </table>
    </>

);
}