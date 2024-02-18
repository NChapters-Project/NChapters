import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Event from "./pages/Event";
import About from "./pages/About";
import Profile from "./pages/Profile";
import FOC from "./pages/clubs/FOC";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";
import CreateListing from "./pages/CreateListing";
import Otp from "./pages/Otp";
import Contact from "./pages/Contact";
import ContactList from "./pages/ContactList";
export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/Event" element={<Event />} />
        <Route path="/about" element={<About />} />
        <Route path="/foc" element={<FOC />} />
        <Route path="/otp" element={<Otp />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/ContactList" element={<ContactList />} />
        <Route path="/createListing" element={<CreateListing />} />
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
          {/* <Route path="/createListing" element={<CreateListing />} /> */}
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
