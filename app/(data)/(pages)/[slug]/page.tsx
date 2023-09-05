
import { apiUrl } from '../../../global-settings.js';
import { notFound } from 'next/navigation';
import ThankYou from "../../../templates/ThankYou";
import Shop from "../../../templates/Shop";
import EventSpecific from "../../../templates/EventSpecific";
import EventListing from "../../../templates/EventListing";
import Contact from "../../../templates/Contact";
import About from "../../../templates/About";
import Prostaff from "../../../templates/Prostaff";
import EventRegistration from "../../../templates/EventRegistration";
import MeetTheHunters from "../../../templates/MeetTheHunters";
import OnLoadScripts from "../../../components/OnLoadScripts";

const today = new Date();
const todayTimeStamp = today.toISOString();

async function getProducts() {
  const res = await fetch(`https://the-kt-team.myshopify.com/admin/api/2023-01/products.json?limit=250`, {
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': process.env.SHOPIFY_REST_API_ACCESS_TOKEN!,
    },
    next: { revalidate: 60 }
  });
if (!res.ok) {
  throw Error(res.statusText);
} else {
  return res.json();
}
}

async function getAllPages() {
  const res = await fetch(apiUrl + `/pages/all`)
  if (!res.ok) {
    throw Error(res.statusText);
  } else {
    return res.json();
  }
}

async function getSinglePage(slug: String) {
  const res = await fetch(apiUrl + `/pages/all/${slug}`)
  if (!res.ok) {
    return notFound();
  } 
  else if (slug == "home" || slug == "404-2") {
    return notFound();
  } else {
    return res.json();
  }
}

async function getSponsors() {
  const res = await fetch(apiUrl + `/sponsors/all`)
  if (!res.ok) {
    throw Error(res.statusText);
  } else {
    return res.json();
  }
}

async function getTeam() {
  const res = await fetch(apiUrl + `/team-members/all`)
  if (!res.ok) {
    throw Error(res.statusText);
  } else {
    return res.json();
  }
}

async function getHunters() {
  const res = await fetch(apiUrl + `/hunters/all`)
  if (!res.ok) {
    throw Error(res.statusText);
  } else {
    return res.json();
  }
}

// async function getEvents() {
//   const res = await fetch(`https://www.googleapis.com/calendar/v3/calendars/ktteamcalendar@gmail.com/events?key=${process.env.GOOGLE_CAL_KEY}&singleEvents=true&orderBy=startTime&timezone=America/New_York&timeMin=${todayTimeStamp}`, { next: { revalidate: 720 } })
//   if (!res.ok) {
//     throw Error(res.statusText);
//   } else {
//     return res.json();
//   }
// }

async function getEvents() {
  const res = await fetch(apiUrl + `/events/all`)
  if (!res.ok) {
    throw Error(res.statusText);
  } else {
    return res.json();
  }
}

export default async function Page({params: { slug } }:any) {
  const _page = getSinglePage(slug);
  const page = await _page;

  const _products = getProducts();
  const products = await _products;

  const _sponsors = getSponsors();
  const sponsors = await _sponsors;

  const _events = getEvents();
  const events = await _events;
  
  const _team = getTeam();
  const team = await _team;

  const _hunters = getHunters();
  const hunters = await _hunters;

  const activeProducts:Array<object> = [];

  {products.products.map((item: any) => {
    if (item.status === "active") {
      activeProducts.push(
        {item},
    )
    } else {};
  })}

  if (!page.slug) return notFound();

  if (slug == "thank-you") {
    return (
      <>
        <ThankYou pageData={page} />
        <OnLoadScripts pageData={page} />
      </>
    );
  } else if (page.template == "templates/shop-category.php") {
    return (
      <>
        <Shop pageData={page} activeProducts={activeProducts} />
        <OnLoadScripts pageData={page} />
      </>
    );
  } else if (page.template == "templates/event-specific.php") {
    return (
      <>
        <EventSpecific pageData={page} sponsors={sponsors} events={events} />
        <OnLoadScripts pageData={page} />
      </>
    );
  } else if (page.template == "templates/event-listing.php") {
    return (
      <>
        <EventListing pageData={page} sponsors={sponsors} events={events} />
        <OnLoadScripts pageData={page} />
      </>
    );
  } else if (page.template == "templates/contact.php") {
    return (
      <>
        <Contact pageData={page} sponsors={sponsors} events={events} />
        <OnLoadScripts pageData={page} />
      </>
    );
  } else if (page.template == "templates/about.php") {
    return (
      <>
        <About pageData={page} sponsors={sponsors} events={events} team={team} />
        <OnLoadScripts pageData={page} />
      </>
    );
  } else if (page.template == "templates/prostaff.php") {
    return (
      <>
        <Prostaff pageData={page} sponsors={sponsors} events={events} team={team} />
        <OnLoadScripts pageData={page} />
      </>
    );
  } else if (page.template == "templates/event-registration.php") {
    return (
      <>
        <EventRegistration pageData={page} sponsors={sponsors} events={events} />
        <OnLoadScripts pageData={page} />
      </>
    );
  } else if (page.template == "templates/meet-the-hunters.php") {
    return (
      <>
        <MeetTheHunters pageData={page} sponsors={sponsors} events={events} hunters={hunters} />
        <OnLoadScripts pageData={page} />
      </>
    );
  } else {
    return (null);
  }
}

export async function generateStaticParams() {
  const _pages = getAllPages();
  const pages = await _pages;
  return pages.map((pageSing: any) => ({ 
      slug: pageSing.slug 
  }));
}