import React from "react";

export default function Footer() {
  return <div>
     <footer class="p-4 bg-gray-800 md:p-8 lg:p-10 dark:bg-gray-800 mt-20 mb-0">
  <div class="mx-auto max-w-screen-xl text-center">
      <a href="#" class="flex justify-center items-center text-2xl font-semibold text-gray-900 dark:text-white">
      <h1 class="flex flex-wrap text-xl font-bold cursor-pointer sm:text-2xl md:text-3xl">
              <span class="text-green-600">N</span>
              <span class="text-blue-800">Chapters</span>
            </h1> 
      </a>
      <p class="my-6 text-white">Explore the vibrant tapestry of NSBM Green University's clubs and societies <br/> where passions unite, talents flourish, and a myriad of events unfold.</p>
      <ul class="flex flex-wrap justify-center items-center mb-6 text-white mt-12">
          <li>
              <a href="/" class="mr-4 hover:underline md:mr-6 ">Home</a>
          </li>
          <li>
              <a href="/About" class="mr-4 hover:underline md:mr-6">About Us </a>
          </li>
          <li>
              <a href="/Contact" class="mr-4 hover:underline md:mr-6 ">Contact Us</a>
          </li>
          <li>
              <a href="#" class="mr-4 hover:underline md:mr-6">Events</a>
          </li>
          <li>
              <a href="/SignIn" class="mr-4 hover:underline md:mr-6">Sign In</a>
          </li>
          <li>
              <a href="/SignUp" class="mr-4 hover:underline md:mr-6">Sign Up</a>
          </li>
      </ul>
      <span class="text-sm text-gray-500 sm:text-center dark:text-gray-700">© 2024 <a href="#" class="hover:underline">NChapters</a>. All Rights Reserved.</span>
  </div>
</footer>


  </div>;
}
