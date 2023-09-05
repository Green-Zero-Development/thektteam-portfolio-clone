'use client';

import Image from 'next/image';
import styled from 'styled-components';
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

const Speaking = styled.div`
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
    h2 {
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

export default function EventListing({ pageData, sponsors, events }:any) {

    const helpOthersCta = pageData.global_sections[2];
    const upcomingEvents = pageData.global_sections[0];
    const ourSponsors = pageData.global_sections[1];

    let buttonLink = getButtonLink(pageData.acf.speaking_engagements.button.link_to_where, pageData.acf.speaking_engagements.button.onsite_link, pageData.acf.speaking_engagements.button.offsite_link, pageData.acf.speaking_engagements.button.file_link);

    return (
        <>
            <div dangerouslySetInnerHTML={{__html: pageData.yoast_head[0]}}>

            </div>
            <UpcomingEvents upcomingEvents={upcomingEvents} events={events} />
            
            <HelpOthersCta helpOthersCta={helpOthersCta} />

            <Speaking>
                <div className="image-box">
                    <Image src={`${pageData.acf.speaking_engagements.image.url}`} alt={`${pageData.acf.speaking_engagements.image.alt}`} fill style={{ objectFit: 'cover' }} />
                </div>
                <div>
                    <h2>{pageData.acf.speaking_engagements.title}</h2>
                    <p>{pageData.acf.speaking_engagements.paragraph}</p>
                    <a href={buttonLink}>
                        <div className="filled-button button">
                            {pageData.acf.speaking_engagements.button.text}
                        </div>
                    </a>
                </div>
            </Speaking>

            <div className="spacer"></div>

            <OurSponsors ourSponsors={ourSponsors} sponsors={sponsors} />

            <div className="spacer"></div>
            <div className="spacer"></div>
            
        </>
    )
}