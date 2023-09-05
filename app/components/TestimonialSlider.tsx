'use client';

import { Splide, SplideTrack, SplideSlide } from '@splidejs/react-splide';
import Image from 'next/image';
import styled from 'styled-components';

const TestimonialSlide = styled.div`
   display: flex;
   flex-wrap: wrap;
   padding: 0 16px 50px 16px;
   .image-box {
        width: 80%;
        margin: 0 auto;
        padding-bottom: 15px;
        @media (min-width: 576px) {
            width: 60%;
        }
        @media (min-width: 768px) {
            width: 40%;
            padding-bottom: 0px;
        }
   }
   .content {
    width: 100%;
    padding: 10px 6px 10px 6px;
    h4 {
        font-size: 20px;
        color: #f0581e;
        text-align: right;
        padding: 8px 0 0 0;
    }
    p {
        font-size: 14px;
        @media (min-width: 1200px) {
            font-size: 20px;
        }
    }
    @media (min-width: 768px) {
        width: 60%;
        padding: 10px 30px 10px 30px;
    }
   }
`;

export default function TestimonialSlider({ testimonials }:any) {
    return (
        <>
            <Splide hasTrack={ false }
                options={ {
                    type: 'loop',
                    perPage: 1,
                    autoplay: true
                } 
                }
                
                >
                <SplideTrack className="pt-4">
                    {testimonials.map((item:any, index:any) => {
                        return (
                        <SplideSlide key={index} className="splide__slide">
                            <TestimonialSlide>
                                <div className="image-box">
                                    <Image className="" src={item.acf.headshot.url} alt={item.acf.headshot.alt} width={1000} height={300} />
                                </div>
                                <div className="content">
                                    <p>"{item.acf.testimonial_text}"</p>
                                    <div className="">
                                        {item.acf.company ? <h4>{item.acf.name}, {item.acf.company}</h4> : <h4>{item.acf.name}</h4> }
                                    </div>
                                </div>
                            </TestimonialSlide>
                        </SplideSlide>
                        );
                    })}
                    
                </SplideTrack>
                <div className="splide__arrows">
                    <button className="splide__arrow splide__arrow--prev">
                        previous
                    </button>
                    <button className="splide__arrow splide__arrow--next">
                        next
                    </button>
                </div>
            </Splide>
        </>
    )
}