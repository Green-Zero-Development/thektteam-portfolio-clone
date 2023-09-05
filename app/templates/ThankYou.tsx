'use client';

import styled from 'styled-components';

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

const Section = styled.div`
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
  padding: 80px 16px 80px 16px;
  h1 {
    font-size: 48px;
    color: #013725;
  }
  p {
      padding: 15px 0 50px 0;
  }
`

export default function ThankYou({ pageData }:any) {
    let buttonLink = getButtonLink(pageData.acf.hero_section.button.link_to_where, pageData.acf.hero_section.button.onsite_link, pageData.acf.hero_section.button.offsite_link, pageData.acf.hero_section.button.file_link);
    return (
        <>
        <div dangerouslySetInnerHTML={{__html: pageData.yoast_head[0]}}>

        </div>
        <Section>
            <div className="">
                <h1 className="">{pageData.acf.hero_section.title}</h1>
                <p className="">{pageData.acf.hero_section.paragraph}</p>
                <a href={buttonLink}>
                    <button className="filled-button">{pageData.acf.hero_section.button.text}</button>
                </a>
            </div>
        </Section>
        </>
    )
}