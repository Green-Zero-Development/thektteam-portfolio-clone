'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import TestimonialSlider from "../components/TestimonialSlider";
import HelpOthersCta from "../components/HelpOthersCta";
import UpcomingEvents from "../components/UpcomingEvents";
import OurSponsors from "../components/OurSponsors";

function getButtonLink(linkToWhere:string, onSiteLink:string, offSiteLink:string, fileLink:any) {
    switch (linkToWhere) {
      case "Onsite":
        return (onSiteLink);
      case "Offsite":
        return (offSiteLink);
      case "File":
        return (fileLink.url);
      default:
        return ('/');
    }
}

// #region Styles

const Hero = styled.div`
    position: relative;
    padding: 150px 0 150px 0;
    overflow: hidden;
    .bg-overlay {
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(1, 55, 37, 0.8);
        z-index: 2;
    }
    .content {
        position: relative;
        max-width: 1232px;
        margin: 0 auto;
        padding: 0 16px 0 16px;
        z-index: 3;
        @media (min-width: 768px) {
            padding: 0 32px 0 32px;
        }
        .content-inner {
            max-width: 500px;
            @media (min-width: 768px) {
                max-width: 650px;
            }
        }
        h1 {
            color: #e2dccc;
            font-size: 32px;
            @media (min-width: 568px) {
                font-size: 56px;
            }
            @media (min-width: 768px) {
                font-size: 72px;
            }
        }
        time {
            font-family: 'prohibition', sans-serif;
            font-size: 18px;
            color: #F26A36;
            @media (min-width: 768px) {
                font-size: 24px;
            }
        }
        p {
            color: #e2dccc;
            padding: 15px 0 40px 0;
            font-size: 16px;
            @media (min-width: 768px) {
                font-size: 24px;
            }
        }
    }
`

const TestimonialSection = styled.div`
    max-width: 1408px;
    margin: 50px auto 0px auto;
    padding: 0px 16px 0px 16px;
`

const TestimonialBox = styled.div`
    background-color: #e2dccc;
    box-shadow: 0 0 10px rgba(0,0,0,.25);
    padding: 0 16px 0 16px;
    h2 {
        font-size: 32px;
        color: #013725;
        font-style: italic;
        text-align: center;
        padding: 50px 0 32px 0;
        @media (min-width: 768px) {
            font-size: 48px;
        }
    }
`

const ImageBoxes = styled.div`
    max-width: 1200px;
    width: 90%;
    margin: 0 auto;
    text-align: center;
    padding: 120px 0 80px 0;
    h2 {
        font-size: 32px;
        color: #013725;
        font-style: italic;
        padding: 0 0 10px 0;
        @media (min-width: 768px) {
            font-size: 48px;
        }
    }
    h4 {
        font-family: 'prohibition', sans-serif;
        font-size: 32px;
        color: #013725;
        font-style: italic;
        padding: 10px 0 10px 0;
    }
    .subtitle {
        font-size: 16px;
        color: #013725;
        padding: 0 0 40px 0;
        @media (min-width: 768px) {
            font-size: 20px;
        }
    }
    .wrapper {
        display: grid;
        grid-template-columns: repeat(1, 1fr);
        column-gap: 20px;
        @media (min-width: 768px) {
            grid-template-columns: repeat(3, 1fr);
        }
    }
    .outer-box {
        padding: 0px 0 80px 0;
        p {
            font-size: 16px;
            color: #013725;
            padding: 0 0 40px 0;
        }
    }
    .box {
        display: flex;
        position: relative;
        align-items: center;
        justify-items: center;
        width: 100%;
        height: 200px;
        .hover-box {
            opacity: 0;
            position: relative;
            display: flex;
            height: 100%;
            width: 100%;
            align-items: center;
            background-color: rgba(1,55,37,.8);
            margin: 0 auto;
            transition: .2s;
            .button {
                width: auto;
                text-align: center;
                margin: 0 auto;
                padding: 8px 24px 8px 24px;
            }
            &:hover {
                opacity: 1;
                transition: .2s;
            }
        }
        @media (min-width: 992px) {
            height: 360px;
        }
    }
    @media (min-width: 416px) {
        width: 60%;
    }
    @media (min-width: 768px) {
        width: 90%;
    }
`

// #endregion

export default function Home({ pageData, testimonials, sponsors, events }:any) {
    let heroLink = getButtonLink(pageData.acf.hero_section.button.link_to_where, pageData.acf.hero_section.button.onsite_link, pageData.acf.hero_section.button.offsite_link, pageData.acf.hero_section.button.file_link);

    const helpOthersCta = pageData.global_sections[2];
    const upcomingEvents = pageData.global_sections[0];
    const ourSponsors = pageData.global_sections[1];

    return (
        <>
            <div dangerouslySetInnerHTML={{__html: pageData.yoast_head[0]}}>

            </div>
            <Hero className="">
                <div className="bg-overlay"></div>
                <Image src={`${pageData.acf.hero_section.background_image.url}`} alt={`${pageData.acf.hero_section.background_image.alt}`} fill style={{ objectFit: 'cover' }} />
                <div className="content">
                    <div className="content-inner">
                        <div dangerouslySetInnerHTML={{__html: pageData.acf.hero_section.title}}></div>
                        {pageData.acf.hero_section.event_date ? <time>{pageData.acf.hero_section.event_date}</time> : '' }
                        <div dangerouslySetInnerHTML={{__html: pageData.acf.hero_section.paragraph}}></div>
                        {pageData.acf.hero_section.button.text ? <a href={heroLink}><div className="filled-button">{pageData.acf.hero_section.button.text}</div></a> : '' }
                    </div>
                </div>
            </Hero>
            <TestimonialSection id="testimonials">
                <TestimonialBox>
                    <h2>{pageData.acf.testimonial_section.title}</h2>
                    <TestimonialSlider testimonials={testimonials} />
                </TestimonialBox>
            </TestimonialSection>
            <ImageBoxes>
                <h2>{pageData.acf.products_section.title}</h2>
                <p className="subtitle">{pageData.acf.products_section.paragraph}</p>
                <div className="wrapper">
                    {pageData.acf.products_section.image_boxes.map((item:any) => {
                        let buttonLink = getButtonLink(item.button.link_to_where, item.button.onsite_link, item.button.offsite_link, item.button.file_link);
                        return (
                            <div className="outer-box">
                                <a href={buttonLink} className="box">
                                    <Image src={`${item.image.url}`} alt={`${item.image.alt}`} fill style={{ objectFit: 'cover' }} />
                                    <div className="hover-box">
                                        <div className="filled-button button">
                                            {item.button.text}
                                        </div>
                                    </div>
                                </a>
                                <h4>{item.title}</h4>
                            </div>
                        );
                    })}
                </div>
            </ImageBoxes>

            <HelpOthersCta helpOthersCta={helpOthersCta} />

            <ImageBoxes>
                <h2>{pageData.acf.ways_to_help_section.title}</h2>
                <p className="subtitle">{pageData.acf.ways_to_help_section.paragraph}</p>
                <div className="wrapper">
                    {pageData.acf.ways_to_help_section.image_boxes.map((item:any) => {
                        let buttonLink = getButtonLink(item.button.link_to_where, item.button.onsite_link, item.button.offsite_link, item.button.file_link);
                        return (
                            <div className="outer-box">
                                <div className="box">
                                    <Image src={`${item.image.url}`} alt={`${item.image.alt}`} fill style={{ objectFit: 'cover' }} />
                                    
                                </div>
                                <h4>{item.title}</h4>
                                <p>{item.paragraph}</p>
                                <a href={buttonLink}>
                                    <div className="filled-button button">
                                        {item.button.text}
                                    </div>
                                </a>
                            </div>
                        );
                    })}
                </div>
            </ImageBoxes>

            <UpcomingEvents upcomingEvents={upcomingEvents} events={events} />

            <div className="spacer"></div>
            <div className="spacer"></div>

            <OurSponsors ourSponsors={ourSponsors} sponsors={sponsors} />

            <div className="spacer"></div>
            <div className="spacer"></div>
        </>
    );
}