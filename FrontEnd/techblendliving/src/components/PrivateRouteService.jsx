import { Navigate, Outlet } from "react-router-dom";
import { isLoggedInService, isLoggedInUser } from "./Authentication";

export function PrivateRouteService(){

  if(isLoggedInService()){
    return <Outlet></Outlet>
  }else{
    return <Navigate to="/errorpage"></Navigate>
  }
}