import React from 'react'


export default function About() {
  return (
    <div class="bod">
      <div className="nsbm mt-10 flex justify-center items-center">
        <div className="">
          <h1 className="text-5xl txt-col">About Us</h1>
        </div>
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

      


    </div>
  )
}
