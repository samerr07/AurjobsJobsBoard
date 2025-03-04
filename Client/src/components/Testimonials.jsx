import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';



// import required modules
import { Autoplay, Pagination } from 'swiper/modules';
import { Quote, Star } from 'lucide-react';

const Testimonials = () => {

    const testimonials = [
        {
            id: 1,
            name: "Sophia Martinez",
            rating: 5,
            text: "Absolutely fantastic service! The team was professional, responsive, and exceeded my expectations. Highly recommend!",
            company: "Amazon"
        },
        {
            id: 2,
            name: "James Anderson",
            rating: 4,
            text: "Great experience overall. The process was smooth, and the support team was very helpful. A few minor issues, but nothing major.",
            company: "Google"
        },
        {
            id: 3,
            name: "Olivia Brown",
            rating: 5,
            text: "I’m beyond impressed with the quality and attention to detail. Everything was handled flawlessly from start to finish!",
            company: "Microsoft"
        },
        {
            id: 4,
            name: "Daniel Wilson",
            rating: 5,
            text: "Outstanding service! The team went above and beyond to ensure everything was perfect. Would definitely use again!",
            company: "Tesla"
        },
        {
            id: 5,
            name: "Ava Patel",
            rating: 4,
            text: "Very satisfied with my experience. The service was excellent, and the team was very accommodating. Just a little room for improvement.",
            company: "Apple"
        }
    ];
    
    

    return (
        <div id='testimonials' className='py-10 bg-gray-50 relative ' >
            <h1 className='text-center text-2xl lg:text-4xl font-bold'>What <span className='text-blue-600'>User</span> says about us?</h1>
            <div className='max-w-6xl mx-auto py-10 px-5'>
                <Swiper
                    style={{
                        "--swiper-pagination-color": "#EF4444",
                        "--swiper-pagination-bullet-inactive-color": "#999999",
                        "--swiper-pagination-bullet-inactive-opacity": "1",
                        "--swiper-pagination-bullet-size": "10px",
                        "--swiper-pagination-bullet-horizontal-gap": "6px",
                    }}
                    modules={[Pagination, Autoplay]}
                    loop={true}
                    speed={600}
                    autoplay={{ delay: 5000 }}
                    slidesPerView={3}
                    spaceBetween={30}
                    breakpoints={{
                        320: { slidesPerView: 1 },
                        480: { slidesPerView: 1 },
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                    }}
                    pagination={{
                        el: ".swiper-pagination",
                        type: "bullets",
                        clickable: true,
                    }}
                    className="mySwiper"
                >
                    {testimonials.map((item) => {
                        return <SwiperSlide key={item.id}>
                            <div className='border border-gray-500 rounded-lg flex flex-col p-4'>
                                {item.rating === 4 ? (
                                    <div className='flex'>
                                        <Star fill='true' />
                                        <Star fill='true' />
                                        <Star fill='true' />
                                        <Star fill='true' />
                                        <Star />
                                    </div>
                                ) : (
                                    <div className='flex'>
                                        <Star fill='true' />
                                        <Star fill='true' />
                                        <Star fill='true' />
                                        <Star fill='true' />
                                        <Star fill='true' />
                                    </div>
                                )}
                                <p className='py-3'>{item.text}</p>
                                <div className='flex justify-between items-center'>
                                    <div>
                                        <h3 className='font-semibold text-blue-600 text-lg'>{item.name}</h3>
                                        <p className='text-sm mt-1'>{item.company}</p>
                                    </div>
                                    <Quote className='text-blue-600'/>
                                </div>
                            </div>
                        </SwiperSlide>
                    })}
                    

                </Swiper>
                <div className='swiper-pagination my-10 gap-1 relative'></div>
            </div>
        </div>
    )
}

export default Testimonials