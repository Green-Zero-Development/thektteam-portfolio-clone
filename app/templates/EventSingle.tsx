'use client';

import Image from 'next/image';
import styled from 'styled-components';

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

const Section = styled.div`
    .content {
        max-width: 800px;
        margin: 0 auto;
        padding: 80px 16px 80px 16px;
        text-align: center;
        h1 {
            font-size: 48px;
            color: #013725;
        }
        p {
            padding: 25px 0 25px 0;
        }
        .event-time {
            font-family: 'prohibition', sans-serif;
            font-size: 18px;
            color: #013725;
            padding: 20px;
            margin: 0 auto;
            text-align: center;
        }
        .time-group {
            display: flex;
            flex-wrap: wrap;
            width: 100%;
        }
        h2 {
            padding: 25px 0 50px 0;
            font-size: 24px;
            color: #013725;
        }
    }
`

// #endregion

export default function EventSingle({ eventData }:any) {

    return (
        <Section>
            <div dangerouslySetInnerHTML={{__html: eventData.yoast_head[0]}}>

            </div>

            <div className="content">
                <h1>{eventData.acf.event_title}</h1>
                {eventData.acf.event_description ? <p>{eventData.acf.event_description}</p> : '' }
                <div className="time-group">
                    {eventData.acf.start_date ? <time className="event-time">Starts on: <u>{eventData.acf.start_date}</u></time> : '' }
                    {eventData.acf.end_date ? <time className="event-time">Ends on: <u>{eventData.acf.end_date}</u></time> : '' }
                    {eventData.acf.start_time ? <time className="event-time">Starts at: <u>{eventData.acf.start_time}</u></time> : '' }
                    {eventData.acf.end_time ? <time className="event-time">Ends at: <u>{eventData.acf.end_time}</u></time> : '' }
                </div>
                {eventData.acf.location ? <h2>Location: {eventData.acf.location}</h2> : '' }

                {eventData.acf.sign_up_link ? <a href={eventData.acf.sign_up_link} target="_blank" className="filled-button">Sign Up</a> : '' }

                {eventData.acf.file_link.url ? <a href={eventData.acf.file_link.url} target="_blank" className="filled-button">Learn More</a> : '' }
            </div>
            
        </Section>
    )
}