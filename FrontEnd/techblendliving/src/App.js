import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import { Home } from './components/Home';
import { NavigationBar } from './components/NavigationBar';
import { Login } from './components/Login';
import { Footer } from './components/Footer';
import { RegistrationUser } from './components/RegistrationUser';
import { RegistrationOwner } from './components/RegistrationOwner';
import { Services } from "./components/Services";
import { Dashboard } from './components/DashBoard';
import { ContactUs } from './components/ContactUs';
import { Host } from './components/Host';
import { UserView } from './components/UserView';
import { AboutUs } from './components/AboutUs';
import { LoginUser } from "./components/LoginUser"
import { LoginOwner } from "./components/LoginOwner"
import { LoginHost } from "./components/LoginHost"
import { ServiceView } from './components/ServiceView';
import { Properties } from './components/Properties';
import { PrivateRoute } from './components/PrivateRoute';
import { PrivateRouteUser } from './components/PrivateRouteUser';
import { PrivateRouteHost } from './components/PrivateRouteHost';
import { RegistrationServiceProvider } from './components/RegistrationServiceProvider';
import { LoginServiceProvider } from './components/LoginServiceProvider';
import { TempView } from './components/TempView';
import { UserDashBoard } from './components/UserDashBoard';
import { Profile } from './components/Profile';
import { ServiceDashBoard } from './components/ServiceDashBoard';
import { DetailedPropertyView } from './components/DetailedPropertyView';
import { Feedback } from './components/Feedback'
import { PaymentGateway } from './components/PaymentGateway';
import ErrorPage from './components/ErrorPage';
import { PrivateRouteService } from './components/PrivateRouteService';






function App() {
  return (
    
 <BrowserRouter>
 {/* <NavigationBar></NavigationBar> */}
 <Routes>
        
  <Route path="/" element={<Home></Home>}></Route>
  {/* <Route path="/login" element={<Login></Login>}></Route> */}
  <Route path="/registrationuser" element={<RegistrationUser></RegistrationUser>}></Route>
  <Route path="/registrationowner" element={<RegistrationOwner></RegistrationOwner>}></Route>
  <Route path="/registrationserviceprovider" element={<RegistrationServiceProvider></RegistrationServiceProvider>}></Route>
 
  <Route path="/contactus" element={<ContactUs></ContactUs>}></Route>
 
  <Route path="/aboutus" element={<AboutUs></AboutUs>}></Route>
  <Route path="/login-user" element={<LoginUser></LoginUser>}></Route>
  <Route path="/login-owner" element={<LoginOwner></LoginOwner>}></Route>
  <Route path="/login-host" element={<LoginHost></LoginHost>}></Route>
  <Route path="/login-service" element={<LoginServiceProvider></LoginServiceProvider>}></Route>
  <Route path="/serviceview" element={<ServiceView></ServiceView>}></Route>
  <Route path="/services" element={<Services></Services>}></Route>
  <Route path="/properties" element={<Properties></Properties>}></Route>
  <Route path="/private/*" element={<PrivateRoute />}>
          <Route index element={<Dashboard />} />
          <Route path="private/tempview" index element={<TempView />} />
  </Route>
  <Route path="/privateuser/*" element={<PrivateRouteUser/>}>
          <Route index element={<UserDashBoard />} />
          <Route path="privateuser/detailedPropertyView"index element={<DetailedPropertyView />} />

  </Route>
  <Route path="/privatehost/*" element={<PrivateRouteHost/>}>
          <Route index element={<Host />} />
  </Route>
  <Route path="/privateservice/*" element={<PrivateRouteService/>}>
          <Route index element={<ServiceDashBoard />} />
  </Route>
  {/* <Route path="/tempview" element={<TempView></TempView>}></Route> */}
  {/* <Route path="/userview" element={<UserDashBoard></UserDashBoard>}></Route> */}
  <Route path="/profile" element={<Profile></Profile>}></Route>
  {/* <Route path="/servicedashboard" element={<ServiceDashBoard></ServiceDashBoard>}></Route> */}
  {/* <Route path="/detailedPropertyView" element={<DetailedPropertyView></DetailedPropertyView>}></Route> */}
  <Route path="/fetchFeedbackDetails" element={<Feedback />} />
  <Route path="/paymentgateway" element={<PaymentGateway></PaymentGateway>}></Route>

   <Route path="*" element={<ErrorPage></ErrorPage>}></Route>
 </Routes>
 <Footer></Footer>
 </BrowserRouter>
  );
}

export default App;
