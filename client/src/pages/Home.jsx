import React from "react";
import { Carousel } from 'flowbite-react';
import Header from "../components/Header";

export default function Home() {
  return (
    <div className="relative">
      <div className="h-56 sm:h-64 xl:h-80 2xl:h-96 relative z-0 mt-16"> {/* Set a lower z-index for the carousel */}
        <Carousel slideInterval={5000} theme={{
          "item": {
            "base": "absolute top-1/2 left-1/2 block w-full -translate-x-1/2 -translate-y-1/2",
            "wrapper": {
              "off": "w-full flex-shrink-0 transform cursor-default snap-center",
              "on": "w-full flex-shrink-0 transform cursor-grab snap-center"
            }
          },
          "scrollContainer": {
            "base": "flex h-full snap-mandatory overflow-y-hidden overflow-x-scroll scroll-smooth",
            "snap": "snap-x",
          }
        }}>
          <img src="src/images/emotion.png" alt="..." style={{ width: '100%', height: '100%' }} />
          <img src="src/images/spandana.jpeg" alt="..." style={{ width: '100%', height: '100%' }} />
          <img src="src/images/safe.jpeg" alt="..." style={{ width: '100%', height: '100%' }} />
        </Carousel>
      </div>
      <section class="bg-white dark:bg-gray-900">
    <div class="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div class="mr-auto place-self-center lg:col-span-7">
            <h1 class="max-w-2xl mb-2 text-4xl font-bold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">Welcome to NChapters</h1>
            <p class="max-w-2xl mb-4 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">This is NChapters where you can find all the clubs and societies of NSBM Green University under one roof! Explore the vibrant tapestry of NSBM Green University's clubs and societies – where passions unite, talents flourish, and a myriad of events unfold.</p>
            <a href="#" class="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900">
                Explore Events
                <svg class="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
            </a>
            <a href="#" class="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
                Contact Us
            </a> 
        </div>
        <div class="hidden lg:mt-0 lg:col-span-5 lg:flex">
            <img src="src/images/360degree.jpg" alt="mockup"/>
        </div>                
    </div>
</section>

    </div>
  );
}
