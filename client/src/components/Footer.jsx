import React from "react";

export default function Footer() {
  return (
    <div style={{ minHeight: "60vh", position: "relative" }}>
      <footer className="p-4 bg-gray-800 md:p-8 lg:p-10 dark:bg-gray-800 mb-0 absolute bottom-0 w-full">
        <div className="mx-auto max-w-screen-xl text-center">
          <a
            href="#"
            className="flex justify-center items-center text-2xl font-semibold text-gray-900 dark:text-white"
          >
            <h1 className="flex flex-wrap text-xl font-bold cursor-pointer sm:text-2xl md:text-3xl">
              <span className="text-green-600">N</span>
              <span className="text-blue-800">Chapters</span>
            </h1>
          </a>
          <p className="my-6 text-white">
            Explore the vibrant tapestry of NSBM Green University's clubs and
            societies <br /> where passions unite, talents flourish, and a
            myriad of events unfold.
          </p>
          <ul className="flex flex-wrap justify-center items-center mb-6 text-white mt-12">
            <li>
              <a href="/" className="mr-4 hover:underline md:mr-6 ">
                Home
              </a>
            </li>
            <li>
              <a href="/About" className="mr-4 hover:underline md:mr-6">
                About Us{" "}
              </a>
            </li>
            <li>
              <a href="/Contact" className="mr-4 hover:underline md:mr-6 ">
                Contact Us
              </a>
            </li>
            <li>
              <a href="Events" className="mr-4 hover:underline md:mr-6">
                Events
              </a>
            </li>
          </ul>
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-700">
            © 2024 <a href="#" className="hover:underline">NChapters</a>. All Rights Reserved.
          </span>
        </div>
      </footer>
    </div>
  );
}
