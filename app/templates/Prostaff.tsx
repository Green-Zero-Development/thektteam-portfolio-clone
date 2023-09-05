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
    padding: 100px 16px 0px 16px;
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
    .team-img {
        position: relative;
    }
    .team-single {
        display: grid;
        grid-template-columns: repeat(1, 1fr);
        column-gap: 20px;
        max-width: 1200px;
        margin: 0 auto;
        padding: 0px 16px 80px 16px;
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
            grid-template-columns: repeat(2, 1fr);
        }
        @media (min-width: 768px) {
            column-gap: 50px;
            .image-box {
                height: 360px;
            }
        }
    }
    .team-single-flip {
        display: grid;
        grid-template-columns: repeat(1, 1fr);
        column-gap: 20px;
        max-width: 1200px;
        margin: 0 auto;
        padding: 0px 16px 80px 16px;
        .team-content {
            order: 2;
            @media (min-width: 516px) {
                order: 1;
            }
        }
        .image-box {
            position: relative;
            height: 260px;
            margin-bottom: 50px;
            @media (min-width: 516px) {
                order: 2;
            }
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
            grid-template-columns: repeat(2, 1fr);
        }
        @media (min-width: 768px) {
            column-gap: 50px;
            .image-box {
                height: 360px;
            }
        }
    }
`

// #endregion

export default function Prostaff({ pageData, team, sponsors, events }:any) {

    const helpOthersCta = pageData.global_sections[2];
    const upcomingEvents = pageData.global_sections[0];
    const ourSponsors = pageData.global_sections[1];

    return (
        <>
        <div dangerouslySetInnerHTML={{__html: pageData.yoast_head[0]}}>

        </div>
        <Hero>
          <h1>{pageData.acf.title}</h1>
          <p>{pageData.acf.paragraph}</p>
        </Hero>

        <Team>
            <div className="team-list">
                {team.map((item:any, index:any) => {
                    if (item.acf.is_prostaff === "Yes") {
                        if (index % 2) {
                            return (
                                <div className="team-single-flip">
                                    <div className="team-content">
                                        <h2>{item.title}</h2>
                                        <p>{item.acf.bio}</p>
                                        <a href={item.acf.website_link}>
                                            <div className="filled-button button">
                                                Visit Website
                                            </div>
                                        </a>
                                    </div>
                                    <div className="image-box">
                                        <Image src={`${item.acf.headshot.url}`} alt={`${item.acf.headshot.alt}`} fill style={{ objectFit: 'cover' }} />
                                    </div>
                                </div>
                            );
                        } else {
                            return (
                                <div className="team-single">
                                    <div className="image-box">
                                        <Image src={`${item.acf.headshot.url}`} alt={`${item.acf.headshot.alt}`} fill style={{ objectFit: 'cover' }} />
                                    </div>
                                    <div>
                                        <h2>{item.title}</h2>
                                        <p>{item.acf.bio}</p>
                                        <a href={item.acf.website_link}>
                                            <div className="filled-button button">
                                                Visit Website
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            );
                        }
                        
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