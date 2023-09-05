import { apiUrl } from '../../global-settings.js';
import Home from '../../templates/Home';
import OnLoadScripts from "../../components/OnLoadScripts";

const today = new Date();
const todayTimeStamp = today.toISOString();

async function getPage() {
  const res = await fetch(apiUrl + `/pages/all/home`);
  if (!res.ok) {
    throw Error(res.statusText);
  } else {
    return res.json();
  }
}

async function getTestimonials() {
  const res = await fetch(apiUrl + `/testimonials/all`);
  if (!res.ok) {
    throw Error(res.statusText);
  } else {
    return res.json();
  }
}

async function getSponsors() {
  const res = await fetch(apiUrl + `/sponsors/all`);
  if (!res.ok) {
    throw Error(res.statusText);
  } else {
    return res.json();
  }
}

// async function getEvents() {
//   const res = await fetch(`https://www.googleapis.com/calendar/v3/calendars/ktteamcalendar@gmail.com/events?key=${process.env.GOOGLE_CAL_KEY}&singleEvents=true&orderBy=startTime&timezone=America/New_York&timeMin=${todayTimeStamp}`, { next: { revalidate: 120 } })
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

export default async function Page() {
  const _page = getPage();
  const page = await _page;

  const _testimonials = getTestimonials();
  const testimonials = await _testimonials;

  const _sponsors = getSponsors();
  const sponsors = await _sponsors;

  const _events = getEvents();
  const events = await _events;
  
  return (
    <>
      <Home pageData={page} testimonials={testimonials} sponsors={sponsors} events={events} />
      <OnLoadScripts pageData={page} />
    </>
  );
}