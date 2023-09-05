import { apiUrl } from './global-settings.js';
import './styles/global.css';
import './styles/header.css';
import './styles/footer.css';
import Header from "./components/header";
import Footer from "./components/footer";
import StyledComponentsRegistry from '../lib/registry';
import Script from 'next/script';

async function getSiteData() {
  const res = await fetch(apiUrl + `/site-data/all`)
  if (!res.ok) {
    throw Error(res.statusText);
  } else {
    return res.json();
  }
}

async function getGlobalSections() {
  const res = await fetch(apiUrl + `/global-sections/all`)
  if (!res.ok) {
    throw Error(res.statusText);
  } else {
    return res.json();
  }
}

async function getMenu() {
  const res = await fetch(apiUrl + `/menus/all`)
  if (!res.ok) {
    throw Error(res.statusText);
  } else {
    return res.json();
  }
}

export default async function RootLayout({ children, page }:any) {
  const _siteData = getSiteData();
  const siteData = await _siteData;

  const logos:any = [];
  const socialMedia:any = [];
  const physicalAddresses:any = [];
  const phoneNumbers:any = [];
  const emails:any = [];

  {siteData.map((item:any) => {
      if (item.title === "Logos") {
          logos.push(
              {"acf": item.acf },
          )
      } else if (item.title === "Social Media Links") {
          socialMedia.push(
              {"acf": item.acf },
          )
      } else if (item.title === "Physical Addresses") {
        physicalAddresses.push(
          {"values": item.acf.value_list},
        ) 
      } else if (item.title === "Contact Numbers") {
        phoneNumbers.push(
          {"values": item.acf.value_list},
        ) 
      } else if (item.title === "Emails") {
        emails.push(
          {"values": item.acf.value_list},
        ) 
      } else {};
  })}

  const _globalSections = getGlobalSections();
  const globalSections = await _globalSections;

  const exampleGlobalData = [];

  {globalSections.map((item:any) => {
      if (item.title === "Example Global") {
      exampleGlobalData.push(
          {"acf": item.acf},
      )
      } else {};
  })}

  const _menu = getMenu();
  const menu = await _menu;

  const mainMenu:any = [];
  const mobileMenu:any = [];
  const footerMenu:any = [];

  {Object.keys(menu).map((key) => {
      if (menu[key].menu == "main-menu") {
          mainMenu.push(
              {"id": menu[key].id, "parent_id": menu[key].parent_id, "title": menu[key].title, "url": menu[key].url, "children": menu[key].children},
          )
      }
  })}

  {Object.keys(menu).map((key) => {
    if (menu[key].menu == "mobile-menu") {
        mobileMenu.push(
            {"id": menu[key].id, "parent_id": menu[key].parent_id, "title": menu[key].title, "url": menu[key].url, "children": menu[key].children},
        )
    }
  })}

  {Object.keys(menu).map((key) => {
    if (menu[key].menu == "footer-menu") {
        footerMenu.push(
            {"id": menu[key].id, "parent_id": menu[key].parent_id, "title": menu[key].title, "url": menu[key].url, "children": menu[key].children},
        )
    }
  })}

  return (
    <html>
      <head>
      <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {page}
        <link rel="apple-touch-icon" sizes="76x76" href="/favi/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favi/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favi/favicon-16x16.png" />
        <link rel="manifest" href="/favi/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="theme-color" content="#ffffff" />
        <link rel="stylesheet" href="https://use.typekit.net/qni8jpr.css"></link>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@splidejs/splide@4.0.7/dist/css/splide.min.css"></link>
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${process.env.GTM_ID}');
          `}
        </Script>
      </head>
      <StyledComponentsRegistry>
        <body>
          <Header logos={logos} socialMedia={socialMedia} mainMenu={mainMenu} mobileMenu={mobileMenu} />
          {children}
          <Footer logos={logos} socialMedia={socialMedia} footerMenu={footerMenu} physicalAddresses={physicalAddresses} phoneNumbers={phoneNumbers} />
          <noscript
          dangerouslySetInnerHTML={{
            __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=${process.env.GTM_ID}" height="0" width="0" style="display: none; visibility: hidden;" />`,
          }}
          />
        </body>
      </StyledComponentsRegistry>
    </html>
  )
}
