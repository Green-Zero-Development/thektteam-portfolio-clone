import { apiUrl } from './global-settings.js';

function getButtonLink(linkToWhere, onSiteLink, offSiteLink, fileLink) {
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

export default async function NotFound() {

    async function getPage() {
        const res = await fetch(apiUrl + `/pages/all/404-2`)
        if (!res.ok) {
            throw Error(res.statusText);
        } else {
            return res.json();
        }
    }

    const _page = getPage();
    const pageData = await _page;

    let buttonLink = getButtonLink(pageData.acf.hero_section.button.link_to_where, pageData.acf.hero_section.button.onsite_link, pageData.acf.hero_section.button.offsite_link, pageData.acf.hero_section.button.file_link);
   
    return (
        <>
        <div dangerouslySetInnerHTML={{__html: pageData.yoast_head[0]}}>

        </div>
        <div className="four-o-four-section">
            <div className="four-o-four-box">
                <h1 className="four-o-four-title">{pageData.acf.hero_section.title}</h1>
                <p className="four-o-four-paragraph">{pageData.acf.hero_section.paragraph}</p>
                <a href={buttonLink} className="filled-button">{pageData.acf.hero_section.button.text}</a>
            </div>
        </div>
        </>
    );
}