import axios from "axios";

export async function sendChatData(formData)
{        
    try {
        const response = axios.post("http://localhost:9090/chatData",formData);
        return response; 
    }catch(error){
            console.log(error);
    }
                
}
export async function fetchChatById(senderId , receiverId)
{        
    try {
        const response = axios.get(`http://localhost:9090/receivechat/${senderId}/${receiverId}`);
        return response; 
    }catch(error){
            console.log(error);
    }
                
}
export async function messagesReceived(receiverId)
{        
    try {
        const response = axios.get(`http://localhost:9090/receivechatowner/${receiverId}`);
        return response; 
    }catch(error){
            console.log(error);
    }
                
}
export async function fetchChatReceiverById(senderId , receiverId)
{        
    try {
        const response = axios.get(`http://localhost:9090/ownerchat/${senderId}/${receiverId}`);
        return response; 
    }catch(error){
            console.log(error);
    }
                
}

