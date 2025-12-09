import React from 'react'
import { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import herose1 from '../../Assets/img/home/herosec1.jpg'
import herose2 from '../../Assets/img/home/herosec2.jpg'
import herose3 from '../../Assets/img/home/herosec3.jpg'


const Herosec = () => {
  return (
    <div>
         {/* <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
        <SwiperSlide>
            <img src={herose3} style={{height:'70vh',width:'100%'}}/>
        </SwiperSlide>
        <SwiperSlide> <img src={herose2} style={{height:'70vh',width:'100%'}}/></SwiperSlide>
        <SwiperSlide> <img src={herose1} style={{height:'70vh',width:'100%'}}/></SwiperSlide>
      </Swiper> */}
      <SwiperSlide>
  <div style={{ position: "relative" }}>
    <img src={herose3} style={{ height: "70vh", width: "100%", objectFit: "cover" }} />
    <div style={{
      position: "absolute",
      top: "25%",
      left: "28%",
      transform: "translateY(-50%)",
      color: "white",
      background: "rgba(0,0,0,0.4)",
      padding: "20px 40px",
      borderRadius: "10px"
    }}>
      <h2 style={{ fontSize: "2.5rem", margin: 0 }}>Welcome to CityVision</h2>
      <p style={{ fontSize: "1.2rem" }}>Report issues, track progress, and make your city smarter.</p>
    </div>
  </div>
</SwiperSlide>

    </div>
  )
}

export default Herosec