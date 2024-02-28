import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { PublicClientApplication } from '@azure/msal-browser';
import { signInStart, signInSuccess, signInFailure, signOutUserStart, signOutUserSuccess} from '../redux/user/userSlice';
import { initialState } from '../redux/user/userSlice';
import { persistStore } from 'redux-persist';
import { persistor } from '../redux/store';
import store from '../redux/store';

const Header = () => {
  const { loading, error, currentUser } = useSelector((state) => state.user);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isAdditionalDropdownVisible, setIsAdditionalDropdownVisible] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const msalConfig = {
    auth: {
      clientId: '7888a1dc-f295-424f-88dc-5028e8e3e2b3',
      authority: 'https://login.microsoftonline.com/nsbm.ac.lk',
      redirectUri: 'http://localhost:5173/',
      postLogoutRedirectUri: 'http://localhost:5173',
    },
    cache: {
      cacheLocation: 'LocalStorage',
      storeAuthStateInCookie: true,
    },
  };
  const msalInstance = new PublicClientApplication(msalConfig);

  useEffect(() => {
    const initializeMsal = async () => {
      await msalInstance.initialize(); // Initialize MSAL instance
    };
    initializeMsal();
  }, [msalInstance]);

  const handleMicrosoftLogin = async () => {
    try {
      dispatch(signInStart());
      await msalInstance.handleRedirectPromise();
      const loginResponse = await msalInstance.loginPopup();
      // Assuming loginResponse contains user's email and name
      const { email, name } = loginResponse.account;
      // Dispatch signInSuccess with both email and name
      dispatch(signInSuccess({ email, name }));
      navigate("/");
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };
  

  const handleLogout = async () => {
    try {
      dispatch(signOutUserSuccess());
     await msalInstance.logout();
    localStorage.removeItem('user'); // Replace with specific keys if needed
    dispatch({ type: 'USER_LOGOUT_SUCCESS' });
      navigate("/"); // Navigate to home or login page
    } catch (error) {
      console.error('Error logging out:', error);
      // Optionally, dispatch failure action or handle the error
    }
  };
  const handleEventEdit = () => {
    navigate("/EventEdit");
  };
  const handleCreateListing = () => {
    navigate("/CreateListing");
  };
  
  
  
  

  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };


  const handleAdditionalDropdownToggle = () => {
    setIsAdditionalDropdownVisible(!isAdditionalDropdownVisible);
  };
  const handleDropdownToggle = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  return (
    <div>

<nav class="bg-white border-gray-600 fixed w-full z-20 top-0 start-0 border-gray-600 bg-white mt-0 shadow-md">
    <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-3 ">
            <h1 class="flex flex-wrap text-xl font-bold cursor-pointer sm:text-2xl md:text-3xl">
              <span class="text-green-600">N</span>
              <span class="text-blue-800">Chapters</span>
            </h1>
       
          <button
            type="button"
            class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:focus:outline-none focus:ring-2 focus:ring-white text-gray-400 hover:bg-white "
            onClick={handleDropdownToggle}
          >
            <span class="sr-only">Open main menu</span>
            <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
            </svg>
          </button>
          <div
            class={`${
              isDropdownVisible ? 'block' : 'hidden'
            } w-full md:block md:w-auto flex justify-center`}
          >
            <ul class="flex flex-col p-4 md:p-0 mt-4 ml-auto border border-gray-100 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white  justify-center">
              {/* Your menu items go here /}{/ Added justify-center */}
              <li class="flex items-center mr-0">
                <a
                  href="/"
                  class="block py-2 px-3 text-black text-black md:text-lg rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-600 md:p-0 text-black md:hover:text-green-600"
                >
                  Home
                </a>
              </li>
              <li class="flex items-center mr-0">
                <button
                  id="dropdownNavbarLink"
                  data-dropdown-toggle="dropdownNavbar"
                  class="flex items-center justify-between w-full py-2 px-3 text-black text-black md:text-lg hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-600 md:p-0 md:w-auto text-black md:hover:text-green-600 focus:text-black md:hover:bg-transparent hover:text-green-600"
                >
                  Clubs & Societies
                  <svg class="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                  </svg>
                </button>
                <div
                  id="dropdownNavbar"
                  class="z-10 hidden font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44 bg-gray-700 dark:divide-gray-600"
                >
                  <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownLargeButton">
                    
                  <li class="flex items-center">
                      <button
                        id="doubleDropdownButton1"
                        data-dropdown-toggle="doubleDropdown1"
                        data-dropdown-placement="right-start"
                        type="button"
                        class="flex items-center justify-between w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Faculty Clubs
                        <svg class="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                        </svg>
                      </button>
                      <div
                        id="doubleDropdown1"
                        class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
                      >
                        <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="doubleDropdownButton1">
                          <li>
                            <a href="/FOC" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Faculty of Computing</a>
                          </li>
                          <li>
                            <a href="/Comingsoon" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Faculty of Business</a>
                          </li>
                          <li>
                            <a href="/Comingsoon" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Faculty of Engineering</a>
                          </li>
                          <li>
                            <a href="/Comingsoon" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Faculty of Science</a>
                          </li>
                          
                        </ul>
                      </div>
                    </li>
                    <li>
                      <button
                        id="doubleDropdownButton2"
                        data-dropdown-toggle="doubleDropdown2"
                        data-dropdown-placement="right-start"
                        type="button"
                        class="flex items-center justify-between w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Religious Clubs
                        <svg class="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                        </svg>
                      </button>
                      <div
                        id="doubleDropdown2"
                        class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
                      >
                        <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="doubleDropdownButton2">
                          <li>
                            <a href="/Comingsoon" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Buddhist Society</a>
                          </li>
                          <li>
                            <a href="/Comingsoon" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Christian Society</a>
                          </li>
                          <li>
                            <a href="/Comingsoon" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Islamic Society</a>
                          </li>
                          <li>
                            <a href="/Comingsoon" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Hindu Society</a>
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li>
                      <button
                        id="doubleDropdownButton3"
                        data-dropdown-toggle="doubleDropdown3"
                        data-dropdown-placement="right-start"
                        type="button"
                        class="flex items-center justify-between w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Sports Clubs
                        <svg class="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                        </svg>
                      </button>
                      <div
                        id="doubleDropdown3"
                        class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
                      >
                        <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="doubleDropdownButton3">
                          <li>
                            <a href="/Comingsoon" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Cricket Club</a>
                          </li>
                          <li>
                            <a href="/Comingsoon" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Football Club</a>
                          </li>
                          <li>
                            <a href="/Comingsoon" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Netball Club</a>
                          </li>
                          <li>
                            <a href="/Comingsoon" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Chess Club</a>
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li>
                      <button
                        id="doubleDropdownButton4"
                        data-dropdown-toggle="doubleDropdown4"
                        data-dropdown-placement="right-start"
                        type="button"
                        class="flex items-center justify-between w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Other Clubs
                        <svg class="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                        </svg>
                      </button>
                      <div
                        id="doubleDropdown4"
                        class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 bg-gray-700"
                      >
                        <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="doubleDropdownButton4">
                          <li>
                            <a href="/Comingsoon" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">AIESEC</a>
                          </li>
                          <li>
                            <a href="/Comingsoon" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Other</a>
                          </li>
                          <li>
                            <a href="/Comingsoon" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Other 2</a>
                          </li>
                          <li>
                            <a href="/Comingsoon" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Other 3</a>
                          </li>
                        </ul>
                      </div>
                    </li>
                  </ul>
                  
                </div>
              </li>
              <li class="flex items-center mr-0">
                <a href="/about" class="block py-2 px-3 text-black md:text-lg rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-600 md:p-0 text-black md:hover:text-green-600">About Us</a>
              </li>
              <li class="flex items-center mr-0">
                <a href="/contact" class="block py-2 px-3 text-black md:text-lg rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-600 md:p-0 text-black md:hover:text-green-600">Contact Us</a>
              </li>
              <li class="flex items-center mr-0">
                <a href="/Events" class="block py-2 px-3 text-black text-black md:text-lg rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-600 md:p-0 text-black md:hover:text-green-600">Events</a>
              </li>
              <li class="flex items-center mr-0">
              {currentUser && currentUser.name !== 'OV Jayawardana' && (
  <span className="block py-2 px-3 text-black text-black md:text-m rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-600 md:p-0 text-black md:hover:text-green-600">
    Welcome, {currentUser.name}
  </span>
)}

              </li> 
              
              {currentUser?.name === 'OV Jayawardana' && (
  <li className="flex items-center relative">
    <button
      onClick={handleAdditionalDropdownToggle}
      className="flex items-center justify-between w-full py-2 px-3 text-black text-black md:text-lg hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-600 md:p-0 md:w-auto text-black md:hover:text-green-600 focus:text-black md:hover:bg-transparent hover:text-green-600"
    >
      Clubs & Events
      <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
      </svg>
    </button>
    {isAdditionalDropdownVisible && (
      <div className="absolute top-full left-0 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 mt-2">
        <ul className="py-2 text-sm text-gray-700" aria-labelledby="doubleDropdownButton82">
          <li>
            <a href="/createListing" className="block px-4 py-2 hover:bg-gray-100 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Add Events</a>
          </li>
          <li>
            <a href="/EventEdit" className="block px-4 py-2 hover:bg-gray-100 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Edit Events</a>
          </li>
          <li>
            <a href="/EventEdit" className="block px-4 py-2 hover:bg-gray-100 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Add Clubs</a>
          </li>
          <li>
            <a href="/EventEdit" className="block px-4 py-2 hover:bg-gray-100 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Edit Clubs</a>
          </li>
          <li>
            <a href="/EventEdit" className="block px-4 py-2 hover:bg-gray-100 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Add Club Leader</a>
          </li>
        </ul>
      </div>
    )}
  </li>
)}
<li className="flex items-center">
  <a
    href="/ContactList"
    className="block py-2 px-3 text-black md:text-lg rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-600 md:p-0 text-black md:hover:text-green-600"
  >
    Inquiries
  </a>
</li>



              {/* <form onSubmit={handleSubmit} className="flex flex-col gap-4"> */}
        <li className="mr-0">
        <button
                  type="button"
                  onClick={currentUser ? handleLogout : handleMicrosoftLogin}
                  className="text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-1.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 mr-0"
                >
                   {currentUser ? "Logout" : "Login"}
                </button>
        </li>
        
      {/* </form> */}
            </ul>
          </div>
        </div>
      </nav>
      


    </div>
  );
};

export default Header;