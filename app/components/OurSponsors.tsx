'use client';

import Image from 'next/image';
import styled from 'styled-components';

const Section = styled.div`
    max-width: 1440px;
    padding: 0 16px 0 16px;
    margin: 0 auto;
    text-align: center;
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
        font-size: 16px;
        color: #013725;
        padding: 0 0 40px 0;
        @media (min-width: 768px) {
            font-size: 20px;
        }
    }
    .wrapper {
        display: flex;
        flex-wrap: wrap;
    }
    .logo {
        position: relative;
        display: flex;
        width: 160px;
        height: 100px;
        margin: 0 auto;
        align-items: center;
        padding: 5px;
        img {
            margin: 0 auto;
        }
    }
`

export default function OurSponsors({ ourSponsors, sponsors }:any) {
    
    return (
        <Section>
            <h2>{ourSponsors.acf.title}</h2>
            <p>{ourSponsors.acf.paragraph}</p>
            <div className="wrapper">
                {sponsors.map((item:any, index:any) => {
                    return (
                        <div className="logo">
                            <img src={item.acf.logo.url} />
                            
                        </div>
                    );
                })}
            </div>
        </Section>
    )
}