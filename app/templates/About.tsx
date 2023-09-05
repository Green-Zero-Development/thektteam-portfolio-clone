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
    max-width: 1200px;
    margin: 0 auto;
    text-align: center;
    padding: 100px 16px 100px 16px;
    .image-box {
        position: relative;
        max-width: 700px;
        height: 200px;
        margin: 15px auto 25px auto;
        @media (min-width: 516px) {
            height: 300px;
        }
        @media (min-width: 768px) {
            height: 400px;
        }
    }
    h1 {
        font-size: 32px;
        color: #013725;
        font-style: italic;
        padding: 0 0 10px 0;
        @media (min-width: 768px) {
            font-size: 48px;
        }
    }
    p {
        max-width: 700px;
        font-size: 16px;
        color: #013725;
        margin: 0 auto;
        padding: 0 0 40px 0;
        @media (min-width: 768px) {
            font-size: 20px;
        }
    }
`

const Team = styled.div`
    max-width: 1400px;
    margin: 0 auto;
    text-align: center;
    padding: 100px 16px 100px 16px;
    h2 {
        font-size: 32px;
        color: #013725;
        font-style: italic;
        padding: 0 0 10px 0;
        @media (min-width: 768px) {
            font-size: 48px;
        }
    }
    p {
        max-width: 700px;
        font-size: 16px;
        color: #013725;
        margin: 0 auto;
        padding: 0 0 40px 0;
        @media (min-width: 768px) {
            font-size: 20px;
        }
    }
    .team-list {
        display: grid;
        grid-template-columns: repeat(1, 1fr);
        column-gap: 20px;
        padding-top: 25px;
        @media (min-width: 516px) {
            grid-template-columns: repeat(2, 1fr);
        }
        @media (min-width: 768px) {
            grid-template-columns: repeat(3, 1fr);
        }
    }
    .team-single {
        padding-bottom: 50px;
    }
    .team-img {
        position: relative;
        height: 400px;
        border: 2px solid #b4a47b;
    }
    .team-content {
        padding-top: 15px;
        h5 {
            font-family: 'prohibition', sans-serif;
            font-size: 32px;
            color: #013725;
            font-style: italic;
        }
        h6 {
            font-family: ibm-plex-sans,sans-serif;
            font-weight: 700;
            color: #013725!important;
        }
    }
`

// endregion

export default function About({ pageData, team, sponsors, events }:any) {

    const helpOthersCta = pageData.global_sections[2];
    const upcomingEvents = pageData.global_sections[0];
    const ourSponsors = pageData.global_sections[1];

    return (
        <>
        <div dangerouslySetInnerHTML={{__html: pageData.yoast_head[0]}}>

        </div>
        <Hero>
          <h1>{pageData.acf.hero_section.title}</h1>
          <div className="image-box">
            <Image src={`${pageData.acf.hero_section.image.url}`} alt={`${pageData.acf.hero_section.image.alt}`} fill style={{ objectFit: 'cover' }} />
          </div>
          <p>{pageData.acf.hero_section.paragraph}</p>
        </Hero>

        <Team>
            <h2>{pageData.acf.meet_the_team_section.title}</h2>
            <p>{pageData.acf.meet_the_team_section.paragraph}</p>
            <div className="team-list">
                {team.map((item:any) => {
                    if (item.acf.is_prostaff === "No") {
                        return (
                            <div className="team-single">
                                <div className="team-img">
                                    <Image src={`${item.acf.headshot.url}`} alt={`${item.acf.headshot.alt}`} fill style={{ objectFit: 'cover' }} />
                                </div>
                                <div className="team-content">
                                    <h5>{item.title}</h5>
                                    <h6>{item.acf.title}</h6>
                                </div>
                            </div>
                        );
                    }
                })}
            </div>
        </Team>

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