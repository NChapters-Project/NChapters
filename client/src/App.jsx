import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Events from "./pages/Events";
import About from "./pages/About";
import Profile from "./pages/Profile";
import FOC from "./pages/clubs/FOC";
import Clubadd from "./pages/clubs/Clubadd";
import Comingsoon from "./pages/clubs/Comingsoon"
import EventEdit from "./pages/EventEdit";
import Leaders from "./pages/clubs/Leaders";
import CreateListing from "./pages/CreateListing";
import Otp from "./pages/Otp";
import Contact from "./pages/Contact";
import ContactList from "./pages/ContactList";
import PrivateRoute from "./components/PrivateRoute";
import EditLeaders from "./pages/clubs/EditLeaders";
export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/Events" element={<Events />} />
        <Route path="/about" element={<About />} />
        <Route path="/foc" element={<FOC />} />
        <Route path="/Comingsoon" element={<Comingsoon />} />
        <Route path="/otp" element={<Otp />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/EventEdit" element={<EventEdit />} />
        <Route path="/Clubadd" element={<Clubadd />}  />
        <Route path="/ContactList" element={<ContactList />} />
        <Route path="/createListing" element={<CreateListing />} />
        <Route path ="/leaders" element={<Leaders />} />
        <Route path ="/editLeaders" element={<EditLeaders />} />
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
          {/* <Route path="/createListing" element={<CreateListing />} /> */}
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
