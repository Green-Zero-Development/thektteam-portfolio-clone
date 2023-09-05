'use client';

import Image from 'next/image';
import styled from 'styled-components';
import HelpOthersCta from "../components/HelpOthersCta";
import UpcomingEvents from "../components/UpcomingEvents";
import OurSponsors from "../components/OurSponsors";

function getButtonLink(linkToWhere:string, onSiteLink:string, offSiteLink:string, fileLink:any) {
    switch (linkToWhere) {
      case "A page on this site":
        return (onSiteLink);
      case "Another site":
        return (offSiteLink);
      case "A file":
        return (fileLink);
      default:
        return ('/');
    }
}

// #region Styles

const Hero = styled.div`
    
    grid-template-columns: repeat(2, 1fr);
    column-gap: 20px;
    max-width: 1200px;
    margin: 0 auto;
    padding: 100px 16px 100px 16px;
    .image-box {
        position: relative;
        height: 260px;
        margin-bottom: 50px;
    }
    h1 {
        font-size: 32px;
        color: #013725;
        font-style: italic;
        padding: 0 0 10px 0;
    }
    p {
        font-size: 16px;
        color: #013725;
        padding: 0 0 40px 0;
        white-space: pre-line;
        @media (min-width: 768px) {
            font-size: 20px;
        }
    }
    @media (min-width: 516px) {
        display: grid;
    }
    @media (min-width: 768px) {
        column-gap: 50px;
        .image-box {
            height: 360px;
        }
    }
`

// #endregion

export default function EventSpecific({ pageData, sponsors, events }:any) {

    const helpOthersCta = pageData.global_sections[2];
    const upcomingEvents = pageData.global_sections[0];
    const ourSponsors = pageData.global_sections[1];

    return (
        <>
            <div dangerouslySetInnerHTML={{__html: pageData.yoast_head[0]}}>

            </div>
            <Hero>
                <div className="image-box">
                    <Image src={`${pageData.acf.hero_section.image.url}`} alt={`${pageData.acf.hero_section.image.alt}`} fill style={{ objectFit: 'cover' }} />
                </div>
                <div>
                    <h1>{pageData.acf.hero_section.title}</h1>
                    <p>{pageData.acf.hero_section.paragraph}</p>
                </div>
            </Hero>

            <HelpOthersCta helpOthersCta={helpOthersCta} />

            <UpcomingEvents upcomingEvents={upcomingEvents} events={events} />

            <div className="spacer"></div>
            <div className="spacer"></div>

            <OurSponsors ourSponsors={ourSponsors} sponsors={sponsors} />

            <div className="spacer"></div>
            <div className="spacer"></div>

        </>
    )
}