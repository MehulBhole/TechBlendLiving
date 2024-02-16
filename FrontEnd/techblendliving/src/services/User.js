import axios from "axios";

export async function sendUserData(formData)
{        
    try {
        const response = axios.post("http://localhost:9090/register",formData);
        return response; 
    }catch(error){
            console.log(error);
    }
                
}
export async function sendLoginData(userLogin){
    try {
        const response  = axios.post("http://localhost:9090/login",userLogin);
        return response;
    } catch (error) {
        console.log(error);
    }
}
export async function fetchById(userId){
    console.log(userId);
    try {
        const response  = axios.get(`http://localhost:9090/userdetails/${userId}`);
        return response;
    } catch (error) {
        console.log(error);
    }
}
export async function fetchAllProperties(){
    try {
        const response  = axios.get(`http://localhost:9090/allProperties`);
        return response;
    } catch (error) {
        console.log(error);
    }
}
export async function getSearchProperty(search){
    try{
    const response = axios.get(`http://localhost:9090/getSearchProperty/${search}`);
    return response;
    }catch(error){
   console.log(error);
    }
}
export async function getPropertyById(id){
    try{
    const response = axios.get(`http://localhost:9090/getdetailsspecificbyid/${id}`);
    return response
    }catch(error){
   console.log(error);
    }
}
export async function sendFeedbackData(feedback){
    try{
    const response = axios.post(`http://localhost:9090/sendFeedbackData`,feedback);
    return response;
    }catch(error){
   console.log(error);
    }
}
