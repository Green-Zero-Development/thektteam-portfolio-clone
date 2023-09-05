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

const FormGrid = styled.div`
  grid-template-columns: repeat(3, 1fr);
  column-gap: 20px;
  .contact-form-box {
    grid-column-start: 1;
    grid-column-end: 3;
  }
  .contact-box {
    display: flex;
    flex-wrap: wrap;
    padding-bottom: 25px;
  }
  .contact-title {
    width: 100%;
    font-family: ibm-plex-sans,sans-serif;
    font-weight: 700;
    color: #013725!important;
  }
  .contact-text {
    font-family: ibm-plex-sans,sans-serif;
    font-size: 15px;
    font-weight: 200;
    color: #013725!important;
  }
  .contact-social {
    width: 100%;
  }
  @media (min-width: 516px) {
      display: grid;
  }
  @media (min-width: 768px) {
      column-gap: 50px;
      
  }
`

// #endregion

export default function Contact({ pageData, sponsors, events }:any) {

    const instagram = pageData.site_data[1].acf.value_list[0].value;
    const facebook = pageData.site_data[1].acf.value_list[1].value;
    const youtube = pageData.site_data[1].acf.value_list[2].value;
    const googleMaps = pageData.site_data[1].acf.value_list[3].value;
    const street = pageData.site_data[4].acf.value_list[0].street;
    const city = pageData.site_data[4].acf.value_list[0].city;
    const state = pageData.site_data[4].acf.value_list[0].state;
    const zip = pageData.site_data[4].acf.value_list[0].zip;
    const phone = pageData.site_data[5].acf.value_list[0].value;

    const helpOthersCta = pageData.global_sections[2];
    const upcomingEvents = pageData.global_sections[0];
    const ourSponsors = pageData.global_sections[1];

    useEffect(() => {
        const cogForm = document.createElement('script');
        const cogFormBox = document.getElementById('contact-form');
        cogForm.src = "https://www.cognitoforms.com/f/seamless.js";
        cogForm.setAttribute("data-key", "IG83lPQs7UKU2FDeP--HlA");
        cogForm.setAttribute("data-form", "63");
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
          <FormGrid>
            <div className="contact-form-box">
              <div id="contact-form" className="contact-form">
                          
              </div>
            </div>
            <div>
              <div className="contact-box">
                <h5 className="contact-title">Mailing Address</h5>
                <a href={googleMaps} className="contact-text">
                    <div>
                        {street}
                    </div>
                    <div>
                        {city}, {state} {zip}
                    </div>
                </a>
              </div>
              <div className="contact-box">
                <h5 className="contact-title">Phone</h5>
                <a href={`tel:${phone}`} className="contact-text">
                    {phone}
                </a>
              </div>
              <div className="contact-box contact-text social">
                <h5 className="contact-title">Follow Us</h5>
                  <a href={instagram} className="contact-social">
                      Follow Us on Instagram
                  </a>
                  <a href={facebook} className="contact-social">
                      Find Us on Facebook
                  </a>
                  <a href={youtube} className="contact-social">
                      Watch Us on Youtube
                  </a>
              </div>
            </div>
          </FormGrid>
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