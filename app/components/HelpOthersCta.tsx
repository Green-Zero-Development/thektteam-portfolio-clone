'use client';

import Image from 'next/image';
import styled from 'styled-components';

function getButtonLink(linkToWhere: string, onSiteLink: string, offSiteLink: string, fileLink: any) {
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

const Section = styled.div`
    position: relative;
    text-align: center;
    padding: 50px 16px 50px 16px;
    .content {
        position: relative;
        h4 {
            font-family: 'prohibition', sans-serif;
            font-size: 40px;
            color: #e2dccc;
            padding: 0 0 24px 0;
        }
    }
`

export default function HelpOthersCta({ helpOthersCta }:any) {

    let buttonLink = getButtonLink(helpOthersCta.acf.button.link_to_where, helpOthersCta.acf.button.onsite_link, helpOthersCta.acf.button.offsite_link, helpOthersCta.acf.button.file_link);

    return (
        <Section>
            <Image src={`${helpOthersCta.acf.image.url}`} alt={`${helpOthersCta.acf.image.alt}`} fill style={{ objectFit: 'cover' }} />
            <div className="content">
                <h4>{helpOthersCta.acf.title}</h4>
                <a href={buttonLink} className="filled-button">
                    {helpOthersCta.acf.button.text}
                </a>
            </div>
        </Section>
    )
}