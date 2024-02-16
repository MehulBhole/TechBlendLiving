import axios from "axios";

export async function FetchApprovalDetails()
{        
    try {
        const response = axios.get("http://localhost:9090/hostapproval");
        return response; 
    }catch(error){
            console.log(error);
    }
                
}
export async function HostLoginCredentials(hostdata)
{        
    try {
        const response = axios.post("http://localhost:9090/hostlogin",hostdata);
        return response; 
    }catch(error){
            console.log(error);
    }
                
}
export async function HostApprovalById(id)
{        
    console.log(id)
    try {
        const response = axios.get(`http://localhost:9090/hostapprovalbyid/${id}`);
        return response; 
    }catch(error){
            console.log(error);
    }
                
}
export async function HostRejectionById(id)
{        
    console.log(id)
    try {
        const response = axios.get(`http://localhost:9090/hostrejectionbyid/${id}`);
        return response; 
    }catch(error){
            console.log(error);
    }
                
}
export async function FetchApprovalDetailsForServiceProvider()
{        
    try {
        const response = axios.get("http://localhost:9090/providerapproval");
        return response; 
    }catch(error){
            console.log(error);
    }
                
}
export async function HostRejectionServiceById(id)
{        
    console.log(id)
    try {
        const response = axios.get(`http://localhost:9090/providerrejectionbyid/${id}`);
        return response; 
    }catch(error){
            console.log(error);
    }
                
}
export async function HostApprovalServiceById(id)
{        
    console.log(id)
    try {
        const response = axios.get(`http://localhost:9090/providerapprovalbyid/${id}`);
        return response; 
    }catch(error){
            console.log(error);
    }
}
export async function FetchFeedbackDetails()
{        
    try {
        const response = axios.get("http://localhost:9090/fetchFeedbackDetails");
        return response; 
    }catch(error){
            console.log(error);
    }
                
}
