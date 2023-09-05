'use client';

import { useEffect } from 'react';
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

const Section = styled.div`
  max-width: 1300px;
  margin: 0 auto;
  padding: 100px 16px 100px 16px;
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
      font-size: 16px;
      color: #013725;
      padding: 0 0 40px 0;
      white-space: pre-line;
      @media (min-width: 768px) {
          font-size: 20px;
      }
  }
`

// #endregion

export default function EventRegistration({ pageData, sponsors, events }:any) {

    const helpOthersCta = pageData.global_sections[2];
    const upcomingEvents = pageData.global_sections[0];
    const ourSponsors = pageData.global_sections[1];

    useEffect(() => {
        const cogForm = document.createElement('script');
        const cogFormBox = document.getElementById('contact-form');
        cogForm.src = "https://www.cognitoforms.com/f/seamless.js";
        cogForm.setAttribute("data-key", "IG83lPQs7UKU2FDeP--HlA");
        cogForm.setAttribute("data-form", "64");
        if (cogFormBox.hasChildNodes() == true) {
    
        } else {
            cogFormBox.appendChild(cogForm);
        }

    }, []);
    return (
        <>
        <div dangerouslySetInnerHTML={{__html: pageData.yoast_head[0]}}>

        </div>
        <Section>
          <h1>{pageData.acf.title}</h1>
          <p>{pageData.acf.paragraph}</p>
          <div className="contact-form-box">
              <div id="contact-form" className="contact-form">
                          
              </div>
        </div>
        <div className="spacer"></div>
        <p className="disclaimer">{pageData.acf.disclaimer}</p>
        <div className="spacer"></div>
        </Section>

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