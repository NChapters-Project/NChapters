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
import FOB from "./pages/clubs/FOB.jsx";
import FOS from "./pages/clubs/FOS.jsx";
import Clubadd from "./pages/clubs/Clubadd";
import Comingsoon from "./pages/clubs/Comingsoon";
import EventEdit from "./pages/EventEdit";
import Leaders from "./pages/clubs/Leaders";
import CreateListing from "./pages/CreateListing";
import Otp from "./pages/Otp";
import Contact from "./pages/Contact";
import ContactList from "./pages/ContactList";
import PrivateRoute from "./components/PrivateRoute";
import EditLeaders from "./pages/clubs/EditLeaders";
import Eview from "./pages/Eview.jsx";
import FeedbackEdit from "./pages/Feedbackedit.jsx";
import Clubview from "./pages/clubs/Clubview.jsx";
import EditClubs from "./pages/clubs/EditClubs.jsx";

import FOE from "./pages/clubs/FOE.jsx";
import FeedbacksEdit from "./pages/FeedbacksEdit.jsx";
import CEvents from "./pages/clubs/CEvents.jsx";
import Religous from "./pages/clubs/Religous.jsx";
import ActivityBased from "./pages/clubs/ActivityBased.jsx";
import International from "./pages/clubs/International.jsx";
import CareerGuidance from "./pages/clubs/CareerGuidance.jsx";
import CEventEdit from "./pages/CEventEdit";
import FeedbackMainEdit from "./pages/FeedbackEditMain.jsx";

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
        <Route path="/fob" element={<FOB />} />
        <Route path="/Comingsoon" element={<Comingsoon />} />
        <Route path="/otp" element={<Otp />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/EventEdit" element={<EventEdit />} />
        <Route path="/Clubadd" element={<Clubadd />} />
        <Route path="/ContactList" element={<ContactList />} />
        <Route path="/createListing" element={<CreateListing />} />
        <Route path="/leaders" element={<Leaders />} />
        <Route path="/editLeaders" element={<EditLeaders />} />
        <Route path="/eview/:id/:img/:cname/:des" element={<Eview />} />
        <Route path="/editclubs" element={<EditClubs />} />
        <Route path="/cEventEdit/:clubName" element={<CEventEdit />} />

        <Route path="/feedbackedit/:feedbackId/:eventId" element={<FeedbackEdit />} />
        <Route path="/clubview/:id" component={Clubview} />
        
        <Route path="/foe" element={<FOE />} />
        <Route path="/feedbackedit/:feedbackId/:eventId" element={<FeedbackEdit />} />
        <Route path="/clubview/:id" element={<Clubview />} />
        <Route path="/feedbacksedit/:clubName" element={<FeedbacksEdit />} />
        <Route path="/feedbackseditmain" element={<FeedbackMainEdit />} />
        <Route path="/cevent/:clubId/:clubName" element={<CEvents />} />
        <Route path="/fos" element={<FOS />} />
        <Route path="/religous" element={<Religous />} />
        <Route path="/activitybased" element={<ActivityBased />} />
        <Route path="/international" element={<International />} />
        <Route path="/careerguidance" element={<CareerGuidance />} />
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
          {/* <Route path="/createListing" element={<CreateListing />} /> */}
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
