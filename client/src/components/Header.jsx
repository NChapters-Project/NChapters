import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'; // Import useSelector from react-redux
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa'; // Import FaSearch from react-icons/fa
import { useLocation } from 'react-router-dom';

const Header = () => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

  const handleDropdownToggle = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };


  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);
  return (
    <div>
   
   {/* <div style={{ background: '#001C44', height: '70px'}} class="fixed w-full z-20 top-0 start-0">
       <form class="flex items-center ml-2">
         <label for="simple-search" class="sr-only">Search</label>
         <div class="relative w-full mt-3">
           <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
           <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2"/>
            </svg>
           </div>
           <input
             type="text"
             id="simple-search"
             class="bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
             placeholder="Search an event..."
           />
         </div>
   <button type="submit" class="p-2.5 ms-2 mr-2 mt-2 text-sm font-medium text-white bg-green-600 rounded-lg border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
       <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
           <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
       </svg>
       <span class="sr-only">Search</span>
   </button>
</form>
</div> */}

      <nav class="bg-white border-gray-600 fixed w-full z-20 top-0 start-0 border-gray-600 bg-white mt-0">
        <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-3">
         
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
              {/* Your menu items go here */}{/* Added justify-center */}
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
                            <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">IEEE</a>
                          </li>
                          <li>
                            <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">FOSS Community</a>
                          </li>
                          <li>
                            <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">CSSL</a>
                          </li>
                          <li>
                            <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">ISACA</a>
                          </li>
                          <li>
                            <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Department of Software Engineering Circle</a>
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
                            <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Buddhist Society</a>
                          </li>
                          <li>
                            <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Christian Society</a>
                          </li>
                          <li>
                            <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Islamic Society</a>
                          </li>
                          <li>
                            <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Hindu Society</a>
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
                            <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Cricket Club</a>
                          </li>
                          <li>
                            <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Football Club</a>
                          </li>
                          <li>
                            <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Netball Club</a>
                          </li>
                          <li>
                            <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Chess Club</a>
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
                            <a href="#" class="block px-4 py-2 hover:bg-gray-100 hover:bg-gray-600 text-gray-200 hover:text-white">AIESEC</a>
                          </li>
                          <li>
                            <a href="#" class="block px-4 py-2 hover:bg-gray-100 hover:bg-gray-600 text-gray-200 hover:text-white">Other</a>
                          </li>
                          <li>
                            <a href="#" class="block px-4 py-2 hover:bg-gray-100 hover:bg-gray-600 text-gray-200 hover:text-white">Other 2</a>
                          </li>
                          <li>
                            <a href="#" class="block px-4 py-2 hover:bg-gray-100 hover:bg-gray-600 text-gray-200 hover:text-white">Other 3</a>
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
                <a href="#" class="block py-2 px-3 text-black text-black md:text-lg rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-600 md:p-0 text-black md:hover:text-green-600">Events</a>
              </li>
              
              <li class="mr-0">
              <a href="/Sign-in"><button type="button" class="text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-1.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 mr-0">
                Login
              </button></a>

              </li>
              <li class="ml-auto">
    <button type="button" class="flex text-sm bg-gray-800 rounded-full hidden md:flex focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600 ml-auto mr-0" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
        <span class="sr-only"></span>
        <a href="/profile"><img class="w-8 h-8 rounded-full" src="src/images/user.svg" alt="user photo"/></a>
    </button>
</li>

            </ul>
          </div>
        </div>
      </nav>
      


    </div>
  );
};

export default Header;
