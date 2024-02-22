import React from "react";
import Footer from "../components/Footer.jsx"

import "./about/abo.css";
import "./about/about.js";

import pro2 from "./about/onaliy.jpg";
import pro3 from "./about/avish.jpg";
import pro4 from "./about/rash.jpg";
import pro5 from "./about/geeth.jpg";
import pro6 from "./about/kalidu.jpg";

import s1 from "../images/img1.jpg";
import s2 from "../images/img2.jpg";
import s3 from "../images/img3.jpg";
import s4 from "../images/img4.jpg";

export default function About() {


  return (
    <div class="bod mb-10">

        <section class="bg-center bg-no-repeat bg-[url(src/images/aboutslider.jpg)] bg-gray-700 bg-blend-multiply mt-12">
            <div class="px-4 mx-auto max-w-screen-xl md:h-[20rem] sm:h-[15rem] text-center py-12 lg:py-20">
                <h3 class="mt-8 text-3xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">About Us</h3>
                
            </div>
        </section>

      <div className="nsbm mt-5 flex justify-center items-center">
      </div>
      <div className="nsbm  pt-10 mt-3 mb-5 flex justify-center items-center" >
          <div className="nsbm-txt  p-10  ml-20 mr-20">
            <h1 className="mt-5 mb-3 text-xl nsbm-head"> NSBM GREEN UNIVERSITY</h1>
            <p  className="text-l txt-col2 txt-d text-justify">NSBM Green University, the nation’s premier degree-awarding institute, is the first of its kind in South Asia. It is a government-owned self-financed institute that operates under the purview of the Ministry of Education. As a leading educational centre in the country, NSBM has evolved into becoming a highly responsible higher education institute that offers unique opportunities and holistic education on par with international standards while promoting sustainable living.
                  NSBM offers a plethora of undergraduate and postgraduate degree programmes under five faculties: Business, Computing, Engineering, Science and Postgraduate & Professional Advancement. These study programmes at NSBM are either its own programmes recognised by the University Grants Commission and the Ministry of Higher Education or world-class international programmes conducted in affiliation with top-ranked foreign universities such as University of Plymouth, UK, and Victoria University, Australia. 
                  Focused on producing competent professionals and innovative entrepreneurs for the increasingly globalising world, NSBM nurtures its graduates to become productive citizens of society with their specialisation ranging in study fields such as Business, Management, Computing, IT, Engineering, Science, Psychology, Nursing, Interior design, Quantity Surveying, Law and Multimedia.
                  Inspired by the vision of being Sri Lanka’s best-performing graduate school and being recognised internationally, NSBM currently achieves approximately 3000 new enrollments per year and houses above 11,000 students reading over 50 degree programmes under 4 faculties. Moreover, over the years, NSBM Green University has gifted the nation with 14,000+ graduates and has proved its global presence with an alumni network spread all across the world.
                  Nestling on a 40-acre land amidst the greenery and serenity in Pitipana, Homagama, NSBM Green University, is an ultra-modern university complex constructed with state-of-the-art facilities and amenities that provides the perfect setting for high-quality teaching, learning and research. 
            </p>
            <div className="icons mt-5  flex justify-center items-center">
                
                <i class="fa-solid fa-globe fa-2x mr-3" onClick={() => window.open("https://www.nsbm.ac.lk/", "_blank")} ></i>
                <i className="fa-solid fa-location-dot fa-2x mr-3" onClick={() => window.open("https://maps.app.goo.gl/GSPJD3Uozh4mXSDV8", "_blank")}></i>
                <i class="fa-brands fa-linkedin fa-2x mr-3" onClick={() => window.open("https://www.linkedin.com/school/nsbmgreenuniversity", "_blank")} ></i>
                <i class="fa-brands fa-facebook fa-2x " onClick={() => window.open("https://web.facebook.com/nsbm.lk", "_blank")} ></i>
                
                
             </div>
          </div>
          
      </div>
      <section class="container">
        <div class="slider-wrapper">
          <div class="slider">
            <img id="slide-1" src={s1} alt="NSBM front gate" />
            <img id="slide-2" src={s2}alt="nsbm front" />
            <img id="slide-3" src={s3} alt="nsbm swimming pool" />
            <img id="slide-4" src={s4} alt="nsbm ground 1" />
          </div>
          <div class="slider-nav">
            <a href="#slide-1"></a>
            <a href="#slide-2"></a>
            <a href="#slide-3"></a>
            <a href="#slide-4"></a>
          </div>
        </div>
      </section>





     <div className="nsbm mt-10 mb-5 flex justify-center items-center">
        <h1 className="text-3xl txt-col">Our Team</h1>
     </div>

      
      <div className="mainContainer " >
          {
            data.map((d) => (
              <div className="box" >
                <div className="card">
                  <div className="image flex justify-center items-center" >
                    <img src={d.img} alt="" className="rounded-full "  />
                  </div>
                  <div className="desc">
                  <h1 className="text-xl font-semibold">{d.name}</h1>
                  <p>{d.review}</p><br></br>
                  <div className="px-6 g-4" dangerouslySetInnerHTML={{ __html: `${d.icon1} ${d.icon2} ${d.icon3}` }} />
                  </div>
                </div>
                <br></br>
              </div>


            ))
          }
      </div>
      <div className="mContainer" >
          {
            data2.map((d) => (
              <div className="box2" >
                <div className="card2">
                  <div className="image2 flex justify-center items-center" >
                    <img src={d.img} alt="" className="rounded-full "  />
                  </div>
                  <div className="2desc">
                    <h1 className="text-xl font-semibold icons">{d.name}</h1><br></br>
                  <p>{d.review}</p><br></br>
                  <div className="px-6 g-4" dangerouslySetInnerHTML={{ __html: `${d.icon1} ${d.icon2} ${d.icon3}` }} />
                  </div>
                </div>
                <br></br>
              </div>

            ))
          }
      </div>
      <div className="mt-20 mb-10">
          <h1 hidden></h1>
      </div>   
      
    </div>
    
  )
}


const data=[{
  name:`Avish Madushanka`,
  img:pro3,
  review:`Software Engineering Undergraduate`,
  icon1:'<i onclick="window.open(\'https://github.com/Avish-Madushanka\', \'_blank\')" class="fa-brands fa-github fa-2x colour"></i>',
  icon2:'<i onclick="window.open(\'https://www.instagram.com/avish_madushanka/?igsh=bzJzN2Z0aWt0c3Vx\', \'_blank\')" class="fa-brands fa-instagram fa-2x colour"></i>',
  icon3:'<i onclick="window.open(\'https://www.linkedin.com/in/avish-madushanka-640172248\', \'_blank\')" class="fa-brands fa-linkedin fa-2x colour"><a href="" ></i>'

},
{
  name:`Onaliy Vinukiy`,
  img:pro2,
  review:`Software Engineering Undergraduate`,
  icon1:'<i onclick="window.open(\'https://github.com/OnaliyVinukiy\', \'_blank\')" class="fa-brands fa-github fa-2x colour"></i>',
  icon2:'<i onclick="window.open(\'https://www.instagram.com/__onaliy_vinu__/\', \'_blank\')" class="fa-brands fa-instagram fa-2x colour"></i>',
  icon3:'<i onclick="window.open(\'https://www.linkedin.com/in/onaliy-vinukiy-jayawardana/\', \'_blank\')" class="fa-brands fa-linkedin fa-2x colour"><a href="" ></i>'

},
{
  name:`Jayamuni Rashminda`,
  img:pro4,
  review:`Software Engineering Undergraduate`,
  icon1:'<i onclick="window.open(\'https://github.com/Rashminda121\', \'_blank\')" class="fa-brands fa-github fa-2x colour"></i>',
  icon2:'<i onclick="window.open(\'https://www.instagram.com/rashminda123/\', \'_blank\')" class="fa-brands fa-instagram fa-2x colour"></i>',
  icon3:'<i onclick="window.open(\'www.linkedin.com/in/chamindu-rashminda-42565828a\', \'_blank\')" class="fa-brands fa-linkedin fa-2x colour"><a href="" ></i>'
}
]


const data2=[{
  name:`Geeth Induware`,
  img:pro5,
  review:`Software Engineering Undergraduate`,
  icon1:'<i onclick="window.open(\'https://github.com/Rashminda121\', \'_blank\')" class="fa-brands fa-github fa-2x colour"></i>',
  icon2:'<i onclick="window.open(\'https://www.instagram.com/rashminda123/\', \'_blank\')" class="fa-brands fa-instagram fa-2x colour"></i>',
  icon3:'<i onclick="window.open(\'www.linkedin.com/in/chamindu-rashminda-42565828a\', \'_blank\')" class="fa-brands fa-linkedin fa-2x colour"><a href="" ></i>'

},
{
  name:`Kalindu Perera`,
  img:pro6,
  review:`Software Engineering Undergraduate`,
  icon1:'<i onclick="window.open(\'https://github.com/OnaliyVinukiy\', \'_blank\')" class="fa-brands fa-github fa-2x colour"></i>',
  icon2:'<i onclick="window.open(\'https://www.instagram.com/_onaliy_vinu_?igsh=dXU3eGpyNHg4ajFo\', \'_blank\')" class="fa-brands fa-instagram fa-2x colour"></i>',
  icon3:'<i onclick="window.open(\'www.linkedin.com/in/onaliyvinukiy-jayawardana\', \'_blank\')" class="fa-brands fa-linkedin fa-2x colour"><a href="" ></i>'

}]