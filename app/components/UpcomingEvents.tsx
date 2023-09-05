'use client';

import styled from 'styled-components';
import { Splide, SplideTrack, SplideSlide } from '@splidejs/react-splide';

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

const UpcomingSection = styled.div`
    background-color: #ebe7dc;
    padding: 120px 0 100px 0;
`

const UpcomingBox = styled.div`
    max-width: 1440px;
    margin: 0 auto;
    padding: 0 16px 0 16px;
    .splide__track {
        margin-bottom: 30px;
    }
    .title-section {
        max-width: 800px;
        margin: 0 auto;
        text-align: center;
        padding-bottom: 20px;
    }
    h2 {
        font-size: 32px;
        color: #013725;
        font-style: italic;
        padding: 0 0 10px 0;
        @media (min-width: 768px) {
            font-size: 48px;
        }
    }
    .subtitle {
        font-size: 16px;
        color: #013725;
        padding: 0 0 40px 0;
        @media (min-width: 768px) {
            font-size: 20px;
        }
    }
    .gallery-events {
        display: flex;
        flex-wrap: wrap;
        .gallery {
            width: 100%;
            @media (min-width: 768px) {
                width: 55%;
            }
        }
        .events {
            width: 100%;
            height: 510px;
            overflow-y: scroll;
            padding: 10px 6px 0px 6px;
            @media (min-width: 768px) {
                width: 45%;
                padding: 20px 32px 0px 32px;
            }
        }
    }
    .no-events-placeholder {
        font-family: 'ibm-plex-sans', sans-serif;
        font-weight: 700;
        color: #013725;
        text-align: center;
    }
`

const EventSingle = styled.div`
    display: flex;
    flex-wrap: wrap;
    padding: 0 0 32px 0;
    margin: 0 0 32px 0;
    border-bottom: 4px solid #b4a47b;
    h5 {
        width: 100%;
        font-family: 'prohibition', sans-serif;
        color: #013725;
        font-size: 30px;
    }
    time {
        width: 100%;
        font-family: 'ibm-plex-sans', sans-serif;
        color: #f0581e;
        padding: 0 0 10px 0;
    }
    p {
        width: 100%;
        color: #013725;
    }
    .filled-button {
        margin-top: 32px;
    }
`

const PastEventImage = styled.div`
    position: relative;
    display: flex;
    flex-wrap: wrap;
    img {
        width: 100%;
        height: 320px;
        object-fit: contain;
        object-position: top;
        margin: 0 auto;
        @media (min-width: 576px) {
            width: 80%;
        }
        @media (min-width: 768px) {
            width: 100%;
            height: 510px;
        }
        @media (min-width: 1200px) {
            object-position: center;
        }
    }
   }
`;

// #endregion

export default function UpcomingEvents({ upcomingEvents, events }:any) {
    let buttonLink = getButtonLink(upcomingEvents.acf.button.link_to_where, upcomingEvents.acf.button.onsite_link, upcomingEvents.acf.button.offsite_link, upcomingEvents.acf.button.file_link);
    return (
        <UpcomingSection>
            <UpcomingBox>
                <div className="title-section">
                    <h2>{upcomingEvents.acf.title}</h2>
                    <p className="subtitle">{upcomingEvents.acf.paragraph}</p>
                </div>
                <div className="gallery-events">
                    <div className="gallery">
                        {upcomingEvents.acf.event_images !== 0 ? 
                            <Splide hasTrack={ false }
                                options={ {
                                    type: 'loop',
                                    perPage: 1
                                } 
                                }
                                
                                >
                                <SplideTrack className="pt-4">
                                    {upcomingEvents.acf.event_images.map((item:any, index:any) => {
                                        return (
                                            <SplideSlide key={index} className="splide__slide">
                                                <PastEventImage>
                                                    <img src={item.url} />
                                                </PastEventImage>
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
                            : 
                        '' }
                    </div>
                    <div className="events">
                        {events.length !== 0 ? 
                            <>
                                {events.map((item:any, index:any) => {
                                    return (
                                        <EventSingle>
                                            <h5>{item.acf.event_title}</h5>
                                            <time>{item.acf.start_date}</time>
                                            {item.acf.description ? <p>{item.acf.description}</p> : '' }
                                            <a href={`/events/${item.slug}`}>
                                                <div className="filled-button">
                                                    Learn More
                                                </div>
                                            </a>
                                        </EventSingle>
                                    );
                                })}
                            </>
                            : 
                        <h6 className="no-events-placeholder">Check back later for more events.</h6> }
                    </div>
                </div>
            </UpcomingBox>
        </UpcomingSection>
    )
}