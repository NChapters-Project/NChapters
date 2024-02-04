import React from "react";
import { Carousel } from 'flowbite-react';


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
  );
}
